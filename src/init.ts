import express from "express";
import * as spdy from "spdy";

// Proxy configuration:
const USE_HTTP2 = process.env?.USE_HTTP2 ?? false;
const HTTPS_CERT = process.env?.HTTPS_CERT ?? "";
const HTTPS_KEY = process.env?.HTTPS_KEY ?? "";

// todo: may need to be dynamic based on apiKey
export const API_URL = process.env?.API_URL ?? "http://localhost:3100";
const PROXY_PORT = process.env?.PORT ?? 3200;


export default () => {
  const app = express();

  if (USE_HTTP2) {
    const server = spdy.createServer( {
      key: HTTPS_KEY,
      cert: HTTPS_CERT,
    }, app);
    server.listen(PROXY_PORT, () => {
      console.log(`GrowthBook proxy running over HTTP2, port ${PROXY_PORT}`);
    });
  } else {
    app.listen(PROXY_PORT, () => {
      console.log(`GrowthBook proxy running over HTTP1.1, port ${PROXY_PORT}`);
    });
  }

  return { app };
}