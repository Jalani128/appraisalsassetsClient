"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileSearch,
  Handshake,
  KeyRound,
} from "lucide-react";

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const services = [
    {
      title: "Property Sales",
      description:
        "Assets & Appraisals helps clients buy and sell residential and commercial property in Dubai with practical support at every stage. Our team provides market insight, property guidance, and transaction support to help clients move forward with more confidence.",
      features: ["Market Analysis","Property search and shortlisting", "Price Negotiation", "Legal Support"],
      icon: <Building2 className="h-8 w-8" />,
    },
    {
      title: "Investment Advisory",
      description:
        "Assets & Appraisals offers investment advisory services for clients who want to assess opportunities, improve returns, and build stronger property portfolios in Dubai. We focus on market trends, asset performance, and long-term investment goals.",
      features: ["ROI Analysis", "Portfolio Management", "Market Insights", "Investment strategy support"],
      icon: <ChartNoAxesCombined className="h-8 w-8" />,
    },
    {
      title: "Property Valuation",
      description:
        "Assets & Appraisals provides property valuation and appraisal support for clients who need a clearer understanding of market value. Whether the purpose is sale, purchase, leasing, or investment review, our team delivers structured valuation guidance supported by market comparisons.",
      features: ["Property appraisal support", "Market Comparisons", "Asset Assessment", "Valuation reporting guidance"],
      icon: <FileSearch className="h-8 w-8" />,
    },
    {
      title: "Property Management",
      description:
        "Assets & Appraisals helps landlords and investors manage residential and commercial property more effectively. Our property management services are designed to support tenant retention, reduce operational stress, and protect long-term asset value..",
      features: ["Tenant Screening", "Maintenance coordination", "Rent Collection", "Ongoing management support"],
      icon: <Handshake className="h-8 w-8" />,
    },
    {
      title: "Lease Property",
      description:
        "Assets & Appraisals supports property owners with leasing solutions designed to attract suitable tenants and improve occupancy. From rental marketing to lease documentation, we manage the process with a clear and practical approach.",
      features: [
        "Tenant Screening",
        "Lease Documentation",
        "Rental Marketing",
        "Contract Negotiation",
      ],
      icon: <KeyRound className="h-8 w-8" />,
    },
  ];

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(4);
        return;
      }
      if (window.innerWidth >= 768) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, services.length - cardsPerView);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="bg-white py-16 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-base font-medium">
        <h3 className="text-primary uppercase">What We Offer</h3>
        <h2 className="md:text-4xl font-bold my-3">Our Premium Real Estate Services in Dubai</h2>
        <p className="text-xl max-w-3xl py-2 text-center text-gray-600 font-light">
        Assets & Appraisals provides real estate services in Dubai for buyers, sellers, investors, landlords, and businesses. From property sales and leasing to valuation, investment advisory, and property management, Assets & Appraisals helps clients make informed property decisions with clear guidance and market insight.
        </p>
        <div className="w-full py-4 my-6">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
              }}
            >
              {services.map((sr) => {
                return (
                  <div
                    key={sr.title}
                    className="px-2 shrink-0"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="group bg-white rounded-xl border border-gray-200 px-6 py-8 hover:shadow-xl hover:border-primary/80 transition-all duration-300 h-112 flex flex-col">
                      <div className="text-primary mb-4 h-12 w-12 rounded-lg bg-primary/10 inline-flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {sr.icon}
                      </div>
                      <div className="space-y-3 flex flex-col h-full min-h-0">
                        <h3 className="text-xl font-semibold text-gray-700 group-hover:text-primary transition-colors duration-300">
                          {sr.title}
                        </h3>
                        <p className="text-gray-500 font-normal text-sm leading-relaxed line-clamp-5">
                          {sr.description}
                        </p>
                        <ul className="space-y-2 mt-4 min-h-0 overflow-y-auto pr-1">
                          {sr.features.map((feat) => {
                            return (
                              <li
                                key={feat}
                                className="flex items-center gap-2 font-normal text-sm text-gray-500"
                              >
                                <CircleCheck className="h-4 w-4 text-primary shrink-0 group-hover:text-primary/80 transition-colors duration-300" />{" "}
                                {feat}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="flex justify-center items-center mt-5 gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 inline-flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label="Previous services"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to services slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 inline-flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label="Next services"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div className="btn">
          <Button className="bg-secondary hover:bg-primary-dark-muted flex items-center gap-1.5">
            Get Expert Consultation <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
