"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  review: string;
  isFeatured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Roberts",
    role: "Property Investor",
    company: "Roberts Holdings",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review:
      "Assets & Appraisals provided exceptional valuation services for my commercial portfolio. Their team's attention to detail and market expertise gave us the confidence we needed for our investment decisions. Highly recommended for serious investors.",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Sarah Al-Maktoum",
    role: "Homeowner",
    company: "Private Client",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review:
      "From the initial consultation to the final appraisal report, the experience was seamless. Their RERA-certified team understood our needs perfectly and delivered accurate valuations that truly reflected market conditions.",
    isFeatured: false,
  },
  {
    id: 3,
    name: "James Patterson",
    role: "Real Estate Developer",
    company: "Patterson Developments",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review:
      "We've worked with Assets & Appraisals on multiple large-scale developments. Their practical, market-led approach and 15+ years of local expertise have been invaluable. Fast, accurate, and professional every time.",
    isFeatured: false,
  },
  {
    id: 4,
    name: "Emma Thornton",
    role: "Property Manager",
    company: "Elite Properties Dubai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review:
      "Outstanding service for our portfolio valuations. The team's deep understanding of Dubai's residential and commercial markets helped us optimize our leasing strategies and maximize returns for our clients.",
    isFeatured: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-[#C1A06E]" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div
      className={`relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-500 ease-out ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-50 scale-95 pointer-events-none"
      }`}
    >
      {/* Featured badge */}
      {testimonial.isFeatured && (
        <span className="absolute top-4 right-4 bg-[#C1A06E]/10 text-[#C1A06E] text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </span>
      )}

      {/* Quotation icon */}
      <div className="absolute top-6 right-8 text-[#C1A06E]/20">
        <Quote className="w-12 h-12" />
      </div>

      {/* Star rating */}
      <div className="flex mb-6">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Review text */}
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 relative">
        {testimonial.review}
      </blockquote>

      {/* Customer info */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C1A06E]/30">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.role}</p>
          {testimonial.company && (
            <p className="text-[#C1A06E] text-sm font-medium">{testimonial.company}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative bg-slate-50 py-20 md:py-28 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#C1A06E]/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C1A06E]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-primary font-medium uppercase tracking-wide mb-4">
            Client Testimonials
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by Dubai&apos;s Property Leaders
          </h2>
          <p className="text-lg text-gray-600">
            Hear from clients who have experienced the Assets & Appraisals difference
          </p>
        </div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto mb-12">
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isActive={true}
          />
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous button */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#C1A06E] hover:border-[#C1A06E] hover:shadow-lg transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Dots indicator */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#C1A06E] w-8"
                    : "bg-gray-300 hover:bg-[#C1A06E]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#C1A06E] hover:border-[#C1A06E] hover:shadow-lg transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mt-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C1A06E] transition-all duration-[5000ms] ease-linear"
            style={{ width: `${isAutoPlaying ? 100 : 0}%` }}
          />
        </div>

        {/* All testimonials grid - hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block mt-20">
          <h3 className="text-lg font-semibold text-gray-700 mb-8 text-center">
            More Success Stories
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-50 hover:shadow-md hover:border-[#C1A06E]/30 transition-all duration-300 cursor-pointer"
                onClick={() => goToSlide(idx)}
              >
                <div className="flex mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {testimonial.review}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#C1A06E] text-xs font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
