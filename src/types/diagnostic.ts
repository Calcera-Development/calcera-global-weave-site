export interface DiagnosticFormData {
    companyName: string;
    industry: string;
    companySize: string;
    revenue: string;
    email: string;
    challenges: string;
    desiredOutcomes: string;
}

export interface OperationalDiagnosis {
    executiveSummary: string;
    rootCauses: string[];
    businessImpact: string;
}

export interface RecommendedArchitecture {
    frontend: string;
    backend: string;
    database: string;
    integrations: string;
    aiComponents?: string;
    infrastructure: string;
}

export interface ComplexityClassification {
    tier: 'T1' | 'T2' | 'T3' | 'T4';
    label: string;
    rationale: string;
}

export interface TimelineEstimate {
    range: string;
    weeks: number;
    phaseBreakdown?: {
        discovery: string;
        design: string;
        development: string;
        testing: string;
        deployment: string;
    };
}

export interface ROIMetrics {
    breakEvenMonths: number;
    paybackPeriod: string;
    year1ROI: number;
    year3ROI: number;
    year5ROI: number;
}

export interface FinancialImpact {
    budgetBand: string;
    roiMetrics: ROIMetrics;
    recommendation: 'strong' | 'moderate' | 'weak' | 'reconsider';
}

export interface StrategicRecommendation {
    shouldProceed: boolean;
    phasedApproach: boolean;
    keySuccessFactors: string[];
    riskFactors?: string[];
    nextSteps: string[];
}

export interface DiagnosticReport {
    operationalDiagnosis: OperationalDiagnosis;
    recommendedArchitecture: RecommendedArchitecture;
    complexityClassification: ComplexityClassification;
    timelineEstimate: TimelineEstimate;
    financialImpact: FinancialImpact;
    strategicRecommendation: StrategicRecommendation;
}

export interface DiagnosticResponse {
    success: boolean;
    reportId: string;
    report: DiagnosticReport;
    complexity: {
        tier: string;
        label: string;
        timeline: string;
    };
    roi: {
        breakEven: string;
        year1Ratio: string;
    };
}
