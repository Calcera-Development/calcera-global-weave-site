import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, Star, CheckCircle, Building2 } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-blue-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/3b3156ce-46b8-4b78-96fc-595fa728e0a9.png" alt="Calcera Global" className="h-8 w-8" />
              <span className="text-2xl font-bold text-slate-800">Calcera Global</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#portfolio" className="text-slate-600 hover:text-blue-600 transition-colors">Portfolio</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 border-t border-blue-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#services" className="block text-slate-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#portfolio" className="block text-slate-600 hover:text-blue-600 transition-colors">Portfolio</a>
              <a href="#about" className="block text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="block text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
              Enterprise Software & AI Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-light text-slate-800 mb-6 leading-tight">
              Enterprise Applications
              <span className="font-normal block text-blue-600">Enhanced by AI</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We deliver robust enterprise-level applications and intelligent AI solutions that transform businesses. 
              From traditional enterprise software to AI-powered systems, we build scalable solutions for the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-800 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive software development services from enterprise applications to cutting-edge AI solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`${service.color} border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-white rounded-full w-fit">
                    <service.icon className="h-8 w-8 text-slate-700" />
                  </div>
                  <CardTitle className="text-slate-800 font-medium text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-slate-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-slate-600 text-sm">{feature}</span>
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
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Showcasing our enterprise applications and AI-powered solutions across various industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card key={index} className="bg-white border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-slate-800 font-medium">{project.title}</CardTitle>
                  <CardDescription className="text-slate-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from the companies we've helped transform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="text-slate-800 font-medium">{testimonial.name}</p>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light text-slate-800 mb-6">About Calcera Global</h2>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                We are a team of passionate AI engineers, data scientists, and software developers 
                dedicated to pushing the boundaries of what's possible with artificial intelligence.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Founded with the vision of making AI accessible and practical for businesses of all sizes, 
                we've helped over 100 companies implement intelligent solutions that drive real results.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-3xl font-light text-blue-600">100+</div>
                  <div className="text-slate-500">Projects Completed</div>
                </div>
                <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-3xl font-light text-emerald-600">50+</div>
                  <div className="text-slate-500">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-slate-800 mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Let's discuss how AI can revolutionize your operations and drive unprecedented growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              Get Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-blue-50">
              hello@calceraglobal.com
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-blue-100 border-t border-blue-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/lovable-uploads/3b3156ce-46b8-4b78-96fc-595fa728e0a9.png" alt="Calcera Global" className="h-8 w-8" />
              <span className="text-xl font-bold text-slate-800">Calcera Global</span>
            </div>
            <div className="text-slate-600 text-center md:text-right">
              <p>&copy; 2024 Calcera Global. All rights reserved.</p>
              <p className="text-sm mt-1">Transforming the future with AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
