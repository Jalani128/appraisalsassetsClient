'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Added .trim() to ensure no accidental spaces cause login failure
      const cleanEmail = formData.email.trim();
      const cleanPassword = formData.password;

       // 2. Call the login function from auth-context
       await login(cleanEmail, cleanPassword);
       
       toast.success('Login successful!');
       
       // 3. No need to manually redirect - auth-context handles it
    } catch (error: any) {
      // 4. Improved error reporting to distinguish between "Wrong Password" and "Server Down"
      const errorMessage = error.response?.data?.message || error.message || 'Invalid credentials';
      toast.error(errorMessage);
      console.error("Login Error Details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">A&A</h1>
          <p className="text-lg text-[#C1A06E] tracking-[0.2em] font-medium">ADMIN</p>
        </div>

        <div className="bg-primary-dark-muted rounded-2xl shadow-xl p-8 border border-primary-dark-border">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@assetsappraisals.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-primary-dark border-primary-dark-border text-white placeholder:text-slate-600 focus:border-[#C1A06E] focus:ring-[#C1A06E] h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300 font-medium">
                  Password
                </Label>
                <Link
                  href="/admin/auth/forgot-password"
                  className="text-sm text-[#C1A06E] hover:text-[#d4b480] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="bg-primary-dark border-primary-dark-border text-white placeholder:text-slate-600 focus:border-[#C1A06E] focus:ring-[#C1A06E] h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C1A06E] hover:bg-[#a88b5e] text-white font-semibold py-6 rounded-lg transition-all duration-200 shadow-lg shadow-[#C1A06E]/20 text-base"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-primary-dark-border pt-6">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <Link
                href="/admin/auth/signup"
                className="text-[#C1A06E] hover:text-[#d4b480] font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          © 2026 A&A Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}
