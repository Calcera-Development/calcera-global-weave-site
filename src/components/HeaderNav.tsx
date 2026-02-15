
import { useState, useEffect } from "react";
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
  { label: "Home", key: "home" },
  { label: "Services", key: "services" },
  { label: "Work", key: "work" },
];

const HeaderNav: React.FC<HeaderNavProps> = ({ navScrollFns }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-blue-900/10 border-b border-white/5"
        : "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 shadow-lg"
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <button onClick={() => handleNavClick("home")} className="flex items-center space-x-2 sm:space-x-3 group min-w-0 flex-shrink-0">
            <img
              src={calceraLogo}
              alt="Calcera Logo"
              className={`w-auto select-none object-contain transition-all duration-500 ${scrolled ? "h-8 sm:h-10" : "h-10 sm:h-14"} group-hover:brightness-125 max-w-[120px] sm:max-w-none`}
            />
          </button>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href="#"
                onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
                className="text-white/80 hover:text-white font-medium text-sm tracking-wide transition-all duration-300 relative px-5 py-2 rounded-full hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <div className="ml-4">
              <Button
                size="sm"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                onClick={handleBookConsultation}
              >
                Book Consultation
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10 rounded-full transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`} />
              <Menu className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
            </div>
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`
        block md:hidden fixed left-0 right-0 top-16 z-[100]
        transition-all duration-400
        ${isMenuOpen ? "max-h-[600px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}
      `} style={{ transitionProperty: "max-height,opacity" }}>
        <div className={`
          mx-3 mt-2 rounded-2xl shadow-2xl bg-slate-900/98 backdrop-blur-2xl border border-white/10
          flex flex-col gap-1 py-4 px-3
          transition-all duration-300 transform
          ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
        `}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.key}
              href="#"
              onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
              className="block w-full text-white/80 hover:bg-white/10 hover:text-white font-medium text-base tracking-wide transition-all duration-200 rounded-xl py-3 px-4 text-left"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 px-1 pb-1">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg rounded-full font-semibold transition-all duration-300 py-3.5 text-base"
              onClick={handleBookConsultation}
            >
              Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HeaderNav;
