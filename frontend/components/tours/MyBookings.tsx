'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, MapPin, Users, Clock, FileText, Star, Download, Eye, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Booking, toursAPI } from '@/lib/api'
import { LoadingSpinner } from '@/components/loading-spinner'

interface MyBookingsProps {
  refreshTrigger?: number
}

export default function MyBookings({ refreshTrigger }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    loadBookings()
  }, [refreshTrigger])

  const loadBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await toursAPI.getMyBookings()
      setBookings(response)
    } catch (err) {
      console.error('Error loading bookings:', err)
      setError('Failed to load your bookings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-blue-100 text-blue-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="space-y-4">
          <p className="text-red-600 text-lg">{error}</p>
          <Button 
            onClick={loadBookings}
            className="text-white"
            style={{ backgroundColor: '#008080' }}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="space-y-6">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">No bookings yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You haven't made any tour bookings yet. Explore our amazing tours and book your adventure!
            </p>
          </div>
          <Button 
            className="text-white"
            style={{ backgroundColor: '#008080' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Browse Tours
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          <p className="text-gray-600">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Tour Image */}
                <div 
                  className="w-full lg:w-64 h-48 rounded-xl flex-shrink-0 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center relative overflow-hidden"
                >
                  {booking.tour?.featuredImage || booking.tour?.images?.[0] ? (
                    <img
                      src={booking.tour.featuredImage || booking.tour.images[0]}
                      alt={booking.tour.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Show fallback gradient if image fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-teal-600" />
                      <p className="text-sm text-teal-700">Tour Image</p>
                    </div>
                  )}
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {booking.tour?.title || 'Tour Booking'}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Booking ID: {booking.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                        {formatPrice(booking.totalAmount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Booked on {formatDate(booking.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Tour Details */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{booking.tour?.duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {booking.details?.guests || 1} guest{(booking.details?.guests || 1) !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {booking.details?.startDate 
                          ? formatDate(booking.details.startDate) 
                          : 'Date TBD'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Special Notes */}
                  {booking.details?.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Special Requests:</p>
                          <p className="text-sm text-gray-600 mt-1">{booking.details.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBooking(booking)}
                      className="border-2"
                      style={{ borderColor: '#008080', color: '#008080' }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    {booking.status === 'CONFIRMED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2"
                        style={{ borderColor: '#008080', color: '#008080' }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Voucher
                      </Button>
                    )}
                    
                    {booking.status === 'COMPLETED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2"
                        style={{ borderColor: '#008080', color: '#008080' }}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <p className="text-gray-600">ID: {selectedBooking.id}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Tour Information */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Tour Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tour Name:</span>
                    <span className="font-semibold">{selectedBooking.tour?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{selectedBooking.tour?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold">{selectedBooking.tour?.category}</span>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Booking Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Guests:</span>
                    <span className="font-semibold">{selectedBooking.details?.guests || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">
                      {selectedBooking.details?.startDate 
                        ? formatDate(selectedBooking.details.startDate) 
                        : 'To be confirmed'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date:</span>
                    <span className="font-semibold">{formatDate(selectedBooking.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-xl font-bold" style={{ color: '#008080' }}>
                      {formatPrice(selectedBooking.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.details?.notes && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Special Requests</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedBooking.details.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
