
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, CheckCircle, MessageCircle, Mic, Layers, Search, ShoppingCart, Calculator, MapPin, Utensils, Shield, Heart, Sparkles, Rocket, Star } from "lucide-react";
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
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-pulse blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-bounce blur-2xl" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-teal-400/25 to-blue-400/25 rounded-full animate-pulse blur-xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full animate-bounce blur-xl" style={{animationDelay: '0.5s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-blue-500 rotate-45 animate-spin" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-teal-500 rotate-45 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedWrapper animation="fade-up">
            <div className="flex justify-center items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 animate-pulse" />
              <span className="text-sm sm:text-base font-medium text-blue-600 uppercase tracking-wider">Digital Innovation Studio</span>
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 animate-pulse" style={{animationDelay: '0.5s'}} />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-800 mb-6 leading-tight">
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text">We Design.</span><br />
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">We Build.</span><br />
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text">We Elevate.</span>
            </h1>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="fade-up" delay="200ms">
            <div className="relative">
              <p className="text-xl sm:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                Beautiful code. Intelligent design. Seamless solutions.
              </p>
              <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-blue-400 rounded-full animate-ping opacity-30"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-2 border-purple-400 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="fade-up" delay="400ms">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                onClick={() => scrollToSection(contactRef)}
              >
                <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                Book Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-400 bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                onClick={() => scrollToSection(workRef)}
              >
                <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                View Our Work
              </Button>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="fade-up" delay="600ms">
            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20 max-w-3xl mx-auto">
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-3">
                Crafting technology that feels effortless.
              </p>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                At Calcera, we build elegant digital experiences that do more than just function — they connect, convert, and captivate. Whether you're scaling up or starting fresh, we bring the technical brilliance and design magic to keep you ahead of the curve.
              </p>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      <section ref={servicesRef}>
        <ServicesGrid />
      </section>
      <section ref={workRef}>
        <PortfolioGrid onContactClick={() => scrollToSection(contactRef)} />
      </section>
      <WhyChooseUs />
      <section ref={contactRef}>
        <ContactForm />
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/lovable-uploads/294cbe84-0b39-46b6-a2f7-1ae0d50fa821.png" 
                  alt="Calcera Logo" 
                  className="h-12 w-auto select-none object-contain hover:scale-110 transition-transform duration-300" 
                />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Calcera Global
                  </h3>
                  <p className="text-slate-300">AI-Powered Digital Partner</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Transforming ideas into intelligent digital experiences. We craft beautiful, functional solutions that drive real business results.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Services", "Work", "Contact"].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                        else if (item === "Services") scrollToSection(servicesRef);
                        else if (item === "Work") scrollToSection(workRef);
                        else if (item === "Contact") scrollToSection(contactRef);
                      }}
                      className="text-slate-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 decoration-blue-400"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
              <ul className="space-y-3 text-slate-300">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Web Development</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">AI Solutions</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">UI/UX Design</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Ecommerce</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">R&D Consulting</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-slate-300 text-center lg:text-left">
                <p className="text-lg font-medium">
                  &copy; 2025 Calcera Global. Built with logic and love.
                </p>
                <p className="text-sm mt-1">
                  Transforming businesses through intelligent technology solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <span className="hidden sm:block">•</span>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <span className="hidden sm:block">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Available for new projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Index;
