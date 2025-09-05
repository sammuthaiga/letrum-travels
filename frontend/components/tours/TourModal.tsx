'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  X, MapPin, Clock, Users, Star, ChevronLeft, ChevronRight,
  Calendar, Shield, Award, Mountain, ImageIcon, Check, Minus,
  Globe, Camera, Heart, Share2
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tour } from '@/lib/api'

interface TourModalProps {
  tour: Tour | null
  isOpen: boolean
  onClose: () => void
  onBookNow?: () => void
}

export default function TourModal({ tour, isOpen, onClose, onBookNow }: TourModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'includes'>('overview')

  if (!isOpen || !tour) return null

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      EASY: 'bg-green-100 text-green-800 border-green-200',
      MODERATE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      DIFFICULT: 'bg-orange-100 text-orange-800 border-orange-200',
      EXTREME: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const nextImage = () => {
    if (tour.images && tour.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
    }
  }

  const prevImage = () => {
    if (tour.images && tour.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-7xl max-h-[95vh] overflow-hidden w-full shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{tour.title}</h2>
              <Badge className={`${getDifficultyColor(tour.difficulty)} border font-medium px-3 py-1`}>
                {tour.difficulty.toLowerCase()}
              </Badge>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" style={{ color: '#008080' }} />
                <span>{tour.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" style={{ color: '#008080' }} />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" style={{ color: '#008080' }} />
                <span>Max {tour.maxGuests}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{tour.averageRating || 4.5} ({tour._count?.reviews || 0} reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Hero Image Section */}
          <div className="relative h-80 lg:h-96">
            {tour.images && tour.images.length > 0 ? (
              <>
                <Image
                  src={tour.featuredImage || tour.images[currentImageIndex]}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Navigation arrows */}
                {tour.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" style={{ color: '#008080' }} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" style={{ color: '#008080' }} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Camera className="h-4 w-4 inline mr-2" />
                  {currentImageIndex + 1} / {tour.images.length}
                </div>

                {/* Price badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <span className="text-2xl font-bold" style={{ color: '#008080' }}>
                      {formatPrice(tour.price)}
                    </span>
                    <div className="text-xs text-gray-600 mt-1">per person</div>
                  </div>
                </div>
              </>
            ) : (
              <div 
                className="h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00808040, #00808040)' }}
              >
                <div className="text-center">
                  <Mountain className="h-20 w-20 mx-auto mb-4" style={{ color: '#008080' }} />
                  <p className="text-gray-600">No images available</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Tab Navigation */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-2xl">
                {['overview', 'itinerary', 'includes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    style={activeTab === tab ? { backgroundColor: '#008080' } : {}}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {tour.shortDesc || tour.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00808020' }}>
                      <Users className="h-8 w-8" style={{ color: '#008080' }} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Group Size</h4>
                    <p className="text-gray-600">Maximum {tour.maxGuests} travelers</p>
                  </Card>

                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00808020' }}>
                      <Clock className="h-8 w-8" style={{ color: '#008080' }} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{tour.duration}</p>
                  </Card>

                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#00808020' }}>
                      <Award className="h-8 w-8" style={{ color: '#008080' }} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Experience Level</h4>
                    <Badge className={getDifficultyColor(tour.difficulty)}>
                      {tour.difficulty.toLowerCase()}
                    </Badge>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Journey</h3>
                {tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0 ? (
                  <div className="space-y-4">
                    {tour.itinerary.map((day: any, index: number) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex gap-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                            style={{ backgroundColor: index % 2 === 0 ? '#008080' : '#008080' }}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg mb-2">{day.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{day.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">Detailed Itinerary Coming Soon</h4>
                    <p className="text-gray-500">Contact us for a detailed day-by-day breakdown of this tour.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'includes' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700">What's Included</h3>
                  </div>
                  
                  {tour.inclusions && tour.inclusions.length > 0 ? (
                    <div className="space-y-3">
                      {tour.inclusions.map((inclusion, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{inclusion}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 rounded-xl text-center">
                      <Shield className="h-12 w-12 text-green-400 mx-auto mb-3" />
                      <p className="text-gray-600">Inclusions details will be provided upon booking</p>
                    </div>
                  )}
                </div>

                {/* Exclusions */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <Minus className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-700">What's Not Included</h3>
                  </div>
                  
                  {tour.exclusions && tour.exclusions.length > 0 ? (
                    <div className="space-y-3">
                      {tour.exclusions.map((exclusion, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                          <Minus className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{exclusion}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-xl text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">All major expenses included in the tour price</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Book Now Section */}
            <div className="mt-12">
              <Card className="p-8 border-2 shadow-lg" style={{ borderColor: '#008080', backgroundColor: 'linear-gradient(135deg, #00808010, #00808005)' }}>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Ready for Adventure?</h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      Book now and create unforgettable memories in {tour.category}
                    </p>
                    <div className="flex items-baseline gap-3 justify-center lg:justify-start">
                      <span className="text-4xl font-bold" style={{ color: '#008080' }}>
                        {formatPrice(tour.price)}
                      </span>
                      <span className="text-gray-600 text-lg">per person</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={onBookNow || (() => console.log('Book tour:', tour?.id))}
                      size="lg"
                      className="px-12 py-4 text-lg text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{ backgroundColor: '#008080' }}
                    >
                      <Calendar className="h-5 w-5 mr-3" />
                      Book This Experience
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500">
                      Free cancellation • Instant confirmation
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
