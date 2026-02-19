import HeaderNav from "@/components/HeaderNav";
import DiagnosticForm from "@/components/DiagnosticForm";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import Footer from "@/components/Footer";

const AIDiagnostic = () => {
    const navScrollFns = {
        home: () => (window.location.href = "/"),
        services: () => (window.location.href = "/#services"),
        work: () => (window.location.href = "/#portfolio"),
        contact: () => (window.location.href = "/#contact"),
    };

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-blue-100">
            <HeaderNav navScrollFns={navScrollFns} />

            <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 space-y-6 animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-slate-200">
                            Global Strategy Engine
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-950 mb-6 tracking-tighter leading-[1.1]">
                            Enterprise <span className="text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 bg-clip-text">AI Diagnostic</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Our advanced AI architect will analyze your operational bottlenecks and provide a
                            <span className="text-slate-900 font-semibold"> technical roadmap</span> with concrete ROI and timeline estimates.
                        </p>
                    </div>

                    <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                        <DiagnosticForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AIDiagnostic;
