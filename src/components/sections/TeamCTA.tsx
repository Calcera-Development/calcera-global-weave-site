import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "./AnimatedWrapper";

const avatarColors = [
    "from-blue-600 to-blue-500",
    "from-blue-500 to-blue-400",
    "from-slate-700 to-slate-600",
    "from-blue-600 to-indigo-600",
    "from-slate-600 to-slate-500",
];

const initials = ["AK", "SR", "MJ", "NR", "PL"];

const TeamCTA = () => {
    return (
        <section aria-label="Meet the team" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <AnimatedWrapper animation="fade-up" className="text-center">
                    {/* Avatar stack */}
                    <div className="flex justify-center mb-8 mt-2">
                        <div className="flex -space-x-3">
                            {avatarColors.map((gradient, i) => (
                                <div
                                    key={i}
                                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} ring-4 ring-white flex items-center justify-center shadow-lg`}
                                    style={{ zIndex: avatarColors.length - i }}
                                >
                                    <span className="text-xs font-black text-white tracking-tight">{initials[i]}</span>
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full bg-slate-100 ring-4 ring-white flex items-center justify-center shadow-lg text-slate-400 text-xs font-bold" style={{ zIndex: 0 }}>
                                +
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
                        Built by Friends.<br className="hidden sm:block" /> Driven by Excellence.
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
                        What started as a group of friends with a shared obsession for solving hard problems became a specialized force, united by trust and driven by results.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/about">
                            <Button size="xl" className="bg-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group rounded-2xl">
                                Meet the Core Team
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="font-medium">Open to new collaborations</span>
                        </div>
                    </div>
                </AnimatedWrapper>
            </div>
        </section>
    );
};

export default TeamCTA;
