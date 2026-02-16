import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, Star } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import HeaderNav from "@/components/HeaderNav";
import React from "react";
import { Link } from "react-router-dom";
import calceraLogo from "@/assets/calcera-logo.png";

const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const PortfolioGrid = lazy(() => import("@/components/PortfolioGrid"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const ContactForm = lazy(() => import("@/components/ContactForm"));

const SectionLoader = () =>
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="h-10 w-10 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
    </div>
  </div>;


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
    contact: () => scrollToSection(contactRef)
  };

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      if (id === "hero") navScrollFns.home();
      else if (id === "services") navScrollFns.services();
      else if (id === "portfolio") navScrollFns.work();
      else if (id === "contact") navScrollFns.contact();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav navScrollFns={navScrollFns} />

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90dvh] flex items-center pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden mesh-gradient noise-overlay" aria-label="Hero section">
          {/* Premium Parallax-Ready Background Overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] mesh-gradient opacity-60" />

            {/* Animated Glow Orbs */}
            <div className="absolute top-1/4 left-10 w-[20rem] h-[20rem] bg-blue-500/10 rounded-full blur-[100px] animate-float opacity-50 block md:hidden" />
            <div className="absolute top-1/3 -right-20 w-[40rem] h-[40rem] bg-indigo-500/15 rounded-full blur-[160px] animate-float lg:block hidden" style={{ animationDelay: "2s" }} />
            <div className="absolute -bottom-40 left-1/4 w-[50rem] h-[50rem] bg-cyan-400/5 rounded-full blur-[200px] animate-pulse lg:block hidden" style={{ animationDelay: "4s" }} />

            {/* Subtle Grid Interaction Overlay */}
            <div className="absolute inset-0 grid-bg opacity-[0.03]" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <AnimatedWrapper animation="fade-up" delay="100ms">
              <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm transition-all duration-300 hover:scale-105 select-none">
                <span className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wider uppercase">A Global Tech Innovation Powerhouse</span>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="200ms">
              <h1 className="text-3xl sm:text-6xl md:text-8xl font-semibold text-slate-900 mb-8 leading-[1.05] tracking-tight">
                <span className="text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text gradient-text-animated">Build</span>
                <span className="text-slate-400 mx-2 sm:mx-4 font-bold">·</span>
                <span className="text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text gradient-text-animated">Scale</span>
                <span className="text-slate-400 mx-2 sm:mx-4 font-bold">·</span>
                <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text gradient-text-animated">Dominate</span>
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="300ms">
              <p className="text-lg sm:text-2xl text-slate-500 mb-10 sm:max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0">
                Calcera Global transforms bold visions into <span className="text-slate-900 font-medium italic">market-leading realities</span> through elite AI-driven engineering and design.
              </p>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="400ms" className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 sm:px-10 py-5 sm:py-7 rounded-2xl text-base font-bold shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group shimmer-btn"
                onClick={() => scrollToSection(contactRef)}
                aria-label="Book a free consultation with Calcera Global"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/20 border-2 border-slate-200 px-8 sm:px-10 py-5 sm:py-7 rounded-2xl text-sm sm:text-base font-semibold hover:bg-slate-50 transition-all duration-300"
                onClick={() => scrollToSection(workRef)}
                aria-label="View our portfolio"
              >
                View Our Selected Work
              </Button>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="500ms">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-x-12 gap-y-8 opacity-50 hover:opacity-100 transition-opacity duration-700 select-none grayscale hover:grayscale-0 px-4">
                <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase sm:border-r border-slate-200 sm:pr-12">Stack Expertise</span>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 items-center">
                  {["React", "Next.js", "TypeScript", "OpenAI O1/O3", "Claude 3.5", "Agentic AI", "LangGraph", "RAG Systems", "Python"].map((tech) => (
                    <span key={tech} className="text-lg sm:text-xl font-bold text-slate-900 tracking-tighter hover:text-blue-600 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="500ms" className="mt-16">
              <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl border-white/40">
                <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-4 font-medium italic">
                  "The difference between a good idea and a profitable business is execution."
                </p>
                <div className="h-px w-20 bg-gradient-to-r from-blue-600 to-transparent mb-6 mx-auto" />
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
                  At Calcera, we don't just write code. We build <strong>revenue-generating assets</strong>. Whether you need an MVP in 4 weeks or an enterprise AI solution, our team delivers technical excellence with agency-grade reliability.
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
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
                <img src={calceraLogo} alt="Calcera Global Logo" className="h-16 sm:h-20 w-auto select-none object-contain hover:scale-105 transition-transform duration-300 rounded-xl" width="80" height="80" loading="lazy" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Calcera Global</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">AI-Powered Digital Partner</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md text-center sm:text-left mx-auto sm:mx-0">
                Transforming ideas into intelligent digital experiences. We craft beautiful, functional solutions that drive real business results.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3">
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
                <a href="https://www.fiverr.com/s/P2AkNBw" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#1dbf73] p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="Find us on Fiverr">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.6 9.3c.1-.5.3-1 .6-1.5.3-.4.7-.8 1.1-1.1.5-.3 1-.4 1.6-.4.5 0 1 .1 1.4.3l-.6 1.8c-.2-.1-.4-.1-.7-.1-.4 0-.7.1-1 .3-.3.2-.5.5-.6.8-.1.3-.2.7-.2 1.2v1.5h2.2v1.8h-2.2v7.1h-2.1v-7.1H12v-1.8h2.1V9.3h.5zm-8 4c.1-.5.3-1 .6-1.5.3-.4.7-.8 1.1-1.1.5-.3 1-.4 1.6-.4.5 0 1 .1 1.4.3l-.6 1.8c-.2-.1-.4-.1-.7-.1-.4 0-.7.1-1 .3-.3.2-.5.5-.6.8-.1.3-.2.7-.2 1.2v1.5h2.2v1.8h-2.2v7.1H5.9v-7.1H3.3v-1.8h2.6V9.3c0-1.1.2-2.1.7-2.9.5-.8 1.2-1.4 2-1.8.8-.4 1.7-.6 2.7-.6 1.4 0 2.5.4 3.4 1.2l-1 1.6c-.7-.5-1.4-.7-2.1-.7-.6 0-1.1.1-1.5.4-.4.2-.7.6-.9 1-.2.4-.3.9-.3 1.5v2.2h3.3v1.8H9.3v7.1H7.2V13.3H4.6v1.8H6.5l.1-1.8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 mb-6">Quick Links</h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-4">
                  {["Home", "About", "Services", "Work", "Contact"].map((item) =>
                    <li key={item}>
                      <a href={item === "About" ? "/about" : "#"} onClick={(e) => {
                        if (item === "About") return;
                        e.preventDefault();
                        if (item === "Home") window.scrollTo({ top: 0, behavior: "smooth" }); else
                          if (item === "Services") scrollToSection(servicesRef); else
                            if (item === "Work") scrollToSection(workRef); else
                              if (item === "Contact") scrollToSection(contactRef);
                      }} className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                        {item}
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            {/* Services */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 mb-6">Our Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>Web Development</li>
                <li>AI Solutions</li>
                <li>UI/UX Design</li>
                <li>E-Commerce</li>
                <li>R&D Consulting</li>
                <li>SEO Optimization</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <p className="text-slate-400 text-sm">
                © 2026 Calcera Global
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};
export default Index;