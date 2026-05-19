/**
 * Post-build script that converts the Vite/TanStack Start `dist/` output
 * into the Vercel Build Output API v3 directory structure.
 *
 * Layout produced:
 *   .vercel/output/config.json          — routing config
 *   .vercel/output/static/…             — client assets (from dist/client)
 *   .vercel/output/functions/ssr.func/  — Node.js serverless function (from dist/server)
 */

import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const OUT = resolve(ROOT, ".vercel/output");

// Clean previous output
if (existsSync(OUT)) {
  rmSync(OUT, { recursive: true, force: true });
}

// 1. Copy dist/client → .vercel/output/static
mkdirSync(resolve(OUT, "static"), { recursive: true });
cpSync(resolve(ROOT, "dist/client"), resolve(OUT, "static"), {
  recursive: true,
});

// 2. Copy dist/server → .vercel/output/functions/ssr.func
const funcDir = resolve(OUT, "functions/ssr.func");
mkdirSync(funcDir, { recursive: true });
cpSync(resolve(ROOT, "dist/server"), funcDir, { recursive: true });

// Patch server.js to return actual error
const serverJsPath = resolve(funcDir, "server.js");
let serverJs = readFileSync(serverJsPath, "utf8");
serverJs = serverJs.replaceAll(
  "return brandedErrorResponse();",
  "return new Response(String(error ? (error.stack || error) : 'Unknown 500 error'), { status: 500, headers: { 'content-type': 'text/plain' } });"
);
writeFileSync(serverJsPath, serverJs);

// 3. Write the serverless function adapter (bridges Node.js → dist/server/server.js fetch())
writeFileSync(
  resolve(funcDir, "index.mjs"),
  `
// Force Vercel's @vercel/nft to trace and package dynamic imports
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-query";
import "lenis";
import "three";

import server from "./server.js";

export default async function handler(req, res) {
  try {
    // Build a standard Request from Node.js IncomingMessage
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url || "/", proto + "://" + host);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }

    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    const body = hasBody
      ? await new Promise((resolve) => {
          const chunks = [];
          req.on("data", (c) => chunks.push(c));
          req.on("end", () => resolve(Buffer.concat(chunks)));
        })
      : undefined;

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: hasBody ? "half" : undefined,
    });

    const response = await server.fetch(request, {}, {});

    // If the response is a 500 error, read the text body and throw it as an error to expose it
    if (response.status === 500) {
      const errorText = await response.text();
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end("<h1>Catastrophic SSR Error (500)</h1><pre>" + errorText + "</pre>");
      return;
    }

    // Write response back to Node.js ServerResponse
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      const text = await response.text();
      res.end(text);
    }
  } catch (error) {
    console.error("Vercel Wrapper caught exception:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Vercel Wrapper Exception: " + (error.stack || error));
  }
}
`.trimStart(),
);

// 4. Write .vc-config.json for the serverless function
writeFileSync(
  resolve(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      maxDuration: 30,
    },
    null,
    2,
  ),
);

// 5. Write the top-level routing config
writeFileSync(
  resolve(OUT, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Serve static assets directly from /assets/
        {
          src: "^/assets/(.*)$",
          headers: { "Cache-Control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        // All other routes go to the SSR function
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/ssr" },
      ],
    },
    null,
    2,
  ),
);

console.log("✓ Vercel Build Output API v3 written to .vercel/output/");
