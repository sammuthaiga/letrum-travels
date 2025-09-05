'use client'

import React, { useState } from 'react'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import HotDealsSection from '@/components/landing/HotDealsSection'
import BookingProcessSection from '@/components/landing/BookingProcessSection'
import ServicesSection from '@/components/landing/ServicesSection'
import ToursSection from '@/components/landing/ToursSection'
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection'
import AboutCTASection from '@/components/landing/AboutCTASection'
import FooterSection from '@/components/landing/FooterSection'

export default function LandingPage() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  // Handle loading states for interactive elements
  const handleButtonClick = async (buttonId: string, redirectUrl?: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }))
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
    
    setLoadingStates(prev => ({ ...prev, [buttonId]: false }))
  }

  return (
    <main className="min-h-screen bg-gray-50 w-full">
      <Navbar 
        handleButtonClick={handleButtonClick}
        loadingStates={loadingStates}
      />
      
      <HeroSection 
        handleButtonClick={handleButtonClick}
        loadingStates={loadingStates}
      />

      <HotDealsSection />

       <ServicesSection />
      
      <BookingProcessSection 
        handleButtonClick={handleButtonClick}
        loadingStates={loadingStates}
      />
      
      <ToursSection 
        handleButtonClick={handleButtonClick}
        loadingStates={loadingStates}
      />
      
      <WhyChooseUsSection />
      
      <AboutCTASection 
        handleButtonClick={handleButtonClick}
        loadingStates={loadingStates}
      />
      
      <FooterSection />
    </main>
  )
}
