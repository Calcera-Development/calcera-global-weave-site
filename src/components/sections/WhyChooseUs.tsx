
import { Users, Heart, CheckCircle, Zap } from "lucide-react";
import AnimatedWrapper from "./AnimatedWrapper";

const whyChooseUs = [
  {
    title: "Your Digital Co-Founders",
    description: "We don't just write code. We dive into your business goals, understand your users, and build what makes a difference, like partners, not contractors.",
    icon: Users,
  },
  {
    title: "Design That Connects",
    description: "We make your brand feel alive with UI/UX that's as intuitive as it is beautiful. Every pixel is intentional.",
    icon: Heart,
  },
  {
    title: "Full Transparency",
    description: "You see what we see. Real-time project tracking, open communication, and no mystery meetings.",
    icon: CheckCircle,
  },
  {
    title: "Built on Collaboration",
    description: "Our favorite projects happen when we work together. With Calcera, you're not a client, you're part of the team.",
    icon: Zap,
  }
];

const WhyChooseUs = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/60 border-y border-slate-200">
    <div className="max-w-7xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-14 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Why Calcera?
        </h2>
        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
          Because building with love and logic matters.
        </p>
      </AnimatedWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" role="list" aria-label="Reasons to choose Calcera Global">
        {whyChooseUs.map((item, index) => (
          <AnimatedWrapper
            key={item.title}
            animation="fade-up"
            delay={`${index * 80}ms`}
          >
            <div
              role="listitem"
              aria-label={item.title}
              className="group h-full p-8 rounded-2xl bg-white border border-slate-200 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="inline-flex p-3 rounded-xl bg-blue-50 mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                <item.icon className="h-5 w-5 text-blue-600" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
