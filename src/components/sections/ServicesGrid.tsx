
import { Code, Brain, Zap, ShoppingCart, Users, Search } from "lucide-react";
import AnimatedWrapper from "./AnimatedWrapper";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Powerful, scalable, and future-ready web applications tailored to your vision.",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/5 hover:bg-blue-500/10",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Brain,
    title: "AI-Powered Applications",
    description: "Smart automation, GPT and machine learning-based apps that solve real-world problems for businesses, tailored to your unique needs.",
    gradient: "from-purple-500 to-pink-400",
    bg: "bg-purple-500/5 hover:bg-purple-500/10",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Zap,
    title: "In-house R&D Team",
    description: "Our expert R&D team goes from idea discovery to technical blueprint, guiding founders into a working product.",
    gradient: "from-violet-500 to-indigo-400",
    bg: "bg-violet-500/5 hover:bg-violet-500/10",
    accent: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "From Shopify to custom storefronts, we build systems that grow with you.",
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "Design is more than visuals — it's how your users feel. We craft experiences that click.",
    gradient: "from-orange-500 to-amber-400",
    bg: "bg-orange-500/5 hover:bg-orange-500/10",
    accent: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Get found by the right people. We optimize your digital presence for maximum visibility and engagement.",
    gradient: "from-cyan-500 to-blue-400",
    bg: "bg-cyan-500/5 hover:bg-cyan-500/10",
    accent: "bg-cyan-50 text-cyan-600 border-cyan-100",
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">What We Do</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 mt-4 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-base sm:text-xl text-slate-500 max-w-xl mx-auto">
            What we're great at — so you can be even greater.
          </p>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Our core services">
          {services.map((service, index) => (
            <AnimatedWrapper
              key={service.title}
              animation="fade-up"
              delay={`${index * 100}ms`}
            >
              <div
                role="listitem"
                aria-label={`Service: ${service.title}`}
                className={`group relative rounded-3xl ${service.bg} border border-slate-200/60 p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/8 h-full glass-card premium-tilt card-shine overflow-hidden`}
              >
                {/* Number badge */}
                <div className="absolute top-6 right-7 text-4xl font-black text-slate-900/[0.04] group-hover:text-slate-900/[0.07] transition-colors duration-500 select-none leading-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Gradient line at top */}
                <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                {/* Internal glow */}
                <div className={`absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-700`} />

                <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${service.gradient} mb-7 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 tracking-tight leading-snug">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
