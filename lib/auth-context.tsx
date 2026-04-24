'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

// --- Types ---
interface Admin {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  accessLevel?: "full" | "limited";
  isActive?: boolean;
  permissions?: {
    dashboard: boolean;
    properties: boolean;
    inquiries: boolean;
    blog: boolean;
    testimonials: boolean;
    users: boolean;
    content: boolean;
    developers: boolean;
    settings: boolean;
  };
}

type PermissionKey = keyof NonNullable<Admin["permissions"]>;

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  verifyEmail: (email: string, otp: string) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (permission: PermissionKey) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const token = api.getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.verifyToken();
      if (response && response.success && response.admin) {
        setAdmin(response.admin);
      } else {
        api.setAccessToken(null);
        setAdmin(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      api.setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      // 1. Attempt login
      const response = await api.login(email, password);
      
      if (response.success && response.accessToken) {
        // 2. Save token to localStorage/Cookies via your API utility
        api.setAccessToken(response.accessToken);
        
        // 3. Immediately verify the new token to get Admin profile
        const verifyResponse = await api.verifyToken();
        
        if (verifyResponse.success && verifyResponse.admin) {
          console.log('[auth] Setting admin and redirecting to dashboard');
          setAdmin(verifyResponse.admin);
          // Use hard redirect to ensure it works
          console.log('[auth] Redirecting to /admin/dashboard');
          window.location.href = '/admin/dashboard';
          return;
        } else {
          throw new Error(verifyResponse.message || "Token verification failed after login.");
        }
      }
      
      // If we reach here, the backend specifically returned success: false
      throw new Error(response.message || 'Invalid credentials');
      
    } catch (error: any) {
      console.error("Detailed Login Error:", error);
      // Pass the specific error back to the UI toast
      throw new Error(error.response?.data?.message || error.message || "Connection Error");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await api.signup(name, email, password);
      if (response.success) return response;
      throw new Error(response.message || 'Signup failed');
    } catch (error: any) {
      throw error;
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    try {
      const response = await api.verifyEmail(email, otp);
      if (response.success) return response;
      throw new Error(response.message);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      api.setAccessToken(null);
      setAdmin(null);
      router.push('/admin/auth/signin');
    }
  };

  const hasPermission = (permission: PermissionKey) => {
    if (!admin) return false;
    if (admin.accessLevel !== "limited") return true;
    return Boolean(admin.permissions?.[permission]);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        signup,
        verifyEmail,
        logout,
        isAuthenticated: !!admin,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
