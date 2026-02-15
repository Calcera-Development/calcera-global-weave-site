import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, Star } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import HeaderNav from "@/components/HeaderNav";
import React from "react";
import calceraLogo from "@/assets/calcera-logo.png";

const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const PortfolioGrid = lazy(() => import("@/components/PortfolioGrid"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="h-10 w-10 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
    </div>
  </div>
);

const Index = () => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLElement>(null);
  const workRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navScrollFns = {
    home: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    services: () => scrollToSection(servicesRef),
    work: () => scrollToSection(workRef),
    contact: () => scrollToSection(contactRef),
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav navScrollFns={navScrollFns} />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden mesh-gradient noise-overlay" aria-label="Hero section">
          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <AnimatedWrapper animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                <Sparkles className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <span className="text-sm font-medium text-blue-700 tracking-wide">Product Engineering + Tech Innovation Powerhouse</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-slate-900 mb-8 leading-[0.95] tracking-tight">
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">Design</span>
                <span className="text-slate-300 mx-3 font-light">·</span>
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Build</span>
                <span className="text-slate-300 mx-3 font-light">·</span>
                <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">Elevate</span>
              </h1>
            </AnimatedWrapper>
            
            <AnimatedWrapper animation="fade-up" delay="150ms">
              <p className="text-xl sm:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                Build awesome digital products with us!
              </p>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="300ms">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-xl text-base font-semibold shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
                  onClick={() => scrollToSection(contactRef)}
                  aria-label="Book a free consultation with Calcera Global"
                >
                  <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  Book Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-6 rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
                  onClick={() => scrollToSection(workRef)}
                  aria-label="View Calcera Global's portfolio and previous work"
                >
                  <Star className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  View Our Work
                </Button>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="450ms">
              <div className="glass-card rounded-3xl p-8 sm:p-10 max-w-3xl mx-auto shadow-xl">
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-2 font-medium">
                  Crafting technology that feels effortless.
                </p>
                <p className="text-base text-slate-400 leading-relaxed">
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
      
      {/* Footer */}
      <footer className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden noise-overlay" role="contentinfo">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img src={calceraLogo} alt="Calcera Global Logo" className="h-12 w-auto select-none object-contain hover:scale-105 transition-transform duration-300" width="48" height="48" loading="lazy" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Calcera Global</h3>
                  <p className="text-slate-400 text-sm">AI-Powered Digital Partner</p>
                </div>
              </div>
              <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">
                Transforming ideas into intelligent digital experiences. We craft beautiful, functional solutions that drive real business results.
              </p>
              <div className="flex space-x-3">
                <a href="https://www.linkedin.com/company/calcera.global/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-blue-600 p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="Follow Calcera Global on LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/calcera.global?igsh=MW9saW5mZjJsZHozdg==" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-pink-600 p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="Follow Calcera Global on Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-6">Quick Links</h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-4">
                  {["Home", "Services", "Work", "Contact"].map(item => (
                    <li key={item}>
                      <a href="#" onClick={e => {
                        e.preventDefault();
                        if (item === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                        else if (item === "Services") scrollToSection(servicesRef);
                        else if (item === "Work") scrollToSection(workRef);
                        else if (item === "Contact") scrollToSection(contactRef);
                      }} className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-6">Our Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>Web Development</li>
                <li>AI Solutions</li>
                <li>UI/UX Design</li>
                <li>Ecommerce</li>
                <li>R&D Consulting</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <p className="text-slate-400 text-sm">
                &copy; 2025 Calcera Global. Built with logic and love.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Index;
