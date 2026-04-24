"use client";

import { ANALYTICS } from "@/constants/constants";
import Filter from "./Filter";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function Hero() {
  const [content, setContent] = useState({
    badgeText: "RERA Certified | Trusted Since 2010",
    headline: "Real Estate Agency in Dubai for Property Sales, Valuation & Advisory",
    description:
    "Assets & Appraisals helps buyers, sellers, investors, landlords, and businesses make better property decisions in Dubai. We provide property sales support, real estate advisory, property valuation, leasing, and management services with a practical, market-led approach."
  });

  useEffect(() => {
    api.getSiteContent().then((res) => {
      if (res.success && res.data?.hero) {
        setContent({
          badgeText: res.data.hero.badgeText || content.badgeText,
          headline: res.data.hero.headline || content.headline,
          description: res.data.hero.description || content.description,
        });
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="hero min-h-[150vh] md:h-[125vh] w-full relative flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-top-right lg:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000")`,
        }}
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Content */}
      <div className="relative w-full grow flex flex-col">
        <div className="z-10 max-w-7xl mx-auto flex flex-col items-start justify-start relative w-full px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-40 md:pb-0">
          <div className="text-left text-white">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6 border border-primary/30">
              {content.badgeText}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight max-w-xl">
              {content.headline}
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-8 max-w-3xl text-gray-200 leading-relaxed">
              {content.description}
            </p>
            <Filter />

            {/* CTA Buttons */}
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border border-white/60 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-sm md:text-base w-full sm:w-auto">
                View All Properties
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button className="px-6 md:px-8 py-3 md:py-4 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 text-sm md:text-base w-full sm:w-auto">
                Contact an Advisor
              </button>
            </div>
          </div>
        </div>

        <div className="absolute z-10 bottom-0 w-full backdrop-blur-xl bg-gray-100/10 py-6 md:py-4 border-t border-primary/60">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center flex-wrap justify-between gap-y-6 md:gap-y-0">
            {ANALYTICS.map((item) => {
              return (
                <div
                  className="flex flex-col items-center justify-center mx-auto md:mx-0 min-w-[140px] md:min-w-0"
                  key={item.description}
                >
                  <h3 className="text-xl font-bold text-primary mb-1 md:mb-2 text-center">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-base text-gray-200 text-center">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
