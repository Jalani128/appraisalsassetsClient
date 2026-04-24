import React, { Suspense } from "react";
import PropertiesPage from "@/components/properties/PropertiesPage";
import { ChevronDown, Loader2 } from "lucide-react";

const introParagraphs = [
  "Looking for property for rent in Dubai? For residential or commercial use we have a large variety of what you are looking for at different price points and in different areas. We have apartments, villas as well as offices and retail spaces which for the most part are very easy to find properties for rent with their transparent lease terms and very active market.",
  "In Dubai we see a very active rental market which is a result of strong demand, flexible lease terms, and a simple legal framework as per the rules of the Dubai Land Department which in turn gives security to both tenants and landlords.",
];

const residentialPoints = [
  "Apartments in prime communities",
  "Villas in family-friendly neighborhoods",
  "Property for rent in dubai monthly which is great for the short term.",
  "Rent to own properties in Dubai for your future property needs.",
];

const commercialPoints = [
  "Offices and co-working spaces",
  "Retail shops and showrooms",
  "Warehouses and industrial units",
];

const whyRentPoints = [
  "Wide range of properties for rent in Dubai options.",
  "Competitive rental prices across sectors",
  "Strong infrastructure and global connectivity",
  "Regulated rental laws protecting tenants",
  "High-quality residential and commercial developments",
];

const rentalServicePoints = [
  "Residential and commercial property in Dubai for rent.",
  "Market-based rental evaluations",
  "Lease negotiation and documentation",
  "Short-term and long-term rental solutions",
];

const faqs = [
  {
    question: "What kind of properties can you rent in Dubai?",
    answer:
      "In Dubai you’ll find a large choice of apartments, villas, townhouses, offices, shops, and warehouses. It also has a wide selection of residential and commercial properties in Dubai which are available in both up and coming as well as prime areas.",
  },
  {
    question:
      "Is it that you are looking for rental properties in Dubai on a monthly basis?",
    answer:
      "Yes. In Dubai many property owners put up for rent on a monthly basis, in particular serviced apartments and short term residential units which is very much the case for professionals and temporary residents.",
  },
  {
    question: "Can foreign nationals lease property in Dubai?",
    answer:
      "Yes. Expatriates and overseas residents have no issues in renting in the UAE with appropriate documentation.",
  },
  {
    question:
      "In what commercial spaces in Dubai do you have available for business?",
    answer:
      "Businesses rent out of offices, retail spaces, warehouses, and industrial units. In Dubai you’ll find commercial properties for rent in business districts, free zones, and high traffic commercial areas.",
  },
  {
    question: "Are there properties in the rent to own market in Dubai?",
    answer:
      "Yes. In Dubai some developers and landlords are offering rent to own options which allow for initial rental with a later purchase of the property at agreed terms.",
  },
];

export default function RentPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#C1A06E]" />
          </div>
        }
      >
        <PropertiesPage
          initialCategory="for_rent"
          lockCategory
          pageTitle="Properties for Rent"
          pageDescription="Explore apartments, villas, and townhouses available for rent across Dubai's top communities."
        />
      </Suspense>

      <section className="bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
                Property for Rent in Dubai
              </h2>
              {introParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm md:text-base leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Residential Properties for Rent in Dubai
                </h3>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  Dubai has a large array of residential options for individuals, families, and expatriates. You will see:
                </p>
                <ul className="space-y-2">
                  {residentialPoints.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  These are the factors which make Dubai a great option for both long term living and temporary relocation.
                </p>
              </article>

              <article className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Commercial Property for Rent in Dubai
                </h3>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  Businesses which are looking to grow or set up shop have a large choice out of many commercial properties for rent in Dubai that include:
                </p>
                <ul className="space-y-2">
                  {commercialPoints.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  As demand grows commercial properties for rent Dubai can be found in business hubs and at high traffic areas which provides great exposure and scale. Also many companies are looking for commercial property for rent near me to get convenient locations close to their clients and suppliers.
                </p>
              </article>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="rounded-xl border border-slate-100 p-5">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Why Rent Property in Dubai?
                </h3>
                <ul className="space-y-2">
                  {whyRentPoints.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  Dubai is still the choice for residents and businesses which are looking into rental options in the UAE.
                </p>
              </article>

              <article className="rounded-xl border border-slate-100 p-5">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Our Rental Services
                </h3>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  We assist clients with:
                </p>
                <ul className="space-y-2">
                  {rentalServicePoints.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  We have as our goal to put at your disposal the best options for property for rent.
                </p>
              </article>
            </div>

            <div className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Find the Right Property Today
              </h3>
              <p className="text-sm md:text-base text-slate-700">
                Whether you are in the market for a home, an office, or retail space, we have what you are looking for. In Dubai we present you premium rental properties and we guide you every step of the way as you secure a space that fits your lifestyle or business needs.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-primary-dark">
                FAQs - Property for Rent in Dubai
              </h3>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                      className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 open:shadow-sm open:border-[#C1A06E]/40"
                  >
                      <summary className="cursor-pointer list-none font-semibold text-slate-800 flex items-center justify-between gap-3 transition-colors duration-200 group-hover:text-[#8F7443]">
                      <span>{faq.question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                      <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-700 opacity-0 -translate-y-1 transition-all duration-300 ease-out group-open:opacity-100 group-open:translate-y-0">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
