
import { Users, Heart, CheckCircle, Zap } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const whyChooseUs = [
  {
    title: "More Than Developers — We're Your Digital Co-Founders",
    description: "We don't just write code. We dive into your business goals, understand your users, and build what makes a difference.",
    icon: Users
  },
  {
    title: "Design That Connects",
    description: "We make your brand feel alive with UI/UX that's as intuitive as it is beautiful.",
    icon: Heart
  },
  {
    title: "Full Transparency",
    description: "You see what we see. Real-time project tracking, open communication, and no mystery meetings.",
    icon: CheckCircle
  },
  {
    title: "Built on Collaboration",
    description: "Our favorite projects happen when we work together. With Calcera, you're not a client—you're part of the team.",
    icon: Zap
  }
];

const WhyChooseUs = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-3">
          Why Calcera?
        </h2>
        <p className="text-lg sm:text-xl text-slate-600">Because building with love and logic matters.</p>
      </AnimatedWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {whyChooseUs.map((item, index) => (
          <AnimatedWrapper key={item.title} animation="fade-up" delay={`${index * 150}ms`}>
            <div className="flex items-start space-x-6">
              <div className="p-3 rounded-full bg-blue-100 flex-shrink-0">
                <item.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
