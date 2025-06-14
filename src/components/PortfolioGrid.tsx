
import { MessageCircle, Mic, Layers, Search, ShoppingCart, Calculator, MapPin, Utensils, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const portfolio = [
  {
    title: "Chat Companion",
    category: "AI + WhatsApp",
    description: "A relationship wellness chatbot that decodes communication patterns, offering users personalized insights. Powered by GPT, it's like therapy, simplified.",
    icon: MessageCircle,
    color: "bg-green-100"
  },
  {
    title: "MedPod",
    category: "Podcast AI Platform", 
    description: "AI-driven platform that auto-generates podcasts, simulates interviews, and educates users with interactive AI personas. Fast. Smart. Fun.",
    icon: Mic,
    color: "bg-blue-100"
  },
  {
    title: "MultiLens",
    category: "AI Debate Engine",
    description: "An AI-powered debate and synthesis tool that brings multiple perspectives to life through a collaborative, multi-model interface.",
    icon: Layers,
    color: "bg-purple-100"
  },
  {
    title: "LeadSpark",
    category: "Smart Prospecting Tool",
    description: "Find untapped leads. With AI filters, real-time web scans, and smart suggestions, LeadSpark uncovers businesses that need your services—before they even know it.",
    icon: Search,
    color: "bg-yellow-100"
  },
  {
    title: "Shopify Inventory Syncer",
    category: "Ecommerce Tool",
    description: "A robust tool that keeps stock levels in perfect sync across product variations—because growing businesses deserve organized chaos, minus the chaos.",
    icon: ShoppingCart,
    color: "bg-emerald-100"
  },
  {
    title: "Financera",
    category: "Smart Finance Assistant",
    description: "From invoice scanning to expense tracking, Financera uses AI to help businesses manage finances without breaking a sweat.",
    icon: Calculator,
    color: "bg-indigo-100"
  },
  {
    title: "Resort Bliss",
    category: "Magnolia Hideout",
    description: "A digital sanctuary for a real one. A high-end resort website with stunning visuals and calming UX that mirrors the guest experience.",
    icon: MapPin,
    color: "bg-teal-100"
  },
  {
    title: "Fuel Food",
    category: "Restaurant App",
    description: "Complete digital experience for a restaurant—ordering, checkout, admin dashboard, and all the tasty UI in between.",
    icon: Utensils,
    color: "bg-red-100"
  },
  {
    title: "Ceylon Turtles",
    category: "Conservation Site",
    description: "An educational platform designed to drive awareness and support for turtle conservation in Sri Lanka.",
    icon: Shield,
    color: "bg-green-100"
  }
];

const PortfolioGrid = () => (
  <section id="work" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
    <div className="max-w-7xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-3">
          Work We're Proud Of
        </h2>
        <p className="text-lg sm:text-xl text-slate-600">A glimpse into our digital playground.</p>
      </AnimatedWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((project, index) => (
          <AnimatedWrapper key={project.title} animation="zoom-in" delay={`${index * 100}ms`}>
            <Card className="bg-white border-none shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <CardHeader className="p-8 pb-3 flex-grow">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-2 rounded-lg ${project.color}`}>
                    <project.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <p className="font-medium text-sm text-slate-500 uppercase tracking-wider">{project.category}</p>
                </div>
                <CardTitle className="text-lg font-semibold mb-1 text-slate-800">{project.title}</CardTitle>
                <CardDescription className="mb-2 text-slate-700 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioGrid;
