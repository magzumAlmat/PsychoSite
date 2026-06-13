// Lead intake endpoint → forwards the lead to a Telegram bot.
// Mirrors the integration used on ZhandosMedSecondSite (Detoxlife):
// Telegram sendMessage with HTML formatting, token/chat id from env with fallback.

// Secrets come from env only (.env.local locally, pm2/server env in production).
// Never hardcode the bot token — the repo is shared.
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Escape user input so it can't break Telegram HTML parse_mode.
function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, phone, message = "", source = "site", details = "" } = req.body || {};

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ ok: false, error: "Invalid name" });
  }
  if (!phone || String(phone).replace(/\D/g, "").length < 10) {
    return res.status(400).json({ ok: false, error: "Invalid phone" });
  }

  // Build the Telegram message (HTML).
  let text = `🧠 <b>Новая заявка с сайта mental-clinic.kz</b>\n\n`;
  text += `👤 <b>Имя:</b> ${esc(name)}\n`;
  text += `📞 <b>Телефон:</b> <code>${esc(phone)}</code>\n`;
  if (source) text += `🏷️ <b>Форма:</b> <code>${esc(source)}</code>\n`;
  if (message) text += `\n📝 <b>Сообщение:</b>\n${esc(message)}\n`;
  if (details) text += `\n📋 <b>Детали:</b>\n${esc(details)}\n`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      // eslint-disable-next-line no-console
      console.error("[lead] Telegram error:", errText);
      return res.status(502).json({ ok: false, error: "Telegram delivery failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] error:", err);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
}
