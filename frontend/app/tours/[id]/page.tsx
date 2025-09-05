// frontend/app/tours/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Clock, 
  Users, 
  Star,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Share2,
  Check,
  X,
  Globe,
  Camera,
  Utensils,
  Car,
  Bed
} from 'lucide-react';

import { authAPI, toursAPI, Tour } from '@/lib/api';
import { LoadingButton } from '@/components/ui/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TourDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;
  
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadTour();
  }, [tourId, router]);

  const loadTour = async () => {
    try {
      setLoading(true);
      const tourData = await toursAPI.getById(tourId);
      setTour(tourData);
    } catch (error) {
      console.error('Error loading tour:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !tour) return;
    
    try {
      setBooking(true);
      await toursAPI.book(tour.id, guests, selectedDate, '');
      
      // Show success message and redirect
      alert('Booking confirmed! Check your bookings in the dashboard.');
      router.push('/dashboard');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalPrice = tour ? tour.price * guests : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1ABC9C] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#1ABC9C] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-[#1ABC9C]" />
                <span className="text-xl font-bold bg-gradient-to-r from-[#1ABC9C] to-[#16A085] bg-clip-text text-transparent">
                  Letrum Agency
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-[#1ABC9C] transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-[#1ABC9C] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src={tour.featuredImage}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-[#1ABC9C] px-3 py-1 rounded-full text-sm font-medium">
                    {tour.category}
                  </span>
                  <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {tour.difficulty}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{tour.title}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Up to {tour.maxGuests} guests
                  </div>
                  {tour.averageRating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                      {tour.averageRating} ({tour._count?.reviews || 0} reviews)
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Additional Images */}
            {tour.images && tour.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {tour.images.slice(0, 4).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={image}
                      alt={`${tour.title} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-[#1ABC9C]">
                      {formatCurrency(tour.price)}
                    </CardTitle>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!showBookingForm ? (
                    <LoadingButton
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-[#1ABC9C] hover:bg-[#16A085] text-white py-3 text-lg"
                      size="lg"
                    >
                      Book This Tour
                    </LoadingButton>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Guests
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent"
                        >
                          {Array.from({ length: tour.maxGuests }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>
                              {num} Guest{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{formatCurrency(tour.price)} × {guests} guest{guests > 1 ? 's' : ''}</span>
                          <span>{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span className="text-[#1ABC9C]">{formatCurrency(totalPrice)}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <LoadingButton
                          onClick={handleBooking}
                          disabled={!selectedDate || booking}
                          isLoading={booking}
                          className="w-full bg-[#1ABC9C] hover:bg-[#16A085] text-white py-3"
                        >
                          Confirm Booking
                        </LoadingButton>
                        
                        <button
                          onClick={() => setShowBookingForm(false)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="text-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Free cancellation up to 24 hours before
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>About This Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">{tour.description}</p>
                  {tour.shortDesc && (
                    <p className="text-gray-700 font-medium">{tour.shortDesc}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Itinerary */}
            {tour.itinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tour.itinerary.map((item, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#1ABC9C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Inclusions & Exclusions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Inclusions */}
              {tour.inclusions && tour.inclusions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Exclusions */}
              {tour.exclusions && tour.exclusions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">What's Not Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-[#1ABC9C]" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <span className="text-gray-600">{tour.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-[#1ABC9C]" />
                      <span className="font-medium">Group Size</span>
                    </div>
                    <span className="text-gray-600">Up to {tour.maxGuests}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-[#1ABC9C]" />
                      <span className="font-medium">Category</span>
                    </div>
                    <span className="text-gray-600">{tour.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-[#1ABC9C]" />
                      <span className="font-medium">Difficulty</span>
                    </div>
                    <span className="text-gray-600">{tour.difficulty}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Have questions about this tour? Our travel experts are here to help.
                  </p>
                  <LoadingButton
                    variant="outline"
                    className="w-full border-[#1ABC9C] text-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white"
                  >
                    Contact Us
                  </LoadingButton>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;
