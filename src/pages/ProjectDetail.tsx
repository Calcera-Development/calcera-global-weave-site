import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowLeft, ChevronRight, CheckCircle2, Rocket, Globe, GithubIcon } from "lucide-react";
import AnimatedWrapper from "@/components/sections/AnimatedWrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import HeaderNav from "@/components/layout/HeaderNav";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const project = projects.find((p) => p.id === projectId);

    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Calcera Global - AI Projects`;
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
                    <Button variant="outline" size="sm" className="rounded-full">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
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

            <HeaderNav />

            {/* Hero Section */}
            <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <div
                    className="absolute inset-x-0 top-0 h-[500px] pointer-events-none -z-10"
                    style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(37,99,235,0.08), transparent)" }}
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-slate-400 font-medium mb-8">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Portfolio</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-slate-900">{project.title}</span>
                    </nav>

                    <AnimatedWrapper animation="fade-up" className="max-w-4xl">
                        <span className="inline-block px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">
                            {project.category}
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            {project.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
                            {project.liveUrl && project.liveUrlLabel && project.fullDescription.includes(project.liveUrlLabel)
                                ? project.fullDescription.split(project.liveUrlLabel).flatMap((part, i, arr) =>
                                    i < arr.length - 1
                                        ? [part, <a key={i} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">{project.liveUrlLabel}</a>]
                                        : [part]
                                )
                                : project.fullDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-12">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </AnimatedWrapper>

                    {/* Featured Visual */}
                    <AnimatedWrapper animation="fade-up" delay="150ms">
                        <div className={`relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br ${project.gradient} shadow-xl`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <project.icon className="w-1/5 h-1/5 text-white/25" />
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedWrapper animation="fade-up" className="mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Core Features</h2>
                    </AnimatedWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {project.features.map((feature, index) => {
                            const isOrphan = project.features.length % 4 !== 0 && index === project.features.length - 1;
                            return (
                            <AnimatedWrapper key={feature.title} animation="fade-up" delay={`${index * 80}ms`} className={isOrphan ? "md:col-span-2 lg:col-span-4" : undefined}>
                                <div className={`rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full ${isOrphan ? "p-6 lg:flex lg:items-center lg:gap-6" : "p-6"}`}>
                                    <div className={`inline-flex p-3 rounded-xl bg-blue-50 ${isOrphan ? "lg:flex-shrink-0 mb-6 lg:mb-0" : "mb-6"}`}>
                                        <feature.icon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </AnimatedWrapper>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <AnimatedWrapper animation="slide-in-from-left">
                            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-6">The Challenge</h2>
                            <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                                {project.challenge}
                            </p>
                        </AnimatedWrapper>
                        <AnimatedWrapper animation="slide-in-from-right" delay="150ms">
                            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-6">Our Solution</h2>
                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                                {project.solution}
                            </p>
                            <div className="space-y-3">
                                {project.impact.map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm sm:text-base text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedWrapper>
                    </div>
                </div>
            </section>

            {/* Project CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <AnimatedWrapper animation="fade-up">
                        <div className="inline-flex p-3 rounded-xl bg-blue-50 mb-6">
                            <Rocket className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                            Inspired by this project?
                        </h2>
                        <p className="text-lg text-slate-500 leading-relaxed mb-10">
                            We can help you architect and build something just as impactful. Every great product starts with a single conversation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/#contact" className="w-full sm:w-auto">
                                <Button size="xl" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                                    Book a Consultation
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-slate-200">
                                    <Globe className="h-5 w-5 text-slate-600" />
                                </Button>
                                <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-slate-200">
                                    <GithubIcon className="h-5 w-5 text-slate-600" />
                                </Button>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
