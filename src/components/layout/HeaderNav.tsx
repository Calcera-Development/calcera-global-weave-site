import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import calceraLogo from "@/assets/calcera-logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", key: "home", id: "hero" },
  { label: "About", key: "about", id: "about" },
  { label: "Services", key: "services", id: "services" },
  { label: "Work", key: "work", id: "portfolio" },
];

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

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
  }, [isHomePage]);

  const handleNavClick = (key: string, id: string) => {
    setIsMenuOpen(false);

    if (key === "about") {
      if (location.pathname === "/about") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/about");
      }
      return;
    }

    if (!isHomePage) {
      navigate(`/#${id}`);
      return;
    }

    // On Homepage
    if (key === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBookConsultation = () => {
    setIsMenuOpen(false);
    if (!isHomePage) {
      navigate("/#contact");
      return;
    }
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 py-4 sm:py-6 transition-all duration-500 pointer-events-none">
      <nav
        className={`mx-auto max-w-7xl transition-all duration-500 pointer-events-auto [will-change:padding,background-color]
          ${scrolled
            ? "bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-2.5 px-3 sm:px-6 mt-0"
            : "bg-transparent py-2.5 px-3 sm:px-6 mt-0"
          }`}
      >
        <div className="flex justify-between items-center relative">
          <button
            onClick={() => handleNavClick("home", "hero")}
            className="flex items-center group transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <img
              src={calceraLogo}
              alt="Calcera Logo"
              className={`w-auto select-none object-contain rounded-xl transition-all duration-500 
                ${scrolled ? "h-8 sm:h-10" : "h-12 sm:h-24"} 
                group-hover:brightness-125`}
            />
          </button>

          {/* Desktop Nav - Centered Capsule */}
          <div className={`hidden md:flex items-center absolute left-1/2 -translate-x-1/2 transition-all duration-500
            ${scrolled ? "bg-white/5 rounded-full p-1 border border-white/5" : ""}`}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href={isHomePage ? `#${item.id}` : (item.key === "about" ? "/about" : `/#${item.id}`)}
                onClick={e => { e.preventDefault(); handleNavClick(item.key, item.id); }}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full
                  ${(isHomePage && activeSection === item.id) || (!isHomePage && location.pathname === `/${item.key === "home" ? "" : item.key}`)
                    ? (scrolled ? "text-white bg-white/15" : "text-blue-600 bg-blue-50/80")
                    : (scrolled ? "text-white/60 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50/50")
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
            {NAV_ITEMS.map(item => {
              const isActive = (isHomePage && activeSection === item.id) || (!isHomePage && location.pathname === `/${item.key === "home" ? "" : item.key}`);
              return (
                <a
                  key={item.key}
                  href={isHomePage ? `#${item.id}` : (item.key === "about" ? "/about" : `/#${item.id}`)}
                  onClick={e => { e.preventDefault(); handleNavClick(item.key, item.id); }}
                  className={`flex items-center justify-between w-full rounded-2xl py-4 px-6 text-left transition-all duration-300
                  ${isActive
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className="text-lg font-medium tracking-tight">{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                </a>
              );
            })}
            <div className="mt-4 pt-4 border-t border-white/5">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl rounded-2xl font-bold py-3 text-sm"
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
