import app from "./app.js";

Deno.serve({ port: 8001, hostname: "0.0.0.0" }, app.fetch);