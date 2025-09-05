'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  FileText, Upload, User, MapPin, Calendar, 
  Clock, DollarSign, CheckCircle, AlertCircle,
  Phone, Mail, Download, Eye, Filter, Search,
  Globe, Star, Award, Shield, Camera, Users,
  ArrowRight, Plus, Trash2, Edit, Check, X,
  CreditCard, Plane
} from 'lucide-react'
import { visaAPI, VisaApplicationData, VisaRequest } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingButton } from '@/components/ui/loading-button'

const visaTypes = [
  {
    id: 'TOURIST',
    name: 'Tourist Visa',
    description: 'For vacation and leisure travel',
    icon: '🏖️',
    duration: '30-90 days',
    processing: '5-10 days'
  },
  {
    id: 'BUSINESS',
    name: 'Business Visa',
    description: 'For business meetings and conferences',
    icon: '💼',
    duration: '30-180 days',
    processing: '3-7 days'
  },
  {
    id: 'TRANSIT',
    name: 'Transit Visa',
    description: 'For airport layovers and connections',
    icon: '✈️',
    duration: '24-72 hours',
    processing: '1-3 days'
  },
  {
    id: 'STUDENT',
    name: 'Student Visa',
    description: 'For educational purposes',
    icon: '🎓',
    duration: '1-4 years',
    processing: '10-21 days'
  }
]

const popularDestinations = [
  { country: 'Kenya', flagEmoji: '🇰🇪', visaRequired: 'E-Visa', fee: 51, processing: '3-5 days' },
  { country: 'Tanzania', flagEmoji: '🇹🇿', visaRequired: 'On Arrival', fee: 50, processing: 'Instant' },
  { country: 'Uganda', flagEmoji: '🇺🇬', visaRequired: 'E-Visa', fee: 50, processing: '2-4 days' },
  { country: 'Rwanda', flagEmoji: '🇷🇼', visaRequired: 'E-Visa', fee: 30, processing: '1-3 days' },
  { country: 'Ethiopia', flagEmoji: '🇪🇹', visaRequired: 'E-Visa', fee: 52, processing: '3-5 days' },
  { country: 'South Africa', flagEmoji: '🇿🇦', visaRequired: 'Embassy', fee: 85, processing: '10-15 days' }
]

const documentRequirements = {
  TOURIST: [
    'Valid Passport (6+ months validity)',
    'Recent Passport Photos (2)',
    'Bank Statement (3 months)',
    'Hotel Booking Confirmation',
    'Flight Itinerary',
    'Travel Insurance'
  ],
  BUSINESS: [
    'Valid Passport (6+ months validity)', 
    'Recent Passport Photos (2)',
    'Business Invitation Letter',
    'Company Registration Certificate',
    'Bank Statement (3 months)',
    'Flight Itinerary'
  ],
  TRANSIT: [
    'Valid Passport',
    'Onward Flight Ticket',
    'Visa for Final Destination (if required)'
  ],
  STUDENT: [
    'Valid Passport (6+ months validity)',
    'Acceptance Letter from Institution',
    'Academic Transcripts',
    'Financial Proof/Sponsorship Letter',
    'Medical Certificate',
    'Police Clearance Certificate'
  ]
}

export default function VisaPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedVisaType, setSelectedVisaType] = useState('')
  const [applications, setApplications] = useState<VisaRequest[]>([])
  const [countries, setCountries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showApplication, setShowApplication] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<VisaRequest | null>(null)
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])

  // Application form state
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    purposeOfVisit: '',
    duration: '',
    entryDate: '',
    exitDate: '',
    accommodation: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  })

  // Load user's applications on mount
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const userApplications = await visaAPI.getMyRequests()
        setApplications(userApplications)
      } catch (error) {
        console.error('Error loading applications:', error)
      }
    }
    loadApplications()
  }, [])

  const handleStartApplication = (country: string, visaType: string) => {
    setSelectedCountry(country)
    setSelectedVisaType(visaType)
    setShowApplication(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedDocuments(prev => [...prev, file])
    }
  }

  const handleSubmitApplication = async () => {
    setIsLoading(true)
    try {
      const visaData: VisaApplicationData = {
        destinationCountry: selectedCountry,
        visaType: selectedVisaType,
        purpose: applicationData.purposeOfVisit,
        travelDate: applicationData.entryDate,
        returnDate: applicationData.exitDate,
        applicantDetails: {
          firstName: applicationData.firstName,
          lastName: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          dateOfBirth: '1990-01-01', // Default value for demo
          nationality: applicationData.nationality,
          passportNumber: applicationData.passportNumber,
          passportExpiry: applicationData.passportExpiry,
          occupation: 'Software Engineer', // Default value for demo
          address: 'Address not provided' // Default value for demo
        }
      }
      
      await visaAPI.apply(visaData)
      
      // Refresh applications list
      const userApplications = await visaAPI.getMyRequests()
      setApplications(userApplications)
      
      // Reset form
      setShowApplication(false)
      setApplicationData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
        purposeOfVisit: '',
        duration: '',
        entryDate: '',
        exitDate: '',
        accommodation: '',
        emergencyContact: { name: '', phone: '', relationship: '' }
      })
      setUploadedDocuments([])
      
    } catch (error) {
      console.error('Error submitting application:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      UNDER_REVIEW: 'bg-blue-100 text-blue-800', 
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      ADDITIONAL_DOCS_REQUIRED: 'bg-orange-100 text-orange-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'REJECTED':
        return <X className="h-4 w-4 text-red-600" />
      case 'UNDER_REVIEW':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'ADDITIONAL_DOCS_REQUIRED':
        return <Upload className="h-4 w-4 text-orange-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  if (showApplication) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowApplication(false)}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedCountry} {selectedVisaType} Visa Application
              </h1>
              <p className="text-gray-600 mt-2">Complete your visa application</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input
                    value={applicationData.firstName}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input
                    value={applicationData.lastName}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                  <Input
                    value={applicationData.nationality}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, nationality: e.target.value }))}
                    placeholder="Enter nationality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number</label>
                  <Input
                    value={applicationData.passportNumber}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, passportNumber: e.target.value }))}
                    placeholder="Enter passport number"
                  />
                </div>
              </div>
            </Card>

            {/* Travel Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Plane className="h-5 w-5 text-green-600" />
                Travel Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entry Date</label>
                  <Input
                    type="date"
                    value={applicationData.entryDate}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, entryDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exit Date</label>
                  <Input
                    type="date"
                    value={applicationData.exitDate}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, exitDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Visit</label>
                  <Input
                    value={applicationData.purposeOfVisit}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, purposeOfVisit: e.target.value }))}
                    placeholder="Tourism, Business, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
                  <Input
                    value={applicationData.accommodation}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, accommodation: e.target.value }))}
                    placeholder="Hotel name or address"
                  />
                </div>
              </div>
            </Card>

            {/* Document Upload */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Upload className="h-5 w-5 text-purple-600" />
                Document Upload
              </h2>
              
              <div className="space-y-4">
                {documentRequirements[selectedVisaType as keyof typeof documentRequirements]?.map((doc, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{doc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(e, doc)}
                          className="hidden"
                          id={`doc-${index}`}
                        />
                        <label
                          htmlFor={`doc-${index}`}
                          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <LoadingButton
                onClick={handleSubmitApplication}
                isLoading={isLoading}
                loadingText="Submitting Application..."
                size="lg"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Application
              </LoadingButton>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Summary */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Application Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{selectedCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visa Type:</span>
                  <span className="font-medium">{selectedVisaType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing:</span>
                  <span className="font-medium">5-10 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium text-green-600">$85</span>
                </div>
              </div>
            </Card>

            {/* Help & Support */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our visa experts are here to help with your application.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            Visa Services
          </h1>
          <p className="text-gray-600 mt-2">Apply for visas quickly and easily</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* My Applications */}
      {applications.length > 0 && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
              <p className="text-gray-600">Track your visa application status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{app.destinationCountry} - {app.visaType}</h3>
                    <p className="text-sm text-gray-600">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Application ID:</span>
                    <span className="font-mono">{app.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span>${app.processingFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">${app.totalAmount}</span>
                  </div>
                  {app.status === 'APPROVED' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Approved:</span>
                      <span className="text-green-600">{new Date(app.updatedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApplication(app)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {app.status === 'APPROVED' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Popular Destinations */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
            <p className="text-gray-600">Quick visa applications for top safari destinations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest, index) => (
            <Card key={index} className="p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{dest.flagEmoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {dest.country}
                    </h3>
                    <p className="text-sm text-gray-600">{dest.visaRequired}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Visa Fee:</span>
                  <span className="font-medium text-green-600">${dest.fee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing:</span>
                  <span className="font-medium">{dest.processing}</span>
                </div>
              </div>

              <Button
                onClick={() => handleStartApplication(dest.country, 'TOURIST')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Visa Types */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Visa Types</h2>
            <p className="text-gray-600">Choose the right visa for your travel purpose</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visaTypes.map((type) => (
            <Card key={type.id} className="p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500">
                    <div>Duration: <span className="font-medium">{type.duration}</span></div>
                    <div>Processing: <span className="font-medium">{type.processing}</span></div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-green-600" />
            <h3 className="font-bold text-gray-900">Secure Processing</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Your personal information and documents are encrypted and securely processed through our platform.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-blue-600" />
            <h3 className="font-bold text-gray-900">Fast Processing</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Most visa applications are processed within 3-10 business days depending on the destination.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-purple-600" />
            <h3 className="font-bold text-gray-900">Expert Support</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Our visa experts are available to help you throughout the application process.
          </p>
        </Card>
      </div>
    </div>
  )
}
