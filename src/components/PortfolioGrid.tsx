
import { ArrowUpRight } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

interface PortfolioGridProps {
  onContactClick?: () => void;
}

const PortfolioGrid = ({ onContactClick }: PortfolioGridProps) => (
  <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden mesh-gradient">
    <div className="max-w-7xl mx-auto relative z-10">
      <AnimatedWrapper animation="fade-up" className="text-center mb-10 sm:mb-16">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 mb-2 sm:mb-4">Portfolio</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
          Work We're Proud Of
        </h2>
        <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto px-4">
          A glimpse into our digital playground.
        </p>
      </AnimatedWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto" role="list" aria-label="Portfolio projects">
        {projects.map((project, index) => (
          <AnimatedWrapper key={project.title} animation="zoom-in" delay={`${index * 150}ms`}>
            <Link to={`/projects/${project.id}`} className="block h-full group">
              <article
                role="listitem"
                aria-label={`Project: ${project.title}`}
                className="group glass-card rounded-3xl sm:rounded-[3rem] overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/10 h-full flex flex-col border border-white/40 shadow-xl premium-tilt card-shine relative"
              >
                {/* Internal Glow Effect */}
                <div className={`absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.05] rounded-full blur-3xl transition-opacity duration-700`} />

                {/* Gradient header bar */}
                <div className={`h-2 sm:h-2.5 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-8 sm:p-12 flex flex-col flex-grow relative z-10">
                  <div className="flex items-start justify-between mb-8 sm:mb-10">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                      <project.icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-blue-100 shadow-sm">
                      {project.tag}
                    </span>
                  </div>

                  <p className="font-semibold text-[10px] sm:text-xs text-slate-400 uppercase tracking-[0.2em] mb-3 sm:mb-4">{project.category}</p>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 group-hover:text-blue-600 transition-colors duration-500 leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-base sm:text-lg leading-relaxed flex-grow font-light">
                    {project.description}
                  </p>

                  <div className="mt-8 sm:mt-12 flex items-center text-blue-600 font-bold text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="border-b-2 border-blue-600/30 group-hover:border-blue-600 transition-all text-blue-600">Explore Project Details</span>
                    <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-bounce-horizontal" />
                  </div>
                </div>
              </article>
            </Link>
          </AnimatedWrapper>
        ))}
      </div>

      {/* High-Impact Premium CTA */}
      <AnimatedWrapper animation="fade-up" delay="300ms" className="text-center mt-24 sm:mt-32 px-4">
        <div className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-[2.5rem] sm:rounded-[4rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
          <div className="relative bg-slate-950 p-8 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] shadow-3xl text-white noise-overlay border border-white/10 card-shine overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                Ready to Engineer <br className="hidden sm:block" /> Your <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Digital Advantage</span>?
              </h3>
              <p className="text-base sm:text-xl lg:text-2xl mb-10 sm:mb-14 text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Connect with our elite strategy team and transform your technical vision into a market-dominating asset.
              </p>
              <button
                onClick={onContactClick}
                className="group relative bg-white text-slate-950 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center gap-3 mx-auto overflow-hidden"
              >
                <span className="relative z-10">Initialize Consultation</span>
                <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  </section>
);

export default PortfolioGrid;
