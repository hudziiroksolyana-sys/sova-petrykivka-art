const DEFAULT_INVOICE_API_URL = "/api/wayforpay-invoice";
const FALLBACK_INVOICE_API_URL = "https://sova-petrykivka-art.vercel.app/api/wayforpay-invoice";

function resolveInvoiceApiUrl() {
  const customApiUrl = (import.meta.env.VITE_WAYFORPAY_API_URL || "").trim();
  if (customApiUrl) return customApiUrl;

  if (typeof window !== "undefined") {
    const { origin, hostname } = window.location;
    if (hostname === "sova-petrykivka-art.vercel.app" || hostname === "localhost" || hostname === "127.0.0.1") {
      return `${origin}${DEFAULT_INVOICE_API_URL}`;
    }
  }

  return FALLBACK_INVOICE_API_URL;
}

export async function createWayForPayInvoice(payload) {
  const response = await fetch(resolveInvoiceApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false || !data.invoiceUrl) {
    throw new Error(data.message || "Не вдалося створити платіж.");
  }

  return data;
}
