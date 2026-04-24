"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark p-4">
      <div className="bg-primary-dark-muted rounded-2xl shadow-xl p-8 border border-primary-dark-border max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
        <p className="text-slate-400 mb-6">
          Please contact your administrator to reset your password.
        </p>
        <Link href="/admin/auth/signin">
          <Button variant="outline" className="border-primary-dark-border text-white hover:bg-primary-dark-border w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
