'use client'

import React, { useState } from 'react'
import { MapPin, Calendar, Users, Search, DollarSign, Clock, Grid } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TourSearchFormProps {
  onSearch: (filters: {
    search: string
    location: string
    startDate: string
    endDate: string
    maxPrice: string
    category: string
    duration: string
    guests: number
  }) => void
}

export default function TourSearchForm({ onSearch }: TourSearchFormProps) {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    startDate: '',
    endDate: '',
    maxPrice: '',
    category: '',
    duration: '',
    guests: 1
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const categories = [
    'Safari',
    'Cultural Tours',
    'Adventure',
    'Wildlife',
    'Beach & Islands',
    'Mountain Climbing'
  ]

  const durations = [
    '1-3 days',
    '4-7 days',
    '1-2 weeks',
    '2+ weeks'
  ]

  return (
    <Card className="p-6 border-2" style={{ borderColor: '#008080' }}>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search Tours</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Safari, Serengeti..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 h-12 border-2 focus:border-teal-600"
                style={{ borderColor: '#008080' }}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Kenya, Tanzania..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10 h-12 border-2 focus:border-teal-600"
                style={{ borderColor: '#008080' }}
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="pl-10 h-12 border-2 focus:border-teal-600"
                style={{ borderColor: '#008080' }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                min="1"
                max="20"
                value={filters.guests}
                onChange={(e) => handleFilterChange('guests', parseInt(e.target.value) || 1)}
                className="pl-10 h-12 border-2 focus:border-teal-600"
                style={{ borderColor: '#008080' }}
              />
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <div className="relative">
              <Grid className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full pl-10 pr-4 h-12 border-2 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                style={{ borderColor: '#008080' }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Duration</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full pl-10 pr-4 h-12 border-2 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
                style={{ borderColor: '#008080' }}
              >
                <option value="">Any Duration</option>
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Max Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Max Price (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                min="0"
                placeholder="5000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="pl-10 h-12 border-2 focus:border-teal-600"
                style={{ borderColor: '#008080' }}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-8 py-3 text-white font-medium"
            style={{ backgroundColor: '#008080' }}
          >
            <Search className="h-5 w-5 mr-2" />
            Search Tours
          </Button>
        </div>
      </form>
    </Card>
  )
}
