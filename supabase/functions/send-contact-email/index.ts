
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAILJET_API_KEY = Deno.env.get("MAILJET_API_KEY");
const MAILJET_API_SECRET = Deno.env.get("MAILJET_API_SECRET");

// Mailjet API endpoint for sending emails (v3.1)
const MAILJET_SEND_URL = "https://api.mailjet.com/v3.1/send";

function isValidEmail(email: string): boolean {
  // Basic RFC 5322 email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!MAILJET_API_KEY || !MAILJET_API_SECRET) {
    return new Response(
      JSON.stringify({ error: "Mailjet API keys not set" }),
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

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fixed recipient
    const TO_EMAIL = "hello@calcera.global";

    // You should verify sender emails in Mailjet for highest deliverability.
    // However, Mailjet supports sending on behalf of users as long as sender domain is validated.

    const data = {
      Messages:[
        {
          From: {
            Email: email,
            Name: name
          },
          To: [{
            Email: TO_EMAIL,
            Name: "Calcera"
          }],
          Subject: "New Consultation Request from Calcera Website",
          HTMLPart: `
            <div>
              <p><b>Name:</b> ${name}</p>
              <p><b>Contact:</b> ${contact}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Summary:</b><br/>${(typeof message === "string") ? message.replace(/\n/g, "<br/>") : ""}</p>
            </div>
          `
        }
      ]
    };

    // Use basic auth with API key and secret
    const auth = "Basic " + btoa(`${MAILJET_API_KEY}:${MAILJET_API_SECRET}`);

    const mailjetResponse = await fetch(MAILJET_SEND_URL, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    const responseJson = await mailjetResponse.json();

    if (!mailjetResponse.ok || responseJson.Messages?.[0]?.Status !== "success") {
      const errorDetail = responseJson.Messages?.[0]?.Errors?.[0]?.ErrorMessage || responseJson;
      return new Response(
        JSON.stringify({ error: errorDetail || "Failed to send email" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message ?? "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
