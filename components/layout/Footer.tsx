"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import api from "@/lib/api";

function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await api.subscribe({ email });
      if (response.success) {
        toast.success(response.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(response.message || "Failed to subscribe");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">
            Stay Updated with Market Insights
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Get the latest Dubai real estate news and exclusive property
            listings delivered to your inbox.
          </p>
        </div>
        <form
          onSubmit={handleSubscribe}
          className="flex w-full md:w-auto gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#C1A06E]/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-[#C1A06E] hover:bg-[#a88b5e] text-white font-medium text-sm transition-colors flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <NewsletterBar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div>
              <Link href={"/"}>
                <Image src={"/logo.png"} alt="Logo" width={80} height={80} />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Dubai&#39;s premier real estate advisory firm specializing in
              luxury properties, asset valuation, and investment guidance.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-primary  hover:text-primary transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-primary  hover:text-primary transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-primary  hover:text-primary transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
             <li>
               <Link
                 href="/developers"
                 className="text-gray-300 hover:text-primary transition-colors duration-200"
                 >
                 Off-Plan Developers
               </Link>
             </li>
              </ul>
          </div>

          {/* Popular Areas Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Popular Areas
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties?location=dubai_marina"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Dubai Marina
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=downtown_dubai"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Downtown Dubai
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=palm_jumeirah"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Palm Jumeirah
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=bussiness_bay"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Business Bay
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=dubai_hills"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Dubai Hills
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">
                  Office No: 79 Al Fahidi St - Al Hamriya - Bur Dubai.
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+971502828397"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    +971-50-282-8397
                  </a>
                  <br />
                  <a
                    href="tel:+97142885213"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    +971-4-288-5213
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@assetsappraisals.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  info@assetsappraisals.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 Assets & Appraisal. All rights reserved. RERA Certified.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
