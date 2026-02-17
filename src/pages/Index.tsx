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
const Footer = lazy(() => import("@/components/Footer"));

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



  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      if (id) {
        // give browser a moment to render
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      <main>
        {/* Hero Section */}
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative min-h-[90dvh] flex items-center pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden mesh-gradient noise-overlay" aria-label="Hero section">
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
                size="xl"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group shimmer-btn"
                onClick={() => scrollToSection(contactRef)}
                aria-label="Book a free consultation with Calcera Global"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto bg-white/20 border-2 border-slate-200 hover:bg-slate-50 transition-all duration-300"
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

        <section id="services" ref={servicesRef} aria-label="Our services">
          <Suspense fallback={<SectionLoader />}>
            <ServicesGrid />
          </Suspense>
        </section>

        <section id="portfolio" ref={workRef} aria-label="Our portfolio">
          <Suspense fallback={<SectionLoader />}>
            <PortfolioGrid onContactClick={() => scrollToSection(contactRef)} />
          </Suspense>
        </section>

        <section aria-label="Why choose Calcera Global">
          <Suspense fallback={<SectionLoader />}>
            <WhyChooseUs />
          </Suspense>
        </section>
        {/* Meet the Team */}
        <section aria-label="Meet the team" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <AnimatedWrapper animation="fade-up" className="text-center mb-12">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">The People Behind the Work</p>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Built by Friends.<br className="hidden sm:block" /> Driven by Excellence.
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-light text-base sm:text-lg leading-relaxed">
                What started as a group of friends with a shared obsession for solving hard problems became a specialized force — united by trust, driven by results.
              </p>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-up" delay="200ms" className="flex justify-center">
              <Link to="/about">
                <Button size="xl" className="bg-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 active:translate-y-0 group">
                  Meet the Core Team
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </AnimatedWrapper>
          </div>
        </section>

        <section id="contact" ref={contactRef} aria-label="Contact us">
          <Suspense fallback={<SectionLoader />}>
            <ContactForm />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-20 bg-slate-950" />}>
        <Footer />
      </Suspense>
    </div>);

};
export default Index;