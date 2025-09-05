'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

interface HeroProps {
  handleButtonClick: (buttonId: string, redirectUrl?: string) => Promise<void>
  loadingStates: Record<string, boolean>
}

interface HeroSlide {
  image: string
  alt: string
  title: React.ReactNode
  description: string
  isDark: boolean
}

export default function HeroSection({ handleButtonClick, loadingStates }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const heroSlides: HeroSlide[] = [
    {
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'African safari landscape with wildlife',
      title: (
        <>
          Discover the <span className="text-primary font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter brightness-125 text-shadow-lg">Magical</span> World of Africa
        </>
      ),
      description: 'Embark on extraordinary safari adventures and cultural experiences that will create memories to last a lifetime.',
      isDark: true
    },
    {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Beautiful tropical beach with clear blue water',
      title: (
        <>
          Experience <span className="text-[#008080] font-light drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Pristine</span> Coastal Paradise
        </>
      ),
      description: 'Relax on untouched beaches where turquoise waters meet golden sands.',
      isDark: false
    },
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Majestic mountain ranges and landscapes',
      title: (
        <>
          Conquer <span className="text-[#008080] font-light drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Majestic</span> Mountain Peaks
        </>
      ),
      description: 'Scale breathtaking heights and witness panoramic views that stretch to infinity.',
      isDark: false
    },
    {
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'African elephants in their natural habitat',
      title: (
        <>
          Witness <span className="text-primary font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter brightness-125 text-shadow-lg">Wild</span> Africa Unfold
        </>
      ),
      description: 'Encounter the Big Five and countless species in their pristine natural habitat.',
      isDark: true
    },
    {
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Happy tourists on safari adventure',
      title: (
        <>
          Create <span className="text-[#008080] font-light drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Unforgettable</span> Memories
        </>
      ),
      description: 'Join fellow adventurers in experiences that will stay with you forever.',
      isDark: false
    },
    {
      image: 'https://images.unsplash.com/photo-1473800447596-01729482b8eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Crystal clear ocean water and coral reefs',
      title: (
        <>
          Explore <span className="text-[#008080] font-light drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Deep Blue</span> Wonders
        </>
      ),
      description: 'Dive into crystal waters and discover the hidden treasures beneath.',
      isDark: false
    },
    {
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Cultural heritage and traditional architecture',
      title: (
        <>
          Discover <span className="text-primary font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter brightness-125 text-shadow-lg">Rich</span> Cultural Heritage
        </>
      ),
      description: 'Immerse yourself in vibrant traditions, local communities, and authentic cultural experiences.',
      isDark: true
    }
  ]

  // Auto-slide effect with proper synchronization - text changes with image
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [heroSlides.length])

  const currentHero = heroSlides[currentSlide]
  const overlayClass = currentHero.isDark 
    ? 'bg-gradient-to-r from-black/85 via-black/70 to-black/50'
    : 'bg-gradient-to-r from-black/60 via-black/50 to-black/40'

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          key={`hero-${currentSlide}`} // Unique key for each slide
          src={currentHero.image}
          alt={currentHero.alt}
          fill
          className="object-cover transition-all duration-2000 ease-in-out"
          priority
          onError={(e) => {
            console.log('Image failed to load:', currentHero.image)
            // Fallback to a default image if this one fails
            const target = e.target as HTMLImageElement
            target.src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
          }}
        />
        <div className={`absolute inset-0 ${overlayClass} transition-all duration-1000`} />
      </div>

      <div className="w-[90%] max-w-7xl mx-auto relative z-10 text-white">
        <div className="max-w-4xl animate-fade-in">
          <h1 
            key={`title-${currentSlide}`}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight transition-all duration-1000 text-white"
            style={{
              textShadow: currentHero.isDark 
                ? '2px 2px 4px rgba(0,0,0,0.8)' 
                : '2px 2px 4px rgba(0,0,0,0.6), 1px 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            {currentHero.title}
          </h1>
          <p 
            key={`desc-${currentSlide}`}
            className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 max-w-2xl transition-all duration-1000 text-white"
            style={{
              textShadow: currentHero.isDark 
                ? '1px 1px 2px rgba(0,0,0,0.8)' 
                : '1px 1px 2px rgba(0,0,0,0.6), 0px 0px 1px rgba(255,255,255,0.3)'
            }}
          >
            {currentHero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <LoadingButton
              onClick={() => handleButtonClick('hero-explore', '/login')}
              isLoading={loadingStates['hero-explore']}
              loadingText="Starting Adventure..."
              size="lg"
              className="px-10 py-5 text-xl gap-3 bg-primary hover:bg-primary/90 shadow-2xl"
            >
              Start Your Adventure
              <ArrowRight className="h-6 w-6" />
            </LoadingButton>
            
            <LoadingButton
              onClick={() => handleButtonClick('hero-plans', '/login')}
              isLoading={loadingStates['hero-plans']}
              loadingText="Loading Plans..."
              variant="outline"
              size="lg"
              className="px-10 py-5 text-xl gap-3 border-2 border-white text-white hover:bg-white hover:text-gray-900"
            >
              View Tour Plans
              <Calendar className="h-6 w-6" />
            </LoadingButton>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1,500+', label: 'Happy Travelers' },
              { number: '50+', label: 'Destinations' },
              { number: '10+', label: 'Years Experience' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 glass-effect-dark rounded-xl backdrop-blur-md">
                <div className="text-4xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Slide Indicators with Progress Bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/50 ${
                currentSlide === index ? 'bg-white scale-110' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
            {currentSlide === index && (
              <div className="absolute -top-1 -left-1 w-6 h-6 border-2 border-primary rounded-full animate-ping" />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`
          }}
        />
      </div>
    </section>
  )
}