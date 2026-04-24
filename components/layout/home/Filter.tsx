"use client";

import { Building2, House, Search, Construction } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import api from "@/lib/api";
import {
  FALLBACK_PROPERTY_OPTIONS,
  SelectOption,
} from "@/constants/form-options";

type Listings = "buy" | "rent" | "commercial" | "offplan";

export default function Filter() {
  const router = useRouter();
  const [type, setType] = useState<Listings>("buy");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<SelectOption[]>(
    FALLBACK_PROPERTY_OPTIONS.locations,
  );

  const tabs = [
    { name: "buy", icon: House, label: "Buy" },
    { name: "rent", icon: Building2, label: "Rent" },
    { name: "commercial", icon: Building2, label: "Commercial" },
    {
      name: "offplan",
      icon: Construction,
      label: "Offplan Developer",
    },
  ];

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await api.getPropertyFormOptions();
        if (response.success && response.data?.locations) {
          setLocations(response.data.locations);
        }
      } catch (error) {
        // Use fallback locations when options request fails
      }
    };
    loadOptions();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location && type !== "offplan") {
      params.set("location", location);
    }

    let targetPath = "/properties";
    if (type === "buy") {
      targetPath = "/sale";
    } else if (type === "rent") {
      targetPath = "/rent";
    } else if (type === "commercial") {
      params.set("category", "commercial");
    } else if (type === "offplan") {
      // Off-plan developer tab takes user to developers listing page
      targetPath = "/developers";
    }

    const query = params.toString();
    router.push(query ? `${targetPath}?${query}` : targetPath);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-4 md:mb-5 overflow-x-auto no-scrollbar -mx-1 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = type === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setType(tab.name as Listings)}
              className={clsx(
                "flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition whitespace-nowrap",
                active
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Row */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
        {/* Location */}
        <div className="grow">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="hero-location-suggestions"
            placeholder="Enter location (e.g. Downtown Dubai)"
            className="rounded-lg w-full h-12 md:h-11 border border-gray-200 text-gray-700 text-sm md:text-base"
          />
          <datalist id="hero-location-suggestions">
            {locations.map((loc) => (
              <option key={loc.value} value={loc.label} />
            ))}
          </datalist>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="h-12 md:h-14 px-6 md:px-8 rounded-lg md:rounded-xl bg-primary hover:opacity-95 text-white font-semibold flex items-center justify-center gap-2 transition w-full md:w-auto"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm md:text-base">Search Properties</span>
        </button>
      </div>
    </div>
  );
}
