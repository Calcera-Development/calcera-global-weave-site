import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const FloatingDiagnosticButton = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Don't show on the diagnostic page itself
        if (location.pathname === "/ai-diagnostic") return;
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        // Initial check in case they are already scrolled
        toggleVisibility();

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [location.pathname]);

    if (location.pathname === "/ai-diagnostic") return null;

    return (
        <div className={cn(
            "fixed bottom-6 right-6 z-50 transition-all duration-500 transform",
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90 pointer-events-none"
        )}>
            <Link to="/ai-diagnostic">
                <Button
                    size="lg"
                    className="rounded-full h-14 w-14 md:h-14 md:w-auto md:px-6 bg-slate-900 border-2 border-slate-800 text-white shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                    <Sparkles className="h-6 w-6 md:mr-2 text-blue-400 group-hover:rotate-12 transition-transform" />
                    <span className="hidden md:inline font-bold text-sm tracking-tight">AI Diagnostic</span>

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-blue-600/0 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
            </Link>
        </div>
    );
};

export default FloatingDiagnosticButton;
