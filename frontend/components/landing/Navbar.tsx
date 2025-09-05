'use client'

import React, { useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

interface NavbarProps {
  handleButtonClick: (buttonId: string, redirectUrl?: string) => Promise<void>
  loadingStates: Record<string, boolean>
}

export default function Navbar({ handleButtonClick, loadingStates }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close mobile menu when clicking on links
  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="w-[90%] max-w-7xl mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-black text-gray-900">
              <span className="text-primary">Letrum</span> Agency
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Tours', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-semibold text-gray-700 hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LoadingButton
              onClick={() => handleButtonClick('nav-login', '/login')}
              isLoading={loadingStates['nav-login']}
              loadingText="Signing In..."
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Sign In
            </LoadingButton>
            <LoadingButton
              onClick={() => handleButtonClick('nav-register', '/login')}
              isLoading={loadingStates['nav-register']}
              loadingText="Signing Up..."
              className="bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              Get Started
            </LoadingButton>
          </div>
          
          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4 pt-4">
              {['Home', 'Services', 'Tours', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={handleLinkClick}
                  className="font-semibold text-gray-700 hover:text-primary transition-colors px-2 py-1"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <LoadingButton
                  onClick={() => handleButtonClick('mobile-login', '/login')}
                  isLoading={loadingStates['mobile-login']}
                  loadingText="Signing In..."
                  variant="outline"
                  className="w-full"
                >
                  Sign In
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleButtonClick('mobile-register', '/login')}
                  isLoading={loadingStates['mobile-register']}
                  loadingText="Signing Up..."
                  className="w-full"
                >
                  Get Started
                </LoadingButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
