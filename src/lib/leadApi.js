const DEFAULT_API_URL = "/api/telegram-lead";
const FALLBACK_API_URL = "https://sova-petrykivka-art.vercel.app/api/telegram-lead";

function resolveApiUrl() {
  const customApiUrl = (import.meta.env.VITE_LEADS_API_URL || "").trim();
  if (customApiUrl) return customApiUrl;

  if (typeof window !== "undefined") {
    const { origin, hostname } = window.location;
    if (hostname === "sova-petrykivka-art.vercel.app" || hostname === "localhost" || hostname === "127.0.0.1") {
      return `${origin}${DEFAULT_API_URL}`;
    }
  }

  return FALLBACK_API_URL;
}

export async function sendLead(payload) {
  const apiUrl = resolveApiUrl();
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || "Не вдалося надіслати форму.");
  }

  return data;
}
