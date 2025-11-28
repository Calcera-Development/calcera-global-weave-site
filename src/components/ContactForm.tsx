import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: fields
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll be in touch soon.",
      });
      setFields(initialState);
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
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <AnimatedWrapper animation="fade-up" className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-4">
            Let's Talk
          </h2>
          <p className="text-xl text-slate-600 font-light">
            Tell us about your project
          </p>
        </AnimatedWrapper>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedWrapper animation="fade-up" delay="100ms">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="cf-name" className="text-slate-900 font-normal mb-2">
                  Name
                </Label>
                <Input
                  id="cf-name"
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Your name"
                  className="border-slate-300 focus:border-blue-600 rounded-xl h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="cf-contact" className="text-slate-900 font-normal mb-2">
                  Phone
                </Label>
                <Input
                  id="cf-contact"
                  name="contact"
                  type="text"
                  value={fields.contact}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="+94 XX XXX XXXX"
                  className="border-slate-300 focus:border-blue-600 rounded-xl h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="cf-email" className="text-slate-900 font-normal mb-2">
                  Email
                </Label>
                <Input
                  id="cf-email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="your@email.com"
                  className="border-slate-300 focus:border-blue-600 rounded-xl h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="cf-message" className="text-slate-900 font-normal mb-2">
                  Project Details
                </Label>
                <Textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Tell us about your project..."
                  className="border-slate-300 focus:border-blue-600 rounded-xl"
                />
              </div>
              
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-normal transition-all duration-300 hover:-translate-y-0.5"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="fade-up" delay="200ms">
            <div className="space-y-8 lg:pl-12">
              <div>
                <h3 className="text-2xl font-light text-slate-900 mb-8">Get in Touch</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-8">
                  We'd love to hear about your project. Let's discuss how we can help bring your vision to life.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100">
                    <Phone className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <div className="font-normal text-slate-900 mb-1">Phone</div>
                    <div className="text-slate-600 font-light">+94 77 123 9037</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100">
                    <Mail className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <div className="font-normal text-slate-900 mb-1">Email</div>
                    <a href="mailto:hello@calcera.global" className="text-slate-600 font-light hover:text-blue-600 transition-colors">
                      hello@calcera.global
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100">
                    <MapPin className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <div className="font-normal text-slate-900 mb-1">Location</div>
                    <div className="text-slate-600 font-light">Colombo, Sri Lanka</div>
                  </div>
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
