import { Users, Heart, CheckCircle, Zap } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const whyChooseUs = [
  {
    title: "Partnership Approach",
    description: "We don't just build—we collaborate deeply with your vision and goals",
    icon: Users
  },
  {
    title: "Design Excellence",
    description: "Interfaces that are as intuitive as they are beautiful",
    icon: Heart
  },
  {
    title: "Full Transparency",
    description: "Real-time tracking and open communication throughout",
    icon: CheckCircle
  },
  {
    title: "Built Together",
    description: "Your input shapes every decision—you're part of the team",
    icon: Zap
  }
];

const WhyChooseUs = () => (
  <section className="py-32 px-6 sm:px-8 lg:px-12 bg-slate-50">
    <div className="max-w-6xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-4">
          Why Calcera
        </h2>
        <p className="text-xl text-slate-600 font-light">
          Building with both heart and precision
        </p>
      </AnimatedWrapper>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {whyChooseUs.map((item, index) => (
          <AnimatedWrapper key={item.title} animation="fade-up" delay={`${index * 100}ms`}>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-xl bg-blue-50">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-normal text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed">{item.description}</p>
              </div>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
