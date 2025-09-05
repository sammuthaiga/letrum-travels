"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authAPI } from "@/lib/api";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    authAPI.logout();
    router.push("/login");
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Sign Out
            </h2>
            <p className="text-gray-600 text-sm">
              Are you sure you want to sign out of your account?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleLogout}
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Yes, Sign Out
            </Button>
            
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-semibold rounded-xl transition-all duration-300"
            >
              Cancel
            </Button>
          </div>

          {/* Footer note */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              You will need to sign in again to access your account
            </p>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-10 blur-2xl"></div>
      </div>
    </div>
  );
}
