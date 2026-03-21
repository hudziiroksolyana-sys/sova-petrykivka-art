import crypto from "node:crypto";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function signWithMd5(value, secretKey) {
  return crypto.createHmac("md5", secretKey).update(value, "utf8").digest("hex");
}

function buildResponseSignature(orderReference, status, time, secretKey) {
  return signWithMd5([orderReference, status, time].join(";"), secretKey);
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const secretKey = process.env.WAYFORPAY_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ ok: false, message: "WayForPay is not configured." });
  }

  const payload = req.body && typeof req.body === "object" ? req.body : {};
  const orderReference = String(payload.orderReference || "").trim();
  const transactionStatus = String(payload.transactionStatus || "").trim();

  if (!orderReference || !transactionStatus) {
    return res.status(400).json({ ok: false, message: "Invalid callback payload." });
  }

  const time = Math.floor(Date.now() / 1000);

  return res.status(200).json({
    orderReference,
    status: "accept",
    time,
    signature: buildResponseSignature(orderReference, "accept", time, secretKey),
  });
}
