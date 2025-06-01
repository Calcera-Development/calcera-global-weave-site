
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, Star, CheckCircle, Building2 } from "lucide-react";

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
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Custom AI solutions, neural networks, and machine learning models tailored to your business needs.",
      features: ["Deep Learning", "NLP", "Computer Vision", "Predictive Analytics"],
      color: "bg-blue-50"
    },
    {
      icon: Building2,
      title: "Enterprise Applications",
      description: "Comprehensive enterprise-level software solutions designed for scalability, security, and performance.",
      features: ["ERP Systems", "CRM Platforms", "Business Intelligence", "Workflow Automation"],
      color: "bg-emerald-50"
    },
    {
      icon: Code,
      title: "AI-Powered Enterprise",
      description: "Intelligent enterprise applications that combine traditional business logic with cutting-edge AI capabilities.",
      features: ["Smart Analytics", "Automated Decision Making", "Intelligent APIs", "AI-Enhanced UX"],
      color: "bg-purple-50"
    },
    {
      icon: Zap,
      title: "Digital Transformation",
      description: "End-to-end digital transformation services to modernize your business processes and technology stack.",
      features: ["Legacy Modernization", "Cloud Migration", "Process Optimization", "Technology Consulting"],
      color: "bg-orange-50"
    }
  ];

  const portfolio = [
    {
      title: "Enterprise ERP System",
      description: "Complete enterprise resource planning solution for manufacturing companies with real-time analytics",
      tech: ["React", "Node.js", "PostgreSQL", "Docker"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "AI-Powered CRM Platform",
      description: "Customer relationship management system with AI-driven insights and predictive lead scoring",
      tech: ["Python", "TensorFlow", "React", "MongoDB"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Intelligent Supply Chain",
      description: "Enterprise supply chain management with machine learning for demand forecasting and optimization",
      tech: ["Python", "Scikit-learn", "Vue.js", "AWS"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Financial Analytics Dashboard",
      description: "Enterprise-grade financial reporting and analytics platform with AI-powered insights",
      tech: ["React", "D3.js", "Python", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Smart Document Processing",
      description: "AI-powered document management system for enterprise document workflows and automation",
      tech: ["PyTorch", "OpenCV", "FastAPI", "React"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Enterprise HR Platform",
      description: "Comprehensive human resources management system with AI-driven talent analytics",
      tech: ["Angular", "Spring Boot", "MySQL", "Azure"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "Calcera Global transformed our business with their AI solutions. The ROI was incredible.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CEO, DataFlow",
      content: "Their expertise in machine learning helped us achieve breakthrough results in our industry.",
      rating: 5
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
              <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                <img 
                  src="/lovable-uploads/3b3156ce-46b8-4b78-96fc-595fa728e0a9.png" 
                  alt="Calcera Global" 
                  className="h-12 w-12 rounded-lg shadow-sm transition-shadow duration-300 group-hover:shadow-md" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-blue-600">Calcera Global</span>
                <span className="text-sm text-slate-500 font-medium tracking-wide">Enterprise Solutions</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Services", "Portfolio", "About", "Contact"].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
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
                Get Started
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
            {["Services", "Portfolio", "About", "Contact"].map((item, index) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
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
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 animate-pulse text-base px-6 py-2">
              Enterprise Software & AI Solutions
            </Badge>
            <h1 className="text-6xl md:text-8xl font-light text-slate-800 mb-8 leading-tight">
              <span className="inline-block transform transition-all duration-700 hover:scale-105">Enterprise Applications</span>
              <span className="font-normal block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transform transition-all duration-700 hover:scale-105 mt-2">Enhanced by AI</span>
            </h1>
            <p className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
              We deliver robust enterprise-level applications and intelligent AI solutions that transform businesses. 
              From traditional enterprise software to AI-powered systems, we build scalable solutions for the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-700 delay-500 opacity-0 animate-[fade-in_1s_ease-out_0.7s_forwards]">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl group text-lg px-10 py-4">
                Start Your Project
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 text-lg px-10 py-4">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 transform transition-all duration-700 opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards]">
            <h2 className="text-5xl font-light text-slate-800 mb-6">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive software development services from enterprise applications to cutting-edge AI solutions
            </p>
          </div>
          
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
            <h2 className="text-5xl font-light text-slate-800 mb-6 transform transition-all duration-700 hover:scale-105">Featured Projects</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Showcasing our enterprise applications and AI-powered solutions across various industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card 
                key={index} 
                className="bg-white border-gray-200 overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:scale-105 group cursor-pointer opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>
                <CardHeader className="transform transition-all duration-300 group-hover:translate-y-[-2px] p-8">
                  <CardTitle className="text-slate-800 font-medium transition-colors duration-300 group-hover:text-blue-700 text-xl mb-3">{project.title}</CardTitle>
                  <CardDescription className="text-slate-600 transition-colors duration-300 group-hover:text-slate-700 text-base leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300 transform hover:scale-105 text-sm px-3 py-1"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-slate-800 mb-6 transform transition-all duration-700 hover:scale-105">What Our Clients Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from the companies we've helped transform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-br from-white to-blue-50 border-blue-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:scale-105 group cursor-pointer opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-8 p-8">
                  <div className="flex mb-6 space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-6 w-6 text-yellow-400 fill-current transition-all duration-300 transform group-hover:scale-110" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic transition-colors duration-300 group-hover:text-slate-700 text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="transform transition-all duration-300 group-hover:translate-x-2">
                    <p className="text-slate-800 font-medium transition-colors duration-300 group-hover:text-blue-700 text-lg">{testimonial.name}</p>
                    <p className="text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="transform transition-all duration-700 opacity-0 animate-[fade-in_1s_ease-out_0.3s_forwards]">
              <h2 className="text-5xl font-light text-slate-800 mb-8 transition-all duration-300 hover:text-blue-700">About Calcera Global</h2>
              <p className="text-slate-600 mb-8 text-xl leading-relaxed transition-all duration-300 hover:text-slate-700">
                We are a team of passionate software engineers, AI specialists, and enterprise solution architects 
                dedicated to building cutting-edge applications that drive business transformation.
              </p>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed transition-all duration-300 hover:text-slate-700">
                Founded with the vision of bridging traditional enterprise software with modern AI capabilities, 
                we've helped over 100 companies implement solutions that deliver measurable results.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center bg-white p-8 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                  <div className="text-4xl font-light text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transition-all duration-300 group-hover:scale-110 mb-2">100+</div>
                  <div className="text-slate-500 transition-colors duration-300 group-hover:text-slate-600 text-lg">Projects Completed</div>
                </div>
                <div className="text-center bg-white p-8 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                  <div className="text-4xl font-light text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text transition-all duration-300 group-hover:scale-110 mb-2">50+</div>
                  <div className="text-slate-500 transition-colors duration-300 group-hover:text-slate-600 text-lg">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="relative transform transition-all duration-700 opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration"
                className="rounded-lg shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-light text-slate-800 mb-8 transform transition-all duration-700 hover:scale-105">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-600 mb-12 transition-all duration-300 hover:text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Let's discuss how our enterprise solutions and AI capabilities can revolutionize your operations and drive unprecedented growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl group text-lg px-10 py-4"
            >
              Get Free Consultation
              <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-300 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 text-lg px-10 py-4"
            >
              hello@calceraglobal.com
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-blue-100 border-t border-blue-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <img 
                src="/lovable-uploads/3b3156ce-46b8-4b78-96fc-595fa728e0a9.png" 
                alt="Calcera Global" 
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" 
              />
              <span className="text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-blue-700">Calcera Global</span>
            </div>
            <div className="text-slate-600 text-center md:text-right">
              <p className="transition-colors duration-300 hover:text-slate-700 text-lg">&copy; 2024 Calcera Global. All rights reserved.</p>
              <p className="text-base mt-2 transition-colors duration-300 hover:text-slate-700">Transforming the future with enterprise solutions and AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
