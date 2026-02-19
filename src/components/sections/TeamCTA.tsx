import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "./AnimatedWrapper";

const TeamCTA = () => {
    return (
        <section aria-label="Meet the team" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <AnimatedWrapper animation="fade-up" className="text-center mb-12">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">The People Behind the Work</p>
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Built by Friends.<br className="hidden sm:block" /> Driven by Excellence.
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-light text-base sm:text-lg leading-relaxed">
                        What started as a group of friends with a shared obsession for solving hard problems became a specialized force — united by trust, driven by results.
                    </p>
                </AnimatedWrapper>

                <AnimatedWrapper animation="fade-up" delay="200ms" className="flex justify-center">
                    <Link to="/about">
                        <Button size="xl" className="bg-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group">
                            Meet the Core Team
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </AnimatedWrapper>
            </div>
        </section>
    );
};

export default TeamCTA;
