import { cpSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const vercelOut = join(root, ".vercel", "output");
const distClient = join(root, "dist", "client");
const distServer = join(root, "dist", "server");
const ssrFunc = join(vercelOut, "functions", "ssr.func");

// Clean and recreate output dirs
mkdirSync(join(vercelOut, "static"), { recursive: true });
mkdirSync(join(ssrFunc, "assets"), { recursive: true });

// 1. Copy client assets → static/assets (served as static files)
cpSync(join(distClient, "assets"), join(vercelOut, "static", "assets"), { recursive: true });

// 2. Copy server assets → ssr.func/assets
cpSync(join(distServer, "assets"), join(ssrFunc, "assets"), { recursive: true });

// 3. Copy server.js → ssr.func/server.js
cpSync(join(distServer, "server.js"), join(ssrFunc, "server.js"));

// 4. Find the hashed server entry filename — not needed, server.js is the entry
// server.js is already copied in step 3

// 5. Write ssr.func/index.mjs — the Vercel Node.js function handler
writeFileSync(
  join(ssrFunc, "index.mjs"),
  `// Force Vercel's @vercel/nft to trace and package dynamic imports
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

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end(await response.text());
    }
  } catch (error) {
    console.error("SSR handler error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error: " + (error.stack || error));
  }
}
`
);

// 6. Write .vc-config.json
writeFileSync(
  join(ssrFunc, ".vc-config.json"),
  JSON.stringify({ runtime: "nodejs20.x", handler: "index.mjs", launcherType: "Nodejs", maxDuration: 30 }, null, 2)
);

// 7. Write Vercel output config.json
writeFileSync(
  join(vercelOut, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: "^/assets/(.*)$", headers: { "Cache-Control": "public, max-age=31536000, immutable" }, continue: true },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/ssr" },
      ],
    },
    null,
    2
  )
);

console.log("✓ .vercel/output assembled successfully");
