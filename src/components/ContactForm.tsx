
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const initialState = {
  name: "",
  contact: "",
  email: "",
  message: ""
};

const ContactForm = () => {
  const [fields, setFields] = useState(initialState);
  const [loading, setLoading] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.name.trim() || !fields.contact.trim() || !fields.email.trim() || !fields.message.trim()) {
      toast({ title: "All fields are required.", variant: "destructive" });
      return;
    }
    if (!validateEmail(fields.email.trim())) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://oayloknboqllzgbnyjzh.supabase.co/functions/v1/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      });

      if (response.ok) {
        toast({ title: "Message sent!", description: "Thanks for reaching out. We'll be in touch soon." });
        setFields(initialState);
      } else {
        const err = await response.json().catch(() => ({}));
        toast({ title: "Failed to send message", description: err.error || "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong.", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const contactInfo = [
  { icon: Phone, label: "Phone", value: "+94 77 123 9037", color: "from-blue-500 to-cyan-400" },
  { icon: Mail, label: "Email", value: "hello@calcera.global", href: "mailto:hello@calcera.global", color: "from-purple-500 to-pink-400" },
  { icon: MapPin, label: "Location", value: "Colombo, Sri Lanka", color: "from-emerald-500 to-teal-400" }];


  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 mesh-gradient relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedWrapper animation="fade-up" className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">Contact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {`Let's Make Something Great Together`}
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
            {`We'd love to hear what you're building. Let's turn your ideas into beautifully built reality.`}
          </p>
        </AnimatedWrapper>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <AnimatedWrapper animation="slide-in-from-left" className="lg:col-span-3">
            <form className="glass-card rounded-3xl p-8 sm:p-10 shadow-xl" onSubmit={handleSubmit}>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Tell Us About Your Project
              </h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="cf-name" className="block text-slate-700 mb-2 font-medium text-sm">
                    Your Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input id="cf-name" name="name" type="text" value={fields.name} onChange={handleChange} disabled={loading} placeholder="Your full name" autoComplete="name"
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300" />
                </div>
                <div>
                  <Label htmlFor="cf-contact" className="block text-slate-700 mb-2 font-medium text-sm">
                    Phone Number <span className="text-rose-500">*</span>
                  </Label>
                  <Input id="cf-contact" name="contact" type="text" value={fields.contact} onChange={handleChange} disabled={loading} placeholder="+94 XX XXX XXXX" autoComplete="tel"
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300" />
                </div>
                <div>
                  <Label htmlFor="cf-email" className="block text-slate-700 mb-2 font-medium text-sm">
                    Your Email Address <span className="text-rose-500">*</span>
                  </Label>
                  <Input id="cf-email" name="email" type="email" value={fields.email} onChange={handleChange} disabled={loading} placeholder="your@email.com" autoComplete="email"
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300" />
                </div>
                <div>
                  <Label htmlFor="cf-message" className="block text-slate-700 mb-2 font-medium text-sm">
                    Quick Summary of Your Idea <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea id="cf-message" name="message" rows={4} value={fields.message} onChange={handleChange} disabled={loading}
                  placeholder="Describe your project or idea (e.g. 'I'd like to build an AI-powered web app for...')"
                  className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none" />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg text-base py-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 font-semibold"
                  disabled={loading}>

                  {loading ?
                  <span className="flex items-center justify-center w-full">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending...
                    </span> :

                  <>
                      Book Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  }
                </Button>
              </div>
            </form>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="slide-in-from-right" className="lg:col-span-2">
            <div className="space-y-6 h-full flex flex-col">
              <div className="glass-card rounded-3xl p-8 shadow-xl flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">
                  Or Say Hi Anytime!
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info) =>
                  <div key={info.label} className="flex items-center gap-4 group">
                      <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${info.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{info.label}</p>
                        {info.href ?
                      <a className="text-slate-500 hover:text-blue-600 transition-colors duration-300 text-sm" href={info.href}>{info.value}</a> :

                      <p className="text-slate-500 font-sans text-xs">{info.value}</p>
                      }
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 text-white shadow-xl noise-overlay relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-lg font-medium leading-relaxed text-blue-100">
                    "Ready to transform your ideas into digital reality? Let's start the conversation!"
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-300">Available for new projects</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>);

};

export default ContactForm;