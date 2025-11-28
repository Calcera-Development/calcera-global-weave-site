
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const initialState = {
  name: "",
  contact: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [fields, setFields] = useState(initialState);
  const [loading, setLoading] = useState(false);

  function validateEmail(email: string) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validation
    if (!fields.name.trim() || !fields.contact.trim() || !fields.email.trim() || !fields.message.trim()) {
      toast({
        title: "All fields are required.",
        variant: "destructive",
      });
      return;
    }
    if (!validateEmail(fields.email.trim())) {
      toast({
        title: "Please enter a valid email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Send data to Supabase Edge Function (secure backend)
      const response = await fetch("https://oayloknboqllzgbnyjzh.supabase.co/functions/v1/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. We'll be in touch soon.",
        });
        setFields(initialState);
      } else {
        const err = await response.json().catch(() => ({}));
        toast({
          title: "Failed to send message",
          description: err.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-pink-200 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedWrapper animation="fade-up" className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-6">
            {`Let's Make Something Great Together`}
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600">
            {`We'd love to hear what you're building. Let's turn your ideas into beautifully built reality.`}
          </p>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedWrapper animation="slide-in-from-left">
            <form className="space-y-8 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20" onSubmit={handleSubmit}>
              <h3 className="text-xl sm:text-2xl font-medium text-slate-800 mb-4">
                Tell Us About Your Project
              </h3>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="cf-name" className="block text-slate-700 mb-2 font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cf-name"
                    name="name"
                    type="text"
                    value={fields.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Your full name"
                    autoComplete="name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <Label htmlFor="cf-contact" className="block text-slate-700 mb-2 font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cf-contact"
                    name="contact"
                    type="text"
                    value={fields.contact}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="+94 XX XXX XXXX"
                    autoComplete="tel"
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <Label htmlFor="cf-email" className="block text-slate-700 mb-2 font-medium">
                    Your Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cf-email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <Label htmlFor="cf-message" className="block text-slate-700 mb-2 font-medium">
                    Quick Summary of Your Idea <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Describe your project or idea (e.g. 'I'd like to build an AI-powered web app for...')"
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg text-lg py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center w-full">
                      <svg className="animate-spin h-6 w-6 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Book Free Consultation
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </AnimatedWrapper>
          <AnimatedWrapper animation="slide-in-from-right">
            <div className="space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-blue-100">
              <h3 className="text-xl sm:text-2xl font-medium text-slate-800 mb-4">
                Or Say Hi Anytime!
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-5 group hover:scale-105 transition-transform duration-300">
                  <span className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">Phone</p>
                    <p className="text-slate-600">+94 77 123 9037</p>
                  </div>
                </div>
                <div className="flex items-center space-x-5 group hover:scale-105 transition-transform duration-300">
                  <span className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">Email</p>
                    <a className="text-slate-600 hover:text-blue-700 transition-colors duration-300" href="mailto:hello@calcera.global">hello@calcera.global</a>
                  </div>
                </div>
                <div className="flex items-center space-x-5 group hover:scale-105 transition-transform duration-300">
                  <span className="p-3 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">Location</p>
                    <p className="text-slate-600">Colombo, Sri Lanka</p>
                  </div>
                </div>
                
                {/* Animated decorative element */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200">
                  <p className="text-slate-700 text-center italic">
                    "Ready to transform your ideas into digital reality? Let's start the conversation!"
                  </p>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
