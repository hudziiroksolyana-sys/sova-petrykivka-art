const DEFAULT_API_URL = "/api/telegram-lead";

export async function sendLead(payload) {
  const apiUrl = (import.meta.env.VITE_LEADS_API_URL || DEFAULT_API_URL).trim();
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
