'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, Users, Star, ChevronDown } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'
import { toursAPI, Tour } from '@/lib/api'

interface ToursProps {
  handleButtonClick: (buttonId: string, redirectUrl?: string) => Promise<void>
  loadingStates: Record<string, boolean>
}

export default function ToursSection({ handleButtonClick, loadingStates }: ToursProps) {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])
  const [additionalTours, setAdditionalTours] = useState<Tour[]>([])
  const [showMoreTours, setShowMoreTours] = useState(false)
  const [isLoadingTours, setIsLoadingTours] = useState(false)

  // Load featured tours on component mount
  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
        const tours = await toursAPI.getPopular(4)
        setFeaturedTours(tours)
      } catch (error) {
        console.error('Error loading featured tours:', error)
      }
    }
    loadFeaturedTours()
  }, [])

  // Handle View More Tours
  const handleViewMoreTours = async () => {
    if (showMoreTours) {
      setShowMoreTours(false)
      return
    }

    setIsLoadingTours(true)
    try {
      // Get 8 more tours excluding the 4 featured ones
      const allTours = await toursAPI.getAll()
      const featuredIds = featuredTours.map(tour => tour.id)
      const moreTours = allTours.filter(tour => !featuredIds.includes(tour.id)).slice(0, 8)
      setAdditionalTours(moreTours)
      setShowMoreTours(true)
    } catch (error) {
      console.error('Error loading more tours:', error)
    } finally {
      setIsLoadingTours(false)
    }
  }

  const renderTourCard = (tour: Tour, index: number, prefix: string = '') => (
    <div 
      key={tour.id}
      className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
      style={{
        animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Tour Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={tour.featuredImage || tour.images[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white font-bold text-lg">${tour.price}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-white font-semibold">{tour.averageRating || '4.8'}</span>
        </div>
      </div>

      {/* Tour Content */}
      <div className="p-6">
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{tour.category}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {tour.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
          {tour.description}
        </p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{tour.duration} days</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Max {tour.maxGuests || '12'} guests</span>
          </div>
        </div>

        <LoadingButton
          onClick={() => handleButtonClick(`tour-${prefix}${tour.id}`, '/login')}
          isLoading={loadingStates[`tour-${prefix}${tour.id}`]}
          loadingText="Booking..."
          className="w-full py-3 shadow-lg group-hover:shadow-xl transition-shadow"
        >
          Book Now
        </LoadingButton>
      </div>
    </div>
  )

  return (
    <section id="tours" className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-secondary/10 rounded-full text-secondary font-semibold mb-6">
            Featured Tours
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Popular Safari Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover our most loved safari experiences, carefully crafted for unforgettable memories
          </p>
        </div>

        {/* Featured Tours Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {featuredTours.map((tour, index) => renderTourCard(tour, index))}
        </div>

        {/* Additional Tours */}
        {showMoreTours && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-8 mb-12 animate-fade-in">
            {additionalTours.map((tour, index) => renderTourCard(tour, index, 'more-'))}
          </div>
        )}

        {/* View More Tours Button */}
        <div className="text-center">
          <LoadingButton
            onClick={handleViewMoreTours}
            isLoading={isLoadingTours}
            loadingText="Loading Tours..."
            variant={showMoreTours ? "outline" : undefined}
            size="lg"
            className="px-12 py-4 text-xl gap-3 shadow-xl"
          >
            {showMoreTours ? 'Show Less Tours' : 'View More Tours'}
            <ChevronDown className={`h-6 w-6 transition-transform ${showMoreTours ? 'rotate-180' : ''}`} />
          </LoadingButton>
        </div>
      </div>
    </section>
  )
}
