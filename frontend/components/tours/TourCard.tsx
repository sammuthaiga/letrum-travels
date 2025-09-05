'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MapPin, Clock, Users, Star, Eye, Mountain, Calendar, Award, Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tour } from '@/lib/api'

interface TourCardProps {
  tour: Tour
  onSelect: (tour: Tour) => void
  onWishlistToggle?: (tourId: string, isWishlisted: boolean) => void
}

export default function TourCard({ tour, onSelect, onWishlistToggle }: TourCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

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

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newWishlistState = !isWishlisted
    setIsWishlisted(newWishlistState)
    onWishlistToggle?.(tour.id, newWishlistState)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {tour.featuredImage || tour.images?.[0] ? (
          !imageError ? (
            <Image
              src={tour.featuredImage || tour.images[0]}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={handleImageError}
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00808040, #00808040)' }}
            >
              <Mountain className="h-16 w-16" style={{ color: '#008080' }} />
            </div>
          )
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00808040, #00808040)' }}
          >
            <Mountain className="h-16 w-16" style={{ color: '#008080' }} />
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getDifficultyColor(tour.difficulty)} border font-medium px-3 py-1`}>
            {tour.difficulty.toLowerCase()}
          </Badge>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl">
            <span className="text-lg font-bold" style={{ color: '#008080' }}>
              {formatPrice(tour.price)}
            </span>
            <span className="text-xs text-gray-600 ml-1">per person</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-teal-700 transition-colors">
          {tour.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {tour.shortDesc || tour.description}
        </p>

        {/* Tour Details */}
        <div className="flex items-center justify-between text-sm text-gray-600">
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
            <span>{tour.averageRating || 4.5}</span>
            <span className="text-xs">({tour._count?.reviews || 0})</span>
          </div>
        </div>

        {/* Tour Features */}
        <div className="flex flex-wrap gap-1">
          {tour.inclusions?.slice(0, 3).map((inclusion: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
              {inclusion}
            </Badge>
          ))}
          {(tour.inclusions?.length || 0) > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1 text-gray-600 border-gray-200">
              +{(tour.inclusions?.length || 0) - 3} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-2 hover:bg-teal-50 transition-colors" 
            style={{ borderColor: '#008080', color: '#008080' }}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(tour)
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            Explore
          </Button>
          <Button
            size="sm"
            className="flex-1 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: '#008080' }}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(tour)
            }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  )
}
