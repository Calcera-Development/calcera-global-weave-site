
import { ArrowUpRight } from "lucide-react";
import AnimatedWrapper from "./AnimatedWrapper";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

interface PortfolioGridProps {
  onContactClick?: () => void;
}

const PortfolioGrid = ({ onContactClick }: PortfolioGridProps) => (
  <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-7xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-14 sm:mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">Portfolio</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Work We're Proud Of
        </h2>
        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
          A glimpse into our digital playground.
        </p>
      </AnimatedWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto" role="list" aria-label="Portfolio projects">
        {projects.map((project, index) => {
          const isLastOdd = projects.length % 2 === 1 && index === projects.length - 1;
          return (
          <AnimatedWrapper key={project.title} animation="fade-up" delay={`${index * 100}ms`} className={isLastOdd ? "md:col-span-2" : undefined}>
            <Link to={`/projects/${project.id}`} className="block h-full group">
              <article
                role="listitem"
                aria-label={`Project: ${project.title}`}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-200 h-full flex flex-col border border-slate-200 bg-white"
              >
                <div className={`p-8 sm:p-10 flex flex-col flex-grow ${isLastOdd ? "md:max-w-2xl" : ""}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                      <project.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                      {project.tag}
                    </span>
                  </div>

                  <p className="font-semibold text-xs text-slate-400 uppercase tracking-[0.15em] mb-2">{project.category}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-base leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-8 flex items-center text-blue-600 font-semibold text-sm">
                    <span className="border-b-2 border-blue-600/30 group-hover:border-blue-600 transition-all">Explore Project Details</span>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </article>
            </Link>
          </AnimatedWrapper>
          );
        })}
      </div>

      {/* Portfolio CTA */}
      <AnimatedWrapper animation="fade-up" delay="200ms" className="text-center mt-20 px-4">
        <div className="bg-slate-950 p-10 sm:p-16 rounded-3xl text-white">
          <h3 className="text-2xl sm:text-4xl font-bold mb-4 leading-[1.15] tracking-tight">
            Ready to engineer your digital advantage?
          </h3>
          <p className="text-base sm:text-lg mb-8 text-slate-400 max-w-xl mx-auto leading-relaxed">
            Connect with our strategy team and turn your technical vision into a market-ready product.
          </p>
          <button
            onClick={onContactClick}
            className="group bg-white text-slate-950 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            Book a Consultation
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </AnimatedWrapper>
    </div>
  </section>
);

export default PortfolioGrid;
