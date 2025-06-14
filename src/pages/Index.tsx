
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, CheckCircle, MessageCircle, Mic, Layers, Search, ShoppingCart, Calculator, MapPin, Utensils, Shield, Heart } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Powerful, scalable, and future-ready web applications tailored to your vision.",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Performance Optimization"],
      color: "bg-blue-50"
    },
    {
      icon: Brain,
      title: "AI-Powered Web Applications",
      description: "We solve real-world business problems with intelligent applications. Our in-house R&D team designs custom technical solutions, even if you're starting without a clear idea.",
      features: ["GPT Integration", "Custom AI Models", "Machine Learning", "AI Automation"],
      color: "bg-purple-50"
    },
    {
      icon: ShoppingCart,
      title: "Ecommerce Solutions",
      description: "From Shopify to custom storefronts, we build systems that grow with you.",
      features: ["Shopify Development", "Payment Integration", "Inventory Management", "Order Processing"],
      color: "bg-emerald-50"
    },
    {
      icon: Users,
      title: "UI/UX Design",
      description: "Design is more than visuals — it's how your users feel. We craft experiences that click.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "bg-orange-50"
    }
  ];

  const portfolio = [
    {
      title: "Chat Companion",
      category: "AI + WhatsApp",
      tags: ["AI", "WhatsApp"],
      description: "A relationship wellness chatbot that decodes communication patterns, offering users personalized insights. Powered by GPT, it's like therapy, simplified.",
      icon: MessageCircle,
      color: "bg-green-100"
    },
    {
      title: "MedPod",
      category: "Podcast AI Platform", 
      tags: ["AI", "Podcast"],
      description: "AI-driven platform that auto-generates podcasts, simulates interviews, and educates users with interactive AI personas. Fast. Smart. Fun.",
      icon: Mic,
      color: "bg-blue-100"
    },
    {
      title: "MultiLens",
      category: "AI Debate Engine",
      tags: ["AI", "Multi-model"],
      description: "An AI-powered debate and synthesis tool that brings multiple perspectives to life through a collaborative, multi-model interface.",
      icon: Layers,
      color: "bg-purple-100"
    },
    {
      title: "LeadSpark",
      category: "Smart Prospecting Tool",
      tags: ["AI", "Lead Generation"],
      description: "Find untapped leads. With AI filters, real-time web scans, and smart suggestions, LeadSpark uncovers businesses that need your services—before they even know it.",
      icon: Search,
      color: "bg-yellow-100"
    },
    {
      title: "Shopify Inventory Syncer",
      category: "Ecommerce Tool",
      tags: ["Shopify", "Automation"],
      description: "A robust tool that keeps stock levels in perfect sync across product variations—because growing businesses deserve organized chaos, minus the chaos.",
      icon: ShoppingCart,
      color: "bg-emerald-100"
    },
    {
      title: "Financera",
      category: "Smart Finance Assistant",
      tags: ["AI", "Finance"],
      description: "From invoice scanning to expense tracking, Financera uses AI to help businesses manage finances without breaking a sweat.",
      icon: Calculator,
      color: "bg-indigo-100"
    },
    {
      title: "Resort Bliss",
      category: "Magnolia Hideout",
      tags: ["Resort", "Web Design"],
      description: "A digital sanctuary for a real one. A high-end resort website with stunning visuals and calming UX that mirrors the guest experience.",
      icon: MapPin,
      color: "bg-teal-100"
    },
    {
      title: "Fuel Food",
      category: "Restaurant App",
      tags: ["Restaurant", "Dashboard"],
      description: "Complete digital experience for a restaurant—ordering, checkout, admin dashboard, and all the tasty UI in between.",
      icon: Utensils,
      color: "bg-red-100"
    },
    {
      title: "Ceylon Turtles",
      category: "Conservation Site",
      tags: ["Conservation", "Education"],
      description: "An educational platform designed to drive awareness and support for turtle conservation in Sri Lanka.",
      icon: Shield,
      color: "bg-green-100"
    }
  ];

  const whyChooseUs = [
    {
      title: "More Than Developers — We're Your Digital Co-Founders",
      description: "We don't just write code. We dive into your business goals, understand your users, and build what makes a difference.",
      icon: Users
    },
    {
      title: "Design That Connects",
      description: "We make your brand feel alive with UI/UX that's as intuitive as it is beautiful.",
      icon: Heart
    },
    {
      title: "Full Transparency",
      description: "You see what we see. Real-time project tracking, open communication, and no mystery meetings.",
      icon: CheckCircle
    },
    {
      title: "Built on Collaboration",
      description: "Our favorite projects happen when we work together. With Calcera, you're not a client—you're part of the team.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 z-50 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group">
              <img 
                src="/lovable-uploads/294cbe84-0b39-46b6-a2f7-1ae0d50fa821.png" 
                alt="Calcera Logo" 
                className="h-12 w-auto select-none"
                style={{ minWidth: 85 }}
              />
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About Us", "Services", "Work"].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-slate-600 hover:text-blue-600 font-medium text-base transition-all duration-300 relative group py-3 transform hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform"
              >
                Book Free Consultation
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 hover:bg-slate-100 rounded-full transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200/50 shadow-lg transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="px-6 py-6 space-y-4">
            {["Home", "About Us", "Services", "Work"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-slate-600 hover:text-blue-600 font-medium text-base transition-all duration-300 py-3 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                Book Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedWrapper animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-800 mb-3">
              Our Core Services
            </h2>
            <p className="text-xl text-slate-600">What we're great at—so you can be even greater.</p>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <AnimatedWrapper key={service.title} animation="fade-up" delay={`${index * 100}ms`}>
                <Card className={`${service.color} border-none shadow-none h-full`}>
                  <CardHeader className="text-center p-8">
                    <service.icon className={`h-10 w-10 mx-auto mb-4 ${
                      service.color === "bg-blue-50" ? "text-blue-500" :
                      service.color === "bg-purple-50" ? "text-purple-500" :
                      service.color === "bg-emerald-50" ? "text-emerald-500" :
                      "text-orange-500"
                    }`} />
                    <CardTitle className="text-xl text-slate-800">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 text-slate-600 text-base">
                    {service.description}
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedWrapper animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-800 mb-3">
              Work We're Proud Of
            </h2>
            <p className="text-xl text-slate-600">A glimpse into our digital playground.</p>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedWrapper animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-800 mb-3">Why Calcera?</h2>
            <p className="text-xl text-slate-600">Because building with love and logic matters.</p>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {whyChooseUs.map((item, index) => (
              <AnimatedWrapper key={item.title} animation="fade-up" delay={`${index * 150}ms`}>
                <div className="flex items-start space-x-6">
                  <div className={`p-3 rounded-full bg-blue-100 flex-shrink-0`}>
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <AnimatedWrapper animation="fade-up" className="text-center mb-14">
            <h2 className="text-4xl font-light text-slate-800 mb-6">Let's Make Something Great Together</h2>
            <p className="text-2xl text-slate-600">We’d love to hear what you’re building. Let’s turn your ideas into beautifully built reality.</p>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-2 gap-14">
            <AnimatedWrapper animation="slide-in-from-left">
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-slate-800 mb-6">Tell Us About Your Project</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Your Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Email or Phone Number</label>
                    <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Quick Summary of Your Idea</label>
                    <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"></textarea>
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg text-lg py-4 rounded-full">
                    Book Free Consultation
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide-in-from-right">
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-slate-800 mb-6">Or Say Hi Anytime!</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-5">
                    <span className="p-2 bg-blue-100 rounded-full">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-slate-800">Phone</p>
                      <p className="text-slate-600">+94 77 123 9037</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <span className="p-2 bg-purple-100 rounded-full">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-slate-800">Email</p>
                      <a className="text-slate-600 hover:text-blue-700" href="mailto:hello@calcera.global">hello@calcera.global</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <span className="p-2 bg-emerald-100 rounded-full">
                      <MapPin className="h-6 w-6 text-emerald-600" />
                    </span>
                    <div>
                      <p className="font-medium text-slate-800">Location</p>
                      <p className="text-slate-600">Colombo, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-blue-100 border-t border-blue-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-8 mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/294cbe84-0b39-46b6-a2f7-1ae0d50fa821.png" 
                alt="Calcera Logo footer" 
                className="h-10 w-auto select-none"
                style={{ minWidth: 65 }}
              />
              <div className="hidden md:flex space-x-6">
                {["Home", "About", "Services", "Work", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-slate-600 text-center md:text-right">
              <p className="transition-colors duration-300 hover:text-slate-700 text-lg">&copy; 2025 — Calcera Global. Built with logic and love.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
