
import { Users, Heart, CheckCircle, Zap } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const whyChooseUs = [
  {
    title: "More Than Developers — We're Your Digital Co-Founders",
    description: "We don't just write code. We dive into your business goals, understand your users, and build what makes a difference.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Design That Connects",
    description: "We make your brand feel alive with UI/UX that's as intuitive as it is beautiful.",
    icon: Heart,
    gradient: "from-rose-500 to-pink-400",
  },
  {
    title: "Full Transparency",
    description: "You see what we see. Real-time project tracking, open communication, and no mystery meetings.",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    title: "Built on Collaboration",
    description: "Our favorite projects happen when we work together. With Calcera, you're not a client—you're part of the team.",
    icon: Zap,
    gradient: "from-violet-500 to-purple-400",
  }
];

const WhyChooseUs = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
    <div className="max-w-7xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-10 sm:mb-16">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2 sm:mb-4">Why Us</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
          Why Calcera?
        </h2>
        <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto px-4">
          Because building with love and logic matters.
        </p>
      </AnimatedWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {whyChooseUs.map((item, index) => (
          <AnimatedWrapper key={item.title} animation="fade-up" delay={`${index * 120}ms`}>
            <div className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
              <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
