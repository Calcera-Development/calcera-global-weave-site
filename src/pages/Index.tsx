import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, CheckCircle, MessageCircle, Mic, Layers, Search, ShoppingCart, Calculator, MapPin, Utensils, Shield, Heart } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import HeaderNav from "@/components/HeaderNav";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioGrid from "@/components/PortfolioGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactForm from "@/components/ContactForm";
import React from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const services = [{
    icon: Code,
    title: "Web Development",
    description: "Powerful, scalable, and future-ready web applications tailored to your vision.",
    features: ["React & Next.js", "Full-Stack Development", "API Integration", "Performance Optimization"],
    color: "bg-blue-50"
  }, {
    icon: Brain,
    title: "AI-Powered Web Applications",
    description: "We build smart automation, GPT and machine learning-based apps that solve real-world problems for businesses, tailored to your unique needs.",
    features: ["GPT Integration", "Custom AI Models", "Machine Learning", "AI Automation"],
    color: "bg-purple-50"
  }, {
    icon: Zap,
    title: "In-house R&D Team",
    description: "Our expert R&D team goes from idea discovery to technical blueprint, guiding founders who don’t have a tech plan yet into a working product.",
    features: ["Discovery Workshops", "Prototype & MVP", "Emerging Tech Consulting", "Custom Integration"],
    color: "bg-violet-50"
  }, {
    icon: ShoppingCart,
    title: "Ecommerce Solutions",
    description: "From Shopify to custom storefronts, we build systems that grow with you.",
    features: ["Shopify Development", "Payment Integration", "Inventory Management", "Order Processing"],
    color: "bg-emerald-50"
  }, {
    icon: Users,
    title: "UI/UX Design",
    description: "Design is more than visuals — it's how your users feel. We craft experiences that click.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "bg-orange-50"
  }];
  const portfolio = [{
    title: "Chat Companion",
    category: "AI + WhatsApp",
    tags: ["AI", "WhatsApp"],
    description: "A relationship wellness chatbot that decodes communication patterns, offering users personalized insights. Powered by GPT, it's like therapy, simplified.",
    icon: MessageCircle,
    color: "bg-green-100"
  }, {
    title: "MedPod",
    category: "Podcast AI Platform",
    tags: ["AI", "Podcast"],
    description: "AI-driven platform that auto-generates podcasts, simulates interviews, and educates users with interactive AI personas. Fast. Smart. Fun.",
    icon: Mic,
    color: "bg-blue-100"
  }, {
    title: "MultiLens",
    category: "AI Debate Engine",
    tags: ["AI", "Multi-model"],
    description: "An AI-powered debate and synthesis tool that brings multiple perspectives to life through a collaborative, multi-model interface.",
    icon: Layers,
    color: "bg-purple-100"
  }, {
    title: "LeadSpark",
    category: "Smart Prospecting Tool",
    tags: ["AI", "Lead Generation"],
    description: "Find untapped leads. With AI filters, real-time web scans, and smart suggestions, LeadSpark uncovers businesses that need your services—before they even know it.",
    icon: Search,
    color: "bg-yellow-100"
  }, {
    title: "Shopify Inventory Syncer",
    category: "Ecommerce Tool",
    tags: ["Shopify", "Automation"],
    description: "A robust tool that keeps stock levels in perfect sync across product variations—because growing businesses deserve organized chaos, minus the chaos.",
    icon: ShoppingCart,
    color: "bg-emerald-100"
  }, {
    title: "Financera",
    category: "Smart Finance Assistant",
    tags: ["AI", "Finance"],
    description: "From invoice scanning to expense tracking, Financera uses AI to help businesses manage finances without breaking a sweat.",
    icon: Calculator,
    color: "bg-indigo-100"
  }, {
    title: "Resort Bliss",
    category: "Magnolia Hideout",
    tags: ["Resort", "Web Design"],
    description: "A digital sanctuary for a real one. A high-end resort website with stunning visuals and calming UX that mirrors the guest experience.",
    icon: MapPin,
    color: "bg-teal-100"
  }, {
    title: "Fuel Food",
    category: "Restaurant App",
    tags: ["Restaurant", "Dashboard"],
    description: "Complete digital experience for a restaurant—ordering, checkout, admin dashboard, and all the tasty UI in between.",
    icon: Utensils,
    color: "bg-red-100"
  }, {
    title: "Ceylon Turtles",
    category: "Conservation Site",
    tags: ["Conservation", "Education"],
    description: "An educational platform designed to drive awareness and support for turtle conservation in Sri Lanka.",
    icon: Shield,
    color: "bg-green-100"
  }];
  const whyChooseUs = [{
    title: "More Than Developers — We're Your Digital Co-Founders",
    description: "We don't just write code. We dive into your business goals, understand your users, and build what makes a difference.",
    icon: Users
  }, {
    title: "Design That Connects",
    description: "We make your brand feel alive with UI/UX that's as intuitive as it is beautiful.",
    icon: Heart
  }, {
    title: "Full Transparency",
    description: "You see what we see. Real-time project tracking, open communication, and no mystery meetings.",
    icon: CheckCircle
  }, {
    title: "Built on Collaboration",
    description: "Our favorite projects happen when we work together. With Calcera, you're not a client—you're part of the team.",
    icon: Zap
  }];

  // Section refs for smooth scroll
  const heroRef = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLElement>(null);
  const workRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  // Helper scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Expose scroll functions for navigation
  const navScrollFns = {
    home: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    services: () => scrollToSection(servicesRef),
    work: () => scrollToSection(workRef),
    contact: () => scrollToSection(contactRef),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <HeaderNav navScrollFns={navScrollFns} />
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedWrapper animation="fade-up">
            <h1 className="text-5xl md:text-7xl font-light text-slate-800 mb-5 leading-tight">
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text">We Design.</span><br />
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">We Build.</span><br />
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text">We Elevate.</span>
            </h1>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-up" delay="200ms">
            <p className="text-2xl text-slate-600 mb-5 max-w-2xl mx-auto leading-relaxed">
              Beautiful code. Intelligent design. Seamless solutions.
            </p>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-up" delay="400ms">
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-7">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => scrollToSection(contactRef)}
              >
                Book Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                onClick={() => scrollToSection(workRef)}
              >
                View Our Work
              </Button>
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade-up" delay="600ms">
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-2">
              Crafting technology that feels effortless.
            </p>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              At Calcera, we build elegant digital experiences that do more than just function — they connect, convert, and captivate. Whether you're scaling up or starting fresh, we bring the technical brilliance and design magic to keep you ahead of the curve.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      <section ref={servicesRef}>
        <ServicesGrid />
      </section>
      <section ref={workRef}>
        <PortfolioGrid />
      </section>
      <WhyChooseUs />
      <section ref={contactRef}>
        <ContactForm />
      </section>
      {/* Footer */}
      <footer className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-blue-100 border-t border-blue-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
            <div className="flex items-center space-x-8">
              <img src="/lovable-uploads/294cbe84-0b39-46b6-a2f7-1ae0d50fa821.png" alt="Calcera Logo footer" style={{
                minWidth: 65
              }} className="h-10 w-auto select-none object-contain" />
              <div className="hidden lg:flex space-x-6">
                {["Home", "Services", "Work", "Contact"].map(item => (
                  <a
                    key={item}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (item === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                      else if (item === "Services") scrollToSection(servicesRef);
                      else if (item === "Work") scrollToSection(workRef);
                      else if (item === "Contact") scrollToSection(contactRef);
                    }}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-slate-600 text-center lg:text-right">
              <p className="transition-colors duration-300 hover:text-slate-700 text-lg">&copy; 2025 — Calcera Global. Built with logic and love.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Index;
