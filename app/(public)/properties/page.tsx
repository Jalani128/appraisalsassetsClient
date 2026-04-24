import React, { Suspense } from "react";
import PropertiesPage from "@/components/properties/PropertiesPage";
import { Loader2 } from "lucide-react";

export default function Properties() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C1A06E]" />
        </div>
      }
    >
      <PropertiesPage />
    </Suspense>
  );
}
