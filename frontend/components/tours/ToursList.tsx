'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Search, Filter, MapPin, Star, Heart, Calendar, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tour, toursAPI } from '@/lib/api'
import TourCard from './TourCard'

interface ToursListProps {
  searchFilters: {
    search: string
    location: string
    startDate: string
    endDate: string
    maxPrice: string
    category: string
    duration: string
    guests: number
  }
  selectedCategory: string
  selectedDestination: string
  onTourSelect: (tour: Tour) => void
  onWishlistToggle?: (tourId: string, isWishlisted: boolean) => void
}

export default function ToursList({
  searchFilters,
  selectedCategory,
  selectedDestination,
  onTourSelect,
  onWishlistToggle
}: ToursListProps) {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'price_low' | 'price_high' | 'duration' | 'rating'>('rating')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalTours, setTotalTours] = useState(0)
  
  const toursPerPage = 8 // Changed to 8 for 4x2 grid

  useEffect(() => {
    loadTours()
  }, [searchFilters, selectedCategory, selectedDestination, sortBy, currentPage])

  const loadTours = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Build search parameters
      const searchParams: any = {
        page: currentPage,
        limit: toursPerPage,
        sortBy: sortBy
      }

      // Add filters
      if (searchFilters.search) searchParams.search = searchFilters.search
      if (searchFilters.location || selectedDestination) {
        searchParams.destination = searchFilters.location || selectedDestination
      }
      if (selectedCategory && selectedCategory !== 'All Categories') {
        searchParams.category = selectedCategory
      }
      if (searchFilters.maxPrice) searchParams.maxPrice = parseFloat(searchFilters.maxPrice)
      if (searchFilters.duration) searchParams.duration = parseInt(searchFilters.duration)
      if (searchFilters.guests > 1) searchParams.guests = searchFilters.guests

      const response = await toursAPI.search(searchParams)
      setTours(response)
      setTotalTours(response.length)
    } catch (err) {
      console.error('Error loading tours:', err)
      setError('Failed to load tours. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(totalTours / toursPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  // Show loading with elegant animation
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-pulse mx-auto"></div>
            <div 
              className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin mx-auto"
              style={{ 
                borderTopColor: '#008080',
                borderRightColor: '#008080'
              }}
            ></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Discovering Amazing Tours</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Finding the perfect adventures for you...
            </p>
          </div>
          <div className="flex justify-center">
            <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-8 w-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Oops! Something went wrong</h3>
            <p className="text-red-600">{error}</p>
          </div>
          <Button 
            onClick={loadTours}
            className="text-white"
            style={{ backgroundColor: '#008080' }}
          >
            <Search className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              {totalTours > 0 ? `${totalTours} Amazing Tours` : 'No Tours Found'}
            </h2>
            {totalTours > 0 && (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600 font-medium">Handpicked for you</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(selectedCategory && selectedCategory !== 'All Categories') && (
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm"
                style={{ backgroundColor: '#008080' }}
              >
                {selectedCategory}
              </span>
            )}
            {selectedDestination && (
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm flex items-center gap-1"
                style={{ backgroundColor: '#008080' }}
              >
                <MapPin className="h-4 w-4" />
                {selectedDestination}
              </span>
            )}
          </div>
        </div>

        {/* Sort Options */}
        {tours.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none px-4 py-2 pr-8 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all"
                style={{ 
                  borderColor: '#008080'
                }}
              >
                <option value="rating">⭐ Best Rated</option>
                <option value="price_low">💰 Price: Low to High</option>
                <option value="price_high">💎 Price: High to Low</option>
                <option value="duration">⏰ Duration</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-20">
          <div className="space-y-8 max-w-lg mx-auto">
            <div className="relative">
              <div 
                className="w-32 h-32 rounded-full mx-auto flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00808020, #00808020)' }}
              >
                <Search className="h-16 w-16" style={{ color: '#008080' }} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-lg">😔</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">No tours match your search</h3>
              <p className="text-gray-600 leading-relaxed">
                We couldn't find any tours matching your criteria. Try adjusting your filters or exploring our popular destinations below.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700">🌟 Popular destinations to explore:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Serengeti', 'Masai Mara', 'Ngorongoro', 'Amboseli', 'Tsavo', 'Zanzibar'].map((dest) => (
                  <Button
                    key={dest}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // This would trigger a search for this destination
                      console.log(`Search for ${dest}`)
                    }}
                    className="text-sm hover:bg-gray-50 border-2"
                    style={{ borderColor: '#008080', color: '#008080' }}
                  >
                    {dest}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Tours Grid - 4 columns, elegant spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tours.map((tour, index) => (
              <div 
                key={tour.id}
                className="animate-fade-in"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <TourCard
                  tour={tour}
                  onSelect={onTourSelect}
                  onWishlistToggle={onWishlistToggle}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 pt-12">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-xl border-2"
                style={{ borderColor: '#008080', color: '#008080' }}
              >
                ← Previous
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === pageNumber 
                          ? 'text-white shadow-lg transform scale-110' 
                          : 'border-2 hover:scale-105'
                      }`}
                      style={
                        currentPage === pageNumber 
                          ? { backgroundColor: '#008080' }
                          : { borderColor: '#008080', color: '#008080' }
                      }
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-6 py-2 rounded-xl border-2"
                style={{ borderColor: '#008080', color: '#008080' }}
              >
                Next →
              </Button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center pt-8">
            <p className="text-gray-600 text-sm">
              Showing {((currentPage - 1) * toursPerPage) + 1} to {Math.min(currentPage * toursPerPage, totalTours)} of {totalTours} incredible tours
            </p>
          </div>
        </>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
