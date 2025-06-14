
import { Code, Brain, Zap, ShoppingCart, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Powerful, scalable, and future-ready web applications tailored to your vision.",
    color: "bg-blue-50"
  },
  {
    icon: Brain,
    title: "AI-Powered Web Applications",
    description: "We build smart automation, GPT and machine learning-based apps that solve real-world problems for businesses, tailored to your unique needs.",
    color: "bg-purple-50"
  },
  {
    icon: Zap,
    title: "In-house R&D Team",
    description: "Our expert R&D team goes from idea discovery to technical blueprint, guiding founders who don’t have a tech plan yet into a working product.",
    color: "bg-violet-50"
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Solutions",
    description: "From Shopify to custom storefronts, we build systems that grow with you.",
    color: "bg-emerald-50"
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "Design is more than visuals — it's how your users feel. We craft experiences that click.",
    color: "bg-orange-50"
  }
];

const ServicesGrid = () => {
  return (
    <section
      id="services"
      className="py-16 mt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 mb-3">
            Our Core Services
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600">
            What we're great at—so you can be even greater.
          </p>
        </AnimatedWrapper>
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <AnimatedWrapper
              key={service.title}
              animation="fade-up"
              delay={`${index * 120}ms`}
              className="flex w-full sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333%-1.3333rem)] lg:basis-[calc(20%-1.6rem)]"
            >
              <Card
                className={`
                  ${service.color}
                  border-none shadow-none w-full h-full flex flex-col
                  transition-all duration-300
                  hover:shadow-lg hover:scale-[1.035] group
                `}
              >
                <CardHeader className="text-center p-6 flex flex-col items-center">
                  <service.icon
                    className={`h-10 w-10 mb-4
                      ${
                        service.color === "bg-blue-50"
                          ? "text-blue-500"
                          : service.color === "bg-purple-50"
                          ? "text-purple-500"
                          : service.color === "bg-emerald-50"
                          ? "text-emerald-500"
                          : service.color === "bg-violet-50"
                          ? "text-violet-500"
                          : "text-orange-500"
                      }
                      transition-colors duration-300
                    `}
                  />
                  <CardTitle className="text-lg sm:text-xl text-slate-800 font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-6 text-slate-600 text-base flex-1">
                  {service.description}
                </CardContent>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
