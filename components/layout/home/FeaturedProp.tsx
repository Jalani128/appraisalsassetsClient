"use client";

import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/utils/PropertyCard";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  location: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqft: number;
  images: Array<{
    url: string;
    isCover: boolean;
  }>;
  isFeatured: boolean;
  isActive: boolean;
  category?: string;
  phone?: string;
  whatsAppNumber?: string;
}

export default function FeaturedProp() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      console.log("Fetching featured properties...");
      const response = await api.getProperties({
        limit: 3,
        isFeatured: true,
      });

      console.log("API Response:", response);

      if (response.success && response.properties) {
        console.log("Properties found:", response.properties);
        // Filter for featured properties that are active
        const featuredProperties = response.properties
          .filter(
            (property: Property) => property.isFeatured && property.isActive,
          )
          .slice(0, 3);
        setProperties(featuredProperties);
      } else {
        console.log("No properties in response or success false");
      }
    } catch (error) {
      console.error("Failed to fetch featured properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price?: { amount: number; currency: string } | null) => {
    if (!price) return "AED 0";
    return `${price.currency ?? "AED"} ${(price.amount ?? 0).toLocaleString()}`;
  };

  const formatLocation = (location: string) => {
    const locationLabels: Record<string, string> = {
      dubai_marina: "Dubai Marina",
      downtown_dubai: "Downtown Dubai",
      bussiness_bay: "Business Bay",
      jvc: "JVC",
      palm_jumeirah: "Palm Jumeirah",
      dubai_hills: "Dubai Hills",
      arabian_ranches: "Arabian Ranches",
      emaar_beachfront: "Emaar Beachfront",
      blue_waters: "Bluewaters",
      city_walks: "City Walk",
    };
    return (
      locationLabels[location] ||
      location.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-white lg:py-24 md:py-20 sm:py-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-8 sm:gap-6 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-2xl h-96 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="w-full bg-white lg:py-24 md:py-20 sm:py-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-primary font-medium uppercase">
            Exclusive Listings
          </h3>
          <div className="">
            <h2 className="md:text-4xl text-2xl font-bold py-2">
              Featured Properties
            </h2>
            <div className="flex items-center justify-between">
              <p className="max-w-2xl text-base text-gray-600">
               Discover premium residences and high-return investments curated by our expert Dubai Real Estate Agents, part of a leading real estate agency in Dubai recognized among the top real estate companies in Dubai.
              </p>
              <Link href="/properties">
                <Button
                  variant={"outline"}
                  className="hover:bg-secondary hover:text-white border border-secondary text-secondary hover:shadow-none transition-all ease duration-500 font-medium"
                >
                  View All Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* No Featured Properties Fallback */}
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Featured Properties Available
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re currently updating our featured listings. Check back
                soon for our handpicked selection of premium properties.
              </p>
              <Link href="/properties">
                <Button className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white">
                  Browse All Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white lg:py-24 md:py-20 sm:py-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-primary font-medium uppercase">
          EXCLUSIVE LISTINGS
        </h3>
        <div className="">
          <h2 className="md:text-4xl text-2xl font-bold py-2">
            Featured Properties
          </h2>
          <div className="flex items-center justify-between">
            <p className="max-w-2xl text-base text-gray-600">
              Discover premium residences and high-return investments curated by
              our expert Dubai Real Estate Agents, part of a leading real estate
              agency in Dubai recognized among the top real estate companies in
              Dubai.
            </p>
            <Link href="/properties">
              <Button
                variant={"outline"}
                className="hover:bg-secondary hover:text-white border border-secondary text-secondary hover:shadow-none transition-all ease duration-500 font-medium"
              >
                View All Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        {/* Featured Properties */}
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-8 sm:gap-6 gap-4 lg:py-12 md:py-8 sm:py-6 py-4">
          {properties.map((property) => (
            <div key={property._id}>
              <PropertyCard
                key={property._id}
                id={property._id}
                image={
                  property.images.find((img) => img.isCover)?.url ||
                  property.images[0]?.url ||
                  ""
                }
                title={property.title}
                price={formatPrice(property.price)}
                location={formatLocation(property.location)}
                beds={property.bedrooms}
                baths={property.bathrooms}
                sqft={property.sizeSqft}
                featured={property.isFeatured}
                category={property.category}
                phone={property.phone}
                whatsAppNumber={property.whatsAppNumber}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
