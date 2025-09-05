"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authAPI } from "@/lib/api";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      await authAPI.login(form);
      router.push("/dashboard");
    } catch (err: any) {
      if (err?.response?.data?.message) {
        // Handle backend validation errors
        if (Array.isArray(err.response.data.message)) {
          setErrors(err.response.data.message);
        } else {
          setErrors([err.response.data.message]);
        }
      } else {
        setErrors(["Login failed. Please check your credentials."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors font-medium"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Globe className="h-10 w-10 text-blue-600" />
              <h1 className="text-2xl font-black text-gray-900">
                <span className="text-primary">Letrum</span> Agency
              </h1>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to continue your African adventure</p>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50/80 backdrop-blur border border-red-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 font-semibold">Authentication Error</span>
              </div>
              <ul className="ml-8 space-y-2">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-600 text-sm flex items-start">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email Address</span>
              </Label>
              <div className="relative">
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="h-12 pl-4 pr-4 border-2 border-gray-200 focus:border-primary focus:ring-primary rounded-2xl bg-gray-50/50 focus:bg-white/70 backdrop-blur transition-all duration-200 text-gray-900"
                  placeholder="your@email.com"
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center space-x-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Password</span>
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  className="h-12 pl-4 pr-4 border-2 border-gray-200 focus:border-primary focus:ring-primary rounded-2xl bg-gray-50/50 focus:bg-white/70 backdrop-blur transition-all duration-200 text-gray-900"
                  placeholder="Enter your password"
                  required 
                />
              </div>
            </div>

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              isLoading={loading}
              loadingText="Signing In..."
              className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Sign In</span>
                <ArrowRight className="h-5 w-5" />
              </span>
            </LoadingButton>
          </form>

          {/* Forgot Password */}
          <div className="text-center">
            <a 
              href="#" 
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Forgot your password?
            </a>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-600">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link 
              href="/login/register" 
              className="inline-flex items-center justify-center space-x-2 w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Create New Account</span>
            </Link>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Trusted</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
