
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const ContactForm = () => (
  <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
    <div className="max-w-5xl mx-auto">
      <AnimatedWrapper animation="fade-up" className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-6">
          Let's Make Something Great Together
        </h2>
        <p className="text-xl sm:text-2xl text-slate-600">
          We’d love to hear what you’re building. Let’s turn your ideas into beautifully built reality.
        </p>
      </AnimatedWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatedWrapper animation="slide-in-from-left">
          <div className="space-y-8">
            <h3 className="text-xl sm:text-2xl font-medium text-slate-800 mb-4">Tell Us About Your Project</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-slate-700 font-medium mb-2">Your Name</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Email or Phone Number</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Quick Summary of Your Idea</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"></textarea>
              </div>
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg text-lg py-4 rounded-full">
                Book Free Consultation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </AnimatedWrapper>
        <AnimatedWrapper animation="slide-in-from-right">
          <div className="space-y-8">
            <h3 className="text-xl sm:text-2xl font-medium text-slate-800 mb-4">
              Or Say Hi Anytime!
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-5">
                <span className="p-2 bg-blue-100 rounded-full">
                  {/* phone svg */}
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-slate-800">Phone</p>
                  <p className="text-slate-600">+94 77 123 9037</p>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <span className="p-2 bg-purple-100 rounded-full">
                  {/* email svg */}
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-slate-800">Email</p>
                  <a className="text-slate-600 hover:text-blue-700" href="mailto:hello@calcera.global">hello@calcera.global</a>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <span className="p-2 bg-emerald-100 rounded-full">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </span>
                <div>
                  <p className="font-medium text-slate-800">Location</p>
                  <p className="text-slate-600">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  </section>
);

export default ContactForm;
