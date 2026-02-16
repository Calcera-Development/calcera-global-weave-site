import React from "react";
import HeaderNav from "@/components/HeaderNav";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
    const navScrollFns = {
        home: () => { window.location.href = "/"; },
        services: () => { window.location.href = "/#services"; },
        work: () => { window.location.href = "/#work"; },
        contact: () => { window.location.href = "/#contact"; }
    };

    return (
        <div className="min-h-screen bg-background">
            <HeaderNav navScrollFns={navScrollFns} />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <AnimatedWrapper animation="fade-up">
                        <Link to="/">
                            <Button variant="ghost" className="mb-8 hover:bg-slate-100">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>

                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
                        <p className="text-slate-500 mb-12">Last Updated: February 17, 2026</p>

                        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
                                <p>
                                    At Calcera Global, we respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you about how we handle your personal data when you visit our website and tells you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Data We Collect</h2>
                                <p>
                                    We may collect, use, store, and transfer different kinds of personal data about you, including:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                                    <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. How We Use Your Data</h2>
                                <p>
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Provide and maintain our Service.</li>
                                    <li>Notify you about changes to our Service.</li>
                                    <li>Provide customer support.</li>
                                    <li>Gather analysis or valuable information so that we can improve our Service.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Data Security</h2>
                                <p>
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Your Legal Rights</h2>
                                <p>
                                    Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                                </p>
                                <p className="mt-4 font-medium">Email: hello@calcera.global</p>
                            </section>
                        </div>
                    </AnimatedWrapper>
                </div>
            </main>

            <footer className="py-12 border-t border-slate-100 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm">© 2026 Calcera Global. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
