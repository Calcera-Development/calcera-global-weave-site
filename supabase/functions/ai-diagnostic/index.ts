import { serve } from "std/http/server.ts";
import { createClient } from "supabase-js";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Environment variables - trim quotes and handle fallbacks
const AI_API_KEY = (Deno.env.get("AI_API_KEY") || Deno.env.get("OPENAI_API_KEY") || Deno.env.get("VITE_OPENAI_API_KEY"))?.trim()?.replace(/^["']|["']$/g, "") || "";
const AI_BASE_URL = (Deno.env.get("AI_BASE_URL") || "https://api.deepseek.com/v1").trim();
const AI_MODEL = Deno.env.get("AI_MODEL") || "deepseek-chat";

const SUPABASE_URL = (Deno.env.get("SUPABASE_URL") || Deno.env.get("VITE_SUPABASE_URL"))?.trim();
const SUPABASE_SERVICE_ROLE_KEY = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY"))?.trim();

if (!SUPABASE_URL) console.error("CRITICAL: SUPABASE_URL is missing");
if (!SUPABASE_SERVICE_ROLE_KEY) console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing");
if (!AI_API_KEY) console.error("CRITICAL: AI_API_KEY is missing");

interface ROIInput {
    currentAnnualCost: number;
    implementationCost: number;
    annualMaintenanceCost: number;
    estimatedCostSavingsPerYear: number;
    employeeCount?: number;
    averageHourlyRate?: number;
    hoursWastedPerWeek?: number;
    productivityGainPercentage?: number;
    revenueImpactPerYear?: number;
}

function cleanJSON(text: string): string {
    if (!text) return "{}";
    let cleaned = text.trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return jsonMatch[0];
    }
    return cleaned || "{}";
}

function calculateROI(input: ROIInput) {
    let totalAnnualSavings = input.estimatedCostSavingsPerYear + (input.revenueImpactPerYear || 0);

    if (input.employeeCount && input.averageHourlyRate && input.hoursWastedPerWeek && input.productivityGainPercentage) {
        const productivitySavings =
            input.employeeCount * input.hoursWastedPerWeek * 52 * input.averageHourlyRate * (input.productivityGainPercentage / 100);
        totalAnnualSavings += productivitySavings;
    }

    const totalCostYear1 = input.implementationCost + input.annualMaintenanceCost;
    const totalCostYear3 = input.implementationCost + (input.annualMaintenanceCost * 3);
    const totalCostYear5 = input.implementationCost + (input.annualMaintenanceCost * 5);

    const year1ROI = ((totalAnnualSavings - totalCostYear1) / totalCostYear1) * 100;
    const year3ROI = ((totalAnnualSavings * 3 - totalCostYear3) / totalCostYear3) * 100;
    const year5ROI = ((totalAnnualSavings * 5 - totalCostYear5) / totalCostYear5) * 100;

    const monthlyNetSavings = (totalAnnualSavings - input.annualMaintenanceCost) / 12;
    const breakEvenMonths = monthlyNetSavings > 0 ? Math.ceil(input.implementationCost / monthlyNetSavings) : 999;

    const paybackPeriod = breakEvenMonths >= 999
        ? "Does not break even"
        : breakEvenMonths <= 12
            ? `${breakEvenMonths} months`
            : `${Math.floor(breakEvenMonths / 12)} years ${breakEvenMonths % 12} months`;

    let recommendation: 'strong' | 'moderate' | 'weak' | 'reconsider' = 'moderate';
    if (breakEvenMonths <= 12 && year3ROI > 100) recommendation = 'strong';
    else if (breakEvenMonths <= 24 && year3ROI > 50) recommendation = 'moderate';
    else if (breakEvenMonths <= 36) recommendation = 'weak';
    else recommendation = 'reconsider';

    return {
        breakEvenMonths,
        paybackPeriod,
        year1ROI: Math.round(year1ROI * 100) / 100,
        year3ROI: Math.round(year3ROI * 100) / 100,
        year5ROI: Math.round(year5ROI * 100) / 100,
        totalCostYear1: Math.round(totalCostYear1),
        totalCostYear3: Math.round(totalCostYear3),
        totalCostYear5: Math.round(totalCostYear5),
        totalSavingsYear1: Math.round(totalAnnualSavings),
        totalSavingsYear3: Math.round(totalAnnualSavings * 3),
        totalSavingsYear5: Math.round(totalAnnualSavings * 5),
        recommendation,
    };
}

function mapComplexity(input: any) {
    let score = 0;
    score += Math.min(input.integrationCount * 10, 50);
    score += Math.min(input.userTypes * 8, 40);

    const dataScores = { low: 5, medium: 15, high: 30 };
    score += dataScores[input.dataComplexity as keyof typeof dataScores] || 15;

    if (input.aiComponentsNeeded) score += 25;
    if (input.realtimeFeatures) score += 20;
    if (input.mobileApps) score += 20;
    if (input.legacySystemIntegration) score += 30;

    let tier: 'T1' | 'T2' | 'T3' | 'T4' = 'T2';
    if (score <= 50) tier = 'T1';
    else if (score <= 100) tier = 'T2';
    else if (score <= 180) tier = 'T3';
    else tier = 'T4';

    const configs = {
        T1: { label: 'Simple', weeks: 8, range: '6-10 weeks', budgetBand: '$50K-$100K', budgetMin: 50000, budgetMax: 100000 },
        T2: { label: 'Medium Complexity', weeks: 16, range: '12-20 weeks', budgetBand: '$100K-$250K', budgetMin: 100000, budgetMax: 250000 },
        T3: { label: 'Complex', weeks: 28, range: '24-32 weeks', budgetBand: '$250K-$500K', budgetMin: 250000, budgetMax: 500000 },
        T4: { label: 'Enterprise', weeks: 48, range: '40-60 weeks', budgetBand: '$500K-$1.5M+', budgetMin: 500000, budgetMax: 1500000 },
    };

    return { tier, ...configs[tier] };
}

const SYSTEM_PROMPT = `You are a senior enterprise systems architect at Calcera Global. You diagnose operational inefficiencies and recommend technical solutions.

CRITICAL INSTRUCTIONS:
1. You MUST provide a RICH, DETAILED analysis for every text field in the JSON schema. 
2. NO EMPTY STRINGS. Minimum 2-3 sentences for each 'string' field.
3. Use the tool results for ROI and Timeline, but you MUST provide the 'rationale' and 'strategicDescription' around them.
4. If you don't have enough data for a field, provide a professional architectural assumption instead of leaving it blank.

JSON SCHEMA REQUIREMENT:
{
  "operationalDiagnosis": {
    "executiveSummary": "A detailed 50-100 word summary of the findings.",
    "rootCauses": ["Detailed cause 1", "Detailed cause 2", "Detailed cause 3"],
    "businessImpact": "The specific financial and operational impact of these issues."
  },
  "recommendedArchitecture": {
    "frontend": "Description of the user interface layer.",
    "backend": "Description of the services and logic layer.",
    "database": "Description of the data storage and models.",
    "integrations": "How this system connects to existing tools.",
    "aiComponents": "Specific AI/ML models or logic to be used.",
    "infrastructure": "Cloud services, DevOps, and deployment strategy."
  },
  "strategicRecommendation": {
    "shouldProceed": true,
    "phasedApproach": true,
    "keySuccessFactors": ["Critical factor 1", "Critical factor 2"],
    "riskFactors": ["Major risk 1", "Major risk 2"],
    "nextSteps": ["Step 1", "Step 2", "Step 3"]
  }
}

The tools handle "financialImpact", "complexityClassification", and "timelineEstimate". Do NOT include those keys in your final JSON; they are merged by the system.`;

function normalizeReportStructure(report: any): any {
    const defaults = {
        operationalDiagnosis: {
            executiveSummary: "Analysis still in refinement. Initial findings suggest significant opportunities for automation and systems integration.",
            rootCauses: ["Legacy system fragmentation", "Manual data entry overhead", "Lack of real-time visibility"],
            businessImpact: "Current inefficiencies are impacting scalability and operational margin."
        },
        recommendedArchitecture: {
            frontend: "Modern responsive web application built with React/Next.js.",
            backend: "Serverless microservices architecture for high scalability.",
            database: "Relational PostgreSQL database with optimized indexing.",
            integrations: "RESTful API layer with secure OAuth2 authentication.",
            aiComponents: "Generative AI for automated workflows and predictive analytics.",
            infrastructure: "Cloud-native deployment on enterprise-grade infrastructure."
        },
        strategicRecommendation: {
            shouldProceed: true,
            phasedApproach: true,
            keySuccessFactors: ["Executive sponsorship", "Clear data governance", "Agile implementation"],
            riskFactors: ["Data migration complexity", "User adoption curve"],
            nextSteps: ["Stakeholder alignment session", "Technical feasibility deep-dive", "Project kickoff"]
        }
    };

    return {
        operationalDiagnosis: {
            executiveSummary: report.operationalDiagnosis?.executiveSummary || defaults.operationalDiagnosis.executiveSummary,
            rootCauses: report.operationalDiagnosis?.rootCauses?.length ? report.operationalDiagnosis.rootCauses : defaults.operationalDiagnosis.rootCauses,
            businessImpact: report.operationalDiagnosis?.businessImpact || defaults.operationalDiagnosis.businessImpact
        },
        recommendedArchitecture: {
            frontend: report.recommendedArchitecture?.frontend || defaults.recommendedArchitecture.frontend,
            backend: report.recommendedArchitecture?.backend || defaults.recommendedArchitecture.backend,
            database: report.recommendedArchitecture?.database || defaults.recommendedArchitecture.database,
            integrations: report.recommendedArchitecture?.integrations || defaults.recommendedArchitecture.integrations,
            aiComponents: report.recommendedArchitecture?.aiComponents || defaults.recommendedArchitecture.aiComponents,
            infrastructure: report.recommendedArchitecture?.infrastructure || defaults.recommendedArchitecture.infrastructure
        },
        strategicRecommendation: {
            shouldProceed: report.strategicRecommendation?.shouldProceed ?? defaults.strategicRecommendation.shouldProceed,
            phasedApproach: report.strategicRecommendation?.phasedApproach ?? defaults.strategicRecommendation.phasedApproach,
            keySuccessFactors: report.strategicRecommendation?.keySuccessFactors?.length ? report.strategicRecommendation.keySuccessFactors : defaults.strategicRecommendation.keySuccessFactors,
            riskFactors: report.strategicRecommendation?.riskFactors?.length ? report.strategicRecommendation.riskFactors : defaults.strategicRecommendation.riskFactors,
            nextSteps: report.strategicRecommendation?.nextSteps?.length ? report.strategicRecommendation.nextSteps : defaults.strategicRecommendation.nextSteps
        }
    };
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    // Strict environment variable validation
    const missing = [];
    if (!SUPABASE_URL) missing.push("SUPABASE_URL");
    if (!SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    if (!AI_API_KEY) missing.push("AI_API_KEY");
    
    if (missing.length > 0) {
        console.error(`CRITICAL: Missing configuration: ${missing.join(", ")}`);
        return new Response(
            JSON.stringify({ 
                error: "Configuration error", 
                details: `The server is missing required configuration: ${missing.join(", ")}. Please check Supabase project secrets.` 
            }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
    }

    try {
        const startTime = Date.now();
        const requestText = await req.text();
        if (!requestText) throw new Error("Empty request body");

        let body;
        try {
            body = JSON.parse(requestText);
        } catch (e) {
            console.error("Failed to parse request JSON:", requestText);
            throw new Error("Invalid JSON in request body");
        }

        const { companyName, industry, companySize, revenue, challenges, desiredOutcomes, email } = body;

        console.log(`Diagnostic request received for email: ${email}`);

        if (!companyName || !industry || !challenges || !email) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: companyName, industry, challenges, email" }),
                { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
            );
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const clientIP = req.headers.get("x-forwarded-for") || "unknown";

        // Save lead
        const { data: leadData, error: leadError } = await supabase
            .from("leads")
            .insert({
                email,
                company_name: companyName,
                industry,
                company_size: companySize,
                operational_challenges: challenges,
                desired_outcomes: desiredOutcomes,
                ip_address: clientIP,
                user_agent: req.headers.get("user-agent") || 'unknown',
            })
            .select()
            .single();

        if (leadError) throw leadError;

        const userMessage = `Analyze this client:
**Company:** ${companyName}
**Industry:** ${industry}
${companySize ? `**Size:** ${companySize}` : ''}
${revenue ? `**Revenue:** ${revenue}` : ''}

**Challenges:**
${challenges}

Providing a comprehensive diagnostic analysis.`;

        const tools = [
            {
                type: "function",
                function: {
                    name: "calculate_roi_metrics",
                    description: "Calculate ROI. Use this for ALL financial calculations.",
                    parameters: {
                        type: "object",
                        properties: {
                            currentAnnualCost: { type: "number" },
                            implementationCost: { type: "number" },
                            annualMaintenanceCost: { type: "number" },
                            estimatedCostSavingsPerYear: { type: "number" },
                        },
                        required: ["currentAnnualCost", "implementationCost", "annualMaintenanceCost", "estimatedCostSavingsPerYear"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "map_complexity_to_estimates",
                    description: "Map complexity to timeline/budget estimates",
                    parameters: {
                        type: "object",
                        properties: {
                            integrationCount: { type: "number" },
                            userTypes: { type: "number" },
                            dataComplexity: { type: "string", enum: ["low", "medium", "high"] },
                            aiComponentsNeeded: { type: "boolean" },
                            realtimeFeatures: { type: "boolean" },
                            mobileApps: { type: "boolean" },
                            legacySystemIntegration: { type: "boolean" },
                        },
                        required: ["integrationCount", "userTypes", "dataComplexity", "aiComponentsNeeded", "realtimeFeatures", "mobileApps", "legacySystemIntegration"],
                    },
                },
            },
        ];

        let complexityData = mapComplexity({ integrationCount: 2, userTypes: 2, dataComplexity: 'medium' });
        let roiData = calculateROI({ currentAnnualCost: 100000, implementationCost: 50000, annualMaintenanceCost: 10000, estimatedCostSavingsPerYear: 30000 });
        let finalReport = null;

        // --- AI PROCESSOR ---
        const openAIResponse = await fetch(`${AI_BASE_URL}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AI_API_KEY}`,
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage },
                ],
                tools,
                tool_choice: "auto",
                temperature: 0.7,
            }),
        });

        if (!openAIResponse.ok) {
            const errText = await openAIResponse.text();
            throw new Error(`DeepSeek API Error (${openAIResponse.status}): ${errText}`);
        }

        const openAIData = await openAIResponse.json();

        if (openAIData.choices?.[0]?.message?.tool_calls) {
            const toolResults = [];
            for (const toolCall of openAIData.choices[0].message.tool_calls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments || "{}");
                let result;
                if (functionName === "calculate_roi_metrics") {
                    result = calculateROI(functionArgs);
                    roiData = result;
                } else if (functionName === "map_complexity_to_estimates") {
                    result = mapComplexity(functionArgs);
                    complexityData = result;
                }
                toolResults.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    name: functionName,
                    content: JSON.stringify(result),
                });
            }

            const secondResponse = await fetch(`${AI_BASE_URL}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: AI_MODEL,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: userMessage },
                        openAIData.choices[0].message,
                        ...toolResults,
                    ],
                    temperature: 0.7,
                    response_format: { type: "json_object" },
                }),
            });

            if (!secondResponse.ok) {
                const errText = await secondResponse.text();
                throw new Error(`DeepSeek Completion Error: ${errText}`);
            }

            const secondData = await secondResponse.json();
            finalReport = JSON.parse(cleanJSON(secondData.choices[0].message.content || "{}"));
        } else {
            finalReport = JSON.parse(cleanJSON(openAIData.choices[0].message.content || "{}"));
        }

        finalReport = normalizeReportStructure(finalReport || {});
        finalReport = {
            ...finalReport,
            complexityClassification: {
                tier: complexityData.tier,
                label: complexityData.label,
                rationale: finalReport.complexityClassification?.rationale || `Based on ${complexityData.weeks} weeks implementation timeline.`
            },
            timelineEstimate: {
                range: complexityData.range,
                phaseBreakdown: {
                    discovery: "1-2 weeks",
                    design: "2-3 weeks",
                    development: `${Math.ceil(complexityData.weeks * 0.6)} weeks`,
                    testing: `${Math.ceil(complexityData.weeks * 0.2)} weeks`,
                    deployment: "1 week"
                }
            },
            financialImpact: {
                budgetBand: complexityData.budgetBand,
                roiMetrics: roiData,
                recommendation: roiData.recommendation
            }
        };

        const { data: reportData, error: reportError } = await supabase
            .from("diagnostic_reports")
            .insert({
                lead_id: leadData.id,
                report_json: finalReport,
                complexity_tier: complexityData.tier,
                complexity_label: complexityData.label,
                estimated_timeline_weeks: complexityData.weeks,
                estimated_timeline_range: complexityData.range,
                roi_metrics: roiData,
                budget_band: complexityData.budgetBand,
                openai_model: currentModel,
                total_tokens: 0, // Usage stats vary between providers
                processing_time_ms: Date.now() - startTime,
                status: 'generated',
            })
            .select()
            .single();

        if (reportError) throw reportError;

        // Update rate limit
        await supabase.from("rate_limits").insert({
            identifier: clientIP,
            identifier_type: "ip",
            endpoint: "/ai-diagnostic",
            window_start: new Date().toISOString(),
        });

        return new Response(
            JSON.stringify({
                success: true,
                reportId: reportData.id,
                report: finalReport,
                complexity: complexityData,
                roi: roiData
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );

    } catch (error: any) {
        console.error("CRITICAL error in ai-diagnostic:", error);
        return new Response(
            JSON.stringify({
                error: error.message || "Internal server error",
                details: "Architect synthesis failed. Please verify your connection or try again in a moment."
            }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
    }
};

serve(handler);
