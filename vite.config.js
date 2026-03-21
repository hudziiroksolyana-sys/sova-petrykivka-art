import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import telegramLeadHandler from "./api/telegram-lead.js";
import wayforpayInvoiceHandler from "./api/wayforpay-invoice.js";
import wayforpayCallbackHandler from "./api/wayforpay-callback.js";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const apiHandlers = {
  "/api/telegram-lead": telegramLeadHandler,
  "/api/wayforpay-invoice": wayforpayInvoiceHandler,
  "/api/wayforpay-callback": wayforpayCallbackHandler,
};

function apiDevPlugin() {
  return {
    name: "api-dev-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split("?")[0] : "";
        const handler = apiHandlers[url];

        if (!handler) {
          next();
          return;
        }

        try {
          const rawBody = await readRequestBody(req);
          const body = rawBody ? JSON.parse(rawBody) : {};
          const reqLike = { method: req.method, body, headers: req.headers };
          const resLike = {
            statusCode: 200,
            setHeader(name, value) {
              res.setHeader(name, value);
              return this;
            },
            end(payload = "") {
              res.statusCode = this.statusCode || 200;
              res.end(payload);
              return this;
            },
            status(code) {
              this.statusCode = code;
              return this;
            },
            json(payload) {
              res.statusCode = this.statusCode || 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(payload));
              return this;
            },
          };

          await handler(reqLike, resLike);
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, message: "API request failed." }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
  process.env.TELEGRAM_THREAD_ID = env.TELEGRAM_THREAD_ID || process.env.TELEGRAM_THREAD_ID;
  process.env.WAYFORPAY_MERCHANT_ACCOUNT = env.WAYFORPAY_MERCHANT_ACCOUNT || process.env.WAYFORPAY_MERCHANT_ACCOUNT;
  process.env.WAYFORPAY_SECRET_KEY = env.WAYFORPAY_SECRET_KEY || process.env.WAYFORPAY_SECRET_KEY;
  process.env.WAYFORPAY_DOMAIN = env.WAYFORPAY_DOMAIN || process.env.WAYFORPAY_DOMAIN;
  process.env.WAYFORPAY_SERVICE_BASE_URL = env.WAYFORPAY_SERVICE_BASE_URL || process.env.WAYFORPAY_SERVICE_BASE_URL;

  return {
    plugins: [react(), apiDevPlugin()],
  };
});
