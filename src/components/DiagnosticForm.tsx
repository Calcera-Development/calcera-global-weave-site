import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Loader2,
    Sparkles,
    CheckCircle2,
    Building2,
    Target,
    Rocket,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    BarChart3,
    Cpu,
    Globe,
    Database,
    Zap,
    AlertCircle,
    Layers,
    Clock,
    DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface DiagnosticFormData {
    companyName: string;
    industry: string;
    companySize: string;
    revenue: string;
    email: string;
    challenges: string;
    desiredOutcomes: string;
}

interface DiagnosticResponse {
    success: boolean;
    reportId: string;
    report: any;
    complexity: any;
    roi: any;
}

export default function DiagnosticForm() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [reportData, setReportData] = useState<DiagnosticResponse | null>(null);

    const [formData, setFormData] = useState<DiagnosticFormData>({
        companyName: '',
        industry: '',
        companySize: '',
        revenue: '',
        email: '',
        challenges: '',
        desiredOutcomes: '',
    });

    const handleChange = (field: keyof DiagnosticFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.companyName || !formData.industry || !formData.email) {
                toast({
                    title: "Required Fields",
                    description: "Please fill in company details and your business email.",
                    variant: "destructive"
                });
                return;
            }
        }
        setStep(prev => Math.min(prev + 1, 2));
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.challenges) {
            toast({
                title: 'Operational Context',
                description: 'Please describe your challenges so the AI can provide an accurate analysis.',
                variant: 'destructive',
            });
            return;
        }

        setIsProcessing(true);

        try {
            const { data, error } = await supabase.functions.invoke('ai-diagnostic', {
                body: formData,
            });

            if (error) throw error;

            setReportData(data as DiagnosticResponse);

            // Send report via email
            const { error: emailError } = await supabase.functions.invoke('send-diagnostic-report', {
                body: { reportId: data.reportId },
            });

            if (emailError) throw emailError;

            setIsComplete(true);

            toast({
                title: 'Analysis Complete! ✨',
                description: 'Your premium diagnostic report is ready and has been sent to your inbox.',
            });

        } catch (err: any) {
            console.error('Diagnostic Error:', err);
            toast({
                title: 'Synthesis Failed',
                description: 'We encountered an error while analyzing your data. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // --- SUCCESS DASHBOARD ---
    if (isComplete && reportData) {
        const r = reportData.report;
        return (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Dashboard Header */}
                <div className="bg-white border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wider">Solution Design</span>
                                <span className="text-slate-400 text-xs">•</span>
                                <span className="text-slate-500 text-xs font-medium">Ref ID: {reportData.reportId.slice(0, 8)}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Strategy Overview</h2>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.location.reload()}>New Request</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100" onClick={() => window.location.href = '#contact'}>Book Deep Dive</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Diagnostic Summary Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Executive Diagnosis */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b py-4">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-bold text-slate-900">Operational Diagnosis</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-slate-600 leading-relaxed mb-6 italic">"{r.operationalDiagnosis.executiveSummary}"</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Root Causes</h4>
                                        <ul className="space-y-3">
                                            {r.operationalDiagnosis.rootCauses.map((cause: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                                                    <span className="text-sm text-slate-600">{cause}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Business Impact</h4>
                                        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                                            <p className="text-sm text-red-900 leading-relaxed font-medium">{r.operationalDiagnosis.businessImpact}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Technology Stack Recommendations */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <Layers className="w-5 h-5 text-indigo-600" />
                                <h3 className="font-bold text-slate-900">Recommended Architecture Stack</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <StackCard icon={<Globe className="w-5 h-5" />} title="User Experience" content={r.recommendedArchitecture.frontend} />
                                <StackCard icon={<Zap className="w-5 h-5" />} title="Service Layer" content={r.recommendedArchitecture.backend} />
                                <StackCard icon={<Database className="w-5 h-5" />} title="Data Systems" content={r.recommendedArchitecture.database} />
                                <StackCard icon={<Cpu className="w-5 h-5" />} title="AI Capability" content={r.recommendedArchitecture.aiComponents} />
                                <StackCard icon={<Rocket className="w-5 h-5" />} title="Infrastructure" content={r.recommendedArchitecture.infrastructure} color="bg-orange-50" iconColor="text-orange-600" />
                                <StackCard icon={<Layers className="w-5 h-5" />} title="Integrations" content={r.recommendedArchitecture.integrations} color="bg-emerald-50" iconColor="text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    {/* Financial & Roadmap Sidebar */}
                    <div className="space-y-8">
                        {/* Financial Analysis */}
                        <Card className="bg-slate-900 text-white border-none shadow-xl">
                            <CardHeader className="border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                    <h3 className="font-bold">ROI Projections</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="text-center pb-4">
                                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Complexity Tier</p>
                                    <h4 className="text-3xl font-bold text-blue-400">{r.complexityClassification.tier}</h4>
                                    <p className="text-sm text-slate-400 mt-1">{r.complexityClassification.label}</p>
                                </div>

                                <div className="space-y-4">
                                    <ROIMetric label="Payback Period" value={r.financialImpact.roiMetrics.paybackPeriod} sub="Estimated Break Even" />
                                    <ROIMetric label="3-Year ROI" value={`${r.financialImpact.roiMetrics.year3ROI}%`} sub="Total Transformation Gain" />
                                    <ROIMetric label="Budget Alignment" value={r.financialImpact.budgetBand} sub="Industry Standard Allocation" />
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800">
                                    <div className="bg-blue-600/20 border border-blue-600/30 rounded-xl p-4 text-center">
                                        <p className="text-xs text-blue-200 font-bold uppercase mb-1">Verdict</p>
                                        <p className="text-sm font-medium text-white capitalize">{r.financialImpact.recommendation.replace('_', ' ')} Investment</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Implementation Timeline */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b py-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-bold text-slate-900">Roadmap</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="p-6 bg-white">
                                    <p className="text-sm font-bold text-slate-900 mb-4 tracking-tight">Timeline: <span className="text-indigo-600">{r.timelineEstimate.range}</span></p>
                                    <div className="space-y-4">
                                        {Object.entries(r.timelineEstimate.phaseBreakdown).map(([phase, duration]: [string, any], i) => (
                                            <div key={phase} className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500 capitalize">{phase}</span>
                                                <span className="font-bold text-slate-900">{duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-indigo-50 p-6 flex flex-col gap-3 border-t">
                                    <p className="text-xs font-bold text-indigo-900 uppercase">Strategic Next Steps</p>
                                    {r.strategicRecommendation.nextSteps.map((step: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-indigo-900">
                                            <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center font-bold text-[10px] text-indigo-600 shadow-sm shrink-0">{i + 1}</div>
                                            <span>{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Email Confirmation CTA */}
                <div className="bg-indigo-600 rounded-3xl p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Rocket className="w-48 h-48 rotate-12" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 relative z-10">Ready to accelerate?</h3>
                    <p className="text-indigo-100 max-w-2xl mx-auto mb-8 text-lg relative z-10">
                        A detailed white-paper format of this diagnostic has been sent to <strong>{formData.email}</strong>.
                        Let's discuss how we can bring this architecture to life for {formData.companyName}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Button className="bg-white text-indigo-600 hover:bg-slate-50 font-bold px-8 h-12 rounded-xl" onClick={() => window.location.href = '#contact'}>
                            Schedule Strategy Session
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // --- MULTI-STEP FORM ---
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-12 relative h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-500 ease-out rounded-full shadow-sm"
                    style={{ width: `${(step / 2) * 100}%` }}
                />
            </div>

            <Card className="border-none shadow-2xl shadow-blue-50/50 rounded-3xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                    {/* Sidebar / Context */}
                    <div className="md:col-span-2 bg-slate-900 p-8 text-white flex flex-col justify-between overflow-hidden relative">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-lg tracking-tight">AI Architect</span>
                            </div>

                            <h3 className="text-2xl font-bold leading-tight mb-6">
                                {step === 1 ? "Let's start with the foundations." : "How can we help you scale?"}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                {step === 1
                                    ? "Provide your company context. This helps our AI calibrate the ROI models and complexity tiers specific to your industry."
                                    : "Tell us about your operational friction. Be as detailed as possible to receive a high-fidelity roadmap."}
                            </p>

                            <div className="space-y-4">
                                <div className={cn("flex items-center gap-4 transition-all duration-300", step === 1 ? "opacity-100" : "opacity-40 grayscale")}>
                                    <div className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold font-mono">01</div>
                                    <span className="text-sm font-medium">Business Context</span>
                                </div>
                                <div className={cn("flex items-center gap-4 transition-all duration-300", step === 2 ? "opacity-100" : "opacity-40 grayscale")}>
                                    <div className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold font-mono">02</div>
                                    <span className="text-sm font-medium">Strategic Vision</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise Privacy</span>
                            </div>
                            <p className="text-[11px] text-slate-500">Your data is processed by private AI instances and encrypted at rest.</p>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="md:col-span-3 bg-white p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-between">
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                {step === 1 ? (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="companyName" className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Name</Label>
                                                <Input
                                                    id="companyName"
                                                    value={formData.companyName}
                                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                                    placeholder="Acme Enterprise"
                                                    className="h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all font-medium"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="industry" className="text-xs font-bold uppercase tracking-widest text-slate-500">Industry</Label>
                                                    <Input
                                                        id="industry"
                                                        value={formData.industry}
                                                        onChange={(e) => handleChange('industry', e.target.value)}
                                                        placeholder="Healthcare"
                                                        className="h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="companySize" className="text-xs font-bold uppercase tracking-widest text-slate-500">Scale</Label>
                                                    <Input
                                                        id="companySize"
                                                        value={formData.companySize}
                                                        onChange={(e) => handleChange('companySize', e.target.value)}
                                                        placeholder="Enterprise"
                                                        className="h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Corporate Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    placeholder="exec@company.com"
                                                    className="h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all font-medium"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="challenges" className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Obstacles</Label>
                                                <Textarea
                                                    id="challenges"
                                                    value={formData.challenges}
                                                    onChange={(e) => handleChange('challenges', e.target.value)}
                                                    placeholder="Describe your current bottlenecks, manual processes, and system integration gaps..."
                                                    rows={6}
                                                    required
                                                    className="bg-slate-50 border-none rounded-2xl focus-visible:ring-blue-600 transition-all resize-none p-4"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="desiredOutcomes" className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Objectives</Label>
                                                <Input
                                                    id="desiredOutcomes"
                                                    value={formData.desiredOutcomes}
                                                    onChange={(e) => handleChange('desiredOutcomes', e.target.value)}
                                                    placeholder="e.g., 40% reduction in manual data entry"
                                                    className="h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-8 mt-auto flex items-center justify-between">
                                {step > 1 ? (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="text-slate-500 hover:text-slate-900 font-bold gap-2"
                                        onClick={prevStep}
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </Button>
                                ) : <div />}

                                {step === 1 ? (
                                    <Button
                                        type="button"
                                        className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold gap-2"
                                        onClick={nextStep}
                                    >
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold gap-2"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Synthesizing...
                                            </>
                                        ) : (
                                            <>
                                                Generate Strategy <Rocket className="w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </Card>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <TrustBadge icon={<Building2 className="w-4 h-4" />} text="Sector Calibration" />
                <TrustBadge icon={<Target className="w-4 h-4" />} text="ROI Modelling" />
                <TrustBadge icon={<Cpu className="w-4 h-4" />} text="Tech Stack Audit" />
                <TrustBadge icon={<Zap className="w-4 h-4" />} text="Rapid Roadmap" />
            </div>
        </div>
    );
}

// --- HELPER COMPONENTS ---

function StackCard({ icon, title, content, color = "bg-blue-50", iconColor = "text-blue-600" }: any) {
    return (
        <Card className="border-none shadow-none bg-slate-50/50 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-4 shadow-sm", color, iconColor)}>
                {icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{content}</p>
        </Card>
    );
}

function ROIMetric({ label, value, sub }: any) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <p className="text-xs font-bold text-slate-500 mb-0.5 uppercase tracking-wider">{label}</p>
                <p className="text-[10px] text-slate-600 font-medium">{sub}</p>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-white tracking-tight">{value}</p>
            </div>
        </div>
    );
}

function TrustBadge({ icon, text }: any) {
    return (
        <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                {icon}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{text}</span>
        </div>
    );
}
