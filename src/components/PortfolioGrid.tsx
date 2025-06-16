
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
  <section id="work" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
    <div className="max-w-7xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-3">
          Work We're Proud Of
        </h2>
        <p className="text-lg sm:text-xl text-slate-600">A glimpse into our digital playground.</p>
      </AnimatedWrapper>
      <div className="flex flex-wrap justify-center gap-6">
        {portfolio.map((project, index) => (
          <AnimatedWrapper key={project.title} animation="zoom-in" delay={`${index * 100}ms`} className="flex w-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]">
            <Card className="bg-white border-none shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col w-full">
              <CardHeader className="p-8 pb-3 flex-grow flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-2 rounded-lg ${project.color}`}>
                    <project.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <p className="font-medium text-sm text-slate-500 uppercase tracking-wider">{project.category}</p>
                </div>
                <CardTitle className="text-lg font-semibold mb-1 text-slate-800">{project.title}</CardTitle>
                <CardDescription className="mb-2 text-slate-700 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioGrid;
