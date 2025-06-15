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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!MAILJET_API_KEY || !MAILJET_API_SECRET) {
    console.error("Mailjet API keys not set.");
    return new Response(
      JSON.stringify({ error: "Mailjet API keys not set" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const body = await req.json();
    const { name, contact, email, message } = body;

    if (!name || !contact || !email || !message) {
      console.error("Missing required fields:", { name, contact, email, message });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEmail(email)) {
      console.error("Invalid email address:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Addresses as per your instruction:
    const FROM_EMAIL = email; // User's provided email
    const FROM_NAME = name;   // User's provided name
    const TO_EMAIL = "hello@calcera.global";
    const TO_NAME = "Calcera";

    // --- PROFESSIONAL EMAIL TEMPLATE STARTS HERE ---
    const data = {
      Messages: [
        {
          From: {
            Email: FROM_EMAIL, // User's email: MAY CAUSE SPOOF/SPAM
            Name: FROM_NAME
          },
          To: [
            {
              Email: TO_EMAIL,
              Name: TO_NAME
            }
          ],
          ReplyTo: {
            Email: email,
            Name: name
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
                  <td>${name}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Contact:</td>
                  <td>${contact}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;">Email:</td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold; vertical-align:top;">Summary:</td>
                  <td>${typeof message === "string" ? message.replace(/\n/g, "<br/>") : ""}</td>
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

    console.log("Attempting to send email via Mailjet. Payload:", JSON.stringify(data, null, 2));

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
    let responseJson = {};
    try {
      responseJson = JSON.parse(responseText);
    } catch (e) {
      responseJson = { raw: responseText };
    }

    console.log("Mailjet response status:", mailjetResponse.status);
    console.log("Mailjet response JSON/text:", responseJson);

    if (!mailjetResponse.ok || responseJson['Messages']?.[0]?.Status !== "success") {
      const errorDetail = responseJson['Messages']?.[0]?.Errors?.[0]?.ErrorMessage || responseJson;
      console.error("Mailjet returned an error:", errorDetail);
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
    console.error("Unhandled error in contact email function:", error);
    return new Response(
      JSON.stringify({ error: error.message ?? "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
