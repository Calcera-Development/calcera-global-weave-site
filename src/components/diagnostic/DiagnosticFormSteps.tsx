import React from 'react';
import {
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Loader2,
    Rocket,
    ShieldCheck,
    Building2,
    Target,
    Cpu,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { DiagnosticFormData } from '@/types/diagnostic';
import { cn } from '@/lib/utils';
import { TrustBadge } from './DiagnosticSubComponents';

interface DiagnosticFormStepsProps {
    step: number;
    formData: DiagnosticFormData;
    isProcessing: boolean;
    onHandleChange: (field: keyof DiagnosticFormData, value: string) => void;
    onNextStep: () => void;
    onPrevStep: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const DiagnosticFormSteps = ({
    step,
    formData,
    isProcessing,
    onHandleChange,
    onNextStep,
    onPrevStep,
    onSubmit
}: DiagnosticFormStepsProps) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
            <div className="mb-8 md:mb-12 relative h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-500 ease-out rounded-full shadow-sm"
                    style={{ width: `${(step / 2) * 100}%` }}
                />
            </div>

            <Card className="border-none shadow-2xl shadow-blue-50/50 rounded-3xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                    {/* Sidebar / Context */}
                    <div className="md:col-span-2 bg-slate-900 p-6 md:p-8 text-white flex flex-col justify-between overflow-hidden relative">
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
                    <div className="md:col-span-3 bg-white p-6 md:p-12">
                        <form onSubmit={onSubmit} className="space-y-6 md:space-y-8 h-full flex flex-col justify-between">
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                {step === 1 ? (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="companyName" className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Name</Label>
                                                <Input
                                                    id="companyName"
                                                    value={formData.companyName}
                                                    onChange={(e) => onHandleChange('companyName', e.target.value)}
                                                    placeholder="Acme Enterprise"
                                                    className="h-10 md:h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all font-medium text-sm md:text-base"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="industry" className="text-xs font-bold uppercase tracking-widest text-slate-500">Industry</Label>
                                                    <Input
                                                        id="industry"
                                                        value={formData.industry}
                                                        onChange={(e) => onHandleChange('industry', e.target.value)}
                                                        placeholder="Healthcare"
                                                        className="h-10 md:h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all text-sm md:text-base"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="companySize" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">Scale</Label>
                                                    <Input
                                                        id="companySize"
                                                        value={formData.companySize}
                                                        onChange={(e) => onHandleChange('companySize', e.target.value)}
                                                        placeholder="Enterprise"
                                                        className="h-10 md:h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all text-sm md:text-base"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Corporate Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => onHandleChange('email', e.target.value)}
                                                    placeholder="exec@company.com"
                                                    className="h-10 md:h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all font-medium text-sm md:text-base"
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
                                                    onChange={(e) => onHandleChange('challenges', e.target.value)}
                                                    placeholder="Describe your current bottlenecks..."
                                                    rows={4}
                                                    required
                                                    className="bg-slate-50 border-none rounded-2xl focus-visible:ring-blue-600 transition-all resize-none p-3 md:p-4 text-sm md:text-base"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="desiredOutcomes" className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Objectives</Label>
                                                <Input
                                                    id="desiredOutcomes"
                                                    value={formData.desiredOutcomes}
                                                    onChange={(e) => onHandleChange('desiredOutcomes', e.target.value)}
                                                    placeholder="e.g., 40% reduction..."
                                                    className="h-10 md:h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600 transition-all text-sm md:text-base"
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
                                        onClick={onPrevStep}
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </Button>
                                ) : <div />}

                                {step === 1 ? (
                                    <Button
                                        type="button"
                                        className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold gap-2"
                                        onClick={onNextStep}
                                    >
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="h-10 md:h-12 px-4 md:px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold gap-2 text-xs md:text-base whitespace-nowrap"
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
                <TrustBadge icon={Building2} text="Sector Calibration" />
                <TrustBadge icon={Target} text="ROI Modelling" />
                <TrustBadge icon={Cpu} text="Tech Stack Audit" />
                <TrustBadge icon={Zap} text="Rapid Roadmap" />
            </div>
        </div>
    );
};
