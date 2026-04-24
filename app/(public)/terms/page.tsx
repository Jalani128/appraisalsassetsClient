import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for our real estate services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Terms of Service
        </h1>
        <p className="text-slate-600 mb-8">
          This page is under construction. Please contact us for any terms-related inquiries.
        </p>
        <Link href="/contact">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
