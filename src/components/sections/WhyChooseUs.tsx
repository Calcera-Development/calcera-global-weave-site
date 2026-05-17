
import { Users, Heart, CheckCircle, Zap } from "lucide-react";
import AnimatedWrapper from "./AnimatedWrapper";

const whyChooseUs = [
  {
    title: "Your Digital Co-Founders",
    description: "We don't just write code. We dive into your business goals, understand your users, and build what makes a difference — like partners, not contractors.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-400",
    label: "Partnership",
  },
  {
    title: "Design That Connects",
    description: "We make your brand feel alive with UI/UX that's as intuitive as it is beautiful. Every pixel is intentional.",
    icon: Heart,
    gradient: "from-rose-500 to-pink-400",
    label: "Design",
  },
  {
    title: "Full Transparency",
    description: "You see what we see. Real-time project tracking, open communication, and no mystery meetings.",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-teal-400",
    label: "Transparency",
  },
  {
    title: "Built on Collaboration",
    description: "Our favorite projects happen when we work together. With Calcera, you're not a client — you're part of the team.",
    icon: Zap,
    gradient: "from-violet-500 to-purple-400",
    label: "Collaboration",
  }
];

const WhyChooseUs = () => (
  <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Subtle background */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white pointer-events-none" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

    <div className="max-w-7xl mx-auto relative z-10">
      <AnimatedWrapper animation="fade-up" className="text-center mb-14 sm:mb-20">
        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">Why Us</span>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 mt-4 tracking-tight">
          Why Calcera?
        </h2>
        <p className="text-base sm:text-xl text-slate-500 max-w-xl mx-auto">
          Because building with love and logic matters.
        </p>
      </AnimatedWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" role="list" aria-label="Reasons to choose Calcera Global">
        {whyChooseUs.map((item, index) => (
          <AnimatedWrapper
            key={item.title}
            animation="fade-up"
            delay={`${index * 100}ms`}
          >
            <div
              role="listitem"
              aria-label={item.title}
              className="group flex flex-col h-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-500 hover:-translate-y-1 card-shine overflow-hidden relative"
            >
              {/* Number in corner */}
              <div className="absolute top-6 right-8 text-5xl font-black text-slate-900/[0.03] group-hover:text-slate-900/[0.06] transition-colors select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Top gradient line */}
              <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`} />

              <div className="flex items-start gap-5 mb-5">
                <div className={`flex-shrink-0 p-3.5 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <span className={`mt-1 self-center text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border`} style={{
                  background: 'rgba(241,245,249,0.8)',
                  color: '#64748b',
                  borderColor: '#e2e8f0'
                }}>
                  {item.label}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300 leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">{item.description}</p>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
