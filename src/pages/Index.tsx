
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, Star, CheckCircle, Building2, MessageCircle, Mic, Layers, Search, ShoppingCart, Calculator, MapPin, Utensils, Shield } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Stagger card animations
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Achieve scalable web app success with our experienced developers.",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Performance Optimization"],
      color: "bg-blue-50"
    },
    {
      icon: Brain,
      title: "AI Solutions", 
      description: "Harness your operations with cutting-edge AI solutions.",
      features: ["GPT Integration", "Custom AI Models", "Machine Learning", "AI Automation"],
      color: "bg-purple-50"
    },
    {
      icon: ShoppingCart,
      title: "Ecommerce Solutions",
      description: "Streamline your business with seamless eCommerce.",
      features: ["Shopify Development", "Payment Integration", "Inventory Management", "Order Processing"],
      color: "bg-emerald-50"
    },
    {
      icon: Users,
      title: "UI/UX Designs",
      description: "Design user experiences that captivate and convert.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "bg-orange-50"
    }
  ];

  const portfolio = [
    {
      title: "CoupleCompass",
      category: "Whatsapp",
      tags: ["Chat Analysis", "AI"],
      description: "CoupleCompass is an AI-powered WhatsApp chatbot that uncovers hidden behavioral patterns in conversations. Powered by GPT, it analyzes chat history to identify communication styles, emotional tones, and relationship dynamics, providing valuable insights in a simple and engaging way.",
      icon: MessageCircle,
      color: "bg-green-100"
    },
    {
      title: "MedCast",
      category: "Podcast", 
      tags: ["AI Simulator"],
      description: "MedCast is a full-stack application that enhances user engagement through AI-driven podcast creation and interactive chatbot experiences. Powered by Gemini AI, it enables effortless podcast generation and AI-driven scenario simulations for learning, training, and decision-making, creating a seamless and dynamic user experience.",
      icon: Mic,
      color: "bg-blue-100"
    },
    {
      title: "Multimodal",
      category: "Multi-model",
      tags: ["AI Debate Model"],
      description: "Multimodal is an AI-powered synthesis and debate model that integrates four AI models into a dynamic chat interface. It analyzes diverse perspectives, synthesizes insights, and facilitates intelligent discussions, providing a well-rounded approach to complex topics.",
      icon: Layers,
      color: "bg-purple-100"
    },
    {
      title: "ClientSnare",
      category: "Lead Generation",
      tags: ["AI"],
      description: "ClientSnare is a lead generation search tool that helps users identify businesses without websites or those with underperforming ones. It offers filters like review count, location, and business type, along with AI-powered recommendations via Gemini. The platform also includes an email collection feature for seamless outreach.",
      icon: Search,
      color: "bg-yellow-100"
    },
    {
      title: "Inventory Sync",
      category: "Ecommerce",
      tags: ["Shopify"],
      description: "Effortlessly manage shared inventory across multiple Shopify products with our Inventory Sync tool. Automatically update stock levels for all items with the same SKU in real time, streamline bulk updates, and handle large inventories with ease. Perfect for businesses offering product variations, this scalable solution keeps your store organized and efficient.",
      icon: ShoppingCart,
      color: "bg-emerald-100"
    },
    {
      title: "Financely",
      category: "Finance",
      tags: ["AI"],
      description: "Financely simplifies finance management with cutting-edge AI. Track your spending, uncover hidden recurring charges, and scan invoices for detailed breakdowns and actionable insights. With smart recommendations, Financely helps businesses optimize their financial health effortlessly.",
      icon: Calculator,
      color: "bg-indigo-100"
    },
    {
      title: "Magnolia Hideout",
      category: "Resort",
      tags: [],
      description: "Magnolia Hideout – a beautifully designed website created for a serene resort, showcasing its luxurious amenities, breathtaking surroundings, and the ultimate escape experience.",
      icon: MapPin,
      color: "bg-teal-100"
    },
    {
      title: "Fuel Food",
      category: "Restaurant",
      tags: ["Dashboard"],
      description: "Fuel Food is a modern website designed to deliver an exceptional user experience. It features a visually appealing landing page, an intuitive menu cart for browsing, a smooth checkout process, and a powerful backend for admin management. Built for efficiency and ease, Fuel Food ensures seamless functionality for both customers and administrators.",
      icon: Utensils,
      color: "bg-red-100"
    },
    {
      title: "Ceylon Turtles",
      category: "Conservation",
      tags: [],
      description: "Ceylon Turtles is a thoughtfully designed website focused on raising awareness about turtles and protecting hatcheries. It offers educational resources, inspiring stories, and ways to support turtle conservation efforts.",
      icon: Shield,
      color: "bg-green-100"
    }
  ];

  const whyChooseUs = [
    {
      title: "Not just coders, we're problem solvers",
      description: "At Tensho Labs, we're more than just developers—we're innovative problem solvers. We approach every project with a solution-driven mindset, ensuring your challenges are met with creativity, precision, and expertise.",
      icon: Brain
    },
    {
      title: "UI/UX That Inspires.",
      description: "From intuitive interfaces to stunning designs, our best-in-class UI/UX design transforms the way your users interact with your product.",
      icon: Users
    },
    {
      title: "Total Transparency.",
      description: "Transparency is at the core of everything we do. With real-time task boards, you're always informed about project progress, and open communication ensures no hidden discussions or surprises—keeping you fully in the loop.",
      icon: CheckCircle
    },
    {
      title: "Collaboration at the Core.",
      description: "We believe the best results come from working together. By fostering open communication and a seamless partnership, we align our expertise with your vision to create solutions that truly reflect your goals. Consider us an extension of your team—dedicated, transparent, and committed to achieving success together.",
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
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-blue-600">Tensho Labs</span>
                <span className="text-sm text-slate-500 font-medium tracking-wide">Design. Code. Integrate.</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About Us", "Services", "Portfolio"].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-slate-600 hover:text-blue-600 font-medium text-base transition-all duration-300 relative group py-3 transform hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
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
            {["Home", "About Us", "Services", "Portfolio"].map((item, index) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="block text-slate-600 hover:text-blue-600 font-medium text-base transition-all duration-300 py-3 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 100}ms` }}
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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-light text-slate-800 mb-8 leading-tight">
              <span className="inline-block transform transition-all duration-700 hover:scale-105">Design.</span>
              <span className="inline-block transform transition-all duration-700 hover:scale-105 mx-4">Code.</span>
              <span className="font-normal inline-block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transform transition-all duration-700 hover:scale-105">Integrate.</span>
            </h1>
            <p className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
              We build pixel perfect tech to keep you ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-700 delay-500 opacity-0 animate-[fade-in_1s_ease-out_0.7s_forwards]">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl group text-lg px-10 py-4">
                Free Consultation
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 text-lg px-10 py-4">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`${service.color} border-gray-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 group cursor-pointer ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transition: 'all 0.5s ease-out'
                }}
              >
                <CardHeader className="text-center p-8">
                  <div className="mx-auto mb-6 p-4 bg-white rounded-full w-fit transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                    <service.icon className="h-10 w-10 text-slate-700 transition-colors duration-300 group-hover:text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-800 font-medium text-xl transition-colors duration-300 group-hover:text-blue-700 mb-4">{service.title}</CardTitle>
                  <CardDescription className="text-slate-600 transition-colors duration-300 group-hover:text-slate-700 text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500 transition-colors duration-300 group-hover:text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-600 transition-colors duration-300 group-hover:text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-slate-800 mb-6 transform transition-all duration-700 hover:scale-105">Some of our work.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card 
                key={index} 
                className="bg-white border-gray-200 overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:scale-105 group cursor-pointer opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="transform transition-all duration-300 group-hover:translate-y-[-2px] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${project.color} transition-all duration-300 group-hover:scale-110`}>
                      <project.icon className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">{project.category}</p>
                      {project.tags.length > 0 && (
                        <div className="flex gap-2 mt-1">
                          {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-slate-800 font-medium transition-colors duration-300 group-hover:text-blue-700 text-xl mb-3">{project.title}</CardTitle>
                  <CardDescription className="text-slate-600 transition-colors duration-300 group-hover:text-slate-700 text-base leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-slate-800 mb-6 transform transition-all duration-700 hover:scale-105">Why choose Tensho Labs?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6 transform transition-all duration-500 opacity-0 animate-[fade-in_0.8s_ease-out_forwards] hover:translate-x-2"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6">
                  <item.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-4 transition-colors duration-300 hover:text-blue-700">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg transition-colors duration-300 hover:text-slate-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-slate-800 mb-8 transform transition-all duration-700 hover:scale-105">Enough about us!</h2>
            <p className="text-2xl text-slate-600 transition-all duration-300 hover:text-slate-700">Let's talk about your idea.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-medium text-slate-800 mb-8">Tell Us About Your Project</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Email or Phone Number</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Project Description (In a nutshell)</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl group text-lg py-4"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-3xl font-medium text-slate-800 mb-8">Or Reach Out!</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Phone</p>
                    <p className="text-slate-600">+94 76 418 8801</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Email</p>
                    <p className="text-slate-600">tensholabs@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Location</p>
                    <p className="text-slate-600">Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-blue-100 border-t border-blue-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-8 mb-6 md:mb-0">
              <span className="text-2xl font-bold text-slate-800 transition-colors duration-300 hover:text-blue-700">Tensho Labs</span>
              <div className="hidden md:flex space-x-6">
                {["Home", "About Us", "Services", "Portfolio"].map((item) => (
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
              <p className="transition-colors duration-300 hover:text-slate-700 text-lg">&copy; 2025 — Tensho Labs</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
