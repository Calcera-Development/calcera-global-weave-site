
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

// Utility to chunk array into rows of 3
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const ServicesGrid = () => {
  const rows = chunkArray(services, 3);

  return (
    <section id="services" className="py-16 px-2 xs:px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 mb-3">
            Our Core Services
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600">
            What we're great at—so you can be even greater.
          </p>
        </AnimatedWrapper>
        {/* On desktop (md:), output each row; special styling for last row if < 3 cards */}
        <div className="space-y-0">
          {rows.map((row, i) => {
            const isLastRow = i === rows.length - 1;
            const shouldCenter =
              isLastRow && row.length < 3;

            // On small screens, single grid stacks, so centering unnecessary.
            return (
              <div
                key={i}
                className={`
                  grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8
                  ${shouldCenter ? "md:flex md:justify-center md:gap-8 md:px-4" : ""}
                  ${shouldCenter ? "lg:grid-cols-5" : ""}
                  ${!shouldCenter ? "md:grid" : "md:block"}
                  mb-0
                `}
              >
                {row.map((service, rowIdx) => (
                  <AnimatedWrapper
                    key={service.title}
                    animation="fade-up"
                    delay={`${(i*3 + rowIdx) * 120}ms`}
                    className="h-full"
                  >
                    <Card
                      className={`
                        ${service.color}
                        border-none shadow-none h-full flex flex-col
                        transition-all duration-300
                        hover:shadow-lg hover:scale-[1.035] group
                      `}
                    >
                      <CardHeader className="text-center p-6 flex flex-col items-center">
                        <service.icon
                          className={`h-10 w-10 mb-4
                            ${service.color === "bg-blue-50"
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

