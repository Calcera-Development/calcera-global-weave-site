import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import HeaderNav from "@/components/HeaderNav";
import React from "react";
import calceraLogo from "@/assets/calcera-logo.png";

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
  return <div className="min-h-screen bg-white">
      <HeaderNav navScrollFns={navScrollFns} />
      
      {/* Enhanced Hero Section with minimal modern design */}
      <main>
        <section ref={heroRef} className="pt-40 pb-24 px-6 sm:px-8 lg:px-12 relative" aria-label="Hero section">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <AnimatedWrapper animation="fade-up">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Build Beautiful<br />
                <span className="font-normal text-blue-600">Digital Products</span>
              </h1>
            </AnimatedWrapper>
            
            <AnimatedWrapper animation="fade-up" delay="150ms">
              <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                We design and develop elegant solutions that connect with your users
              </p>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="300ms">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-normal transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md" 
                  onClick={() => scrollToSection(contactRef)} 
                  aria-label="Start your project with Calcera Global"
                >
                  Start Your Project
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-8 py-6 rounded-full text-lg font-normal transition-all duration-300 hover:-translate-y-0.5" 
                  onClick={() => scrollToSection(workRef)} 
                  aria-label="View our portfolio"
                >
                  View Our Work
                </Button>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="450ms">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-light text-blue-600 mb-2">10+</div>
                  <div className="text-sm text-slate-600 font-light">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-blue-600 mb-2">5+</div>
                  <div className="text-sm text-slate-600 font-light">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-slate-600 font-light">Satisfaction Rate</div>
                </div>
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
      
      {/* Footer with modern minimal design */}
      <footer className="py-16 px-6 sm:px-8 lg:px-12 bg-slate-900 text-white" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src={calceraLogo} alt="Calcera Global Logo" className="h-10 w-auto object-contain brightness-0 invert" loading="lazy" />
              </div>
              <p className="text-slate-400 font-light leading-relaxed max-w-md mb-6">
                Transforming ideas into intelligent digital experiences
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/calcera.global/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/calcera.global?igsh=MW9saW5mZjJsZHozdg==" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-normal mb-4">Contact</h3>
              <div className="space-y-3 text-slate-400 font-light">
                <p>+94 77 123 9037</p>
                <p>
                  <a href="mailto:hello@calcera.global" className="hover:text-white transition-colors">
                    hello@calcera.global
                  </a>
                </p>
                <p>Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm font-light">
                © {new Date().getFullYear()} Calcera Global. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-light">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Available for new projects</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;