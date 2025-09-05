'use client'

import React, { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Tour } from '@/lib/api'
import TourSearchForm from './TourSearchForm'
import PopularDestinations from './PopularDestinations'
import TourModal from './TourModal'
import BookingModal from './BookingModal'
import ToursList from './ToursList'
import MyBookings from './MyBookings'

export default function ToursPage() {
  const { success: toast } = useToast()
  
  // State management
  const [activeTab, setActiveTab] = useState<'browse' | 'bookings'>('browse')
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingsRefreshTrigger, setBookingsRefreshTrigger] = useState(0)
  
  // Search and filter states
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    location: '',
    startDate: '',
    endDate: '',
    maxPrice: '',
    category: '',
    duration: '',
    guests: 1
  })
  
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')

  // Handlers
  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters)
    // Clear previous selections when new search is made
    setSelectedCategory('')
    setSelectedDestination('')
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    // Clear destination when category is selected
    setSelectedDestination('')
    // Clear search filters when using quick filters
    setSearchFilters({
      search: '',
      location: '',
      startDate: '',
      endDate: '',
      maxPrice: '',
      category: '',
      duration: '',
      guests: 1
    })
  }

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination)
    // Clear category when destination is selected
    setSelectedCategory('')
    // Clear search filters when using quick filters
    setSearchFilters({
      search: '',
      location: '',
      startDate: '',
      endDate: '',
      maxPrice: '',
      category: '',
      duration: '',
      guests: 1
    })
  }

  const handleTourSelect = (tour: Tour) => {
    setSelectedTour(tour)
  }

  const handleCloseTourModal = () => {
    setSelectedTour(null)
  }

  const handleBookNowFromModal = () => {
    setIsBookingModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
  }

  const handleBookingSuccess = (message: string) => {
    toast(`Booking Successful! ${message}`)
    setBookingsRefreshTrigger(prev => prev + 1)
    setIsBookingModalOpen(false)
    setSelectedTour(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tours & Safaris</h1>
              <p className="text-gray-600 mt-1">Discover amazing adventures across East Africa</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'browse'
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'browse' ? { backgroundColor: '#008080' } : {}}
              >
                Browse Tours
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'bookings'
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'bookings' ? { backgroundColor: '#008080' } : {}}
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' ? (
          <div className="space-y-12">
            {/* Search Form */}
            <TourSearchForm onSearch={handleSearch} />
            
            {/* Tours List - Always visible, shows all tours or filtered results */}
            <ToursList
              searchFilters={searchFilters}
              selectedCategory={selectedCategory}
              selectedDestination={selectedDestination}
              onTourSelect={handleTourSelect}
            />

            {/* Popular Destinations - Always show but after tours list */}
            {!searchFilters.search && !searchFilters.location && !selectedCategory && !selectedDestination && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover the most sought-after safari destinations in East Africa
                  </p>
                </div>
                <PopularDestinations onDestinationSelect={handleDestinationSelect} />
              </div>
            )}
          </div>
        ) : (
          <MyBookings refreshTrigger={bookingsRefreshTrigger} />
        )}
      </div>

      {/* Tour Details Modal */}
      <TourModal
        tour={selectedTour}
        isOpen={!!selectedTour}
        onClose={handleCloseTourModal}
        onBookNow={handleBookNowFromModal}
      />

      {/* Booking Modal */}
      <BookingModal
        tour={selectedTour}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  )
}
