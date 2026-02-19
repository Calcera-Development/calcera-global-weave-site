import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DiagnosticFormData, DiagnosticResponse } from '@/types/diagnostic';
import { DiagnosticFormSteps } from './diagnostic/DiagnosticFormSteps';
import { DiagnosticDashboard } from './diagnostic/DiagnosticDashboard';
import { Button } from './ui/button';

export default function DiagnosticForm() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [formData, setFormData] = useState<DiagnosticFormData>({
        companyName: '',
        industry: '',
        companySize: '',
        revenue: '',
        email: '',
        challenges: '',
        desiredOutcomes: ''
    });
    const [reportData, setReportData] = useState<DiagnosticResponse | null>(null);

    const handleChange = (field: keyof DiagnosticFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.companyName || !formData.industry || !formData.email) {
                toast({
                    title: "Missing Information",
                    description: "Please fill in all required corporate details.",
                    variant: "destructive"
                });
                return;
            }
        }
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            console.log("Submitting diagnostic request for:", formData.companyName);
            const { data, error } = await supabase.functions.invoke('ai-diagnostic', {
                body: formData
            });

            if (error) {
                console.error("Supabase function error:", error);
                throw error;
            }

            const diagnosticData = data as DiagnosticResponse;
            console.log("Diagnostic synthesis complete:", diagnosticData.reportId);

            setReportData(diagnosticData);
            setIsComplete(true);

            toast({
                title: "Strategy Synthesized",
                description: "Your enterprise roadmap is ready.",
            });

        } catch (error: unknown) {
            console.error("Diagnostic error process:", error);

            let errorMessage = "Our AI architect encountered an issue. Please try again.";

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'FunctionsHttpError') {
                const httpError = error as { status?: number };
                errorMessage = `Connection error: ${httpError.status || 'unknown'}. Please refresh.`;
            }

            toast({
                title: "Processing Failed",
                description: errorMessage,
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (isComplete && reportData && reportData.report) {
        const r = reportData.report;

        // Defensive guards for nested report structure
        if (!r.operationalDiagnosis || !r.recommendedArchitecture || !r.financialImpact) {
            return (
                <div className="p-8 text-center bg-white rounded-2xl border">
                    <h3 className="text-xl font-bold mb-2">Partial Data Warning</h3>
                    <p className="text-slate-500">The analysis generated, but some sections are missing. Please refresh and try again.</p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>Refresh</Button>
                </div>
            );
        }

        return (
            <DiagnosticDashboard
                reportData={reportData}
                userEmail={formData.email}
                companyName={formData.companyName}
            />
        );
    }

    return (
        <DiagnosticFormSteps
            step={step}
            formData={formData}
            isProcessing={isProcessing}
            onHandleChange={handleChange}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            onSubmit={handleSubmit}
        />
    );
}
