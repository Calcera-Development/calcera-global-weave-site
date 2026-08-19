import { LinkedinIcon, Rocket, Target, Zap, Star, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/sections/AnimatedWrapper";
import HeaderNav from "@/components/layout/HeaderNav";
import Footer from "@/components/layout/Footer";
import aashiqFounder from "@/assets/aashiq-founder.jpg";

const TEAM_MEMBERS = [
    {
        name: "Aashiq Ahmed",
        role: "Founder & Chief Executive Officer",
        description: "Strategist bridging business intent with technical reality. Focused on high-value B2B delivery and elite execution architectures.",
        image: aashiqFounder,
        isFounder: true,
        imageStyle: "object-[center_35%]",
        linkedin: "https://www.linkedin.com/in/aashiq-ahmed-9b624418b/"
    }
];

const PRINCIPLES = [
    { title: "Clarity before code", desc: "Every project starts with absolute understanding, not just a list of features.", icon: Target },
    { title: "Systems before scale", desc: "Architecting for longevity and reliability from day one.", icon: Zap },
    { title: "Results over noise", desc: "Measurable outcomes and ROI-focused delivery in every sprint.", icon: Star },
];

const EXPERTISE = [
    "Designing custom software, automation, and AI-driven solutions",
    "Translating complex problems into executable architectures",
    "Building lean delivery models focused on quality and ROI",
    "Driving outcomes across healthcare and enterprise systems",
    "Repeatable delivery models for high-stakes business intent"
];

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <HeaderNav />

            <main className="pt-28 pb-24 relative overflow-hidden">
                <div
                    className="absolute inset-x-0 top-0 h-[600px] pointer-events-none -z-10"
                    style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(37,99,235,0.08), transparent)" }}
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Mission Hero Section */}
                    <div className="text-center mb-28 max-w-3xl mx-auto">
                        <AnimatedWrapper animation="fade-up">
                            <div className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                                <Globe className="h-3.5 w-3.5 text-blue-600" />
                                <span className="text-xs font-medium text-slate-600">Our collective mission</span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                                One team. <span className="text-blue-600">Elite execution.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">
                                Founded in February 2025, Calcera Global is a specialized force of architects and engineers. We build systems that solve complex business challenges with precision.
                            </p>
                        </AnimatedWrapper>
                    </div>

                    {/* Principles */}
                    <div className="mb-28">
                        <AnimatedWrapper animation="fade-up" className="mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Our Operating Principle</h2>
                        </AnimatedWrapper>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PRINCIPLES.map((principle, idx) => (
                                <AnimatedWrapper key={idx} animation="fade-up" delay={`${idx * 100}ms`}>
                                    <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full">
                                        <div className="inline-flex p-3 rounded-xl bg-blue-50 mb-6">
                                            <principle.icon className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">{principle.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{principle.desc}</p>
                                    </div>
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-28">
                        <AnimatedWrapper animation="fade-up" className="mb-12 text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Led From the Front</h2>
                            <p className="text-slate-500 max-w-xl mx-auto text-lg">
                                Calcera is built and run by a founder with a shared obsession for solving hard problems, backed by a specialized network of engineers for every engagement.
                            </p>
                        </AnimatedWrapper>

                        <div className="flex flex-wrap justify-center gap-6">
                            {TEAM_MEMBERS.map((member, idx) => (
                                <AnimatedWrapper key={idx} animation="fade-up" delay={`${idx * 100}ms`} className="w-full max-w-sm">
                                    <div className="rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden h-full flex flex-col p-6">
                                        <div className="w-full aspect-[4/5] rounded-xl bg-slate-50 mb-6 relative overflow-hidden">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className={`absolute inset-0 w-full h-full object-cover ${member.imageStyle || 'object-center'}`}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-24 h-24 rounded-full bg-slate-200/80 flex items-center justify-center">
                                                        <svg className="w-14 h-14 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-slate-900 mb-1 tracking-tight">{member.name}</h3>
                                        <p className="text-blue-600 font-medium text-xs uppercase tracking-widest mb-4">{member.role}</p>
                                        <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                                            {member.description}
                                        </p>

                                        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4">
                                            {member.linkedin ? (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <LinkedinIcon className="h-4 w-4 text-slate-400 hover:text-blue-600 transition-colors" />
                                                </a>
                                            ) : (
                                                <LinkedinIcon className="h-4 w-4 text-slate-300" />
                                            )}
                                        </div>
                                    </div>
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </div>

                    {/* Expertise Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        <AnimatedWrapper animation="slide-in-from-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                                Expertise & Delivery
                            </h2>
                            <div className="space-y-3">
                                {EXPERTISE.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors duration-300">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                        <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedWrapper>

                        <AnimatedWrapper animation="slide-in-from-right" delay="150ms" className="bg-slate-950 rounded-2xl p-8 sm:p-12 text-white">
                            <h2 className="text-2xl font-bold mb-6 tracking-tight">Our Partnership Model</h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                We bridge business intent with technical reality, especially in complex, regulated environments. Our team scales through high-value B2B engagements and repeatable excellence.
                            </p>
                            <Link to="/#contact">
                                <Button size="xl" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Discuss Strategic Partnership
                                    <Rocket className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </AnimatedWrapper>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
