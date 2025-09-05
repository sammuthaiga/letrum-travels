'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Star, Clock, Shield, Phone } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import { LoadingButton } from '@/components/ui/loading-button'

interface ServiceDetailPageProps {
  serviceId: string
}

// Service data configuration
const serviceData = {
  'safari-tours': {
    title: 'Safari Tours',
    subtitle: 'Unforgettable Wildlife Adventures',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Experience the magic of African wildlife with our expertly crafted safari tours. From the Big Five to breathtaking landscapes, every moment is designed to create lifelong memories.',
    leftCard: {
      title: 'Premium Safari Experience',
      description: 'Our luxury safari tours combine comfort with adventure. Stay in world-class lodges, enjoy gourmet meals, and witness incredible wildlife in their natural habitat.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Luxury Lodge Accommodation', 'Expert Wildlife Guides', 'Gourmet Safari Meals', 'Photography Equipment', 'Cultural Village Visits']
    },
    rightCard: {
      title: 'Wildlife & Conservation',
      description: 'Join our conservation-focused safaris that support local communities and wildlife preservation. Every tour contributes to protecting Africa\'s magnificent ecosystem.',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Big Five Guaranteed', 'Conservation Education', 'Community Support', 'Research Participation', 'Eco-Friendly Practices']
    },
    steps: [
      { title: 'Choose Your Package', description: 'Select from our curated safari packages', icon: Star },
      { title: 'Customize Experience', description: 'Tailor your safari to your preferences', icon: CheckCircle },
      { title: 'Book & Confirm', description: 'Secure your dates with easy booking', icon: Shield },
      { title: 'Enjoy Your Adventure', description: 'Embark on your unforgettable journey', icon: ArrowRight }
    ]
  },
  'flight-booking': {
    title: 'Flight Booking',
    subtitle: 'Seamless Travel Solutions',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Book flights with confidence through our comprehensive booking platform. We offer competitive prices, flexible options, and 24/7 support for all your travel needs.',
    leftCard: {
      title: 'Best Price Guarantee',
      description: 'Our advanced booking system searches multiple airlines to find you the best deals. If you find a lower price elsewhere, we\'ll match it.',
      image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Price Match Guarantee', 'Multiple Airlines', 'Flexible Booking', 'Instant Confirmation', 'Mobile Boarding Pass']
    },
    rightCard: {
      title: 'Premium Support',
      description: 'Our dedicated travel specialists are available 24/7 to assist with bookings, changes, and any travel concerns you may have.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['24/7 Customer Support', 'Flight Change Assistance', 'Cancellation Protection', 'Seat Selection', 'Meal Preferences']
    },
    steps: [
      { title: 'Search Flights', description: 'Enter your travel details and preferences', icon: Star },
      { title: 'Compare Options', description: 'View prices, times, and airline options', icon: CheckCircle },
      { title: 'Secure Payment', description: 'Book with our secure payment system', icon: Shield },
      { title: 'Travel Ready', description: 'Receive tickets and travel confidently', icon: ArrowRight }
    ]
  },
  'car-rentals': {
    title: 'Car Rentals',
    subtitle: 'Premium Vehicle Solutions',
    heroImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Explore Africa with confidence in our premium 4WD vehicles. Professional drivers, GPS navigation, and comprehensive insurance ensure your journey is safe and comfortable.',
    leftCard: {
      title: '4WD Safari Vehicles',
      description: 'Our fleet of modern 4WD vehicles is perfect for African terrain. Each vehicle is equipped with safety features and comfort amenities for the perfect safari experience.',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Modern 4WD Fleet', 'GPS Navigation', 'Air Conditioning', 'Safety Equipment', 'Fuel Efficient']
    },
    rightCard: {
      title: 'Professional Drivers',
      description: 'Our experienced drivers know the terrain, wildlife patterns, and best routes. They double as knowledgeable guides, enhancing your African adventure.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Licensed Drivers', 'Local Knowledge', 'Wildlife Expertise', 'Multi-language', 'First Aid Certified']
    },
    steps: [
      { title: 'Select Vehicle', description: 'Choose from our premium vehicle fleet', icon: Star },
      { title: 'Choose Duration', description: 'Pick your rental period and options', icon: Clock },
      { title: 'Confirm Booking', description: 'Secure your reservation with payment', icon: Shield },
      { title: 'Start Journey', description: 'Meet your driver and begin exploring', icon: ArrowRight }
    ]
  },
  'visa-processing': {
    title: 'Visa Processing',
    subtitle: 'Hassle-Free Documentation',
    heroImage: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Navigate visa requirements with ease through our comprehensive processing service. We handle documentation, applications, and follow-ups so you can focus on planning your trip.',
    leftCard: {
      title: 'Document Processing',
      description: 'Our visa specialists review your documents, ensure compliance with requirements, and guide you through the entire application process.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Document Review', 'Application Assistance', 'Requirement Guidance', 'Photo Services', 'Translation Support']
    },
    rightCard: {
      title: 'Status Tracking',
      description: 'Stay informed with real-time updates on your visa application status. Our tracking system keeps you updated at every step of the process.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Real-time Tracking', 'SMS Updates', 'Email Notifications', 'Expert Consultation', 'Rush Processing']
    },
    steps: [
      { title: 'Submit Documents', description: 'Upload required documents securely', icon: Star },
      { title: 'Review Process', description: 'Our experts review and verify documents', icon: CheckCircle },
      { title: 'Application Submit', description: 'We submit your application officially', icon: Shield },
      { title: 'Visa Ready', description: 'Receive your approved visa documents', icon: ArrowRight }
    ]
  },
  'travel-products': {
    title: 'Travel Products',
    subtitle: 'Essential Safari Gear',
    heroImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Equip yourself with premium travel gear designed for African adventures. From safari clothing to professional photography equipment, we have everything you need.',
    leftCard: {
      title: 'Safari Equipment',
      description: 'Professional-grade safari gear including binoculars, cameras, clothing, and accessories. All items are tested and approved by our safari guides.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Professional Binoculars', 'Safari Clothing', 'Camera Equipment', 'Sun Protection', 'Camping Gear']
    },
    rightCard: {
      title: 'Quality Guarantee',
      description: 'All our products come with a satisfaction guarantee. Premium quality materials and brands trusted by professional safari guides and photographers.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Quality Guarantee', 'Fast Shipping', 'Expert Recommendations', 'Bundle Discounts', 'Return Policy']
    },
    steps: [
      { title: 'Browse Catalog', description: 'Explore our curated safari gear collection', icon: Star },
      { title: 'Add to Cart', description: 'Select items and quantities needed', icon: CheckCircle },
      { title: 'Secure Checkout', description: 'Complete purchase with secure payment', icon: Shield },
      { title: 'Fast Delivery', description: 'Receive gear ready for your adventure', icon: ArrowRight }
    ]
  },
  'client-account': {
    title: 'Client Account',
    subtitle: 'Personalized Travel Dashboard',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Manage all your travel bookings, track trips, and access exclusive offers through your personalized client dashboard. Everything you need in one place.',
    leftCard: {
      title: 'Booking Management',
      description: 'View and manage all your bookings in one place. From flight details to safari schedules, access everything with a single login.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Booking History', 'Trip Management', 'Document Storage', 'Itinerary Access', 'Modification Requests']
    },
    rightCard: {
      title: 'Exclusive Benefits',
      description: 'Enjoy member-only perks including early access to deals, loyalty rewards, and personalized recommendations based on your travel history.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Loyalty Rewards', 'Exclusive Deals', 'Priority Support', 'Travel Recommendations', 'Points System']
    },
    steps: [
      { title: 'Create Account', description: 'Sign up with your email and preferences', icon: Star },
      { title: 'Complete Profile', description: 'Add travel preferences and details', icon: CheckCircle },
      { title: 'Start Booking', description: 'Begin planning your dream adventures', icon: Shield },
      { title: 'Earn Rewards', description: 'Enjoy benefits and exclusive offers', icon: ArrowRight }
    ]
  }
}

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [currentStep, setCurrentStep] = useState(0)
  
  const service = serviceData[serviceId as keyof typeof serviceData]

  if (!service) {
    return <div>Service not found</div>
  }

  // Handle loading states for interactive elements
  const handleButtonClick = async (buttonId: string, redirectUrl?: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }))
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
    
    setLoadingStates(prev => ({ ...prev, [buttonId]: false }))
  }

  // Auto-animate steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % service.steps.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [service.steps.length])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        handleButtonClick={handleButtonClick}
        loadingStates={loadingStates}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            {service.title}
          </h1>
          <p className="text-2xl md:text-3xl mb-6 font-light tracking-wide">
            {service.subtitle}
          </p>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
            {service.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <LoadingButton
              onClick={() => handleButtonClick('hero-book', '/login')}
              isLoading={loadingStates['hero-book']}
              loadingText="Processing..."
              size="lg"
              className="px-12 py-6 text-xl bg-primary hover:bg-primary/90 shadow-2xl"
            >
              Book Now
              <ArrowRight className="h-6 w-6 ml-2" />
            </LoadingButton>
            
            <LoadingButton
              onClick={() => handleButtonClick('hero-contact', '/contact')}
              isLoading={loadingStates['hero-contact']}
              loadingText="Connecting..."
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl border-2 border-white text-white hover:bg-white hover:text-gray-900"
            >
              Contact Expert
              <Phone className="h-6 w-6 ml-2" />
            </LoadingButton>
          </div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={service.leftCard.image}
                  alt={service.leftCard.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.leftCard.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-10">
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.leftCard.description}
                </p>
                
                <ul className="space-y-4">
                  {service.leftCard.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                      <span className="font-medium text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={service.rightCard.image}
                  alt={service.rightCard.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.rightCard.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-10">
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.rightCard.description}
                </p>
                
                <ul className="space-y-4">
                  {service.rightCard.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                      <span className="font-medium text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Steps Section */}
      <section className="py-32 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get started with our {service.title.toLowerCase()} service
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {service.steps.map((step, index) => (
              <div
                key={index}
                className={`relative p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-700 ${
                  currentStep === index 
                    ? 'scale-105 shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20' 
                    : 'hover:scale-102 hover:shadow-2xl'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  currentStep === index 
                    ? 'bg-primary text-white transform scale-110' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  <step.icon className="h-8 w-8" />
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-semibold text-primary/60">
                    Step {index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < service.steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <LoadingButton
              onClick={() => handleButtonClick('steps-start', '/login')}
              isLoading={loadingStates['steps-start']}
              loadingText="Getting Started..."
              size="lg"
              className="px-12 py-6 text-xl bg-primary hover:bg-primary/90 shadow-xl"
            >
              Get Started Today
              <ArrowRight className="h-6 w-6 ml-2" />
            </LoadingButton>
          </div>
        </div>
      </section>
    </div>
  )
}
