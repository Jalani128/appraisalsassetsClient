"use client";

import Image from "next/image";
import { Award, Clock, Shield, Users } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="relative bg-secondary py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-primary font-medium uppercase">
                Why Choose Us
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Why Clients Choose <br />
                <span className="text-[#C1A06E]">Assets & Appraisals</span>
              </h2>
              <p className="text-gray-300">
              <b>Assets & Appraisals</b> brings over 15 years of experience in Dubai real estate, helping buyers, sellers, investors, landlords, and businesses make better property decisions. Our team combines local market knowledge with practical support across property sales, valuation, advisory, leasing, and management services in Dubai.
              </p>
            </div>

             {/* Feature List */}
              <div className="space-y-4 grid grid-cols-2 gap-4">
                {[
                  {
                    id: "rera-certified",
                    title: "RERA Certified",
                    description:
                      "<b>Assets & Appraisals</b> operates as a licensed real estate company in Dubai, giving clients added confidence when buying, selling, leasing, or managing property.",
                    icon: <Shield />,
                  },
                  {
                    id: "experienced-team",
                    title: "Experienced Team",
                    description:
                      "Our team includes experienced real estate professionals with strong knowledge of Dubai’s residential, commercial, and investment property market.",
                      icon: <Users />,
                    
                  },
                  {
                    id: "trusted-2010",
                    title: "Trusted Since 2010",
                    description:
                      "For more than a decade, Assets & Appraisals has supported clients with reliable real estate guidance, structured service, and long-term property support.",
                    icon: <Award />,
                  },
                  {
                    id: "15-years-excellence",
                    title: "15+ Years of Excellence",
                    description:
                      "A strong track record in Dubai real estate built on experience, service quality, and practical property expertise.",
                    icon: <Award />,
                  },
                  {
                    id: "end-to-end",
                    title: "End-to-End Support",
                    description:
                      "From property search and sales to valuation, leasing, and management, we help clients move through each stage with clearer direction and better market insight.",
                    icon: <Clock />,
                  },
                   {
                    id: "local-expertise",
                    title: "Local Market Expertise",
                    description:
                      "Deep knowledge of Dubai's diverse neighborhoods ensures optimal property decisions for buyers, sellers, and investors.",
                    icon: <Shield />,
                  },
                  
                ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-6">
                  <span className="text-primary bg-primary/30 p-2 rounded-md">
                    {feature.icon}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-medium text-white">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 font-light text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
                alt="Modern luxury living room"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute md:-bottom-10 md:-left-16  w-50 h-28 bg-white rounded-lg flex items-center gap-6 p-2">
              <div className="rounded-full p-2 h-16 font-bold text-xl text-white  w-16 flex items-center justify-center bg-primary">
                15+
              </div>
              <div className="">
                <h4 className="font-bold text-xl">Years</h4>
                <p className="font-light">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
