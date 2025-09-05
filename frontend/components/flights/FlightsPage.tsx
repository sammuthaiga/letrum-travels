'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Plane, Search, Calendar, Users, MapPin, 
  Clock, ArrowRight, Filter, Star, Wifi,
  Utensils, Luggage, ArrowRightLeft, Plus,
  Minus, ChevronDown, SortAsc, Info, Globe
} from 'lucide-react'
import { flightsAPI, Flight, FlightSearchParams } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingButton } from '@/components/ui/loading-button'

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'ECONOMY',
    tripType: 'ROUND_TRIP'
  })
  
  const [flights, setFlights] = useState<Flight[]>([])
  const [popularDestinations, setPopularDestinations] = useState<{ city: string; country: string; count: number }[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price')
  const [filterBy, setFilterBy] = useState({
    maxPrice: 5000,
    airlines: [] as string[],
    stops: 'all', // 'all', 'direct', '1-stop'
    departureTime: 'all' // 'all', 'morning', 'afternoon', 'evening'
  })

  // Load popular destinations on mount
  useEffect(() => {
    const loadPopularDestinations = async () => {
      try {
        const destinations = await flightsAPI.getPopularDestinations()
        setPopularDestinations(destinations.slice(0, 6))
      } catch (error) {
        console.error('Error loading popular destinations:', error)
      }
    }
    loadPopularDestinations()
  }, [])

  const handleSearch = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.departDate) {
      alert('Please fill in all required fields')
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    
    try {
      const results = await flightsAPI.search(searchParams)
      setFlights(results)
    } catch (error) {
      console.error('Error searching flights:', error)
      setFlights([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleBookFlight = (flight: Flight) => {
    setSelectedFlight(flight)
    setShowBooking(true)
  }

  const formatDuration = (duration: string) => {
    // Assuming duration is in format like "2h 30m"
    return duration
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  // Filter and sort flights
  const filteredAndSortedFlights = flights
    .filter(flight => {
      if (flight.price > filterBy.maxPrice) return false
      if (filterBy.airlines.length > 0 && !filterBy.airlines.includes(flight.airline)) return false
      if (filterBy.stops === 'direct' && flight.stops > 0) return false
      if (filterBy.stops === '1-stop' && flight.stops !== 1) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'duration':
          return a.duration.localeCompare(b.duration)
        case 'departure':
          return a.departure.time.localeCompare(b.departure.time)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            Flight Booking
          </h1>
          <p className="text-gray-600 mt-2">Search and book flights to your dream destination</p>
        </div>
      </div>

      {/* Search Form */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="space-y-6">
          {/* Trip Type Toggle */}
          <div className="flex gap-4">
            <Button
              variant={searchParams.tripType === 'ROUND_TRIP' ? 'default' : 'outline'}
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'ROUND_TRIP' }))}
              className="flex items-center gap-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Round Trip
            </Button>
            <Button
              variant={searchParams.tripType === 'ONE_WAY' ? 'default' : 'outline'}
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'ONE_WAY' }))}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              One Way
            </Button>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Departure city"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Destination city"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.departDate}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, departDate: e.target.value }))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Return Date */}
            {searchParams.tripType === 'ROUND_TRIP' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={searchParams.returnDate || ''}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            )}

            {/* Passengers & Class */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Passengers & Class</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    min="1"
                    max="9"
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, passengers: parseInt(e.target.value) || 1 }))}
                    className="pl-10 h-12"
                  />
                </div>
                <select
                  value={searchParams.class}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, class: e.target.value as any }))}
                  className="h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ECONOMY">Economy</option>
                  <option value="PREMIUM_ECONOMY">Premium Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First Class</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center pt-4">
            <LoadingButton
              onClick={handleSearch}
              isLoading={isSearching}
              loadingText="Searching flights..."
              size="lg"
              className="px-12 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center gap-3"
            >
              <Search className="h-5 w-5" />
              Search Flights
            </LoadingButton>
          </div>
        </div>
      </Card>

      {/* Popular Destinations */}
      {!hasSearched && popularDestinations.length > 0 && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
              <p className="text-gray-600">Discover trending travel destinations</p>
            </div>
            <Globe className="h-8 w-8 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((dest, index) => (
              <div
                key={index}
                className="group cursor-pointer p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
                onClick={() => {
                  setSearchParams(prev => ({
                    ...prev,
                    to: `${dest.city}, ${dest.country}`
                  }))
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {dest.city}
                    </h3>
                    <p className="text-gray-600 text-sm">{dest.country}</p>
                    <p className="text-xs text-gray-500 mt-1">{dest.count} flights available</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {flights.length > 0 ? `${filteredAndSortedFlights.length} flights found` : 'No flights found'}
              </h2>
              {flights.length > 0 && (
                <p className="text-gray-600">
                  {searchParams.from} → {searchParams.to} • {searchParams.departDate}
                  {searchParams.tripType === 'ROUND_TRIP' && searchParams.returnDate && ` • ${searchParams.returnDate}`}
                </p>
              )}
            </div>

            {flights.length > 0 && (
              <div className="flex gap-4">
                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="price">Sort by Price</option>
                  <option value="duration">Sort by Duration</option>
                  <option value="departure">Sort by Departure</option>
                </select>

                {/* Filter Button */}
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            )}
          </div>

          {/* Flight Results */}
          <div className="space-y-4">
            {isSearching ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="w-24 h-8 bg-gray-200 rounded" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredAndSortedFlights.length > 0 ? (
              filteredAndSortedFlights.map((flight) => (
                <Card key={flight.id} className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Airline Logo & Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                        <Plane className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{flight.airline}</h3>
                        <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                        <p className="text-xs text-gray-500">{flight.aircraft}</p>
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Departure */}
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.departure.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.departure.city} ({flight.departure.airport})
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.departure.date}
                        </div>
                      </div>

                      {/* Duration & Stops */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <div className="flex-1 h-0.5 bg-gray-300 relative">
                            {flight.stops > 0 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {formatDuration(flight.duration)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center md:text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.arrival.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.arrival.city} ({flight.arrival.airport})
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.arrival.date}
                        </div>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="text-center lg:text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPrice(flight.price, flight.currency)}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        per person • {flight.bookingClass.toLowerCase().replace('_', ' ')}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleBookFlight(flight)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
                        >
                          Select Flight
                        </Button>
                        <p className="text-xs text-gray-500">
                          {flight.availableSeats} seats left
                        </p>
                      </div>

                      {/* Amenities */}
                      <div className="flex justify-center lg:justify-end gap-2 mt-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Wifi className="h-3 w-3 text-gray-600" />
                        </div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Utensils className="h-3 w-3 text-gray-600" />
                        </div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Luggage className="h-3 w-3 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : hasSearched && !isSearching ? (
              <Card className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Plane className="h-8 w-8 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No flights found</h2>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any flights for your search criteria. Try adjusting your dates or destinations.
                  </p>
                  <Button 
                    onClick={() => {
                      setHasSearched(false)
                      setFlights([])
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Try New Search
                  </Button>
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      )}

      {/* Flight Booking Modal/Panel would go here */}
      {showBooking && selectedFlight && (
        <Card className="p-8 border-blue-200 bg-blue-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Booking</h2>
            <p className="text-gray-600 mb-8">
              Booking system for {selectedFlight.airline} flight {selectedFlight.flightNumber} is under development.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowBooking(false)}
                variant="outline"
              >
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue Development
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
