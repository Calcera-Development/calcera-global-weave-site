import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    BarChart3,
    Globe,
    Zap,
    Database,
    Cpu,
    Rocket,
    Layers,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { DiagnosticResponse } from '@/types/diagnostic';
import { StackCard, ROIMetric } from './DiagnosticSubComponents';

interface DiagnosticDashboardProps {
    reportData: DiagnosticResponse;
    userEmail: string;
    companyName: string;
}

export const DiagnosticDashboard = ({ reportData, userEmail, companyName }: DiagnosticDashboardProps) => {
    const navigate = useNavigate();
    const r = reportData.report;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Dashboard Header */}
            <div className="bg-white border rounded-2xl p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="h-12 w-12 md:h-16 md:w-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                        <ShieldCheck className="w-6 h-6 md:w-10 md:h-10" />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1 overflow-hidden">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-wider whitespace-nowrap">Solution Design</span>
                            <span className="text-slate-400 text-xs shrink-0">•</span>
                            <span className="text-slate-500 text-[10px] md:text-xs font-medium truncate">Ref ID: {reportData.reportId.slice(0, 8)}</span>
                        </div>
                        <h2 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight truncate">Enterprise Strategy Overview</h2>
                    </div>
                </div>
                <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none text-xs md:text-sm h-9 md:h-10" onClick={() => navigate(0)}>New Request</Button>
                    <Button size="sm" className="flex-1 md:flex-none text-xs md:text-sm h-9 md:h-10 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100" onClick={() => navigate('/#contact')}>Book Deep Dive</Button>
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
                                        {r.operationalDiagnosis.rootCauses.map((cause, i) => (
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
                            <StackCard icon={Globe} title="User Experience" content={r.recommendedArchitecture.frontend} />
                            <StackCard icon={Zap} title="Service Layer" content={r.recommendedArchitecture.backend} />
                            <StackCard icon={Database} title="Data Systems" content={r.recommendedArchitecture.database} />
                            <StackCard icon={Cpu} title="AI Capability" content={r.recommendedArchitecture.aiComponents || 'N/A'} />
                            <StackCard icon={Rocket} title="Infrastructure" content={r.recommendedArchitecture.infrastructure} color="bg-orange-50" iconColor="text-orange-600" />
                            <StackCard icon={Layers} title="Integrations" content={r.recommendedArchitecture.integrations} color="bg-emerald-50" iconColor="text-emerald-600" />
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
                                    {r.timelineEstimate.phaseBreakdown && Object.entries(r.timelineEstimate.phaseBreakdown).map(([phase, duration]) => (
                                        <div key={phase} className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500 capitalize">{phase}</span>
                                            <span className="font-bold text-slate-900">{duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-indigo-50 p-6 flex flex-col gap-3 border-t">
                                <p className="text-xs font-bold text-indigo-900 uppercase">Strategic Next Steps</p>
                                {r.strategicRecommendation.nextSteps.map((step, i) => (
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
                    A detailed white-paper format of this diagnostic has been sent to <strong>{userEmail}</strong>.
                    Let's discuss how we can bring this architecture to life for {companyName}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <Button className="bg-white text-indigo-600 hover:bg-slate-50 font-bold px-8 h-12 rounded-xl" onClick={() => navigate('/#contact')}>
                        Schedule Strategy Session
                    </Button>
                </div>
            </div>
        </div>
    );
};
