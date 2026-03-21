function normalize(value) {
  return String(value || "").trim();
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function buildMessage(payload) {
  const formType = normalize(payload.formType) || "unknown";
  const lines = [
    "Нова заявка з сайту SOVA",
    `Форма: ${formType}`,
    `Сторінка: ${normalize(payload.page) || "-"}`,
    `Час: ${new Date().toISOString()}`,
    "",
  ];

  if (formType === "contacts") {
    lines.push(
      `Ім'я: ${normalize(payload.firstName)}`,
      `Прізвище: ${normalize(payload.lastName)}`,
      `Email: ${normalize(payload.email)}`,
      `Тема: ${normalize(payload.subject)}`,
      `Повідомлення: ${normalize(payload.message)}`
    );
  } else if (formType === "footer-subscribe") {
    lines.push(
      `Email: ${normalize(payload.email)}`
    );
  } else {
    lines.push(
      `Ім'я: ${normalize(payload.name)}`,
      `Телефон: ${normalize(payload.phone)}`,
      `Формат виробу: ${normalize(payload.format) || "-"}`,
      `Опис ідеї: ${normalize(payload.details)}`
    );
  }

  return lines.join("\n");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({
      ok: false,
      message: "Telegram is not configured (missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID).",
    });
  }

  const payload = req.body && typeof req.body === "object" ? req.body : {};
  const text = buildMessage(payload);

  const telegramPayload = {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  };

  if (threadId) {
    telegramPayload.message_thread_id = Number(threadId);
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(telegramPayload),
    });

    const telegramData = await telegramResponse.json();
    if (!telegramResponse.ok || !telegramData.ok) {
      const message = telegramData?.description || "Telegram API error.";
      return res.status(502).json({ ok: false, message });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Failed to send lead." });
  }
}
