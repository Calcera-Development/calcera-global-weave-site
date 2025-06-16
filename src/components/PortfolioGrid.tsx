
import { PhoneCall, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const portfolio = [
  {
    title: "CallQA Insight",
    category: "AI Customer Service QA",
    description: "An AI-driven web platform that analyzes and scores customer service calls—helping teams continuously improve call quality, customer satisfaction, and CSR performance with actionable insights.",
    icon: PhoneCall,
    color: "bg-orange-100"
  },
  {
    title: "AI Comic Book",
    category: "AI Storybook for Kids",
    description: "A playful AI-powered storybook app where children upload their own photo to become the main hero—instantly starring in beautifully illustrated stories. Kids (and parents) can buy personalized books in both print and digital formats for a truly magical reading experience.",
    icon: BookOpen,
    color: "bg-pink-100"
  }
];

const PortfolioGrid = () => (
  <section id="work" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-20 left-10 w-24 h-24 bg-blue-300 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-indigo-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <AnimatedWrapper animation="fade-up" className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-3">
          Work We're Proud Of
        </h2>
        <p className="text-lg sm:text-xl text-slate-600">A glimpse into our digital playground.</p>
      </AnimatedWrapper>
      <div className="flex flex-wrap justify-center gap-6">
        {portfolio.map((project, index) => (
          <AnimatedWrapper key={project.title} animation="zoom-in" delay={`${index * 100}ms`} className="flex w-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]">
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 h-full flex flex-col w-full group overflow-hidden relative">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="p-8 pb-3 flex-grow flex flex-col items-center text-center relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-xl ${project.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <project.icon className="h-7 w-7 text-slate-700 group-hover:text-slate-800 transition-colors duration-300" />
                  </div>
                  <p className="font-medium text-sm text-slate-500 uppercase tracking-wider group-hover:text-slate-600 transition-colors duration-300">{project.category}</p>
                </div>
                <CardTitle className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-slate-900 transition-colors duration-300">{project.title}</CardTitle>
                <CardDescription className="mb-4 text-slate-700 text-base leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                  {project.description}
                </CardDescription>
                
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardHeader>
            </Card>
          </AnimatedWrapper>
        ))}
      </div>
      
      {/* Call to action section */}
      <AnimatedWrapper animation="fade-up" delay="300ms" className="text-center mt-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white">
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
          <p className="text-lg mb-6 opacity-90">Let's discuss how we can bring your vision to life with cutting-edge technology.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </AnimatedWrapper>
    </div>
  </section>
);

export default PortfolioGrid;
