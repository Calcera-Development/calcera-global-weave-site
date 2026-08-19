import React from 'react';
import { ArrowRight, Sparkles, Code, Workflow, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
    heroRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLElement>;
    workRef: React.RefObject<HTMLElement>;
    scrollToSection: (ref: React.RefObject<HTMLElement | HTMLDivElement>) => void;
}

const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "4 wk", label: "Avg. MVP Time" },
    { number: "3+", label: "Years of Excellence" },
];

// Three cards, one per word of the headline. Each states what it actually
// means for the client, so the visual carries real content, not decoration.
const HeroGraphic = () => (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-sm">
        <div
            className="absolute -inset-8 bg-blue-500/10 rounded-[3rem] blur-2xl"
            aria-hidden="true"
        />

        <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm -rotate-3 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-2.5 rounded-xl bg-slate-100">
                        <Code className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900 text-sm">Build</p>
                        <p className="text-xs text-slate-500">AI products & SaaS platforms</p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md rotate-2 relative z-20 -mt-3 ml-6 sm:ml-8">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-2.5 rounded-xl bg-blue-50">
                        <Workflow className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900 text-sm">Automate</p>
                        <p className="text-xs text-slate-500">Workflows that run themselves</p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-600 p-5 shadow-xl shadow-blue-600/20 -rotate-1 relative z-30 -mt-3 animate-float">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-2.5 rounded-xl bg-white/15">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="font-semibold text-white text-sm">Scale</p>
                        <p className="text-xs text-blue-100">Shipped in 4 weeks, on average</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Hero = ({ heroRef, contactRef, workRef, scrollToSection }: HeroProps) => {
    return (
        <section id="hero" ref={heroRef} className="relative overflow-hidden" aria-label="Hero section">
            <div className="h-[3px] bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" aria-hidden="true" />

            <div className="relative border-b border-slate-200">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.08), transparent)" }}
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pb-24 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Content */}
                        <div className="text-center lg:text-left">
                            <h1
                                className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-[1.05] tracking-tight"
                                style={{ animationDelay: "80ms" }}
                            >
                                Build. <span className="text-blue-600">Automate.</span><br className="hidden sm:block" /> Scale.
                            </h1>

                            <p
                                className="animate-fade-up text-lg sm:text-xl text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                                style={{ animationDelay: "240ms" }}
                            >
                                We build AI products, SaaS platforms, and workflow automation that ship in weeks, not quarters.
                            </p>

                            <div
                                className="animate-fade-up flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
                                style={{ animationDelay: "320ms" }}
                            >
                                <Button
                                    size="xl"
                                    className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-300"
                                    onClick={() => scrollToSection(contactRef)}
                                    aria-label="Book a free consultation with Calcera Global"
                                >
                                    Book a Consultation
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <a href="/ai-diagnostic" className="w-full sm:w-auto">
                                    <Button
                                        size="xl"
                                        variant="outline"
                                        className="w-full border-slate-300 text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl"
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Try the AI Diagnostic
                                    </Button>
                                </a>
                            </div>

                            <button
                                onClick={() => scrollToSection(workRef)}
                                className="animate-fade-up mt-6 text-sm text-slate-400 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-blue-400"
                                style={{ animationDelay: "380ms" }}
                            >
                                See our work
                            </button>
                        </div>

                        {/* Visual */}
                        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                            <HeroGraphic />
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics strip - lives under the hero, not inside it */}
            <div className="bg-slate-50/60 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center justify-center text-center py-6 px-4">
                                <span className="text-2xl font-bold text-slate-900 tracking-tight">{stat.number}</span>
                                <span className="text-xs text-slate-500 mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
