"use client";

import { MessageCircle } from "lucide-react";

const rawWhatsAppNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+971502828397";
const normalizedWhatsAppNumber = rawWhatsAppNumber.replace(/[^0-9]/g, "");
const defaultMessage = encodeURIComponent(
  "Hi, I would like to know more about your properties.",
);

export default function FloatingWhatsAppButton() {
  return (
    <div className="group fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden md:block rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        Chat with us
      </div>

      <a
        href={`https://wa.me/${normalizedWhatsAppNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5d] hover:shadow-xl"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
        <MessageCircle className="relative h-7 w-7" />
      </a>
    </div>
  );
}
