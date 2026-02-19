
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import AnimatedWrapper from "@/components/sections/AnimatedWrapper";
import { supabase } from "@/integrations/supabase/client";

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
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: fields,
      });

      if (error) {
        console.error("Consultation form error:", error);
        toast({
          title: "Message failed to send",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({ title: "Message sent!", description: "Thanks for reaching out. We'll be in touch soon." });
        setFields(initialState);
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong.", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+94 77 898998 2", href: "tel:+94778989982", color: "from-blue-500 to-cyan-400" },
    { icon: Mail, label: "Email", value: "hello@calcera.global", href: "mailto:hello@calcera.global", color: "from-purple-500 to-pink-400" },
    { icon: MapPin, label: "Location", value: "Shangri-La Hotel, Colombo-02, Sri Lanka", href: "https://www.google.com/maps/dir//Shangri-La+Colombo,+WRHV%2BCQ7,+One+Galle+Face+Dr,+Colombo+2/@6.8879461,79.8632827,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ae2593b09364c4f:0x7dc13fa1f24d5c16!2m2!1d79.8444584!2d6.928457?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D", color: "from-emerald-500 to-teal-400" }];


  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 mesh-gradient relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedWrapper animation="fade-up" className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2 sm:mb-4">Contact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            {`Let's Make Something Great Together`}
          </h2>
          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto px-4">
            {`We'd love to hear what you're building. Let's turn your ideas into beautifully built reality.`}
          </p>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 sm:gap-16">
          <AnimatedWrapper animation="slide-in-from-left" className="lg:col-span-3">
            <form className="glass-card rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-white/50 relative overflow-hidden group/form" onSubmit={handleSubmit}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50" />

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-12 tracking-tight">
                Unleash Your Idea
              </h3>
              <div className="space-y-8">
                <div className="group/input relative">
                  <Label htmlFor="cf-name" className="block text-slate-500 mb-2 font-semibold text-xs uppercase tracking-widest transition-colors group-focus-within/input:text-blue-600">
                    Your Full Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input id="cf-name" name="name" type="text" value={fields.name} onChange={handleChange} disabled={loading} placeholder="E.g. Elon Musk" autoComplete="name"
                    className="h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-500 bg-white/50 backdrop-blur-sm text-base" />
                </div>
                <div className="group/input relative">
                  <Label htmlFor="cf-contact" className="block text-slate-500 mb-2 font-semibold text-xs uppercase tracking-widest transition-colors group-focus-within/input:text-blue-600">
                    Best Contact Number <span className="text-rose-500">*</span>
                  </Label>
                  <Input id="cf-contact" name="contact" type="text" value={fields.contact} onChange={handleChange} disabled={loading} placeholder="+X XX XXX XXXX" autoComplete="tel"
                    className="h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-500 bg-white/50 backdrop-blur-sm text-base" />
                </div>
                <div className="group/input relative">
                  <Label htmlFor="cf-email" className="block text-slate-500 mb-2 font-semibold text-xs uppercase tracking-widest transition-colors group-focus-within/input:text-blue-600">
                    Business Email Address <span className="text-rose-500">*</span>
                  </Label>
                  <Input id="cf-email" name="email" type="email" value={fields.email} onChange={handleChange} disabled={loading} placeholder="name@company.com" autoComplete="email"
                    className="h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-500 bg-white/50 backdrop-blur-sm text-base" />
                </div>
                <div className="group/input relative">
                  <Label htmlFor="cf-message" className="block text-slate-500 mb-2 font-semibold text-xs uppercase tracking-widest transition-colors group-focus-within/input:text-blue-600">
                    Vision Summary <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea id="cf-message" name="message" rows={5} value={fields.message} onChange={handleChange} disabled={loading}
                    placeholder="Briefly describe what you're building..."
                    className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-500 bg-white/50 backdrop-blur-sm text-base resize-none" />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-slate-950 text-white shadow-2xl text-sm sm:text-base py-3 sm:py-4 rounded-2xl hover:bg-black transition-all duration-500 hover:scale-[1.02] active:scale-100 font-bold group/btn relative overflow-hidden shimmer-btn"
                  disabled={loading}>

                  {loading ?
                    <span className="flex items-center justify-center w-full">
                      <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Transmitting Data...
                    </span> :

                    <span className="flex items-center justify-center gap-2">
                      Submit Technical Request
                      <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-1.5 transition-transform" />
                    </span>
                  }
                </Button>
              </div>
            </form>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-in-from-right" className="lg:col-span-2">
            <div className="space-y-8">
              <div className="glass-card rounded-[2.5rem] p-10 shadow-2xl border border-white/40 group/sidebar relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <h3 className="text-2xl font-bold text-slate-900 mb-10 tracking-tight">
                  Direct Integration
                </h3>
                <div className="space-y-10">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-6 group/item">
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.label === "Location" ? "_blank" : undefined}
                          rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                          className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${info.color} shadow-xl group-hover/item:scale-110 group-hover/item:-rotate-6 transition-all duration-500 block`}
                        >
                          <info.icon className="h-6 w-6 text-white" />
                        </a>
                      ) : (
                        <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${info.color} shadow-xl group-hover/item:scale-110 group-hover/item:-rotate-6 transition-all duration-500`}>
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">{info.label}</p>
                        {info.href ? (
                          <a
                            className="text-slate-900 hover:text-blue-600 transition-colors duration-300 text-base sm:text-lg font-medium tracking-tight"
                            href={info.href}
                            target={info.label === "Location" ? "_blank" : undefined}
                            rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-slate-900 text-base sm:text-lg font-medium tracking-tight">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-gradient-to-br from-slate-950 to-blue-950 rounded-[2.5rem] p-10 text-white shadow-2xl noise-overlay border border-white/10 overflow-hidden card-shine">
                  <div className="relative z-10">
                    <p className="text-xl font-light leading-relaxed text-blue-100/90 italic">
                      "Ready to transform your ideas into digital reality? Let's start the conversation!"
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                      <span className="text-sm font-semibold tracking-wide uppercase text-slate-400">Available for new projects</span>
                    </div>
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