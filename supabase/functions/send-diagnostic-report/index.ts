import { serve } from "std/http/server.ts";
import { createClient } from "supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Environment variables - trim quotes and handle fallbacks
const RESEND_API_KEY = (Deno.env.get("RESEND_API_KEY") || Deno.env.get("VITE_RESEND_API_KEY"))?.trim()?.replace(/^["']|["']$/g, "") || "";
const SUPABASE_URL = (Deno.env.get("SUPABASE_URL") || Deno.env.get("VITE_SUPABASE_URL"))?.trim();
const SUPABASE_SERVICE_ROLE_KEY = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY"))?.trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RESEND_API_KEY) {
  console.error("Initialization failed: Missing credentials");
  // Pre-handler check can't return Response easily without being inside serve, 
  // but the server will handle the crash or missing vars.
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

function generateReportHTML(report: any, companyName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; border-radius: 12px; }
    .header h1 { margin: 0; font-size: 32px; }
    .header p { margin: 10px 0 0; font-size: 14px; opacity: 0.9; }
    .section { margin: 30px 0; padding: 25px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 8px; }
    .section h2 { color: #1e40af; margin-top: 0; font-size: 22px; }
    .section h3 { color: #334155; font-size: 18px; margin-top: 20px; }
    .tier-badge { display: inline-block; padding: 8px 16px; background: #2563eb; color: white; border-radius: 20px; font-weight: bold; margin: 10px 0; }
    .metric { display: flex; justify-content: space-between; padding: 12px; background: white; margin: 8px 0; border-radius: 6px; border: 1px solid #e2e8f0; }
    .metric-label { font-weight: 600; color: #475569; }
    .metric-value { color: #2563eb; font-weight: bold; }
    ul { padding-left: 20px; }
    li { margin: 8px 0; }
    .architecture { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px solid #e2e8f0; }
    .footer { text-align: center; margin-top: 50px; padding: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 14px; }
    .cta { text-align: center; margin: 40px 0; padding: 30px; background: #f0f7ff; border-radius: 12px; }
    .cta a { display: inline-block; padding: 14px 32px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 Enterprise Diagnostic Report</h1>
    <p>Prepared for ${escapeHtml(companyName)} by Calcera Global</p>
  </div>

  <div class="section">
    <h2>📊 Operational Diagnosis</h2>
    <p><strong>Executive Summary:</strong> ${escapeHtml(report.operationalDiagnosis?.executiveSummary || '')}</p>
    
    <h3>Root Causes Identified:</h3>
    <ul>
      ${(report.operationalDiagnosis?.rootCauses || []).map((cause: string) => `<li>${escapeHtml(cause)}</li>`).join('')}
    </ul>
    
    <p><strong>Business Impact:</strong> ${escapeHtml(report.operationalDiagnosis?.businessImpact || '')}</p>
  </div>

  <div class="section">
    <h2>🏗️ Recommended System Architecture</h2>
    
    <div class="architecture">
      <h3>Frontend Layer</h3>
      <p>${escapeHtml(report.recommendedArchitecture?.frontend || '')}</p>
    </div>
    
    <div class="architecture">
      <h3>Backend Layer</h3>
      <p>${escapeHtml(report.recommendedArchitecture?.backend || '')}</p>
    </div>
    
    <div class="architecture">
      <h3>Database & Data</h3>
      <p>${escapeHtml(report.recommendedArchitecture?.database || '')}</p>
    </div>
    
    <div class="architecture">
      <h3>Integrations</h3>
      <p>${escapeHtml(report.recommendedArchitecture?.integrations || '')}</p>
    </div>
    
    ${report.recommendedArchitecture?.aiComponents ? `
    <div class="architecture">
      <h3>AI/ML Components</h3>
      <p>${escapeHtml(report.recommendedArchitecture.aiComponents)}</p>
    </div>
    ` : ''}
    
    <div class="architecture">
      <h3>Infrastructure & DevOps</h3>
      <p>${escapeHtml(report.recommendedArchitecture?.infrastructure || '')}</p>
    </div>
  </div>

  <div class="section">
    <h2>⚙️ Complexity Classification</h2>
    <span class="tier-badge">${report.complexityClassification?.tier || 'T2'} - ${escapeHtml(report.complexityClassification?.label || 'Medium')}</span>
    <p>${escapeHtml(report.complexityClassification?.rationale || '')}</p>
  </div>

  <div class="section">
    <h2>📅 Timeline Estimate</h2>
    <div class="metric">
      <span class="metric-label">Estimated Duration:</span>
      <span class="metric-value">${report.timelineEstimate?.range || 'TBD'}</span>
    </div>
    ${report.timelineEstimate?.phaseBreakdown ? `
      <h3>Phase Breakdown:</h3>
      <ul>
        <li>Discovery: ${report.timelineEstimate.phaseBreakdown.discovery}</li>
        <li>Design: ${report.timelineEstimate.phaseBreakdown.design}</li>
        <li>Development: ${report.timelineEstimate.phaseBreakdown.development}</li>
        <li>Testing: ${report.timelineEstimate.phaseBreakdown.testing}</li>
        <li>Deployment: ${report.timelineEstimate.phaseBreakdown.deployment}</li>
      </ul>
    ` : ''}
  </div>

  <div class="section">
    <h2>💰 Financial Impact Analysis</h2>
    <div class="metric">
      <span class="metric-label">Investment Range:</span>
      <span class="metric-value">${report.financialImpact?.budgetBand || 'TBD'}</span>
    </div>
    
    <h3>ROI Projections:</h3>
    <div class="metric">
      <span class="metric-label">Payback Period:</span>
      <span class="metric-value">${report.financialImpact?.roiMetrics?.paybackPeriod || 'TBD'}</span>
    </div>
    <div class="metric">
      <span class="metric-label">Year 1 ROI:</span>
      <span class="metric-value">${report.financialImpact?.roiMetrics?.year1ROI || 0}%</span>
    </div>
    <div class="metric">
      <span class="metric-label">Year 3 ROI:</span>
      <span class="metric-value">${report.financialImpact?.roiMetrics?.year3ROI || 0}%</span>
    </div>
    <div class="metric">
      <span class="metric-label">Year 5 ROI:</span>
      <span class="metric-value">${report.financialImpact?.roiMetrics?.year5ROI || 0}%</span>
    </div>
    
    <div class="metric">
      <span class="metric-label">Investment Recommendation:</span>
      <span class="metric-value">${(report.financialImpact?.recommendation || 'moderate').toUpperCase()}</span>
    </div>
  </div>

  <div class="section">
    <h2>🎯 Strategic Recommendation</h2>
    <p><strong>Proceed with project:</strong> ${report.strategicRecommendation?.shouldProceed ? 'Yes ✅' : 'Requires Further Analysis'}</p>
    <p><strong>Phased approach recommended:</strong> ${report.strategicRecommendation?.phasedApproach ? 'Yes' : 'No'}</p>
    
    <h3>Key Success Factors:</h3>
    <ul>
      ${(report.strategicRecommendation?.keySuccessFactors || []).map((factor: string) => `<li>${escapeHtml(factor)}</li>`).join('')}
    </ul>
    
    ${(report.strategicRecommendation?.riskFactors || []).length > 0 ? `
      <h3>Risk Factors to Consider:</h3>
      <ul>
        ${report.strategicRecommendation.riskFactors.map((risk: string) => `<li>${escapeHtml(risk)}</li>`).join('')}
      </ul>
    ` : ''}
    
    <h3>Recommended Next Steps:</h3>
    <ul>
      ${(report.strategicRecommendation?.nextSteps || []).map((step: string) => `<li>${escapeHtml(step)}</li>`).join('')}
    </ul>
  </div>

  <div class="cta">
    <h2>Ready to Transform Your Operations?</h2>
    <p>Let's discuss how Calcera Global can bring this vision to life.</p>
    <a href="https://calcera.global/contact">Schedule a Strategic Consultation</a>
  </div>

  <div class="footer">
    <p><strong>Calcera Global</strong> | Enterprise Systems Architecture & Integration</p>
    <p>This report is confidential and prepared specifically for ${escapeHtml(companyName)}</p>
    <p><a href="https://calcera.global" style="color: #2563eb;">www.calcera.global</a> | hello@calcera.global</p>
  </div>
</body>
</html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { reportId } = await req.json();
    console.log(`Email request for reportId: ${reportId}`);

    if (!reportId) {
      console.error("Missing reportId in request body");
      return new Response(
        JSON.stringify({ error: "Missing reportId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch report and lead data
    console.log("Fetching report data from database...");
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: reportData, error: reportError } = await supabase
      .from("diagnostic_reports")
      .select(`
        id,
        report_json,
        complexity_tier,
        leads (
          email,
          company_name
        )
      `)
      .eq("id", reportId)
      .single();

    if (reportError || !reportData) {
      console.error(`Database fetch error for reportId ${reportId}:`, JSON.stringify(reportError));
      throw new Error(`Report not found (${reportId}): ${JSON.stringify(reportError || "Unknown Database Error")}`);
    }

    const lead = reportData.leads as any;
    console.log(`Sending report for ${lead.company_name} to ${lead.email}`);
    const reportHTML = generateReportHTML(reportData.report_json, lead.company_name);

    // Send to client
    console.log(`[RESEND] Attempting client email to: ${lead.email}`);
    const clientEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Calcera Global <hello@calcera.global>",
        reply_to: "hello@calcera.global",
        to: [lead.email],
        subject: `Your Enterprise Diagnostic Report - ${lead.company_name}`,
        html: reportHTML,
      }),
    });

    const clientResult = await clientEmailResponse.json();
    console.log("Client Resend Status:", clientEmailResponse.status);
    console.log("Client Resend Result:", JSON.stringify(clientResult));

    // Send to internal team
    console.log("[RESEND] Attempting team email to: dev@calcera.global");
    const teamEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Calcera AI <hello@calcera.global>",
        reply_to: "hello@calcera.global",
        to: ["dev@calcera.global"],
        subject: `[LEAD] New Diagnostic: ${lead.company_name}`,
        html: `
          <h3>New AI Diagnostic Report Generated</h3>
          <p><strong>Company:</strong> ${lead.company_name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <hr>
          ${reportHTML}
        `,
      }),
    });

    const teamResult = await teamEmailResponse.json();
    console.log("Team Resend Status:", teamEmailResponse.status);
    console.log("Team Resend Result:", JSON.stringify(teamResult));

    const isSandboxError = clientEmailResponse.status === 403 || teamEmailResponse.status === 403;

    if (isSandboxError) {
      console.log("RESEND DEBUG: Sandbox/Permission error detected. Waiting 2s to clear rate limits...");
      await delay(2000);

      // Try sending to the ONLY verified address
      const fallbackResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Calcera AI <hello@calcera.global>",
          reply_to: "hello@calcera.global",
          to: ["dev@calcera.global"],
          subject: `[FAILOVER] Diagnostic Report: ${lead.company_name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #2563eb;">Diagnostic Failover Mode</h2>
              <p>Primary delivery to <strong>${lead.email}</strong> failed with a permission/sandbox error.</p>
              <p>The report has been delivered here for manual forwarding or review.</p>
              <hr style="margin: 20px 0;">
              ${reportHTML}
            </div>
          `,
        }),
      });

      const fallbackResult = await fallbackResponse.json();
      console.log(`[RESEND] Fallback status: ${fallbackResponse.status}`);
      console.log(`[RESEND] Fallback result: ${JSON.stringify(fallbackResult)}`);

      if (fallbackResponse.ok) {
        console.log("Fallback successful! Updating database status...");
        await supabase
          .from("diagnostic_reports")
          .update({
            status: 'sent',
            email_sent_at: new Date().toISOString(),
          })
          .eq("id", reportId);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Report delivered via failover to dev@calcera.global",
            isSandbox: true,
            emailId: fallbackResult.id || "success"
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      } else {
        console.error("[RESEND] Fallback CRITICAL FAILURE:", JSON.stringify(fallbackResult));
        throw new Error(`Fallback failed: ${JSON.stringify(fallbackResult)}`);
      }
    }

    if (!clientEmailResponse.ok || !teamEmailResponse.ok) {
      console.error("Email sending failed");
      const clientErr = !clientEmailResponse.ok ? `Client Error (${clientEmailResponse.status}): ${JSON.stringify(clientResult)}` : "Client OK";
      const teamErr = !teamEmailResponse.ok ? `Team Error (${teamEmailResponse.status}): ${JSON.stringify(teamResult)}` : "Team OK";
      throw new Error(`Email Service Failure: ${clientErr} | ${teamErr}`);
    }

    // Update report status
    console.log("Updating report status in database...");
    await supabase
      .from("diagnostic_reports")
      .update({
        status: 'sent',
        email_sent_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    return new Response(
      JSON.stringify({
        success: true,
        clientEmailId: clientResult.id,
        teamEmailId: teamResult.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-diagnostic-report function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
        details: error.toString() + (error.stack ? "\n" + error.stack : "")
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
