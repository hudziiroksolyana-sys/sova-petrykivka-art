import crypto from "node:crypto";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function normalizeProducts(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const title = String(item?.title || "").trim();
      const price = Number(item?.unitPrice || 0);
      const qty = Number(item?.qty || 0);

      if (!title || !Number.isFinite(price) || price <= 0 || !Number.isFinite(qty) || qty <= 0) {
        return null;
      }

      return {
        title,
        price: Number(price.toFixed(2)),
        qty,
      };
    })
    .filter(Boolean);
}

function buildSignatureString({ merchantAccount, merchantDomainName, orderReference, orderDate, amount, currency, products }) {
  return [
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    currency,
    ...products.map((item) => item.title),
    ...products.map((item) => item.qty),
    ...products.map((item) => item.price),
  ].join(";");
}

function signWithMd5(value, secretKey) {
  return crypto.createHmac("md5", secretKey).update(value, "utf8").digest("hex");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
  const secretKey = process.env.WAYFORPAY_SECRET_KEY;
  const merchantDomainName = process.env.WAYFORPAY_DOMAIN || req.headers?.host || "localhost";

  if (!merchantAccount || !secretKey) {
    return res.status(500).json({
      ok: false,
      message: "WayForPay is not configured (missing WAYFORPAY_MERCHANT_ACCOUNT or WAYFORPAY_SECRET_KEY).",
    });
  }

  const payload = req.body && typeof req.body === "object" ? req.body : {};
  const products = normalizeProducts(payload.items);

  if (!products.length) {
    return res.status(400).json({ ok: false, message: "Cart is empty." });
  }

  const amount = Number(products.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2));
  const currency = "UAH";
  const orderDate = Math.floor(Date.now() / 1000);
  const orderReference = `sova-${orderDate}-${crypto.randomBytes(4).toString("hex")}`;
  const language = String(payload.language || "UA").toUpperCase() === "EN" ? "EN" : "UA";
  const baseUrl = process.env.WAYFORPAY_SERVICE_BASE_URL || `https://${merchantDomainName}`;
  const signatureSeed = buildSignatureString({
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    currency,
    products,
  });

  const requestBody = {
    transactionType: "CREATE_INVOICE",
    merchantAccount,
    merchantAuthType: "SimpleSignature",
    merchantDomainName,
    merchantSignature: signWithMd5(signatureSeed, secretKey),
    apiVersion: 1,
    language,
    serviceUrl: `${baseUrl}/api/wayforpay-callback`,
    orderReference,
    orderDate,
    amount,
    currency,
    orderTimeout: 86400,
    productName: products.map((item) => item.title),
    productPrice: products.map((item) => item.price),
    productCount: products.map((item) => item.qty),
  };

  try {
    const response = await fetch("https://api.wayforpay.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.reasonCode !== 1100 && data?.reasonCode !== "1100") {
      return res.status(502).json({
        ok: false,
        message: data?.reason || data?.message || "Failed to create WayForPay invoice.",
        details: data,
      });
    }

    return res.status(200).json({
      ok: true,
      invoiceUrl: data.invoiceUrl,
      orderReference,
    });
  } catch {
    return res.status(500).json({ ok: false, message: "Failed to connect to WayForPay." });
  }
}
