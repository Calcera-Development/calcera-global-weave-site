import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.08), transparent)" }}
        aria-hidden="true"
      />

      <div className="text-center relative z-10 px-4">
        <h1 className="text-6xl sm:text-8xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-slate-500 mb-8">Oops! We can't find that page.</p>
        <a href="/" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
