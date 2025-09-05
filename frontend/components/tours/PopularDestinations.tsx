'use client'

import React, { useEffect, useState } from 'react'
import { Star, Mountain, MapPin, Calendar, Users, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tour, toursAPI } from '@/lib/api'
import Image from 'next/image'

interface PopularDestinationsProps {
  onDestinationSelect: (destination: string) => void
}

export default function PopularDestinations({ onDestinationSelect }: PopularDestinationsProps) {
  const [destinations, setDestinations] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPopularDestinations()
  }, [])

  const loadPopularDestinations = async () => {
    try {
      // Get popular tours which represent popular destinations
      const popularTours = await toursAPI.getPopular(6) // Get 6 popular destinations
      setDestinations(popularTours)
    } catch (err) {
      console.error('Error loading popular destinations:', err)
      setError('Failed to load popular destinations')
      // Fallback to static data if API fails
      setDestinations([])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const extractDestination = (tour: Tour) => {
    // Try to extract destination from title or use category as fallback
    const title = tour.title.toLowerCase()
    if (title.includes('serengeti')) return 'Serengeti'
    if (title.includes('masai mara')) return 'Masai Mara'
    if (title.includes('ngorongoro')) return 'Ngorongoro'
    if (title.includes('amboseli')) return 'Amboseli'
    if (title.includes('tsavo')) return 'Tsavo'
    if (title.includes('zanzibar')) return 'Zanzibar'
    return tour.category || 'Safari Destination'
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="space-y-4">
              <div className="h-40 bg-gray-200 rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (error || destinations.length === 0) {
    // Fallback to static popular destinations
    const staticDestinations = [
      {
        name: 'Serengeti National Park',
        country: 'Tanzania',
        tours: 25,
        from: 1200,
        rating: 4.9,
        highlights: ['Great Migration', 'Big Five', 'Hot Air Balloon'],
        image: null
      },
      {
        name: 'Masai Mara',
        country: 'Kenya', 
        tours: 18,
        from: 950,
        rating: 4.8,
        highlights: ['River Crossings', 'Masai Culture', 'Game Drives'],
        image: null
      },
      {
        name: 'Ngorongoro Crater',
        country: 'Tanzania',
        tours: 15,
        from: 800,
        rating: 4.9,
        highlights: ['Crater Floor', 'Rhinos', 'Flamingos'],
        image: null
      },
      {
        name: 'Amboseli National Park',
        country: 'Kenya',
        tours: 12,
        from: 650,
        rating: 4.7,
        highlights: ['Kilimanjaro Views', 'Elephants', 'Swamp Walks'],
        image: null
      },
      {
        name: 'Lake Nakuru',
        country: 'Kenya',
        tours: 10,
        from: 450,
        rating: 4.6,
        highlights: ['Flamingos', 'Rhino Sanctuary', 'Pink Lake'],
        image: null
      },
      {
        name: 'Zanzibar Island',
        country: 'Tanzania',
        tours: 8,
        from: 550,
        rating: 4.8,
        highlights: ['Spice Tours', 'Stone Town', 'Beaches'],
        image: null
      }
    ]

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticDestinations.map((dest, index) => (
          <Card 
            key={index}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0"
            onClick={() => onDestinationSelect(dest.name)}
          >
            <div className="relative h-48 overflow-hidden">
              <div 
                className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                style={{ background: 'linear-gradient(135deg, #00808040, #00808040)' }}
              >
                <Mountain className="h-16 w-16" style={{ color: '#008080' }} />
              </div>
              
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">{dest.rating}</span>
              </div>
              
              {/* Popular Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 px-3 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-teal-700 transition-colors mb-1" style={{ color: '#008080' }}>
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {dest.country}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {dest.highlights.slice(0, 3).map((highlight, i) => (
                    <Badge key={i} variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: '#008080' }}>
                      ${dest.from}+
                    </span>
                    <span className="text-gray-600 text-sm ml-1">per person</span>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{dest.tours} tours</p>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 text-white hover:opacity-90 transition-all duration-300"
                  style={{ backgroundColor: '#008080' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDestinationSelect(dest.name)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Explore Tours
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((tour, index) => (
        <Card 
          key={tour.id}
          className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0"
          onClick={() => onDestinationSelect(extractDestination(tour))}
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          <div className="relative h-48 overflow-hidden">
            {tour.featuredImage || tour.images?.[0] ? (
              <Image
                src={tour.featuredImage || tour.images[0]}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                style={{ background: 'linear-gradient(135deg, #00808040, #00808040)' }}
              >
                <Mountain className="h-16 w-16" style={{ color: '#008080' }} />
              </div>
            )}
            
            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{tour.averageRating || 4.5}</span>
            </div>
            
            {/* Popular Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold group-hover:text-teal-700 transition-colors mb-1" style={{ color: '#008080' }}>
                  {extractDestination(tour)}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-1 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {tour.category}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {tour.inclusions?.slice(0, 3).map((inclusion: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
                    {inclusion}
                  </Badge>
                ))}
                {!tour.inclusions?.length && (
                  <>
                    <Badge variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
                      Game Drives
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
                      Wildlife
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
                      Safari
                    </Badge>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {formatPrice(tour.price)}
                  </span>
                  <span className="text-gray-600 text-sm ml-1">per person</span>
                </div>
                <div className="text-right text-sm text-gray-500 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.maxGuests}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4 text-white hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: '#008080' }}
                onClick={(e) => {
                  e.stopPropagation()
                  onDestinationSelect(extractDestination(tour))
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Explore Tours
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
