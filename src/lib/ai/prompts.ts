/**
 * AI Agent System Prompts and Instructions
 * Defines the enterprise architect persona and behavior
 */

export const SYSTEM_PROMPT = `You are a senior enterprise systems architect at Calcera Global, a premier technology consulting and systems integration firm.

# Your Role
You diagnose operational inefficiencies in organizations and recommend technical solutions with precision and professionalism. Your responses combine deep technical expertise with business acumen.

# Core Directives

1. **Diagnose First**: Thoroughly analyze the client's operational challenges before jumping to solutions.

2. **Never Hallucinate Numbers**: You MUST use the provided calculation tools for ALL financial and timeline estimates:
   - Use \`calculate_roi_metrics\` for ANY financial calculations
   - Use \`map_complexity_to_estimates\` for timeline and budget estimates
   - DO NOT estimate or guess these values yourself

3. **Classify Systematically**: Every project falls into a complexity tier (T1-T4). Use the \`map_complexity_to_estimates\` tool with detailed technical assessment.

4. **Structure Everything**: Your final output must be valid JSON following the exact schema provided.

5. **Be Conservative**: When uncertain about technical feasibility or costs, err on the side of caution. Better to over-estimate than under-deliver.

6. **Think Like a Consultant**: Your recommendations should feel like they came from McKinsey + Google Engineering.

# Analysis Framework

When analyzing a client's situation, consider:

**Operational Layer**
- What manual processes can be automated?
- Where are the bottlenecks?
- What's causing the inefficiency?

**Technical Layer**
- What systems need to integrate?
- What data flows are broken?
- What's the technical debt?

**Business Layer**
- What's the financial impact?
- What's the ROI timeline?
- What are the risks?

# Tool Usage Guidelines

1. **Start with \`normalize_user_input\`**: Always normalize vague inputs first for consistency.

2. **Assess Complexity with \`map_complexity_to_estimates\`**: Provide detailed technical inputs:
   - Count all integrations accurately
   - Identify distinct user roles
   - Assess data complexity honestly
   - Flag compliance requirements
   
3. **Calculate ROI with \`calculate_roi_metrics\`**: Use complexity tier to estimate implementation cost, then calculate ROI.

# Output Requirements

Your final diagnostic report MUST include:

1. **Operational Diagnosis** (2-3 paragraphs)
   - Executive summary of the problem
   - Root cause analysis
   - Impact on business operations

2. **Recommended System Architecture** (detailed breakdown)
   - Frontend layer
   - Backend layer
   - Database & data layer
   - Integration layer
   - AI/ML components (if needed)
   - Infrastructure & DevOps

3. **Complexity Classification**
   - Tier: T1, T2, T3, or T4
   - Rationale for classification

4. **Timeline Estimate** (from tool output)

5. **Financial Impact Analysis** (from tool output)

6. **Strategic Recommendation**
   - Should they proceed?
   - Phased approach if applicable
   - Key success factors

# Tone & Style

- Professional, authoritative, yet approachable
- Use "we recommend" rather than "you should"
- Avoid jargon unless necessary (explain when you do)
- Be specific, not vague
- Confidence without arrogance

# Example Tool Call Sequence

1. \`normalize_user_input\` → Get structured data
2. \`map_complexity_to_estimates\` → Get tier, timeline, budget
3. \`calculate_roi_metrics\` → Get financial projections
4. Generate comprehensive report

Remember: You're not just selling services—you're providing genuine strategic value.`;

/**
 * User message template
 */
export function createUserMessage(input: {
    companyName: string;
    industry: string;
    companySize?: string;
    revenue?: string;
    challenges: string;
    desiredOutcomes?: string;
}): string {
    return `Please provide a comprehensive diagnostic analysis for the following client:

**Company:** ${input.companyName}
**Industry:** ${input.industry}
${input.companySize ? `**Company Size:** ${input.companySize}` : ''}
${input.revenue ? `**Revenue:** ${input.revenue}` : ''}

**Operational Challenges:**
${input.challenges}

${input.desiredOutcomes ? `**Desired Outcomes:**\n${input.desiredOutcomes}` : ''}

Provide a detailed analysis including operational diagnosis, recommended architecture, complexity classification, timeline, and ROI analysis.`;
}

/**
 * JSON schema for structured output
 */
export const DIAGNOSTIC_REPORT_SCHEMA = {
    type: 'object',
    properties: {
        operationalDiagnosis: {
            type: 'object',
            properties: {
                executiveSummary: { type: 'string' },
                rootCauses: {
                    type: 'array',
                    items: { type: 'string' }
                },
                businessImpact: { type: 'string' },
            },
            required: ['executiveSummary', 'rootCauses', 'businessImpact'],
        },

        recommendedArchitecture: {
            type: 'object',
            properties: {
                frontend: { type: 'string' },
                backend: { type: 'string' },
                database: { type: 'string' },
                integrations: { type: 'string' },
                aiComponents: { type: 'string' },
                infrastructure: { type: 'string' },
            },
            required: ['frontend', 'backend', 'database', 'integrations', 'infrastructure'],
        },

        complexityClassification: {
            type: 'object',
            properties: {
                tier: {
                    type: 'string',
                    enum: ['T1', 'T2', 'T3', 'T4']
                },
                label: { type: 'string' },
                rationale: { type: 'string' },
            },
            required: ['tier', 'label', 'rationale'],
        },

        timelineEstimate: {
            type: 'object',
            properties: {
                range: { type: 'string' },
                weeks: { type: 'number' },
                phaseBreakdown: {
                    type: 'object',
                    properties: {
                        discovery: { type: 'string' },
                        design: { type: 'string' },
                        development: { type: 'string' },
                        testing: { type: 'string' },
                        deployment: { type: 'string' },
                    },
                },
            },
            required: ['range', 'weeks'],
        },

        financialImpact: {
            type: 'object',
            properties: {
                budgetBand: { type: 'string' },
                roiMetrics: {
                    type: 'object',
                    properties: {
                        breakEvenMonths: { type: 'number' },
                        paybackPeriod: { type: 'string' },
                        year1ROI: { type: 'number' },
                        year3ROI: { type: 'number' },
                        year5ROI: { type: 'number' },
                    },
                },
                recommendation: {
                    type: 'string',
                    enum: ['strong', 'moderate', 'weak', 'reconsider']
                },
            },
            required: ['budgetBand', 'roiMetrics', 'recommendation'],
        },

        strategicRecommendation: {
            type: 'object',
            properties: {
                shouldProceed: { type: 'boolean' },
                phasedApproach: { type: 'boolean' },
                keySuccessFactors: {
                    type: 'array',
                    items: { type: 'string' }
                },
                riskFactors: {
                    type: 'array',
                    items: { type: 'string' }
                },
                nextSteps: {
                    type: 'array',
                    items: { type: 'string' }
                },
            },
            required: ['shouldProceed', 'phasedApproach', 'keySuccessFactors', 'nextSteps'],
        },
    },
    required: [
        'operationalDiagnosis',
        'recommendedArchitecture',
        'complexityClassification',
        'timelineEstimate',
        'financialImpact',
        'strategicRecommendation',
    ],
} as const;

/**
 * TypeScript interface matching the schema
 */
export interface DiagnosticReport {
    operationalDiagnosis: {
        executiveSummary: string;
        rootCauses: string[];
        businessImpact: string;
    };

    recommendedArchitecture: {
        frontend: string;
        backend: string;
        database: string;
        integrations: string;
        aiComponents?: string;
        infrastructure: string;
    };

    complexityClassification: {
        tier: 'T1' | 'T2' | 'T3' | 'T4';
        label: string;
        rationale: string;
    };

    timelineEstimate: {
        range: string;
        weeks: number;
        phaseBreakdown?: {
            discovery: string;
            design: string;
            development: string;
            testing: string;
            deployment: string;
        };
    };

    financialImpact: {
        budgetBand: string;
        roiMetrics: {
            breakEvenMonths: number;
            paybackPeriod: string;
            year1ROI: number;
            year3ROI: number;
            year5ROI: number;
        };
        recommendation: 'strong' | 'moderate' | 'weak' | 'reconsider';
    };

    strategicRecommendation: {
        shouldProceed: boolean;
        phasedApproach: boolean;
        keySuccessFactors: string[];
        riskFactors?: string[];
        nextSteps: string[];
    };
}
