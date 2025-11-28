import { PhoneCall, BookOpen } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const portfolio = [
  {
    title: "CallQA Insight",
    category: "AI Customer Service",
    description: "AI-driven platform analyzing customer service calls to improve quality and satisfaction",
    icon: PhoneCall
  },
  {
    title: "AI Comic Book",
    category: "AI Storybook",
    description: "Personalized storybook app where children become heroes in beautifully illustrated adventures",
    icon: BookOpen
  }
];

interface PortfolioGridProps {
  onContactClick?: () => void;
}

const PortfolioGrid = ({ onContactClick }: PortfolioGridProps) => (
  <section id="work" className="py-32 px-6 sm:px-8 lg:px-12">
    <div className="max-w-6xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-4">
          Featured Work
        </h2>
        <p className="text-xl text-slate-600 font-light">
          Projects we're proud to have built
        </p>
      </AnimatedWrapper>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {portfolio.map((project, index) => (
          <AnimatedWrapper key={project.title} animation="fade-up" delay={`${index * 100}ms`}>
            <div className="group p-10 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                  <project.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-slate-500 uppercase tracking-wider font-light">{project.category}</span>
              </div>
              <h3 className="text-2xl font-normal text-slate-900 mb-4">{project.title}</h3>
              <p className="text-slate-600 font-light leading-relaxed">{project.description}</p>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
      
      <AnimatedWrapper animation="fade-up" delay="200ms" className="text-center">
        <div className="p-12 bg-slate-900 rounded-3xl text-white">
          <h3 className="text-3xl font-light mb-4">Ready to Start?</h3>
          <p className="text-lg text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life
          </p>
          <button 
            onClick={onContactClick}
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-normal hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </AnimatedWrapper>
    </div>
  </section>
);

export default PortfolioGrid;
