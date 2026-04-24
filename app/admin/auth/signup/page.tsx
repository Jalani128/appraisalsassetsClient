"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    // Show toast notification when page loads
    toast.error("Signup is not allowed. Please contact administrator.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            A&A
          </h1>
          <p className="text-lg text-[#C1A06E] tracking-[0.2em] font-medium">
            ADMIN
          </p>
        </div>

        {/* Sign Up Card - Disabled */}
        <div className="bg-primary-dark-muted rounded-2xl shadow-xl p-8 border border-primary-dark-border">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Signup Not Allowed
            </h2>
            <p className="text-slate-400">Admin account creation is disabled</p>
            <p className="text-slate-500 text-sm mt-2">
              Please contact your system administrator
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm text-center">
                For security reasons, new admin accounts cannot be created
                through this interface.
              </p>
            </div>

            <Button
              onClick={() => router.push("/admin/auth/signin")}
              className="w-full bg-[#C1A06E] hover:bg-[#a88b5e] text-white font-semibold py-6 rounded-lg transition-all duration-200 shadow-lg shadow-[#C1A06E]/20 text-base"
            >
              Go to Sign In
            </Button>
          </div>

          <div className="mt-8 text-center border-t border-primary-dark-border pt-6">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                href="/admin/auth/signin"
                className="text-[#C1A06E] hover:text-[#d4b480] font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-sm mt-8">
          © 2026 A&A Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}
