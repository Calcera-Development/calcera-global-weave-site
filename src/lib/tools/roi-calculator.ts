/**
 * ROI Calculator Tool
 * Pure TypeScript function for calculating Return on Investment metrics
 * NO LLM DEPENDENCIES - deterministic calculations only
 */

export interface ROIInput {
    // Current state
    currentAnnualCost: number; // Current operational cost per year
    employeeCount?: number;
    averageHourlyRate?: number;
    hoursWastedPerWeek?: number;

    // Proposed solution
    implementationCost: number; // One-time cost
    annualMaintenanceCost: number; // Recurring yearly cost

    // Expected improvements
    estimatedCostSavingsPerYear: number; // Expected yearly savings
    productivityGainPercentage?: number; // e.g., 25 = 25% productivity gain
    revenueImpactPerYear?: number; // Additional revenue generated
}

export interface ROIMetrics {
    // Core metrics
    breakEvenMonths: number;
    paybackPeriod: string; // Human-readable

    // Financial analysis
    year1ROI: number; // Percentage
    year3ROI: number;
    year5ROI: number;

    netPresentValue3Year: number;
    netPresentValue5Year: number;

    // Detailed breakdown
    totalCostYear1: number;
    totalCostYear3: number;
    totalCostYear5: number;

    totalSavingsYear1: number;
    totalSavingsYear3: number;
    totalSavingsYear5: number;

    // Summary
    recommendation: 'strong' | 'moderate' | 'weak' | 'reconsider';
    confidenceLevel: 'high' | 'medium' | 'low';
    riskFactors: string[];
}

const DISCOUNT_RATE = 0.08; // 8% discount rate for NPV calculations

/**
 * Calculate NPV (Net Present Value)
 */
function calculateNPV(cashflows: number[], discountRate: number): number {
    return cashflows.reduce((npv, cashflow, year) => {
        return npv + cashflow / Math.pow(1 + discountRate, year);
    }, 0);
}

/**
 * Main ROI calculation function
 */
export function calculateROI(input: ROIInput): ROIMetrics {
    // Validate inputs
    if (input.implementationCost < 0 || input.annualMaintenanceCost < 0) {
        throw new Error('Costs cannot be negative');
    }

    if (input.estimatedCostSavingsPerYear <= 0) {
        throw new Error('Estimated cost savings must be positive');
    }

    // Calculate additional productivity-based savings
    let productivitySavings = 0;
    if (
        input.employeeCount &&
        input.averageHourlyRate &&
        input.hoursWastedPerWeek &&
        input.productivityGainPercentage
    ) {
        const weeksPerYear = 52;
        const currentWastePerYear =
            input.employeeCount *
            input.hoursWastedPerWeek *
            weeksPerYear *
            input.averageHourlyRate;

        productivitySavings = currentWastePerYear * (input.productivityGainPercentage / 100);
    }

    // Total annual savings
    const totalAnnualSavings =
        input.estimatedCostSavingsPerYear +
        productivitySavings +
        (input.revenueImpactPerYear || 0);

    // Year 1 calculations
    const totalCostYear1 = input.implementationCost + input.annualMaintenanceCost;
    const totalSavingsYear1 = totalAnnualSavings;
    const netYear1 = totalSavingsYear1 - totalCostYear1;

    // Year 3 calculations
    const totalCostYear3 = input.implementationCost + (input.annualMaintenanceCost * 3);
    const totalSavingsYear3 = totalAnnualSavings * 3;
    const netYear3 = totalSavingsYear3 - totalCostYear3;

    // Year 5 calculations
    const totalCostYear5 = input.implementationCost + (input.annualMaintenanceCost * 5);
    const totalSavingsYear5 = totalAnnualSavings * 5;
    const netYear5 = totalSavingsYear5 - totalCostYear5;

    // ROI percentages
    const year1ROI = ((totalSavingsYear1 - totalCostYear1) / totalCostYear1) * 100;
    const year3ROI = ((totalSavingsYear3 - totalCostYear3) / totalCostYear3) * 100;
    const year5ROI = ((totalSavingsYear5 - totalCostYear5) / totalCostYear5) * 100;

    // Break-even calculation
    let breakEvenMonths: number;
    if (totalAnnualSavings <= input.annualMaintenanceCost) {
        breakEvenMonths = 999; // Never breaks even
    } else {
        const monthlyNetSavings = (totalAnnualSavings - input.annualMaintenanceCost) / 12;
        breakEvenMonths = Math.ceil(input.implementationCost / monthlyNetSavings);
    }

    const paybackPeriod = breakEvenMonths >= 999
        ? 'Does not break even'
        : breakEvenMonths <= 12
            ? `${breakEvenMonths} months`
            : `${Math.floor(breakEvenMonths / 12)} years ${breakEvenMonths % 12} months`;

    // NPV calculations
    const cashflowsYear3 = [
        -input.implementationCost, // Year 0
        totalAnnualSavings - input.annualMaintenanceCost, // Year 1
        totalAnnualSavings - input.annualMaintenanceCost, // Year 2
        totalAnnualSavings - input.annualMaintenanceCost, // Year 3
    ];

    const cashflowsYear5 = [
        ...cashflowsYear3,
        totalAnnualSavings - input.annualMaintenanceCost, // Year 4
        totalAnnualSavings - input.annualMaintenanceCost, // Year 5
    ];

    const netPresentValue3Year = calculateNPV(cashflowsYear3, DISCOUNT_RATE);
    const netPresentValue5Year = calculateNPV(cashflowsYear5, DISCOUNT_RATE);

    // Recommendation logic
    const riskFactors: string[] = [];
    let recommendation: ROIMetrics['recommendation'];
    let confidenceLevel: ROIMetrics['confidenceLevel'];

    if (breakEvenMonths >= 36) {
        riskFactors.push('Long payback period (>3 years)');
    }

    if (year1ROI < 0) {
        riskFactors.push('Negative first-year ROI');
    }

    if (input.implementationCost > input.currentAnnualCost * 2) {
        riskFactors.push('Implementation cost exceeds 2x current annual cost');
    }

    if (netPresentValue5Year < 0) {
        riskFactors.push('Negative 5-year NPV');
    }

    // Determine recommendation
    if (breakEvenMonths <= 12 && year3ROI > 100 && netPresentValue3Year > 0) {
        recommendation = 'strong';
        confidenceLevel = 'high';
    } else if (breakEvenMonths <= 24 && year3ROI > 50 && netPresentValue3Year > 0) {
        recommendation = 'moderate';
        confidenceLevel = year1ROI > 0 ? 'medium' : 'low';
    } else if (breakEvenMonths <= 36 && year5ROI > 50) {
        recommendation = 'weak';
        confidenceLevel = 'low';
    } else {
        recommendation = 'reconsider';
        confidenceLevel = 'low';
        riskFactors.push('ROI does not meet investment criteria');
    }

    return {
        breakEvenMonths,
        paybackPeriod,

        year1ROI: Math.round(year1ROI * 100) / 100,
        year3ROI: Math.round(year3ROI * 100) / 100,
        year5ROI: Math.round(year5ROI * 100) / 100,

        netPresentValue3Year: Math.round(netPresentValue3Year),
        netPresentValue5Year: Math.round(netPresentValue5Year),

        totalCostYear1: Math.round(totalCostYear1),
        totalCostYear3: Math.round(totalCostYear3),
        totalCostYear5: Math.round(totalCostYear5),

        totalSavingsYear1: Math.round(totalSavingsYear1),
        totalSavingsYear3: Math.round(totalSavingsYear3),
        totalSavingsYear5: Math.round(totalSavingsYear5),

        recommendation,
        confidenceLevel,
        riskFactors,
    };
}

/**
 * Helper function to estimate implementation cost based on complexity
 * This can be called by the LLM to get baseline estimates
 */
export function estimateImplementationCost(complexity: string): number {
    const estimates: Record<string, number> = {
        T1: 50000,   // Simple: $50K
        T2: 150000,  // Medium: $150K
        T3: 350000,  // Complex: $350K
        T4: 750000,  // Enterprise: $750K
    };

    return estimates[complexity] || estimates.T2;
}
