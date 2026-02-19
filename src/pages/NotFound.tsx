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
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden mesh-gradient noise-overlay">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] mesh-gradient opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
      </div>

      <div className="text-center relative z-10 px-4">
        <h1 className="text-6xl sm:text-9xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent mb-4 animate-float">404</h1>
        <p className="text-xl sm:text-2xl text-slate-500 mb-8 font-light">Oops! We can't find that page.</p>
        <a href="/" className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-xl">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
