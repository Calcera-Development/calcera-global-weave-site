import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Layout components
import HeaderNav from "@/components/layout/HeaderNav";
const Footer = lazy(() => import("@/components/layout/Footer"));

// Section components
import Hero from "@/components/sections/Hero";
const ServicesGrid = lazy(() => import("@/components/sections/ServicesGrid"));
const PortfolioGrid = lazy(() => import("@/components/sections/PortfolioGrid"));
const WhyChooseUs = lazy(() => import("@/components/sections/WhyChooseUs"));
const TeamCTA = lazy(() => import("@/components/sections/TeamCTA"));

// Other components
import ContactForm from "@/components/ContactForm";

const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="h-10 w-10 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
    </div>
  </div>
);

const Index = () => {
  const location = useLocation();

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    document.title = "Calcera Global - AI Development, SaaS & Workflow Automation";
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      if (id) {
        // give browser a moment to render lazy components
        const timer1 = setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 500);

        // secondary check for late layout shifts (mobile/lazy load)
        const timer2 = setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 1500);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      <main>
        <Hero
          heroRef={heroRef}
          contactRef={contactRef}
          workRef={workRef}
          scrollToSection={scrollToSection}
        />

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

        <Suspense fallback={<SectionLoader />}>
          <TeamCTA />
        </Suspense>

        <section id="contact" ref={contactRef} aria-label="Contact us">
          <Suspense fallback={<SectionLoader />}>
            <ContactForm />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-64 bg-slate-950" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;