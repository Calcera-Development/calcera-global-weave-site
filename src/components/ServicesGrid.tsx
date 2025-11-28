import { Code, Brain, Zap, ShoppingCart, Users } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Powerful, scalable web applications tailored to your vision"
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Smart automation and ML-based apps that solve real problems"
  },
  {
    icon: Zap,
    title: "Product R&D",
    description: "From idea to technical blueprint, guiding your vision to reality"
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce",
    description: "Custom storefronts that grow with your business"
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "Experiences that connect and feel right"
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-32 px-6 sm:px-8 lg:px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-4">
            What We Do
          </h2>
          <p className="text-xl text-slate-600 font-light">
            Building technology that works beautifully
          </p>
        </AnimatedWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedWrapper
              key={service.title}
              animation="fade-up"
              delay={`${index * 100}ms`}
            >
              <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <service.icon className="h-8 w-8 text-blue-600 mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-normal text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed">{service.description}</p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
