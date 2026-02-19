
import { Users, Heart, CheckCircle, Zap } from "lucide-react";
import AnimatedWrapper from "./AnimatedWrapper";

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
      <div className="bento-grid max-w-6xl mx-auto" role="list" aria-label="Reasons to choose Calcera Global">
        {whyChooseUs.map((item, index) => (
          <AnimatedWrapper
            key={item.title}
            animation="fade-up"
            delay={`${index * 120}ms`}
            className={index === 0 || index === 3 ? "bento-long" : ""}
          >
            <div
              role="listitem"
              aria-label={item.title}
              className="group flex flex-col h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 hover:-translate-y-2 card-shine overflow-hidden relative"
            >
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg mb-8 w-fit group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-light">{item.description}</p>
              </div>

              {/* Decorative Background Element */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity duration-500`} />
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
