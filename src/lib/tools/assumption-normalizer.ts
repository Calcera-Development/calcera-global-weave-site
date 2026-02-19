/**
 * Assumption Normalizer Tool
 * Normalizes vague user inputs into structured, standardized data
 * Prepares data for consistent agent processing
 */

export interface RawUserInput {
    companyName?: string;
    industry?: string;
    companySize?: string;
    revenue?: string;
    challenges?: string;
    desiredOutcomes?: string;
}

export interface NormalizedInput {
    // Company information
    companyName: string;
    industry: string;
    industryCategory: IndustryCategory;

    // Company metrics
    companySizeCategory: CompanySizeCategory;
    employeeCountEstimate: { min: number; max: number };
    revenueCategory: RevenueCategory;
    revenueEstimate: { min: number; max: number };

    // Problem statement
    challenges: string[];
    challengeCategories: ChallengeCategory[];

    // Goals
    desiredOutcomes: string[];

    // Data quality flags
    dataQuality: {
        hasCompanyInfo: boolean;
        hasIndustry: boolean;
        hasSize: boolean;
        hasRevenue: boolean;
        hasChallenges: boolean;
        completeness: number; // 0-100
    };
}

export type IndustryCategory =
    | 'Technology & Software'
    | 'Healthcare & Life Sciences'
    | 'Financial Services'
    | 'Retail & E-commerce'
    | 'Manufacturing & Industrial'
    | 'Professional Services'
    | 'Education'
    | 'Government & Public Sector'
    | 'Real Estate & Construction'
    | 'Media & Entertainment'
    | 'Transportation & Logistics'
    | 'Energy & Utilities'
    | 'Other';

export type CompanySizeCategory =
    | 'Startup (1-10)'
    | 'Small (11-50)'
    | 'Medium (51-200)'
    | 'Large (201-1000)'
    | 'Enterprise (1000+)';

export type RevenueCategory =
    | 'Pre-revenue'
    | 'Under $1M'
    | '$1M-$10M'
    | '$10M-$50M'
    | '$50M-$250M'
    | '$250M-$1B'
    | 'Over $1B';

export type ChallengeCategory =
    | 'Process Inefficiency'
    | 'System Integration'
    | 'Data Management'
    | 'Scalability'
    | 'Security & Compliance'
    | 'Customer Experience'
    | 'Employee Productivity'
    | 'Cost Reduction'
    | 'Legacy Systems'
    | 'Automation';

/**
 * Categorize industry from free text
 */
function categorizeIndustry(industry: string): IndustryCategory {
    const normalized = industry.toLowerCase().trim();

    const categoryMap: Record<string, IndustryCategory> = {
        // Technology
        'tech': 'Technology & Software',
        'software': 'Technology & Software',
        'saas': 'Technology & Software',
        'it': 'Technology & Software',
        'technology': 'Technology & Software',

        // Healthcare
        'healthcare': 'Healthcare & Life Sciences',
        'health': 'Healthcare & Life Sciences',
        'medical': 'Healthcare & Life Sciences',
        'pharma': 'Healthcare & Life Sciences',
        'biotech': 'Healthcare & Life Sciences',

        // Finance
        'finance': 'Financial Services',
        'banking': 'Financial Services',
        'fintech': 'Financial Services',
        'insurance': 'Financial Services',
        'investment': 'Financial Services',

        // Retail
        'retail': 'Retail & E-commerce',
        'ecommerce': 'Retail & E-commerce',
        'e-commerce': 'Retail & E-commerce',
        'commerce': 'Retail & E-commerce',

        // Manufacturing
        'manufacturing': 'Manufacturing & Industrial',
        'industrial': 'Manufacturing & Industrial',
        'production': 'Manufacturing & Industrial',
        'factory': 'Manufacturing & Industrial',

        // Professional Services
        'consulting': 'Professional Services',
        'legal': 'Professional Services',
        'accounting': 'Professional Services',
        'professional': 'Professional Services',

        // Education
        'education': 'Education',
        'school': 'Education',
        'university': 'Education',
        'training': 'Education',

        // Government
        'government': 'Government & Public Sector',
        'public': 'Government & Public Sector',
        'municipal': 'Government & Public Sector',

        // Real Estate
        'real estate': 'Real Estate & Construction',
        'construction': 'Real Estate & Construction',
        'property': 'Real Estate & Construction',

        // Media
        'media': 'Media & Entertainment',
        'entertainment': 'Media & Entertainment',
        'publishing': 'Media & Entertainment',

        // Transportation
        'logistics': 'Transportation & Logistics',
        'transportation': 'Transportation & Logistics',
        'shipping': 'Transportation & Logistics',
        'supply chain': 'Transportation & Logistics',

        // Energy
        'energy': 'Energy & Utilities',
        'utilities': 'Energy & Utilities',
        'power': 'Energy & Utilities',
    };

    for (const [keyword, category] of Object.entries(categoryMap)) {
        if (normalized.includes(keyword)) {
            return category;
        }
    }

    return 'Other';
}

/**
 * Parse company size from free text
 */
function parseCompanySize(sizeText: string): {
    category: CompanySizeCategory;
    estimate: { min: number; max: number };
} {
    const normalized = sizeText.toLowerCase().trim();

    // Try to extract numbers
    const numbers = normalized.match(/\d+/g);
    if (numbers && numbers.length > 0) {
        const num = parseInt(numbers[0]);

        if (num <= 10) return {
            category: 'Startup (1-10)',
            estimate: { min: 1, max: 10 }
        };
        if (num <= 50) return {
            category: 'Small (11-50)',
            estimate: { min: 11, max: 50 }
        };
        if (num <= 200) return {
            category: 'Medium (51-200)',
            estimate: { min: 51, max: 200 }
        };
        if (num <= 1000) return {
            category: 'Large (201-1000)',
            estimate: { min: 201, max: 1000 }
        };
        return {
            category: 'Enterprise (1000+)',
            estimate: { min: 1000, max: 10000 }
        };
    }

    // Try keyword matching
    if (normalized.includes('startup') || normalized.includes('small team')) {
        return { category: 'Startup (1-10)', estimate: { min: 1, max: 10 } };
    }
    if (normalized.includes('small')) {
        return { category: 'Small (11-50)', estimate: { min: 11, max: 50 } };
    }
    if (normalized.includes('medium') || normalized.includes('mid')) {
        return { category: 'Medium (51-200)', estimate: { min: 51, max: 200 } };
    }
    if (normalized.includes('large')) {
        return { category: 'Large (201-1000)', estimate: { min: 201, max: 1000 } };
    }
    if (normalized.includes('enterprise')) {
        return { category: 'Enterprise (1000+)', estimate: { min: 1000, max: 10000 } };
    }

    // Default to medium if unclear
    return { category: 'Medium (51-200)', estimate: { min: 51, max: 200 } };
}

/**
 * Parse revenue from free text
 */
function parseRevenue(revenueText: string): {
    category: RevenueCategory;
    estimate: { min: number; max: number };
} {
    const normalized = revenueText.toLowerCase().trim();

    // Extract numbers and multipliers
    const millionMatch = normalized.match(/([\d.]+)\s*m(illion)?/i);
    const billionMatch = normalized.match(/([\d.]+)\s*b(illion)?/i);

    let revenueValue = 0;
    if (billionMatch) {
        revenueValue = parseFloat(billionMatch[1]) * 1000000000;
    } else if (millionMatch) {
        revenueValue = parseFloat(millionMatch[1]) * 1000000;
    }

    if (revenueValue === 0 || normalized.includes('pre-revenue')) {
        return { category: 'Pre-revenue', estimate: { min: 0, max: 0 } };
    }
    if (revenueValue < 1000000) {
        return { category: 'Under $1M', estimate: { min: 0, max: 1000000 } };
    }
    if (revenueValue <= 10000000) {
        return { category: '$1M-$10M', estimate: { min: 1000000, max: 10000000 } };
    }
    if (revenueValue <= 50000000) {
        return { category: '$10M-$50M', estimate: { min: 10000000, max: 50000000 } };
    }
    if (revenueValue <= 250000000) {
        return { category: '$50M-$250M', estimate: { min: 50000000, max: 250000000 } };
    }
    if (revenueValue <= 1000000000) {
        return { category: '$250M-$1B', estimate: { min: 250000000, max: 1000000000 } };
    }
    return { category: 'Over $1B', estimate: { min: 1000000000, max: 10000000000 } };
}

/**
 * Classify challenges into categories
 */
function classifyChallenges(challengeText: string): ChallengeCategory[] {
    const normalized = challengeText.toLowerCase();
    const categories: ChallengeCategory[] = [];

    const keywords: Record<ChallengeCategory, string[]> = {
        'Process Inefficiency': ['manual', 'inefficient', 'slow', 'time-consuming', 'redundant'],
        'System Integration': ['integration', 'disconnected', 'siloed', 'fragmented', 'multiple systems'],
        'Data Management': ['data', 'reporting', 'analytics', 'insights', 'information'],
        'Scalability': ['scale', 'growth', 'capacity', 'performance', 'bottleneck'],
        'Security & Compliance': ['security', 'compliance', 'gdpr', 'hipaa', 'audit', 'privacy'],
        'Customer Experience': ['customer', 'user experience', 'ux', 'engagement', 'satisfaction'],
        'Employee Productivity': ['productivity', 'efficiency', 'employees', 'staff', 'workforce'],
        'Cost Reduction': ['cost', 'expensive', 'budget', 'reduce spending', 'optimize costs'],
        'Legacy Systems': ['legacy', 'outdated', 'old system', 'modernize', 'replace'],
        'Automation': ['automate', 'automation', 'manual process', 'streamline'],
    };

    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => normalized.includes(word))) {
            categories.push(category as ChallengeCategory);
        }
    }

    return categories.length > 0 ? categories : ['Process Inefficiency'];
}

/**
 * Main normalization function
 */
export function normalizeInput(raw: RawUserInput): NormalizedInput {
    const companyName = raw.companyName?.trim() || 'Company';
    const industry = raw.industry?.trim() || 'Other';
    const industryCategory = categorizeIndustry(industry);

    const sizeData = raw.companySize
        ? parseCompanySize(raw.companySize)
        : { category: 'Medium (51-200)' as CompanySizeCategory, estimate: { min: 51, max: 200 } };

    const revenueData = raw.revenue
        ? parseRevenue(raw.revenue)
        : { category: '$1M-$10M' as RevenueCategory, estimate: { min: 1000000, max: 10000000 } };

    const challengesText = raw.challenges || '';
    const challenges = challengesText
        .split(/[.;]/)
        .map(c => c.trim())
        .filter(c => c.length > 0);

    const challengeCategories = classifyChallenges(challengesText);

    const outcomesText = raw.desiredOutcomes || '';
    const desiredOutcomes = outcomesText
        .split(/[.;]/)
        .map(o => o.trim())
        .filter(o => o.length > 0);

    // Calculate data quality
    const dataQuality = {
        hasCompanyInfo: !!raw.companyName,
        hasIndustry: !!raw.industry,
        hasSize: !!raw.companySize,
        hasRevenue: !!raw.revenue,
        hasChallenges: !!raw.challenges,
        completeness: [
            !!raw.companyName,
            !!raw.industry,
            !!raw.companySize,
            !!raw.revenue,
            !!raw.challenges,
        ].filter(Boolean).length * 20,
    };

    return {
        companyName,
        industry,
        industryCategory,
        companySizeCategory: sizeData.category,
        employeeCountEstimate: sizeData.estimate,
        revenueCategory: revenueData.category,
        revenueEstimate: revenueData.estimate,
        challenges,
        challengeCategories,
        desiredOutcomes,
        dataQuality,
    };
}
