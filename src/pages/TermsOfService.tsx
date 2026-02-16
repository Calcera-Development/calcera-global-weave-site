// Triggering re-deployment to resolve Vercel issue
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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

                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">Terms of Service</h1>
                        <p className="text-slate-500 mb-12">Last Updated: February 17, 2026</p>

                        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Agreement to Terms</h2>
                                <p>
                                    By accessing or using the Calcera Global website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Intellectual Property</h2>
                                <p>
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of Calcera Global and its licensors. Our intellectual property may not be used in connection with any product or service without the prior written consent of Calcera Global.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. User Obligations</h2>
                                <p>
                                    You agree not to use the Service for any purpose that is prohibited by these Terms. You are responsible for all of your activity in connection with the Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Limitation of Liability</h2>
                                <p>
                                    In no event shall Calcera Global, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Disclaimer</h2>
                                <p>
                                    Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Changes to Terms</h2>
                                <p>
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Contact Information</h2>
                                <p>
                                    If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;
