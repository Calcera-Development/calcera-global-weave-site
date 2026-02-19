/**
 * Tool Registry
 * Central export point for all agent tools
 */

export * from './roi-calculator';
export * from './complexity-mapper';
export * from './assumption-normalizer';

import type { ROIInput, ROIMetrics } from './roi-calculator';
import type { ComplexityInput, ComplexityOutput } from './complexity-mapper';
import type { RawUserInput, NormalizedInput } from './assumption-normalizer';

/**
 * OpenAI Function Tool Definitions
 * These define how the LLM can call our deterministic tools
 */
export const toolDefinitions = {
    normalizeInput: {
        type: 'function',
        function: {
            name: 'normalize_user_input',
            description: 'Normalizes vague user input into structured, categorized data. Use this FIRST to standardize industry, company size, and challenge categories.',
            parameters: {
                type: 'object',
                properties: {
                    companyName: {
                        type: 'string',
                        description: 'Company name',
                    },
                    industry: {
                        type: 'string',
                        description: 'Industry or sector (e.g., Healthcare, Retail, Manufacturing)',
                    },
                    companySize: {
                        type: 'string',
                        description: 'Company size description (e.g., "50 employees", "startup", "enterprise")',
                    },
                    revenue: {
                        type: 'string',
                        description: 'Revenue information if provided (e.g., "$5M annually", "pre-revenue")',
                    },
                    challenges: {
                        type: 'string',
                        description: 'Description of operational challenges',
                    },
                    desiredOutcomes: {
                        type: 'string',
                        description: 'Desired outcomes or goals',
                    },
                },
                required: ['companyName', 'industry', 'challenges'],
            },
        },
    },

    calculateROI: {
        type: 'function',
        function: {
            name: 'calculate_roi_metrics',
            description: 'Calculates financial ROI metrics including break-even analysis, NPV, and multi-year ROI projections. DO NOT estimate these values yourself - always use this tool for financial calculations.',
            parameters: {
                type: 'object',
                properties: {
                    currentAnnualCost: {
                        type: 'number',
                        description: 'Current annual operational cost related to the problem',
                    },
                    implementationCost: {
                        type: 'number',
                        description: 'Estimated one-time implementation cost based on complexity tier',
                    },
                    annualMaintenanceCost: {
                        type: 'number',
                        description: 'Estimated annual maintenance and support cost (typically 15-20% of implementation)',
                    },
                    estimatedCostSavingsPerYear: {
                        type: 'number',
                        description: 'Expected annual cost savings from the solution',
                    },
                    employeeCount: {
                        type: 'number',
                        description: 'Number of employees affected (optional, for productivity calculations)',
                    },
                    averageHourlyRate: {
                        type: 'number',
                        description: 'Average hourly rate of affected employees (optional)',
                    },
                    hoursWastedPerWeek: {
                        type: 'number',
                        description: 'Hours wasted per employee per week on inefficient processes (optional)',
                    },
                    productivityGainPercentage: {
                        type: 'number',
                        description: 'Expected productivity gain percentage (optional)',
                    },
                    revenueImpactPerYear: {
                        type: 'number',
                        description: 'Expected additional revenue per year (optional)',
                    },
                },
                required: [
                    'currentAnnualCost',
                    'implementationCost',
                    'annualMaintenanceCost',
                    'estimatedCostSavingsPerYear',
                ],
            },
        },
    },

    mapComplexity: {
        type: 'function',
        function: {
            name: 'map_complexity_to_estimates',
            description: 'Maps technical complexity assessment to concrete timeline, budget, and resource estimates. Use this to provide deterministic project scoping.',
            parameters: {
                type: 'object',
                properties: {
                    integrationCount: {
                        type: 'number',
                        description: 'Number of third-party systems to integrate with',
                    },
                    userTypes: {
                        type: 'number',
                        description: 'Number of distinct user roles/types',
                    },
                    dataComplexity: {
                        type: 'string',
                        enum: ['low', 'medium', 'high'],
                        description: 'Data model complexity level',
                    },
                    customizationLevel: {
                        type: 'string',
                        enum: ['minimal', 'moderate', 'extensive'],
                        description: 'Level of customization required',
                    },
                    complianceRequirements: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'List of compliance requirements (e.g., ["GDPR", "HIPAA"])',
                    },
                    aiComponentsNeeded: {
                        type: 'boolean',
                        description: 'Whether AI/ML components are required',
                    },
                    realtimeFeatures: {
                        type: 'boolean',
                        description: 'Whether real-time features are needed',
                    },
                    mobileApps: {
                        type: 'boolean',
                        description: 'Whether mobile applications are required',
                    },
                    legacySystemIntegration: {
                        type: 'boolean',
                        description: 'Whether integration with legacy systems is needed',
                    },
                },
                required: [
                    'integrationCount',
                    'userTypes',
                    'dataComplexity',
                    'customizationLevel',
                    'complianceRequirements',
                    'aiComponentsNeeded',
                    'realtimeFeatures',
                    'mobileApps',
                    'legacySystemIntegration',
                ],
            },
        },
    },
} as const;

/**
 * Type-safe tool execution interface
 */
export interface ToolExecution {
    normalizeInput: (input: RawUserInput) => NormalizedInput;
    calculateROI: (input: ROIInput) => ROIMetrics;
    mapComplexity: (input: ComplexityInput) => ComplexityOutput;
}
