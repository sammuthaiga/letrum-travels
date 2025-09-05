'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Car, Search, Calendar, Users, MapPin, 
  Clock, ArrowRight, Filter, Star, Fuel,
  Settings, Users as Seats, Luggage, Shield,
  Wifi, Navigation, Camera, Wind, SortAsc
} from 'lucide-react'
import { carsAPI, Car as CarType, CarSearchParams } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingButton } from '@/components/ui/loading-button'

const carCategories = [
  { id: 'ECONOMY', name: 'Economy', description: 'Budget-friendly option', icon: '🚗' },
  { id: 'COMPACT', name: 'Compact', description: 'Perfect for city driving', icon: '🚙' },
  { id: 'INTERMEDIATE', name: 'Intermediate', description: 'More space and comfort', icon: '🚘' },
  { id: 'STANDARD', name: 'Standard', description: 'Great balance of size and efficiency', icon: '🚖' },
  { id: 'FULL_SIZE', name: 'Full Size', description: 'Spacious for families', icon: '🚐' },
  { id: 'PREMIUM', name: 'Premium', description: 'Luxury and comfort', icon: '🚗' },
  { id: 'LUXURY', name: 'Luxury', description: 'Ultimate luxury experience', icon: '🏎️' },
  { id: 'SUV', name: 'SUV', description: 'Space for adventure', icon: '🚛' },
  { id: '4WD', name: '4WD Safari', description: 'Perfect for safari adventures', icon: '🚜' },
]

const popularLocations = [
  { city: 'Nairobi', country: 'Kenya', count: 45 },
  { city: 'Mombasa', country: 'Kenya', count: 32 },
  { city: 'Kampala', country: 'Uganda', count: 28 },
  { city: 'Arusha', country: 'Tanzania', count: 38 },
  { city: 'Kigali', country: 'Rwanda', count: 22 },
  { city: 'Dar es Salaam', country: 'Tanzania', count: 35 },
]

export default function CarsPage() {
  const [searchParams, setSearchParams] = useState<CarSearchParams>({
    location: '',
    pickupDate: '',
    returnDate: '',
    category: ''
  })
  
  const [cars, setCars] = useState<CarType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'category'>('price')
  const [filterBy, setFilterBy] = useState({
    maxPrice: 200,
    transmission: 'all', // 'all', 'automatic', 'manual'
    fuelType: 'all', // 'all', 'petrol', 'diesel', 'hybrid'
    features: [] as string[]
  })

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await carsAPI.getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])

  const handleSearch = async () => {
    if (!searchParams.location || !searchParams.pickupDate || !searchParams.returnDate) {
      alert('Please fill in all required fields')
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    
    try {
      const results = await carsAPI.search(searchParams)
      setCars(results)
    } catch (error) {
      console.error('Error searching cars:', error)
      setCars([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleBookCar = (car: CarType) => {
    setSelectedCar(car)
    setShowBooking(true)
  }

  const calculateDays = () => {
    if (!searchParams.pickupDate || !searchParams.returnDate) return 0
    const pickup = new Date(searchParams.pickupDate)
    const returnDate = new Date(searchParams.returnDate)
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const getTransmissionIcon = (transmission: string) => {
    return transmission === 'AUTOMATIC' ? '⚙️' : '🔧'
  }

  const getFuelIcon = (fuelType: string) => {
    const icons = {
      PETROL: '⛽',
      DIESEL: '🛢️', 
      HYBRID: '🔋',
      ELECTRIC: '⚡'
    }
    return icons[fuelType as keyof typeof icons] || '⛽'
  }

  // Filter and sort cars
  const filteredAndSortedCars = cars
    .filter(car => {
      if (car.pricePerDay > filterBy.maxPrice) return false
      if (filterBy.transmission !== 'all' && car.transmission.toLowerCase() !== filterBy.transmission) return false
      if (filterBy.fuelType !== 'all' && car.fuelType.toLowerCase() !== filterBy.fuelType) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerDay - b.pricePerDay
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  const days = calculateDays()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Car className="h-6 w-6 text-green-600" />
            </div>
            Car Rental
          </h1>
          <p className="text-gray-600 mt-2">Rent premium vehicles for your safari adventure</p>
        </div>
      </div>

      {/* Search Form */}
      <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="space-y-6">
          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="City or airport"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Pickup Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Pickup Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.pickupDate}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, pickupDate: e.target.value }))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Return Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.returnDate}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Car Category</label>
              <select
                value={searchParams.category || ''}
                onChange={(e) => setSearchParams(prev => ({ ...prev, category: e.target.value }))}
                className="h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
              >
                <option value="">All Categories</option>
                {carCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          {days > 0 && (
            <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200">
              <p className="text-sm text-gray-600">
                Rental period: <span className="font-semibold text-green-600">{days} day{days > 1 ? 's' : ''}</span>
              </p>
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-center pt-4">
            <LoadingButton
              onClick={handleSearch}
              isLoading={isSearching}
              loadingText="Searching cars..."
              size="lg"
              className="px-12 py-4 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg flex items-center gap-3"
            >
              <Search className="h-5 w-5" />
              Search Cars
            </LoadingButton>
          </div>
        </div>
      </Card>

      {/* Car Categories */}
      {!hasSearched && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Car Categories</h2>
              <p className="text-gray-600">Choose the perfect vehicle for your journey</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carCategories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
                onClick={() => {
                  setSearchParams(prev => ({
                    ...prev,
                    category: category.id
                  }))
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Popular Locations */}
      {!hasSearched && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Pickup Locations</h2>
              <p className="text-gray-600">Start your adventure from these top destinations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularLocations.map((location, index) => (
              <div
                key={index}
                className="group cursor-pointer p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
                onClick={() => {
                  setSearchParams(prev => ({
                    ...prev,
                    location: `${location.city}, ${location.country}`
                  }))
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {location.city}
                    </h3>
                    <p className="text-gray-600 text-sm">{location.country}</p>
                    <p className="text-xs text-gray-500 mt-1">{location.count} cars available</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
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
                {cars.length > 0 ? `${filteredAndSortedCars.length} cars found` : 'No cars found'}
              </h2>
              {cars.length > 0 && (
                <p className="text-gray-600">
                  {searchParams.location} • {searchParams.pickupDate} - {searchParams.returnDate}
                  {days > 0 && ` • ${days} day${days > 1 ? 's' : ''}`}
                </p>
              )}
            </div>

            {cars.length > 0 && (
              <div className="flex gap-4">
                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="price">Sort by Price</option>
                  <option value="category">Sort by Category</option>
                </select>

                {/* Filter Button */}
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            )}
          </div>

          {/* Car Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isSearching ? (
              [...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex space-x-4">
                    <div className="w-32 h-24 bg-gray-200 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </Card>
              ))
            ) : filteredAndSortedCars.length > 0 ? (
              filteredAndSortedCars.map((car) => (
                <Card key={car.id} className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="space-y-4">
                    {/* Car Image & Basic Info */}
                    <div className="flex gap-6">
                      {/* Car Image */}
                      <div className="w-32 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        {car.images && car.images.length > 0 ? (
                          <Image
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            width={128}
                            height={96}
                            className="object-cover rounded-xl"
                          />
                        ) : (
                          <Car className="h-12 w-12 text-green-600" />
                        )}
                      </div>

                      {/* Car Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {car.make} {car.model}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {car.year} • {car.category.toLowerCase().replace('_', ' ')}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {car.category}
                          </Badge>
                        </div>

                        {/* Car Specs */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Seats className="h-4 w-4" />
                            <span>{car.seats} seats</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>{getTransmissionIcon(car.transmission)}</span>
                            <span>{car.transmission.toLowerCase()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>{getFuelIcon(car.fuelType)}</span>
                            <span>{car.fuelType.toLowerCase()}</span>
                          </div>
                          {car.airConditioning && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Wind className="h-4 w-4" />
                              <span>A/C</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    {car.features && car.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {car.features.slice(0, 4).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {car.features.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{car.features.length - 4} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Pricing & Book */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(car.pricePerDay, car.currency)}
                        </div>
                        <div className="text-sm text-gray-600">
                          per day
                          {days > 0 && (
                            <>
                              {' • '}
                              <span className="font-medium text-gray-900">
                                {formatPrice(car.pricePerDay * days, car.currency)} total
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          onClick={() => handleBookCar(car)}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
                        >
                          Select Car
                        </Button>
                        <p className="text-xs text-gray-500">
                          {car.availability ? 'Available' : 'Not available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : hasSearched && !isSearching ? (
              <div className="lg:col-span-2">
                <Card className="p-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Car className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No cars found</h2>
                    <p className="text-gray-600 mb-8">
                      We couldn't find any cars for your search criteria. Try adjusting your dates or location.
                    </p>
                    <Button 
                      onClick={() => {
                        setHasSearched(false)
                        setCars([])
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Try New Search
                    </Button>
                  </div>
                </Card>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Car Booking Modal/Panel */}
      {showBooking && selectedCar && (
        <Card className="p-8 border-green-200 bg-green-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Rental Booking</h2>
            <p className="text-gray-600 mb-8">
              Booking system for {selectedCar.make} {selectedCar.model} is under development.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowBooking(false)}
                variant="outline"
              >
                Close
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Continue Development
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
