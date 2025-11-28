
import { useState } from "react";
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

  // Handler for navigation item click (desktop+mobile)
  const handleNavClick = (key: string) => {
    setIsMenuOpen(false);
    if (navScrollFns && navScrollFns[key as keyof typeof navScrollFns]) {
      navScrollFns[key as keyof typeof navScrollFns]();
    }
  };

  // Handler for Book Free Consultation
  const handleBookConsultation = () => {
    setIsMenuOpen(false);
    if (navScrollFns && navScrollFns.contact) {
      navScrollFns.contact();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 z-50 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={calceraLogo} alt="Calcera Logo" style={{
              minWidth: 85
            }} className="h-12 w-auto select-none object-contain" />
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href="#"
                onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
                className="text-slate-600 hover:text-blue-600 font-medium text-base transition-all duration-300 relative group py-3"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={handleBookConsultation}
            >
              Book Free Consultation
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-slate-700 hover:bg-slate-100 rounded-full transition-all duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`
          block md:hidden fixed left-0 right-0 top-20 z-[100]
          transition-all duration-300
          ${isMenuOpen ? "max-h-[600px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}
        `} style={{
        transitionProperty: "max-height,opacity"
      }}>
        <div className={`
            mx-4 mt-3 rounded-2xl shadow-2xl bg-white border border-slate-200
            flex flex-col gap-2 py-4 px-4
            transition-all
            ${isMenuOpen ? "animate-fade-in" : ""}
          `}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.key}
              href="#"
              onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
              className="block w-full text-slate-700 hover:bg-blue-100 hover:text-blue-700 font-medium text-lg tracking-wide transition-all duration-200 rounded-lg py-3 px-4 text-left"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-full font-medium transition-all duration-300 py-4 text-lg"
              onClick={handleBookConsultation}
            >
              Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HeaderNav;
