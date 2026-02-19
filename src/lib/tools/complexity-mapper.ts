/**
 * Complexity Mapper Tool
 * Maps LLM complexity classification to concrete timeline and budget estimates
 * This ensures consistent, deterministic outputs
 */

export type ComplexityTier = 'T1' | 'T2' | 'T3' | 'T4';

export interface ComplexityInput {
    // LLM should provide these classifications
    integrationCount: number; // Number of third-party integrations
    userTypes: number; // Number of distinct user roles
    dataComplexity: 'low' | 'medium' | 'high'; // Data model complexity
    customizationLevel: 'minimal' | 'moderate' | 'extensive';
    complianceRequirements: string[]; // e.g., ['GDPR', 'HIPAA', 'SOC2']
    aiComponentsNeeded: boolean;
    realtimeFeatures: boolean;
    mobileApps: boolean;
    legacySystemIntegration: boolean;
}

export interface ComplexityOutput {
    tier: ComplexityTier;
    label: string;

    // Timeline estimates
    estimatedWeeks: number;
    timelineRange: string; // Human-readable
    phaseBreakdown: {
        discovery: string;
        design: string;
        development: string;
        testing: string;
        deployment: string;
    };

    // Budget estimates
    budgetBand: string;
    budgetMin: number;
    budgetMax: number;

    // Resource requirements
    teamSize: number;
    keyRoles: string[];

    // Risk assessment
    riskLevel: 'low' | 'medium' | 'high';
    criticalFactors: string[];

    // Recommendations
    recommendedApproach: string;
    phasedDelivery: boolean;
}

/**
 * Calculate complexity score from inputs
 */
function calculateComplexityScore(input: ComplexityInput): number {
    let score = 0;

    // Integration complexity
    score += Math.min(input.integrationCount * 10, 50);

    // User role complexity
    score += Math.min(input.userTypes * 8, 40);

    // Data complexity
    const dataScores = { low: 5, medium: 15, high: 30 };
    score += dataScores[input.dataComplexity];

    // Customization level
    const customScores = { minimal: 5, moderate: 15, extensive: 30 };
    score += customScores[input.customizationLevel];

    // Compliance (each requirement adds complexity)
    score += input.complianceRequirements.length * 15;

    // Feature complexity
    if (input.aiComponentsNeeded) score += 25;
    if (input.realtimeFeatures) score += 20;
    if (input.mobileApps) score += 20;
    if (input.legacySystemIntegration) score += 30;

    return score;
}

/**
 * Map complexity score to tier
 */
function scoreToTier(score: number): ComplexityTier {
    if (score <= 50) return 'T1';
    if (score <= 100) return 'T2';
    if (score <= 180) return 'T3';
    return 'T4';
}

/**
 * Main complexity mapping function
 */
export function mapComplexity(input: ComplexityInput): ComplexityOutput {
    const score = calculateComplexityScore(input);
    const tier = scoreToTier(score);

    // Tier-based mappings
    const tierConfig: Record<ComplexityTier, ComplexityOutput> = {
        T1: {
            tier: 'T1',
            label: 'Simple',
            estimatedWeeks: 8,
            timelineRange: '6-10 weeks',
            phaseBreakdown: {
                discovery: '1 week',
                design: '1 week',
                development: '4 weeks',
                testing: '1 week',
                deployment: '1 week',
            },
            budgetBand: '$50K-$100K',
            budgetMin: 50000,
            budgetMax: 100000,
            teamSize: 3,
            keyRoles: ['Full-stack Developer', 'UI/UX Designer', 'Product Manager'],
            riskLevel: 'low',
            criticalFactors: [],
            recommendedApproach: 'Agile with 2-week sprints, single-phase delivery',
            phasedDelivery: false,
        },
        T2: {
            tier: 'T2',
            label: 'Medium Complexity',
            estimatedWeeks: 16,
            timelineRange: '12-20 weeks',
            phaseBreakdown: {
                discovery: '2 weeks',
                design: '2 weeks',
                development: '8 weeks',
                testing: '2 weeks',
                deployment: '2 weeks',
            },
            budgetBand: '$100K-$250K',
            budgetMin: 100000,
            budgetMax: 250000,
            teamSize: 5,
            keyRoles: [
                'Tech Lead',
                'Backend Developer',
                'Frontend Developer',
                'UI/UX Designer',
                'QA Engineer',
                'Product Manager',
            ],
            riskLevel: 'medium',
            criticalFactors: ['Integration complexity', 'Scope creep potential'],
            recommendedApproach: 'Agile with MVP-first approach, 2-3 phases recommended',
            phasedDelivery: true,
        },
        T3: {
            tier: 'T3',
            label: 'Complex',
            estimatedWeeks: 28,
            timelineRange: '24-32 weeks',
            phaseBreakdown: {
                discovery: '3 weeks',
                design: '4 weeks',
                development: '16 weeks',
                testing: '3 weeks',
                deployment: '2 weeks',
            },
            budgetBand: '$250K-$500K',
            budgetMin: 250000,
            budgetMax: 500000,
            teamSize: 8,
            keyRoles: [
                'Solutions Architect',
                'Tech Lead',
                'Backend Developers (2)',
                'Frontend Developers (2)',
                'DevOps Engineer',
                'UI/UX Designer',
                'QA Engineers (2)',
                'Product Manager',
                'Business Analyst',
            ],
            riskLevel: 'high',
            criticalFactors: [
                'Multi-system integration risks',
                'Data migration complexity',
                'Security and compliance requirements',
            ],
            recommendedApproach:
                'Phased delivery with clearly defined milestones, strong architecture foundation required',
            phasedDelivery: true,
        },
        T4: {
            tier: 'T4',
            label: 'Enterprise',
            estimatedWeeks: 48,
            timelineRange: '40-60 weeks',
            phaseBreakdown: {
                discovery: '4 weeks',
                design: '6 weeks',
                development: '28 weeks',
                testing: '6 weeks',
                deployment: '4 weeks',
            },
            budgetBand: '$500K-$1.5M+',
            budgetMin: 500000,
            budgetMax: 1500000,
            teamSize: 12,
            keyRoles: [
                'Enterprise Architect',
                'Solutions Architect',
                'Tech Leads (2)',
                'Backend Developers (3)',
                'Frontend Developers (2)',
                'Mobile Developers (2)',
                'DevOps Engineers (2)',
                'Security Engineer',
                'UI/UX Designers (2)',
                'QA Engineers (3)',
                'Product Manager',
                'Business Analyst',
                'Data Engineer',
            ],
            riskLevel: 'high',
            criticalFactors: [
                'Enterprise integration complexity',
                'Regulatory compliance',
                'Scalability requirements',
                'Security and audit requirements',
                'Change management and training',
            ],
            recommendedApproach:
                'Multi-phase delivery with dedicated discovery phase, enterprise governance, and change management',
            phasedDelivery: true,
        },
    };

    const baseOutput = tierConfig[tier];

    // Adjust for specific factors
    const criticalFactors = [...baseOutput.criticalFactors];

    if (input.aiComponentsNeeded) {
        criticalFactors.push('AI/ML model training and validation required');
    }

    if (input.legacySystemIntegration) {
        criticalFactors.push('Legacy system integration challenges');
    }

    if (input.complianceRequirements.length > 0) {
        criticalFactors.push(
            `Compliance requirements: ${input.complianceRequirements.join(', ')}`
        );
    }

    return {
        ...baseOutput,
        criticalFactors,
    };
}

/**
 * Simplified complexity classification for LLM to use
 * LLM provides high-level assessment, this function normalizes it
 */
export function classifyFromDescription(description: {
    scope: 'small' | 'medium' | 'large' | 'enterprise';
    technicalComplexity: 'low' | 'medium' | 'high';
    integrations: 'none' | 'few' | 'many';
    compliance: boolean;
}): ComplexityTier {
    let score = 0;

    // Scope
    const scopeScores = { small: 20, medium: 60, large: 120, enterprise: 200 };
    score += scopeScores[description.scope];

    // Technical complexity
    const techScores = { low: 10, medium: 30, high: 60 };
    score += techScores[description.technicalComplexity];

    // Integrations
    const integrationScores = { none: 0, few: 20, many: 50 };
    score += integrationScores[description.integrations];

    // Compliance
    if (description.compliance) score += 30;

    return scoreToTier(score);
}
