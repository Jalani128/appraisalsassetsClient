"use client";

import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 my-20">
      <div className="relative bg-secondary rounded-xl py-16 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#2A374A"
                  strokeWidth="1.5"
                />
                <path
                  d="M 0 0 L 60 0"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.15)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 0 60 L 60 60"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.15)"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-6 lg:px-8">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to Find Your <br />
              <span className="text-[#C1A06E]">Ideal Property?</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Whether you want to buy, rent, or invest,<b>Assets & Appraisals</b> helps you move forward with expert guidance, local market insight, and trusted property valuation and appraisal support in Dubai.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white px-8 py-6 text-lg font-semibold group"
              >
                Expert Consultation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border border-[#C1A06E] text-[#C1A06E] hover:bg-[#C1A06E] hover:text-white px-8 py-6 text-lg font-semibold"
              >
                <a href="tel:+971502828397" className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>Call Us Now</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Free Valuation Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#C1A06E]/20 rounded-lg flex items-center justify-center group-hover:bg-[#C1A06E]/30 transition-colors duration-300">
                  <MessageSquare className="w-6 h-6 text-[#C1A06E]" />
                </div>
              </div>
              <h3 className="text-xl text-center font-semibold text-white mb-2">
                Free Valuation
              </h3>
              <p className="text-gray-300 text-center text-sm leading-relaxed">

                Get an accurate property valuation in Dubai from certified real estate appraisers.
                .
              </p>
            </div>

            {/* Expert Advice Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#C1A06E]/20 rounded-lg flex items-center justify-center group-hover:bg-[#C1A06E]/30 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-[#C1A06E]" />
                </div>
              </div>
              <h3 className="text-xl text-center font-semibold text-white mb-2">
                Expert Advice
              </h3>
              <p className="text-gray-300 text-sm text-center leading-relaxed">
                Speak with our Dubai property experts for reliable insights,
                appraisals, and investment guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
