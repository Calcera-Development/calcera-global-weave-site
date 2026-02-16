
import { Code, Brain, Zap, ShoppingCart, Users, Search } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Powerful, scalable, and future-ready web applications tailored to your vision.",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/5 hover:bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Web Applications",
    description: "We build smart automation, GPT and machine learning-based apps that solve real-world problems for businesses, tailored to your unique needs.",
    gradient: "from-purple-500 to-pink-400",
    bg: "bg-purple-500/5 hover:bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Zap,
    title: "In-house R&D Team",
    description: "Our expert R&D team goes from idea discovery to technical blueprint, guiding founders who don't have a tech plan yet into a working product.",
    gradient: "from-violet-500 to-indigo-400",
    bg: "bg-violet-500/5 hover:bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "From Shopify to custom storefronts, we build systems that grow with you.",
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "Design is more than visuals — it's how your users feel. We craft experiences that click.",
    gradient: "from-orange-500 to-amber-400",
    bg: "bg-orange-500/5 hover:bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Get found by the right people. We optimize your digital presence for maximum visibility and engagement.",
    gradient: "from-cyan-500 to-blue-400",
    bg: "bg-cyan-500/5 hover:bg-cyan-500/10",
    iconColor: "text-cyan-500",
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2 sm:mb-4">What We Do</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            Our Core Services
          </h2>
          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto px-4">
            What we're great at—so you can be even greater.
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
                className={`group relative rounded-3xl ${service.bg} border border-slate-200/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 h-full glass-card`}
              >
                {/* Gradient line at top */}
                <div className={`absolute top-0 left-6 sm:left-8 right-6 sm:right-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-[1px]`} />

                <div className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 sm:mb-8 shadow-lg shadow-slate-200/50 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
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
