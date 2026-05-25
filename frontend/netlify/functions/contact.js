const { Resend } = require("resend");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const fallbackRecipient = "abhinay.gautam0072@gmail.com";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL || fallbackRecipient;

    if (!resendApiKey || !fromEmail) {
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: "Email service is not configured yet.",
        }),
      };
    }

    const payload = JSON.parse(event.body || "{}");
    const name = payload.name?.trim();
    const phone = payload.phone?.trim();
    const email = payload.email?.trim();
    const subject = payload.subject?.trim() || "Website Contact";
    const message = payload.message?.trim();

    if (!name || !phone || !message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: "Name, phone, and message are required.",
        }),
      };
    }

    const resend = new Resend(resendApiKey);
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email || "Not provided");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email || undefined,
      subject: `${subject} - ${name}`,
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
            <p style="margin: 0 0 14px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <div style="margin-top: 18px; padding: 16px; border-radius: 14px; background: #ecfdf5; border: 1px solid #a7f3d0;">
              <p style="margin: 0 0 8px; font-weight: 700;">Message</p>
              <p style="margin: 0; line-height: 1.7;">${safeMessage}</p>
            </div>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: "Unable to send message right now.",
      }),
    };
  }
};
