import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAILJET_API_KEY = Deno.env.get("MAILJET_API_KEY");
const MAILJET_API_SECRET = Deno.env.get("MAILJET_API_SECRET");

const MAILJET_SEND_URL = "https://api.mailjet.com/v3.1/send";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting by IP
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  if (!MAILJET_API_KEY || !MAILJET_API_SECRET) {
    console.error("Mailjet API keys not set.");
    return new Response(
      JSON.stringify({ error: "Email service is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const body = await req.json();
    const { name, contact, email, message } = body;

    if (!name || !contact || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and limit input lengths
    if (typeof name !== "string" || name.length > 200 ||
        typeof contact !== "string" || contact.length > 50 ||
        typeof email !== "string" || email.length > 255 ||
        typeof message !== "string" || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Invalid input." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Use a verified sender address; put user email in ReplyTo only
    const FROM_EMAIL = "hello@calcera.global";
    const FROM_NAME = "Calcera Website";
    const TO_EMAIL = "hello@calcera.global";
    const TO_NAME = "Calcera";

    // Escape all user inputs for HTML
    const safeName = escapeHtml(name.trim());
    const safeContact = escapeHtml(contact.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    const data = {
      Messages: [
        {
          From: {
            Email: FROM_EMAIL,
            Name: FROM_NAME
          },
          To: [
            {
              Email: TO_EMAIL,
              Name: TO_NAME
            }
          ],
          ReplyTo: {
            Email: email.trim(),
            Name: name.trim()
          },
          Subject: "New Consultation Request from Calcera Website",
          HTMLPart: `
            <div style="font-family:Segoe UI, Arial, sans-serif; color:#222; font-size:1rem; line-height:1.6;">
              <p>Dear Calcera Global Team,</p>
              <p>
                You have received a new consultation request via the website contact form. Please find the details below:
              </p>
              <table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="font-weight:bold;">Name:</td>
                  <td>${safeName}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Contact:</td>
                  <td>${safeContact}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Email:</td>
                  <td>${safeEmail}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold; vertical-align:top;">Summary:</td>
                  <td>${safeMessage}</td>
                </tr>
              </table>
              <br/>
              <p>
                Kindly reach out to the client as soon as possible to discuss their project needs.<br>
                <br>
                Best regards,<br>
                The Calcera Global Website<br>
                <small style="color:#888;">This message was sent automatically from the Calcera Global contact form.</small>
              </p>
            </div>
          `
        }
      ]
    };

    const auth = "Basic " + btoa(`${MAILJET_API_KEY}:${MAILJET_API_SECRET}`);

    const mailjetResponse = await fetch(MAILJET_SEND_URL, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    let responseText = await mailjetResponse.text();
    let responseJson: Record<string, any> = {};
    try {
      responseJson = JSON.parse(responseText);
    } catch (_e) {
      responseJson = { raw: responseText };
    }

    if (!mailjetResponse.ok || responseJson['Messages']?.[0]?.Status !== "success") {
      console.error("Mailjet error:", responseJson['Messages']?.[0]?.Errors?.[0]?.ErrorMessage || responseJson);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Unhandled error in contact email function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
