import React, { Suspense } from "react";
import PropertiesPage from "@/components/properties/PropertiesPage";
import { ChevronDown, Loader2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale in Dubai | Buy Apartment & Investment Guide",
  description:
    "Explore luxury properties for sale in Dubai which includes apartments, villas, and commercial units. We have the best options in Dubai that also come with flexible payment plans and prime locations.",
};

const introParagraphs = [
  "For which of the best properties for sale in Dubai are you looking? We have a family home, investment unit, or luxury waterfront residence and much more to present to you. Dubai’s real estate market is also what you’d call very attractive at the moment.",
  "In high rise apartments and beachfront villas we have what you are looking for property for sale in Dubai with our expert guidance and verified listings. Also in Dubai you’ll find we have great transparent regulations, good rental yields, and buyer friendly policies which makes it a great play for both resident and international buyers.",
];

const apartmentPoints = [
  "Buy a studio apartment in Dubai for a beginner investment.",
  "Buy 1 bedroom apartment in Dubai for rent",
  "Spacious family units in premium towers",
  "Easy choices to buy an apartment in prime locations.",
];

const locationPoints = [
  "Property for sale in Downtown Dubai: Luxury towers by Burj Khalifa.",
  "Property for sale in Dubai Marina: Waterfront living that also provides strong ROI.",
  "Investors that put money into buy apartment Dubai Marina see high rental demand.",
  "Many which are in the market to buy apartments in Dubai Marina do so for lifestyle and appreciation.",
  "Buy an apartment in Jumeirah Village Circle for affordable family living.",
  "Buy property in Palm Jumeirah for luxury waterfront real estate.",
  "Growth in buy property in Jumeirah Village Circle which is due to competitive pricing.",
];

const investmentBenefits = [
  "High rental yields",
  "Strong capital appreciation",
  "Flexible payment structures",
  "Regulated by Dubai Land Department which pertains to secure ownership.",
];

const buyingOptions = [
  "Plans to buy property in Dubai with zero down payment.",
  "Options to buy property in Dubai without a down payment.",
  "Affordable options which include cheap property in Dubai to buy.",
  "Flexible payment plans for your property to buy in Dubai",
];

const faqs = [
  {
    question: "Do foreign nationals own property in Dubai?",
    answer:
      "Yes, foreign buyers are fully included in Dubai’s freehold markets. We also see large scale investment from international players which are in fact fully entitled to the properties they purchase which in turn are regulated by the Dubai Land Department.",
  },
  {
    question: "Is in what way do I purchase an apartment in Dubai on installments?",
    answer:
      "Yes. Many developers are offering in Dubai a pay as you go option for apartment purchases which includes plans after handover. Also some projects are putting forward zero down payment options which varies by developer.",
  },
  {
    question: "What are the top areas for property in Dubai?",
    answer:
      "Popular in the list of which are Downtown Dubai, Dubai Marina, Palm Jumeirah, and Jumeirah Village Circle. In Dubai Marina we see that buyers are looking for property for sale which in turn have many choosing to go for Palm Jumeirah for a touch of luxury by the water.",
  },
  {
    question: "Which types of properties are for sale in Dubai?",
    answer:
      "In Dubai we have for sale apartments, villas, townhouses and commercial property. Options from budget property in Dubai to high end luxury projects.",
  },
  {
    question: "Is investment in property in Dubai a good one?",
    answer:
      "Yes. Properties in Dubai which are for sale present strong rental yields, capital appreciation and tax benefits. If you are after an apartment to produce rental income or a long term play in the property market to buy into, the Dubai market is very much to the investor’s advantage.",
  },
];

export default function SalePage() {
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
          initialCategory="for_sale"
          lockCategory
          pageTitle="Properties for Sale"
          pageDescription="Explore luxury properties for sale in Dubai which includes apartments, villas, and commercial units. We have the best options in Dubai that also come with flexible payment plans and prime locations."
        />
      </Suspense>

      <section className="bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
                Properties for Sale in Dubai
              </h2>
              {introParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm md:text-base leading-relaxed text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Apartments for Sale in Dubai
                </h3>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  If you are looking to buy an apartment in Dubai there is a
                  range of options from affordable studios to luxury
                  penthouses. Also many investors choose to buy apartments in
                  Dubai on installments which in turn makes home ownership more
                  accessible with flexible payment plans.
                </p>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  Popular apartment options include:
                </p>
                <ul className="space-y-2">
                  {apartmentPoints.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  Post handover options available many buyers now go for to buy
                  an apartment in Dubai on installments as against full upfront
                  payment.
                </p>
              </article>

              <article className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Prime Locations to Buy Property
                </h3>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  Dubai has large diverse communities in terms of living and
                  investment:
                </p>
                <ul className="space-y-2">
                  {locationPoints.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  Whether you are in the market for an apartment to buy in
                  Dubai or are looking at apartments to buy near me, Dubai has
                  it all.
                </p>
              </article>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="rounded-xl border border-slate-100 p-5">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Commercial Property for Sale
                </h3>
                <p className="text-sm md:text-base text-slate-700">
                  At an economic growth stage businesses and investors may look
                  into commercial property for sale in Dubai which includes
                  offices, retail spaces and warehouse areas. Also within the
                  expansion of Dubai’s economy commercial assets are very much a
                  good play for the long term.
                </p>
              </article>

              <article className="rounded-xl border border-slate-100 p-5">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Investment Benefits
                </h3>
                <p className="text-sm md:text-base text-slate-700 mb-3">
                  Selecting properties for sale in Dubai:
                </p>
                <ul className="space-y-2">
                  {investmentBenefits.map((item) => (
                    <li key={item} className="text-sm md:text-base text-slate-700">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-slate-700 mt-4">
                  Foreign investors looking to buy property in Dubai
                  foreigner’s rules allow purchase in specified freehold areas
                  which include full ownership. Also many foreign investors buy
                  property in UAE for long term portfolio diversity.
                </p>
              </article>
            </div>

            <div className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Flexible Buying Options
              </h3>
              <p className="text-sm md:text-base text-slate-700 mb-3">
                Dubai developers offer:
              </p>
              <ul className="space-y-2">
                {buyingOptions.map((item) => (
                  <li key={item} className="text-sm md:text-base text-slate-700">
                    - {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm md:text-base text-slate-700 mt-4">
                Whether in investment or relocation, Dubai has simple and smooth
                processes for ownership.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 p-5 bg-slate-50/60">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Start Your Property Search Today
              </h3>
              <p className="text-sm md:text-base text-slate-700 mb-3">
                From high end homes to investment opportunities check out the
                verified properties for sale in Dubai and find your perfect fit
                which will meet your goals.
              </p>
              <p className="text-sm md:text-base text-slate-700">
                If you are looking to buy an apartment in Dubai, get in on the
                best communities, or grow your portfolio we are here at each
                step of the process.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-primary-dark">
                FAQs - Properties for Sale in Dubai
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
