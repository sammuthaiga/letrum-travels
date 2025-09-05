'use client'

import React, { useState } from 'react'
import { X, Calendar, Users, FileText, Phone, Heart, Upload, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { Tour, toursAPI } from '@/lib/api'

interface BookingModalProps {
  tour: Tour | null
  isOpen: boolean
  onClose: () => void
  onBookingSuccess: (message: string) => void
}

interface BookingFormData {
  guests: number
  startDate: string
  notes: string
  passportNumber: string
  emergencyContact: string
  dietaryRequirements: string
  medicalConditions: string
}

export default function BookingModal({ tour, isOpen, onClose, onBookingSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    guests: 1,
    startDate: '',
    notes: '',
    passportNumber: '',
    emergencyContact: '',
    dietaryRequirements: '',
    medicalConditions: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  if (!isOpen || !tour) return null

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const totalPrice = tour.price * formData.guests

  const handleSubmit = async () => {
    if (!formData.startDate) {
      alert('Please select a start date')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await toursAPI.book(tour.id, formData.guests, formData.startDate, formData.notes)
      onBookingSuccess(`Tour booked successfully! Booking ID: ${response.id}`)
      onClose()
      // Reset form
      setFormData({
        guests: 1,
        startDate: '',
        notes: '',
        passportNumber: '',
        emergencyContact: '',
        dietaryRequirements: '',
        medicalConditions: ''
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to book tour. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Tour</h2>
            <p className="text-gray-600">{tour.title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step <= currentStep
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  style={step <= currentStep ? { backgroundColor: '#008080' } : {}}
                >
                  {step < currentStep ? <CheckCircle2 className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div 
                    className={`w-20 h-1 mx-2 ${
                      step < currentStep ? '' : 'bg-gray-200'
                    }`}
                    style={step < currentStep ? { backgroundColor: '#008080' } : {}}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      min="1"
                      max={tour.maxGuests}
                      value={formData.guests}
                      onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                      className="pl-10 h-12 border-2 focus:border-teal-600"
                      style={{ borderColor: '#008080' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Maximum {tour.maxGuests} guests allowed</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Preferred Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="pl-10 h-12 border-2 focus:border-teal-600"
                      style={{ borderColor: '#008080' }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Special Requests or Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full h-24 p-3 border-2 rounded-lg focus:border-teal-600 resize-none"
                  style={{ borderColor: '#008080' }}
                  placeholder="Any special requirements, dietary restrictions, or requests..."
                />
              </div>

              {/* Price Summary */}
              <Card className="p-4 border-2" style={{ borderColor: '#008080', backgroundColor: '#00808010' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Price per person:</span>
                  <span className="font-semibold">{formatPrice(tour.price)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Number of guests:</span>
                  <span className="font-semibold">{formData.guests}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </Card>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Passport Number</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={formData.passportNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
                      className="pl-10 h-12 border-2 focus:border-teal-600"
                      style={{ borderColor: '#008080' }}
                      placeholder="Your passport number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      className="pl-10 h-12 border-2 focus:border-teal-600"
                      style={{ borderColor: '#008080' }}
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Dietary Requirements</label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, dietaryRequirements: e.target.value }))}
                    className="w-full h-20 pl-10 p-3 border-2 rounded-lg focus:border-teal-600 resize-none"
                    style={{ borderColor: '#008080' }}
                    placeholder="Any dietary restrictions or allergies..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Medical Conditions</label>
                <textarea
                  value={formData.medicalConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                  className="w-full h-20 p-3 border-2 rounded-lg focus:border-teal-600 resize-none"
                  style={{ borderColor: '#008080' }}
                  placeholder="Any medical conditions we should be aware of..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Review & Confirm</h3>
              
              {/* Tour Summary */}
              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Tour Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tour:</span>
                    <span className="font-semibold">{tour.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold">{formData.guests} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">{formData.startDate || 'Not selected'}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span style={{ color: '#008080' }}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </Card>

              {/* Terms & Conditions */}
              <Card className="p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                <p className="text-sm text-gray-600">
                  By proceeding with this booking, you agree to our terms and conditions. 
                  Payment will be processed securely, and you will receive a confirmation email 
                  with your booking details and further instructions.
                </p>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : prevStep}
              className="px-6"
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="px-6 text-white"
                style={{ backgroundColor: '#008080' }}
                disabled={currentStep === 1 && !formData.startDate}
              >
                Next Step
              </Button>
            ) : (
              <LoadingButton
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Booking..."
                className="px-8 text-white"
                style={{ backgroundColor: '#008080' }}
              >
                Confirm Booking
              </LoadingButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
