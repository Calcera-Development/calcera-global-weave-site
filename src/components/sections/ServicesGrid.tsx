
import { Code, Brain, Zap, ShoppingCart, Users, Search, Megaphone } from "lucide-react";
import AnimatedWrapper from "./AnimatedWrapper";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Powerful, scalable, and future-ready web applications tailored to your vision.",
  },
  {
    icon: Brain,
    title: "AI-Powered Applications",
    description: "Smart automation and machine-learning-based apps that solve real-world problems for businesses.",
  },
  {
    icon: Zap,
    title: "In-house R&D Team",
    description: "Our expert R&D team goes from idea discovery to technical blueprint, guiding founders into a working product.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "From Shopify to custom storefronts, we build systems that grow with you.",
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "Design is more than visuals. We craft experiences that click, grounded in how your users actually work.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "We optimize your digital presence for maximum visibility and organic reach.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Growth",
    description: "Strategic consulting from first idea to go-to-market, plus autonomous social media marketing that plans, posts, and optimizes itself.",
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
            What we're great at, so you can be even greater.
          </p>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Our core services">
          {services.map((service, index) => {
            const isOrphan = services.length % 3 !== 0 && index === services.length - 1;
            return (
            <AnimatedWrapper
              key={service.title}
              animation="fade-up"
              delay={`${index * 80}ms`}
              className={isOrphan ? "sm:col-span-2 lg:col-span-3" : undefined}
            >
              <div
                role="listitem"
                aria-label={`Service: ${service.title}`}
                className={`group h-full rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 ${isOrphan ? "p-8 sm:flex sm:items-center sm:gap-8" : "p-8"}`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300 ${isOrphan ? "sm:flex-shrink-0" : "mb-6"}`}>
                  <service.icon className="h-5 w-5 text-blue-600" />
                </div>

                <div className={isOrphan ? "mt-6 sm:mt-0" : undefined}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className={`text-slate-500 text-sm leading-relaxed ${isOrphan ? "sm:max-w-xl" : ""}`}>
                    {service.description}
                  </p>
                </div>
              </div>
            </AnimatedWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
