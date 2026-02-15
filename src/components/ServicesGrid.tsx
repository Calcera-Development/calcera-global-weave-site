
import { Code, Brain, Zap, ShoppingCart, Users } from "lucide-react";
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
    title: "Ecommerce Solutions",
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
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">What We Do</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
            What we're great at—so you can be even greater.
          </p>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedWrapper
              key={service.title}
              animation="fade-up"
              delay={`${index * 100}ms`}
            >
              <div
                className={`group relative rounded-2xl ${service.bg} border border-slate-200/60 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 h-full`}
              >
                {/* Gradient line at top */}
                <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg shadow-slate-200/30`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
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
