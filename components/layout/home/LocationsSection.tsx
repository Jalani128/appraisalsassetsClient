"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const locations = [
  {
    id: "dubai_marina",
    name: "Dubai Marina",
    image:
      "/dubai-marina.png",
    /* https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800,*/
    properties: 0,
  },
  {
    id: "downtown_dubai",
    name: "Downtown Dubai",
    image:
      "/downtown-dubai.png",
      /* "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&q=80&w=800",*/
    properties: 8,
  },
  {
    id: "palm_jumeirah",
    name: "Palm Jumeirah",
    image:
      "/palm-jumeirah.png",
      /* "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",*/
    properties: 0,
  },
  {
    id: "bussiness_bay",
    name: "Business Bay",
    image:
      "/business-bay.png",
      /*"https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800",*/
    properties: 1,
  },
  {
    id: "dubai_hills",
    name: "Dubai Hills",
    image:
      "/dubai-hills.png",
      /*"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",*/
    properties: 0,
  },
  {
    id: "jvc",
    name: "JVC",
    image:
      "/jvc-jumeirah-village-circle.png",
      /* "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",*/
    properties: 0,
  },
];

export default function LocationsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#C5A572] font-semibold tracking-wide text-sm uppercase">
            Prime Locations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mt-2">
            Find the Best Place to Live in Dubai
          </h2>
          <p className="text-gray-600 mt-4">
            Dubai has amazing areas for every kind of person. Whether you want a modern apartment near the city or a peaceful home for your family, we are here to help you find the right place at the right price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/properties?location=${location.id}`}
                className="group block relative h-72 rounded-2xl overflow-hidden"
              >
                <Image
                  src={location.image}
                  alt={location.name}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {location.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {location.properties} Properties
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-[#C5A572] font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore Properties
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
