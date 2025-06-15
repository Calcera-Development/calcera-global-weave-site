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

    // Send from your verified sender
    const FROM_EMAIL = "hello@calcera.global"; // must match your Mailjet-verified sender
    const TO_EMAIL = "hello@calcera.global";

    const data = {
      Messages: [
        {
          From: {
            Email: FROM_EMAIL,
            Name: "Calcera Website"
          },
          To: [
            {
              Email: TO_EMAIL,
              Name: "Calcera"
            }
          ],
          ReplyTo: {
            Email: email,
            Name: name
          },
          Subject: "New Consultation Request from Calcera Website",
          HTMLPart: `
            <div>
              <p><b>Name:</b> ${name}</p>
              <p><b>Contact:</b> ${contact}</p>
              <p><b>User Email:</b> ${email}</p>
              <p><b>Summary:</b><br/>${(typeof message === "string") ? message.replace(/\n/g, "<br/>") : ""}</p>
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
      // keep as object with text fallback
      responseJson = { raw: responseText };
    }

    // Log the status and entire response payload
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
