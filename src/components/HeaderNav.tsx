import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import calceraLogo from "@/assets/calcera-logo.png";

interface HeaderNavProps {
  navScrollFns?: {
    home: () => void;
    services: () => void;
    work: () => void;
    contact: () => void;
  };
}

const NAV_ITEMS = [
  { label: "Home", key: "home", id: "hero" },
  { label: "Services", key: "services", id: "services" },
  { label: "Work", key: "work", id: "portfolio" },
];

const HeaderNav: React.FC<HeaderNavProps> = ({ navScrollFns }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["hero", "services", "portfolio", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (key: string) => {
    setIsMenuOpen(false);
    if (navScrollFns && navScrollFns[key as keyof typeof navScrollFns]) {
      navScrollFns[key as keyof typeof navScrollFns]();
    }
  };

  const handleBookConsultation = () => {
    setIsMenuOpen(false);
    if (navScrollFns && navScrollFns.contact) {
      navScrollFns.contact();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 py-4 sm:py-6 transition-all duration-500 pointer-events-none">
      <nav
        className={`mx-auto max-w-7xl transition-all duration-500 pointer-events-auto
          ${scrolled
            ? "bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-2.5 px-3 sm:px-6 mt-0"
            : "bg-transparent py-4 px-2 mt-2 sm:mt-4"
          }`}
      >
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center group transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <img
              src={calceraLogo}
              alt="Calcera Logo"
              className={`w-auto select-none object-contain transition-all duration-500 
                ${scrolled ? "h-7 sm:h-9" : "h-9 sm:h-12"} 
                group-hover:brightness-125`}
            />
          </button>

          {/* Desktop Nav - Centered Capsule */}
          <div className={`hidden md:flex items-center absolute left-1/2 -translate-x-1/2 transition-all duration-500
            ${scrolled ? "bg-white/5 rounded-full p-1 border border-white/5" : ""}`}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href={`#${item.id}`}
                onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full
                  ${activeSection === item.id
                    ? "text-white bg-white/15"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                size="sm"
                className={`rounded-full font-semibold text-sm transition-all duration-500 
                  ${scrolled
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                    : "bg-white text-blue-700 hover:bg-blue-50 shadow-xl"
                  } px-5 py-2.5 hover:-translate-y-0.5 active:translate-y-0`}
                onClick={handleBookConsultation}
              >
                Let's Talk
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 ${scrolled
                ? "text-white hover:bg-white/10"
                : "text-blue-900 bg-white/90 hover:bg-white shadow-lg"
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <X className={`h-6 w-6 absolute transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0 scale-50"}`} />
                <Menu className={`h-6 w-6 absolute transition-all duration-300 ${isMenuOpen ? "-rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100"}`} />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Move outside nav for better positioning stability */}
      <div className={`
        md:hidden fixed left-4 right-4 z-[110]
        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${scrolled ? "top-[76px]" : "top-[96px]"}
        ${isMenuOpen ? "max-h-[80vh] opacity-100 translate-y-0 pointer-events-auto" : "max-h-0 opacity-0 -translate-y-8 pointer-events-none shadow-none"}
      `} style={{ transitionProperty: "max-height, opacity, transform, top" }}>
        <div className="rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900 border border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />
          <div className="flex flex-col p-4 gap-1 relative z-10">
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href={`#${item.id}`}
                onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
                className={`flex items-center justify-between w-full rounded-2xl py-4 px-6 text-left transition-all duration-300
                  ${activeSection === item.id
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
              >
                <span className="text-lg font-medium tracking-tight">{item.label}</span>
                {activeSection === item.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl rounded-2xl font-bold py-5 text-lg"
                onClick={handleBookConsultation}
              >
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
