import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedWrapper from './AnimatedWrapper';

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

const techStack = ["React", "Next.js", "TypeScript", "OpenAI", "Claude AI", "LangGraph", "Python", "RAG Systems"];

const Hero = ({ heroRef, contactRef, workRef, scrollToSection }: HeroProps) => {
    return (
        <section id="hero" ref={heroRef} className="relative min-h-[95dvh] flex items-center pt-32 sm:pt-44 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden mesh-gradient noise-overlay" aria-label="Hero section">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] mesh-gradient opacity-60" />
                <div className="absolute top-1/4 left-10 w-[20rem] h-[20rem] bg-blue-500/10 rounded-full blur-[100px] animate-float opacity-50 block md:hidden" />
                <div className="absolute top-1/3 -right-20 w-[40rem] h-[40rem] bg-indigo-500/15 rounded-full blur-[160px] animate-float lg:block hidden" style={{ animationDelay: "2s" }} />
                <div className="absolute -bottom-40 left-1/4 w-[50rem] h-[50rem] bg-cyan-400/5 rounded-full blur-[200px] animate-pulse lg:block hidden" style={{ animationDelay: "4s" }} />
                <div className="absolute inset-0 grid-bg opacity-[0.03]" />
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
                {/* Badge */}
                <AnimatedWrapper animation="fade-up" delay="100ms">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm transition-all duration-300 hover:scale-105 select-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wider uppercase">Available for New Projects</span>
                    </div>
                </AnimatedWrapper>

                {/* Headline */}
                <AnimatedWrapper animation="fade-up" delay="200ms">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold text-slate-900 mb-6 leading-[1.05] tracking-tight">
                        <span className="text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text gradient-text-animated">Build</span>
                        <span className="text-slate-300 mx-3 sm:mx-5 font-light">·</span>
                        <span className="text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text gradient-text-animated">Scale</span>
                        <span className="text-slate-300 mx-3 sm:mx-5 font-light">·</span>
                        <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text gradient-text-animated">Dominate</span>
                    </h1>
                </AnimatedWrapper>

                {/* Subtext */}
                <AnimatedWrapper animation="fade-up" delay="300ms">
                    <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-0">
                        Calcera Global transforms bold visions into <span className="text-slate-900 font-semibold">market-leading realities</span> through elite AI-driven engineering and design.
                    </p>
                </AnimatedWrapper>

                {/* CTA Buttons */}
                <AnimatedWrapper animation="fade-up" delay="400ms" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-4">
                    <Button
                        size="xl"
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group shimmer-btn rounded-2xl"
                        onClick={() => scrollToSection(contactRef)}
                        aria-label="Book a free consultation with Calcera Global"
                    >
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Link to="/ai-diagnostic" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full bg-slate-900 border-2 border-slate-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm font-bold shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 animate-pulse transition-colors" />
                            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-indigo-500/40 to-blue-500/20 [mask-image:linear-gradient(white,white)_padding-box,linear-gradient(white,white)_border-box] [mask-composite:exclude] opacity-100 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex items-center justify-center">
                                <div className="mr-3 p-1 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors">
                                    <Sparkles className="h-4 w-4 text-blue-400 group-hover:text-blue-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                                </div>
                                <span className="tracking-tight text-slate-100 group-hover:text-white">Enterprise AI Diagnostic</span>
                            </div>
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="xl"
                        className="w-full sm:w-auto bg-white/30 border-2 border-slate-200 hover:bg-white/60 transition-all duration-300 rounded-2xl"
                        onClick={() => scrollToSection(workRef)}
                        aria-label="View our portfolio"
                    >
                        View Our Work
                    </Button>
                </AnimatedWrapper>

                {/* Stats Bar */}
                <AnimatedWrapper animation="fade-up" delay="480ms" className="mb-14 px-4">
                    <div className="inline-flex flex-wrap justify-center items-stretch gap-0 rounded-2xl overflow-hidden border border-slate-200/80 bg-white/60 backdrop-blur-md shadow-lg shadow-slate-200/50 divide-x divide-slate-200/80">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center px-6 sm:px-10 py-4 hover:bg-white/80 transition-colors duration-300 min-w-[90px]">
                                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{stat.number}</span>
                                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </AnimatedWrapper>

                {/* Tech Stack */}
                <AnimatedWrapper animation="fade-up" delay="550ms" className="px-4">
                    <div className="flex flex-col items-center gap-4 select-none">
                        <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase">Stack Expertise</span>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-full bg-white/60 border border-slate-200/70 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/60 transition-all duration-300 cursor-default shadow-sm backdrop-blur-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </AnimatedWrapper>
            </div>
        </section>
    );
};

export default Hero;
