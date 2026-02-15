
import { PhoneCall, BookOpen, ArrowUpRight } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const portfolio = [
  {
    title: "CallQA Insight",
    category: "AI Customer Service QA",
    description: "An AI-driven web platform that analyzes and scores customer service calls—helping teams continuously improve call quality, customer satisfaction, and CSR performance with actionable insights.",
    icon: PhoneCall,
    gradient: "from-orange-500 to-rose-500",
    tag: "AI / Analytics",
  },
  {
    title: "AI Comic Book",
    category: "AI Storybook for Kids",
    description: "A playful AI-powered storybook app where children upload their own photo to become the main hero—instantly starring in beautifully illustrated stories. Kids (and parents) can buy personalized books in both print and digital formats for a truly magical reading experience.",
    icon: BookOpen,
    gradient: "from-pink-500 to-purple-500",
    tag: "AI / E-commerce",
  }
];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {portfolio.map((project, index) => (
          <AnimatedWrapper key={project.title} animation="zoom-in" delay={`${index * 150}ms`}>
            <div className="group glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 h-full flex flex-col">
              {/* Gradient header bar */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className={`p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg`}>
                    <project.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    {project.tag}
                  </span>
                </div>

                <p className="font-medium text-xs text-slate-400 uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center text-blue-600 font-medium text-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:translate-y-2 sm:group-hover:translate-y-0">
                  <span>View Project</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        ))}
      </div>

      {/* CTA */}
      <AnimatedWrapper animation="fade-up" delay="300ms" className="text-center mt-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 p-8 sm:p-14 rounded-3xl shadow-2xl shadow-blue-600/20 text-white noise-overlay">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-base sm:text-lg lg:text-xl mb-8 text-blue-100 max-w-xl mx-auto">
              Let's discuss how we can bring your vision to life with cutting-edge technology.
            </p>
            <button
              onClick={onContactClick}
              className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-xl text-sm sm:text-base inline-flex items-center gap-2"
            >
              Get Started Today
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  </section>
);

export default PortfolioGrid;
