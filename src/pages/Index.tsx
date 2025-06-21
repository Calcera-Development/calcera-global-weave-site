import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Code, Zap, Users, ArrowRight, Menu, X, CheckCircle, MessageCircle, Mic, Layers, Search, ShoppingCart, Calculator, MapPin, Utensils, Shield, Heart, Sparkles, Rocket, Star } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import HeaderNav from "@/components/HeaderNav";
import React from "react";

// Lazy load heavy components for better performance
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const PortfolioGrid = lazy(() => import("@/components/PortfolioGrid"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

// Loading component for lazy-loaded sections
const SectionLoader = () => <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>;
const Index = () => {
  // Section refs for smooth scroll
  const heroRef = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLElement>(null);
  const workRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  // Helper scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // Expose scroll functions for navigation
  const navScrollFns = {
    home: () => window.scrollTo({
      top: 0,
      behavior: "smooth"
    }),
    services: () => scrollToSection(servicesRef),
    work: () => scrollToSection(workRef),
    contact: () => scrollToSection(contactRef)
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <HeaderNav navScrollFns={navScrollFns} />
      
      {/* Enhanced Hero Section with better semantic HTML */}
      <main>
        <section ref={heroRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative" aria-label="Hero section">
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
            <div className="absolute inset-0" style={{
            backgroundImage: `
                linear-gradient(to right, #3b82f6 1px, transparent 1px),
                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
              `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
          </div>

          {/* Enhanced background elements - removed interfering floating elements */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {/* Simplified gradient orbs - positioned to not interfere with content */}
            <div className="absolute top-10 -left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse blur-3xl"></div>
            <div className="absolute -top-10 -right-20 w-48 h-48 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full animate-bounce blur-3xl" style={{
            animationDelay: '1s'
          }}></div>
            <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full animate-pulse blur-3xl" style={{
            animationDelay: '2s'
          }}></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 rounded-full animate-bounce blur-3xl" style={{
            animationDelay: '0.5s'
          }}></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <AnimatedWrapper animation="fade-up">
              <div className="flex justify-center items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 animate-pulse" aria-hidden="true" />
                <span className="text-sm sm:text-base font-medium text-blue-600 uppercase tracking-wider">Product Engineering + Tech Innovation Powerhouse</span>
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 animate-pulse" style={{
                animationDelay: '0.5s'
              }} aria-hidden="true" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-slate-800 mb-6 leading-tight">
                <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text"> Design</span><br />
                <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Build</span><br />
                <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text">Elevate</span>
              </h1>
            </AnimatedWrapper>
            
            <AnimatedWrapper animation="fade-up" delay="200ms">
              <div className="relative">
                <p className="text-xl sm:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                  Build awesome digital products with us!
                </p>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="400ms">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group" onClick={() => scrollToSection(contactRef)} aria-label="Book a free consultation with Calcera Global">
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  Book Free Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-blue-400 bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" onClick={() => scrollToSection(workRef)} aria-label="View Calcera Global's portfolio and previous work">
                  <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  View Our Work
                </Button>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="600ms">
              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20 max-w-3xl mx-auto">
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

        <section ref={servicesRef} aria-label="Our services">
          <Suspense fallback={<SectionLoader />}>
            <ServicesGrid />
          </Suspense>
        </section>
        
        <section ref={workRef} aria-label="Our portfolio">
          <Suspense fallback={<SectionLoader />}>
            <PortfolioGrid onContactClick={() => scrollToSection(contactRef)} />
          </Suspense>
        </section>
        
        <section aria-label="Why choose Calcera Global">
          <Suspense fallback={<SectionLoader />}>
            <WhyChooseUs />
          </Suspense>
        </section>
        
        <section ref={contactRef} aria-label="Contact us">
          <Suspense fallback={<SectionLoader />}>
            <ContactForm />
          </Suspense>
        </section>
      </main>
      
      {/* Footer with enhanced semantic structure */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden" role="contentinfo">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-bounce" style={{
          animationDelay: '2s'
        }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-400 rounded-full animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img src="/lovable-uploads/294cbe84-0b39-46b6-a2f7-1ae0d50fa821.png" alt="Calcera Global - AI Software Development Company Logo" className="h-12 w-auto select-none object-contain hover:scale-110 transition-transform duration-300" width="48" height="48" loading="lazy" />
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
                <a href="https://www.linkedin.com/company/calcera.global/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110" aria-label="Follow Calcera Global on LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/calcera.global?igsh=MW9saW5mZjJsZHozdg==" target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-all duration-300 hover:scale-110" aria-label="Follow Calcera Global on Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  {["Home", "Services", "Work", "Contact"].map(item => <li key={item}>
                      <a href="#" onClick={e => {
                    e.preventDefault();
                    if (item === "Home") window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });else if (item === "Services") scrollToSection(servicesRef);else if (item === "Work") scrollToSection(workRef);else if (item === "Contact") scrollToSection(contactRef);
                  }} className="text-slate-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 decoration-blue-400">
                        {item}
                      </a>
                    </li>)}
                </ul>
              </nav>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
              <ul className="space-y-3 text-slate-300">
                <li className="cursor-default">Web Development</li>
                <li className="cursor-default">AI Solutions</li>
                <li className="cursor-default">UI/UX Design</li>
                <li className="cursor-default">Ecommerce</li>
                <li className="cursor-default">R&D Consulting</li>
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
    </div>;
};
export default Index;