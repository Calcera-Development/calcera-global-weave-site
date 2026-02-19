/// <reference lib="deno.ns" />
import { serve } from "std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Environment variables - trim quotes and handle fallbacks
const RESEND_API_KEY = (Deno.env.get("RESEND_API_KEY") || Deno.env.get("VITE_RESEND_API_KEY"))?.trim().replace(/^["']|["']$/g, "");

if (!RESEND_API_KEY) console.error("CRITICAL: RESEND_API_KEY is missing");

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

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");
const WHATSAPP_TO_NUMBER = Deno.env.get("WHATSAPP_TO_NUMBER");

const handler = async (req: Request): Promise<Response> => {
  console.log(`Email function invoked: ${req.method}`);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set.");
    return new Response(
      JSON.stringify({ error: "Email service is not configured. Please set RESEND_API_KEY." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const body = await req.json();
    const { name, contact, email, message } = body;

    if (!name || !contact || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, contact, email, and message are all required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // 1. Send Email to Team
    const teamEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Calcera Website <hello@calcera.global>",
        to: ["hello@calcera.global"],
        subject: `[Internal Lead] ${name} - Consultation Request`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fbfc; border: 1px solid #e1e8ed; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em;">New Business Inquiry</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">A new consultation request from the website</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff;">
              <div style="margin-bottom: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                  <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 4px;">Lead Name</span>
                  <span style="font-size: 16px; color: #1e293b; font-weight: 600;">${escapeHtml(name)}</span>
                </div>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 10px; border-left: 4px solid #10b981;">
                  <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 4px;">Lead Email</span>
                  <span style="font-size: 16px; color: #1e293b; font-weight: 600;">${escapeHtml(email)}</span>
                </div>
              </div>

              <div style="background-color: #f8fafc; padding: 15px; border-radius: 10px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
                <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 4px;">Contact Info</span>
                <span style="font-size: 16px; color: #1e293b; font-weight: 600;">${escapeHtml(contact)}</span>
              </div>
              
              <div style="margin-top: 30px;">
                <h3 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 12px; font-weight: 600;">Message Summary</h3>
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; line-height: 1.6; color: #334155; white-space: pre-wrap; font-size: 15px;">${escapeHtml(message)}</div>
              </div>

              <div style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 25px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; transition: background-color 0.2s;">Reply to Lead</a>
              </div>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">Automated notification from <strong>Calcera Digital Engine</strong></p>
            </div>
          </div>
        `,
      }),
    });

    // 2. Send Confirmation Email to Customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Calcera Global <hello@calcera.global>",
        to: [email],
        subject: "We've Received Your Inquiry - Calcera Global",
        html: `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #1e293b; line-height: 1.6;">
            <!-- Header Section -->
            <div style="padding: 40px 20px; text-align: center; background: linear-gradient(to bottom, #f8fafc, #ffffff);">
              <div style="margin-bottom: 24px;">
                <h1 style="color: #2563eb; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.04em;">CALCERA GLOBAL</h1>
                <div style="height: 4px; width: 48px; background: #2563eb; margin: 16px auto 0; border-radius: 2px;"></div>
              </div>
              <h2 style="font-size: 22px; color: #0f172a; margin: 0; font-weight: 700;">Inquiry Received Successfully</h2>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 0 40px 40px;">
              <p style="font-size: 16px; margin-bottom: 24px;">Dear ${escapeHtml(name)},</p>
              
              <p style="font-size: 16px; margin-bottom: 24px; color: #475569;">
                Thank you for reaching out to **Calcera Global**. We've successfully received your inquiry and are excited to learn more about your vision.
              </p>

              <div style="background-color: #f0f9ff; border-radius: 12px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #0284c7;">
                <p style="margin: 0; color: #0369a1; font-weight: 600; font-size: 15px;">
                  Next Steps:
                </p>
                <p style="margin: 8px 0 0; color: #0c4a6e; font-size: 15px;">
                  Our strategy team is reviewing your requirements. You can expect a personalized response within <span style="font-weight: 700;">24-48 business hours</span> to discuss your project in detail.
                </p>
              </div>

              <div style="margin-bottom: 40px;">
                <h3 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 16px; font-weight: 700; letter-spacing: 0.05em;">Quick Resources</h3>
                <div style="display: flex; gap: 12px;">
                  <a href="https://calcera.global#work" style="flex: 1; text-align: center; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; text-decoration: none; color: #1e293b; font-weight: 600; font-size: 14px; background-color: #f8fafc;">View Portfolio</a>
                  <a href="https://calcera.global#services" style="flex: 1; text-align: center; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; text-decoration: none; color: #1e293b; font-weight: 600; font-size: 14px; background-color: #f8fafc;">Our Services</a>
                </div>
              </div>

              <p style="margin-bottom: 32px; font-size: 16px;">
                We look forward to the possibility of collaborating on something extraordinary.
              </p>

              <!-- Footer Signature -->
              <div style="border-top: 1px solid #f1f5f9; padding-top: 32px;">
                <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 16px;">The Calcera Global Team</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #94a3b8;">Strategic Solutions | Premium Implementation</p>
                
                <div style="margin-top: 24px; display: flex; gap: 20px; font-size: 13px;">
                  <a href="https://calcera.global" style="color: #2563eb; text-decoration: none; font-weight: 600;">Website</a>
                  <span style="color: #cbd5e1;">&bull;</span>
                  <a href="mailto:hello@calcera.global" style="color: #2563eb; text-decoration: none; font-weight: 600;">Connect with Us</a>
                </div>
              </div>
            </div>

            <!-- Bottom Bar -->
            <div style="background-color: #0f172a; padding: 32px 20px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; letter-spacing: 0.025em; text-transform: uppercase;">
                &copy; 2026 Calcera Global. All rights reserved.
              </p>
            </div>
          </div>
        `,
      }),
    });

    const teamResult = await teamEmailResponse.json();
    const customerResult = await customerEmailResponse.json();

    if (!teamEmailResponse.ok || !customerEmailResponse.ok) {
      console.error("Resend API error:", { teamResult, customerResult });
      return new Response(
        JSON.stringify({
          error: "Failed to send one or more emails.",
          team: teamResult.message,
          customer: customerResult.message
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // 3. Send WhatsApp Notification to Team (Twilio)
    let whatsAppResult = null;
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER && WHATSAPP_TO_NUMBER) {
      try {
        const messageBody = `New Inquiry from ${name}\n\nEmail: ${email}\nContact: ${contact}\n\nMessage:\n${message}`;

        // Encode credentials for Basic Auth
        const basicAuth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

        const params = new URLSearchParams();
        params.append("To", `whatsapp:${WHATSAPP_TO_NUMBER}`);
        params.append("From", `whatsapp:${TWILIO_PHONE_NUMBER}`);
        params.append("Body", messageBody);

        const twilioResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        });

        whatsAppResult = await twilioResponse.json();
        if (!twilioResponse.ok) {
          console.error("Twilio WhatsApp error:", whatsAppResult);
        } else {
          console.log("WhatsApp notification sent successfully.");
        }
      } catch (waError) {
        console.error("Failed to send WhatsApp notification:", waError);
      }
    } else {
      console.warn("Twilio credentials missing, skipping WhatsApp notification.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        teamId: teamResult.id,
        customerId: customerResult.id,
        whatsApp: whatsAppResult
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Unhandled error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
