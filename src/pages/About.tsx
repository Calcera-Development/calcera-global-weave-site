import { Linkedin, Rocket, Target, Briefcase, Zap, Star, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import HeaderNav from "@/components/HeaderNav";
import React from "react";
import aashiqFounder from "@/assets/aashiq-founder.jpg";


const TEAM_MEMBERS = [
    {
        name: "Aashiq Ahmed",
        role: "Founder & Chief Executive Officer",
        description: "Strategist bridging business intent with technical reality. Focused on high-value B2B delivery and elite execution architectures.",
        gradient: "from-blue-600 to-indigo-700",
        image: aashiqFounder,
        isFounder: true,
        linkedin: "https://www.linkedin.com/in/aashiq-ahmed-9b624418b/"
    },
    {
        name: "Sai Vikneshan",
        role: "Cyber Security Consultant",
        description: "Assists in identifying and mitigating security risks across infrastructure. Expert in system hardening, threat detection, and secure coding practices.",
        gradient: "from-slate-700 to-slate-900",
        linkedin: "https://www.linkedin.com/in/sai-vikneshan-jeyathasan-242a47299/"
    },
    {
        name: "Ashok Ainkaran",
        role: "Head of Operations",
        description: "Drives operational excellence across Calcera — translating strategy into structured execution, optimizing workflows, and ensuring scalable, high-performance delivery.",
        gradient: "from-emerald-500 to-teal-600",
        linkedin: "https://www.linkedin.com/in/ashok-ainkaran-jeyathasan/"
    }
];

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <HeaderNav />

            <main className="pt-24 sm:pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Mission Hero Section */}
                    <div className="text-center mb-32 max-w-4xl mx-auto">
                        <AnimatedWrapper animation="fade-up">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                                <Globe className="h-4 w-4 text-blue-600" />
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Our Collective Mission</span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                                One Team. <span className="text-blue-600">Elite Execution.</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed font-light mb-10">
                                Founded in February 2025, Calcera Global is a specialized force of architects and engineers. We don't just build software; we architect systems that solve the most complex business challenges with surgical precision.
                            </p>
                        </AnimatedWrapper>
                    </div>

                    {/* Principles Bento */}
                    <AnimatedWrapper animation="fade-up" className="mb-12">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Core Philosophy</p>
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6">Our Operating Principle</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-12" />
                    </AnimatedWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {[
                            { title: "Clarity before code", desc: "Every project starts with absolute understanding, not just a list of features.", icon: Target, gradient: "from-blue-500 to-cyan-400" },
                            { title: "Systems before scale", desc: "Architecting for longevity and reliability from day one.", icon: Zap, gradient: "from-violet-500 to-purple-400" },
                            { title: "Results over noise", desc: "Measurable outcomes and ROI-focused delivery in every sprint.", icon: Star, gradient: "from-amber-500 to-orange-400" }
                        ].map((principle, idx) => (
                            <AnimatedWrapper key={idx} animation="fade-up" delay={`${idx * 150}ms`}>
                                <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center group">
                                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${principle.gradient} shadow-lg mb-8 group-hover:scale-110 transition-transform`}>
                                        <principle.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{principle.title}</h3>
                                    <p className="text-slate-500 font-light leading-relaxed">{principle.desc}</p>
                                </div>
                            </AnimatedWrapper>
                        ))}
                    </div>

                    {/* Team Section */}
                    <div className="mb-32">
                        <AnimatedWrapper animation="fade-up" className="mb-12 text-center">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">The Collective Force</p>
                            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6">The Core Team</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
                                What started as a group of friends with a shared obsession for solving hard problems became a specialized force — united by trust, driven by results.
                            </p>
                        </AnimatedWrapper>

                        <div className="flex flex-wrap justify-center gap-6">
                            {TEAM_MEMBERS.map((member, idx) => (
                                <AnimatedWrapper key={idx} animation="fade-up" delay={`${idx * 150}ms`} className="w-full md:w-[calc(33.333%-1rem)] max-w-sm">
                                    <div className="group relative h-full w-full">
                                        <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] translate-y-2 translate-x-1 group-hover:translate-y-4 group-hover:translate-x-2 transition-transform duration-500 opacity-5" />
                                        <div className="relative p-7 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">

                                            {/* Profile Visual */}
                                            <div className="w-full aspect-[4/5] rounded-2xl bg-slate-50 mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-5`} />
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="w-24 h-24 rounded-full bg-slate-200/80 flex items-center justify-center">
                                                            <svg className="w-14 h-14 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                            <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-4">{member.role}</p>
                                            <p className="text-slate-500 font-light text-sm leading-relaxed flex-grow">
                                                {member.description}
                                            </p>

                                            <div className="mt-6 pt-4 border-t border-slate-50 flex gap-4">
                                                {member.linkedin ? (
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <Linkedin className="h-4 w-4 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
                                                    </a>
                                                ) : (
                                                    <Linkedin className="h-4 w-4 text-slate-300" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </div>

                    {/* Expertise Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <AnimatedWrapper animation="slide-in-from-left">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight flex items-center gap-4">
                                <Briefcase className="h-8 w-8 text-blue-600" />
                                Expertise & Delivery
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "Designing custom software, automation, and AI-driven solutions",
                                    "Translating complex problems into executable architectures",
                                    "Building lean delivery models focused on quality and ROI",
                                    "Driving outcomes across healthcare and enterprise systems",
                                    "Repeatable delivery models for high-stakes business intent"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
                                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2.5 flex-shrink-0" />
                                        <p className="text-slate-600 font-light leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedWrapper>

                        <AnimatedWrapper animation="slide-in-from-right" delay="200ms" className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden noise-overlay">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-10 tracking-tight">Our Partnership Model</h2>
                                <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed mb-10 italic">
                                    "We bridge business intent with technical reality—especially in complex, regulated environments. Our team scales through high-value B2B engagements and Repeatable Excellence."
                                </p>
                                <Link to="/#contact">
                                    <Button className="w-full bg-white text-slate-950 hover:bg-blue-50 py-4 rounded-2xl font-bold text-sm shadow-2xl transition-all hover:scale-[1.02]">
                                        Discuss Strategic Partnership
                                        <Rocket className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </AnimatedWrapper>
                    </div>
                </div>
            </main>

            {/* Footer minimal */}
            <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <p>© {new Date().getFullYear()} Calcera Global. All engineering rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default About;
