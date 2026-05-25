const { Resend } = require("resend");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const fallbackRecipient = "abhinay.gautam0072@gmail.com";

const setCorsHeaders = (res) => {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const normalizeBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch (error) {
      return {};
    }
  }

  return body;
};

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL || fallbackRecipient;

    if (!resendApiKey || !fromEmail) {
      return res.status(500).json({
        error: "Email service is not configured yet.",
      });
    }

    const { name, phone, email, subject, message } = normalizeBody(req.body);

    const trimmedName = name?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedEmail = email?.trim();
    const trimmedSubject = subject?.trim() || "Website Contact";
    const trimmedMessage = message?.trim();

    if (!trimmedName || !trimmedPhone || !trimmedMessage) {
      return res.status(400).json({
        error: "Name, phone, and message are required.",
      });
    }

    const resend = new Resend(resendApiKey);
    const safeName = escapeHtml(trimmedName);
    const safePhone = escapeHtml(trimmedPhone);
    const safeEmail = escapeHtml(trimmedEmail || "Not provided");
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: trimmedEmail || undefined,
      subject: `${trimmedSubject} - ${trimmedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background: #f8fafc; color: #0f172a;">
          <div style="background: linear-gradient(135deg, #065f46, #0f766e); color: white; border-radius: 18px; padding: 24px 28px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.9;">Rajrani Hospital</p>
            <h1 style="margin: 0; font-size: 24px; line-height: 1.2;">New Contact Form Message</h1>
          </div>
          <div style="background: white; border: 1px solid #d1fae5; border-radius: 18px; padding: 22px 24px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);">
            <p style="margin: 0 0 14px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 0 0 14px;"><strong>Phone:</strong> ${safePhone}</p>
            <p style="margin: 0 0 14px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 0 0 14px;"><strong>Subject:</strong> ${escapeHtml(trimmedSubject)}</p>
            <div style="margin-top: 18px; padding: 16px; border-radius: 14px; background: #ecfdf5; border: 1px solid #a7f3d0;">
              <p style="margin: 0 0 8px; font-weight: 700;">Message</p>
              <p style="margin: 0; line-height: 1.7;">${safeMessage}</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Unable to send message right now.",
    });
  }
};
