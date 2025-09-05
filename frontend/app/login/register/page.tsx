"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authAPI } from "@/lib/api";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, ArrowRight, Mail, Lock, User, AlertCircle, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "" 
  });
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
      await authAPI.register(form);
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
        setErrors(["Registration failed. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Back to Login Link */}
      <Link 
        href="/login" 
        className="absolute top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors font-medium"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
        <span>Back to Login</span>
      </Link>

      <div className="w-full max-w-lg relative z-10">
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
                Join the Adventure
              </h2>
              <p className="text-gray-600">Create your account and start exploring Africa</p>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50/80 backdrop-blur border border-red-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 font-semibold">Please fix the following errors:</span>
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
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-semibold flex items-center space-x-2">
                  <User className="h-4 w-4 text-secondary" />
                  <span>First Name</span>
                </Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  value={form.firstName} 
                  onChange={handleChange} 
                  className="h-12 pl-4 pr-4 border-2 border-gray-200 focus:border-secondary focus:ring-secondary rounded-2xl bg-gray-50/50 focus:bg-white/70 backdrop-blur transition-all duration-200 text-gray-900"
                  placeholder="John"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-semibold flex items-center space-x-2">
                  <User className="h-4 w-4 text-secondary" />
                  <span>Last Name</span>
                </Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  value={form.lastName} 
                  onChange={handleChange} 
                  className="h-12 pl-4 pr-4 border-2 border-gray-200 focus:border-secondary focus:ring-secondary rounded-2xl bg-gray-50/50 focus:bg-white/70 backdrop-blur transition-all duration-200 text-gray-900"
                  placeholder="Doe"
                  required 
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email Address</span>
              </Label>
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

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center space-x-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Password</span>
              </Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                className="h-12 pl-4 pr-4 border-2 border-gray-200 focus:border-primary focus:ring-primary rounded-2xl bg-gray-50/50 focus:bg-white/70 backdrop-blur transition-all duration-200 text-gray-900"
                placeholder="Create a strong password"
                required 
              />
              <div className="bg-gray-50/70 rounded-xl p-3 mt-2">
                <p className="text-xs text-gray-600 flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  Must be at least 8 characters with uppercase, lowercase, number, and special character
                </p>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="bg-primary/5 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 border-2 border-primary rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-primary font-semibold hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary font-semibold hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              isLoading={loading}
              loadingText="Creating Account..."
              className="w-full h-14 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Create Account</span>
              </span>
            </LoadingButton>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-600">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center space-x-2 w-full h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Sign In Instead</span>
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Why Join Letrum Agency?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Exclusive Tours</div>
                  <div className="text-gray-600">Access premium safaris</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto">
                  <User className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Expert Guides</div>
                  <div className="text-gray-600">Local knowledge</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">24/7 Support</div>
                  <div className="text-gray-600">Always here to help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
