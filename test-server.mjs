import handler from "./.vercel/output/functions/ssr.func/index.mjs";
import http from "node:http";

const server = http.createServer((req, res) => {
  handler(req, res).catch(err => {
    console.error("Handler error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});

server.listen(3000, () => console.log("Test server listening on port 3000"));
