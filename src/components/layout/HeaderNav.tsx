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
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:50px;height:1px;width:1px;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
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
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 pointer-events-none">
      {/* Soft scrim so scrolling content fades behind the nav instead of colliding with its edge */}
      <div
        className="absolute inset-x-0 top-0 h-28 sm:h-32 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <div className="relative px-4 py-3 sm:py-4 pointer-events-none">
      <nav
        className={`mx-auto max-w-7xl transition-all duration-500 pointer-events-auto [will-change:padding,background-color]
          ${scrolled
            ? "bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-2 px-3 sm:px-6 mt-0"
            : "bg-transparent py-2 px-3 sm:px-6 mt-0"
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
                ${scrolled ? "h-7 sm:h-9" : "h-9 sm:h-11"}
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
                Book a Consultation
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
        ${scrolled ? "top-[72px]" : "top-[88px]"}
        ${isMenuOpen ? "max-h-[80vh] opacity-100 translate-y-0 pointer-events-auto" : "max-h-0 opacity-0 -translate-y-8 pointer-events-none shadow-none"}
      `} style={{ transitionProperty: "max-height, opacity, transform, top" }}>
        <div className="rounded-2xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] bg-white border border-slate-200 overflow-hidden">
          <nav className="flex flex-col p-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map(item => {
              const isActive = (isHomePage && activeSection === item.id) || (!isHomePage && location.pathname === `/${item.key === "home" ? "" : item.key}`);
              return (
                <a
                  key={item.key}
                  href={isHomePage ? `#${item.id}` : (item.key === "about" ? "/about" : `/#${item.id}`)}
                  onClick={e => { e.preventDefault(); handleNavClick(item.key, item.id); }}
                  className={`flex items-center justify-between w-full rounded-xl py-3.5 px-4 text-left transition-colors duration-200
                  ${isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  <span className="text-base font-medium tracking-tight">{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </a>
              );
            })}
          </nav>

          <div className="p-3 pt-1 border-t border-slate-100 flex flex-col gap-2">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold py-3 text-sm"
              onClick={handleBookConsultation}
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a
              href="/ai-diagnostic"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center rounded-xl border border-slate-200 text-slate-700 font-medium py-3 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors duration-200"
            >
              Try the AI Diagnostic
            </a>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default HeaderNav;
