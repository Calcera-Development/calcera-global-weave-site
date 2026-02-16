import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowLeft, ChevronRight, CheckCircle2, Rocket, Globe, Github } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import calceraLogo from "@/assets/calcera-logo.png";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const project = projects.find((p) => p.id === projectId);

    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Calcera Global - Elite AI Projects`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute("content", `${project.title}: ${project.description} Built by Calcera Global elite engineering.`);
            }
        }
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Not Found</h1>
                <p className="text-slate-600 mb-8 text-center max-w-md">The project you are looking for doesn't exist or has been moved.</p>
                <Link to="/">
                    <Button variant="outline" className="rounded-full px-8 py-6 h-auto text-lg hover:scale-105 transition-transform">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Dynamic Project Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": project.title,
                    "description": project.description,
                    "genre": project.category,
                    "creator": {
                        "@type": "Organization",
                        "name": "Calcera Global",
                        "url": "https://calcera.global"
                    },
                    "keywords": project.technologies.join(", ")
                })}
            </script>

            {/* Navigation Header */}
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <ArrowLeft className="h-5 w-5 text-slate-600 group-hover:-translate-x-1 transition-transform" />
                        <img src={calceraLogo} alt="Calcera Logo" className="h-8 w-auto select-none object-contain rounded-lg" />
                    </Link>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
                        <span>Portfolio</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-slate-900">{project.title}</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-12 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full mesh-gradient opacity-40 -z-10" />

                <div className="max-w-7xl mx-auto">
                    <AnimatedWrapper animation="fade-up" className="max-w-4xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-blue-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
                            {project.category}
                        </span>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            {project.title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-slate-600 font-light leading-relaxed mb-10">
                            {project.fullDescription}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-12">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="px-4 py-2 rounded-xl bg-slate-900/5 border border-slate-900/10 text-slate-700 text-sm font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </AnimatedWrapper>

                    {/* Featured Visual */}
                    <AnimatedWrapper animation="zoom-in" delay="200ms" className="mt-12">
                        <div className={`relative aspect-[16/9] lg:aspect-[21/9] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden bg-gradient-to-br ${project.gradient} shadow-2xl`}>
                            <div className="absolute inset-0 bg-black/10 noise-overlay" />
                            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-20">
                                <project.icon className="w-1/4 h-1/4 text-white opacity-20 animate-pulse" />
                                {/* Abstract UI indicators */}
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                            </div>
                            <div className="absolute inset-x-6 bottom-6 sm:bottom-20 sm:left-20 sm:right-auto sm:max-w-md">
                                <div className="bg-slate-900/80 backdrop-blur-xl p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 shadow-2xl mx-auto sm:mx-0">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
                                        <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest">Live Evolution</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">Technical Masterpiece</h3>
                                    <p className="text-white/80 text-xs sm:text-base font-light">Engineered for peak performance and unparalleled user experience.</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedWrapper animation="fade-up" className="mb-16">
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Core Features</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    </AnimatedWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {project.features.map((feature, index) => (
                            <AnimatedWrapper key={feature.title} animation="fade-up" delay={`${index * 100}ms`}>
                                <div className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden relative">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg mb-8 w-fit group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors px-2">{feature.title}</h3>
                                    <p className="text-slate-500 text-base leading-relaxed font-light px-2">{feature.description}</p>

                                    {/* Decorative number */}
                                    <span className="absolute -bottom-4 -right-2 text-8xl font-black text-slate-900/[0.03] select-none group-hover:text-slate-900/[0.06] transition-colors">
                                        {index + 1}
                                    </span>
                                </div>
                            </AnimatedWrapper>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        <AnimatedWrapper animation="slide-in-from-left">
                            <h2 className="text-lg font-bold text-blue-400 uppercase tracking-widest mb-6">The Challenge</h2>
                            <p className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-8">
                                {project.challenge}
                            </p>
                        </AnimatedWrapper>
                        <AnimatedWrapper animation="slide-in-from-right" delay="200ms">
                            <h2 className="text-lg font-bold text-purple-400 uppercase tracking-widest mb-6">Our Solution</h2>
                            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed mb-8">
                                {project.solution}
                            </p>
                            <div className="space-y-4">
                                {project.impact.map((item) => (
                                    <div key={item} className="flex items-start gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                                        <span className="text-base sm:text-lg text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedWrapper>
                    </div>
                </div>
            </section>

            {/* Project CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatedWrapper animation="fade-up">
                        <Rocket className="h-12 w-12 text-blue-600 mx-auto mb-8 animate-bounce" />
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
                            Inspired by this project?
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-500 font-light leading-relaxed mb-12 px-4">
                            We can help you architect and build something just as impactful. Every great product starts with a single conversation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <Link to="/#contact" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto bg-slate-900 text-white rounded-full px-8 sm:px-10 py-5 sm:py-8 h-auto text-base sm:text-xl font-bold hover:scale-105 transition-transform shadow-2xl">
                                    Start Your Project
                                </Button>
                            </Link>
                            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                <Button variant="outline" size="icon" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-slate-200">
                                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                                </Button>
                                <Button variant="outline" size="icon" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-slate-200">
                                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                                </Button>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </section>

            {/* Footer minimal */}
            <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <p>© {new Date().getFullYear()} Calcera Global. All engineering rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProjectDetail;
