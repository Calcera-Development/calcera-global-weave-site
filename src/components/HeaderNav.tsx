
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
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={calceraLogo} alt="Calcera Logo" className="h-10 w-auto select-none object-contain" style={{
              minWidth: 100
            }} />
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href="#"
                onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
                className="text-slate-700 hover:text-blue-600 font-normal text-base transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-normal transition-all duration-300 hover:-translate-y-0.5"
              onClick={handleBookConsultation}
            >
              Contact
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
            mx-4 mt-3 rounded-2xl shadow-xl bg-white border border-slate-200
            flex flex-col gap-1 py-4 px-4
            transition-all
            ${isMenuOpen ? "animate-fade-in" : ""}
          `}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.key}
              href="#"
              onClick={e => { e.preventDefault(); handleNavClick(item.key); }}
              className="block w-full text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-normal text-base transition-all duration-200 rounded-lg py-3 px-4 text-left"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full font-normal transition-all duration-300 py-3"
              onClick={handleBookConsultation}
            >
              Contact <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HeaderNav;
