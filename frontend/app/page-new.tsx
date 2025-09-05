'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Shield, Star, Users, Globe, Heart, Phone, Mail, Facebook, Twitter, Instagram, Menu, X, ChevronDown, Car, Plane, ShoppingBag, CheckCircle, Play } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'
import { toursAPI, Tour } from '@/lib/api'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])
  const [additionalTours, setAdditionalTours] = useState<Tour[]>([])
  const [showMoreTours, setShowMoreTours] = useState(false)
  const [isLoadingTours, setIsLoadingTours] = useState(false)

  // Load featured tours on component mount
  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
        const tours = await toursAPI.getPopular(4)
        setFeaturedTours(tours)
      } catch (error) {
        console.error('Error loading featured tours:', error)
      }
    }
    loadFeaturedTours()
  }, [])

  // Handle loading states for interactive elements
  const handleButtonClick = async (buttonId: string, redirectUrl?: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }))
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
    
    setLoadingStates(prev => ({ ...prev, [buttonId]: false }))
  }

  // Handle View More Tours
  const handleViewMoreTours = async () => {
    if (showMoreTours) {
      setShowMoreTours(false)
      return
    }

    setIsLoadingTours(true)
    try {
      // Get 8 more tours excluding the 4 featured ones
      const allTours = await toursAPI.getAll()
      const featuredIds = featuredTours.map(tour => tour.id)
      const moreTours = allTours.filter(tour => !featuredIds.includes(tour.id)).slice(0, 8)
      setAdditionalTours(moreTours)
      setShowMoreTours(true)
    } catch (error) {
      console.error('Error loading more tours:', error)
    } finally {
      setIsLoadingTours(false)
    }
  }

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close mobile menu when clicking on links
  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <main className="min-h-screen bg-gray-50 w-full">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="w-[90%] max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-black text-gray-900">
                <span className="text-primary">Letrum</span> Agency
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Services', 'Tours', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-semibold text-gray-700 hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <LoadingButton
                onClick={() => handleButtonClick('nav-login', '/auth/login')}
                isLoading={loadingStates['nav-login']}
                loadingText="Signing In..."
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Sign In
              </LoadingButton>
              <LoadingButton
                onClick={() => handleButtonClick('nav-register', '/auth/login')}
                isLoading={loadingStates['nav-register']}
                loadingText="Signing Up..."
                className="bg-primary hover:bg-primary/90 text-white shadow-lg"
              >
                Get Started
              </LoadingButton>
            </div>
            
            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-fade-in">
              <div className="flex flex-col space-y-4 pt-4">
                {['Home', 'Services', 'Tours', 'About'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={handleLinkClick}
                    className="font-semibold text-gray-700 hover:text-primary transition-colors px-2 py-1"
                  >
                    {item}
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <LoadingButton
                    onClick={() => handleButtonClick('mobile-login', '/auth/login')}
                    isLoading={loadingStates['mobile-login']}
                    loadingText="Signing In..."
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleButtonClick('mobile-register', '/auth/login')}
                    isLoading={loadingStates['mobile-register']}
                    loadingText="Signing Up..."
                    className="w-full"
                  >
                    Get Started
                  </LoadingButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="African safari landscape with wildlife"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="w-[90%] max-w-7xl mx-auto relative z-10 text-white">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              Discover the 
              <span className="text-primary font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter brightness-125 text-shadow-lg"> Magical </span>
              World of Africa
            </h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 max-w-2xl">
              Embark on extraordinary safari adventures and cultural experiences 
              that will create memories to last a lifetime. From the Big Five to breathtaking landscapes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <LoadingButton
                onClick={() => handleButtonClick('hero-explore', '/auth/login')}
                isLoading={loadingStates['hero-explore']}
                loadingText="Starting Adventure..."
                size="lg"
                className="px-10 py-5 text-xl gap-3 bg-primary hover:bg-primary/90 shadow-2xl"
              >
                Start Your Adventure
                <ArrowRight className="h-6 w-6" />
              </LoadingButton>
              
              <LoadingButton
                onClick={() => handleButtonClick('hero-plans', '/auth/login')}
                isLoading={loadingStates['hero-plans']}
                loadingText="Loading Plans..."
                variant="outline"
                size="lg"
                className="px-10 py-5 text-xl gap-3 border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                View Tour Plans
                <Calendar className="h-6 w-6" />
              </LoadingButton>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '1,500+', label: 'Happy Travelers' },
                { number: '50+', label: 'Destinations' },
                { number: '10+', label: 'Years Experience' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 glass-effect-dark rounded-xl backdrop-blur-md">
                  <div className="text-4xl font-bold text-secondary mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white/80">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Booking Process Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="w-[90%] max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-primary/20 shadow-lg mb-8">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
              <span className="text-primary font-semibold text-lg">How It Works</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From dream to destination - discover how effortless it is to book your perfect African adventure
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Destination',
                description: 'Browse our curated safari experiences and select your perfect adventure from our premium collection',
                icon: MapPin,
                image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                gradient: 'from-blue-500 to-purple-600'
              },
              {
                step: '02',
                title: 'Book Flight',
                description: 'Seamless flight booking integration with competitive prices and flexible options worldwide',
                icon: Plane,
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                step: '03',
                title: 'Rent Vehicle',
                description: 'Premium 4WD safari vehicles with expert drivers to ensure safe and comfortable travel',
                icon: Car,
                image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                gradient: 'from-pink-500 to-red-600'
              },
              {
                step: '04',
                title: 'Safari Essentials',
                description: 'Complete your adventure with premium gear, authentic souvenirs, and travel essentials',
                icon: ShoppingBag,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                gradient: 'from-red-500 to-orange-600'
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="group relative bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Floating Step Number */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br bg-white shadow-2xl border border-gray-100 text-gray-800 font-black text-xl flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                  {step.step}
                </div>

                {/* Glass Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-10"></div>

                {/* Image with Advanced Effects */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-1000 filter group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                </div>

                {/* Floating Icon */}
                <div className="absolute left-6 -bottom-6 z-20">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-8 pt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>

                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden xl:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-30">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="absolute -right-2 -top-1.5 w-0 h-0 border-l-4 border-r-0 border-t-2 border-b-2 border-secondary border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center mt-20">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-30"></div>
              <LoadingButton
                onClick={() => handleButtonClick('start-journey', '/auth/login')}
                isLoading={loadingStates['start-journey']}
                loadingText="Starting Journey..."
                size="lg"
                className="relative px-12 py-5 text-xl gap-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl group-hover:scale-105 transition-all duration-300"
              >
                Start Your Journey Today
                <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </LoadingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Services Section */}
      <section id="services" className="py-32 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(119,198,255,0.2),transparent_50%)] animate-pulse delay-2000"></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary/30 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/30 rotate-45 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl animate-bounce"></div>
        </div>

        <div className="w-[90%] max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl mb-8">
              <div className="flex space-x-2 mr-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-ping delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-200"></div>
              </div>
              <span className="text-white font-semibold text-lg">Our Services</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Everything You
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
                Need & More
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Premium travel solutions crafted with precision, powered by innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Safari Tours',
                description: 'Immersive wildlife experiences with cutting-edge technology, luxury accommodations, and expert naturalist guides who bring Africa to life.',
                icon: Globe,
                image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                features: ['AI-Powered Wildlife Tracking', 'Luxury Eco-Lodges', 'Professional Photography', 'Cultural Immersion'],
                gradient: 'from-orange-400 via-pink-500 to-red-500',
                accent: 'from-orange-500/20 to-red-500/20'
              },
              {
                title: 'Flight Booking',
                description: 'Next-generation flight booking platform with dynamic pricing, carbon offset options, and premium travel concierge services.',
                icon: Plane,
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                features: ['Dynamic Price Optimization', 'Carbon Neutral Options', 'VIP Airport Services', 'Global Network Access'],
                gradient: 'from-blue-400 via-purple-500 to-indigo-600',
                accent: 'from-blue-500/20 to-indigo-500/20'
              },
              {
                title: 'Luxury Transport',
                description: 'Premium safari fleet with advanced safety systems, expert local drivers, and bespoke travel experiences tailored to your preferences.',
                icon: Car,
                image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                features: ['Advanced Safety Systems', 'Expert Local Guides', 'Custom Route Planning', 'Emergency Support 24/7'],
                gradient: 'from-green-400 via-teal-500 to-cyan-600',
                accent: 'from-green-500/20 to-cyan-500/20'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.3}s both`
                }}
              >
                {/* Main Card */}
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Image Section */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Floating Icon */}
                    <div className="absolute bottom-6 left-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <service.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8">
                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      {service.description}
                    </p>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-400 group-hover:text-white transition-colors duration-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3 group-hover:animate-pulse`}></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <LoadingButton
                      onClick={() => handleButtonClick(`service-${index}`, '/auth/login')}
                      isLoading={loadingStates[`service-${index}`]}
                      loadingText="Loading..."
                      className="w-full py-4 text-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:border-transparent"
                    >
                      Explore Service
                    </LoadingButton>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500"></div>
                </div>

                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10 scale-105`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Tours Gallery Section */}
      <section id="tours" className="py-32 relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="w-[90%] max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary/10 to-primary/10 backdrop-blur-xl rounded-full border border-gray-200 shadow-lg mb-8">
              <Star className="h-5 w-5 text-secondary mr-3" />
              <span className="text-secondary font-semibold text-lg">Featured Tours</span>
              <Star className="h-5 w-5 text-secondary ml-3" />
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Safari
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                Masterpieces
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Curated adventures that define the pinnacle of African safari experiences
            </p>
          </div>

          {/* Premium Featured Tours Grid */}
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-16">
            {featuredTours.map((tour, index) => (
              <div 
                key={tour.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary/30 transition-all duration-700 transform hover:-translate-y-8 hover:rotate-1"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              >
                {/* Premium Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.featuredImage || tour.images[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-1000 filter group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Floating Price Badge */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-gray-900 font-black text-lg">${tour.price}</span>
                  </div>

                  {/* Premium Rating */}
                  <div className="absolute bottom-6 left-6 flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                    <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                    <span className="text-white font-bold">{tour.averageRating || '4.9'}</span>
                    <span className="text-white/70 ml-1 text-sm">Excellent</span>
                  </div>
                </div>

                {/* Premium Content */}
                <div className="p-8 relative">
                  {/* Category Badge */}
                  <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full mb-4">
                    <MapPin className="h-4 w-4 text-primary mr-2" />
                    <span className="text-primary font-semibold text-sm">{tour.category}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                    {tour.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {tour.description}
                  </p>

                  {/* Premium Details */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center bg-gray-50 px-3 py-2 rounded-xl">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 font-medium text-sm">{tour.duration} days</span>
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-2 rounded-xl">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 font-medium text-sm">Max {tour.maxGuests || '12'}</span>
                    </div>
                  </div>

                  {/* Premium CTA Button */}
                  <LoadingButton
                    onClick={() => handleButtonClick(`tour-${tour.id}`, '/auth/login')}
                    isLoading={loadingStates[`tour-${tour.id}`]}
                    loadingText="Booking..."
                    className="w-full py-4 text-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                  >
                    Reserve Experience
                  </LoadingButton>
                </div>

                {/* Luxury Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Additional Tours - Enhanced */}
          {showMoreTours && (
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-16">
              {additionalTours.map((tour, index) => (
                <div 
                  key={tour.id}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary/30 transition-all duration-700 transform hover:-translate-y-8 hover:rotate-1"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${(index * 0.15) + 0.3}s both`,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Premium Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tour.featuredImage || tour.images[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-125 transition-transform duration-1000 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Floating Price Badge */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-gray-900 font-black text-lg">${tour.price}</span>
                    </div>

                    {/* Premium Rating */}
                    <div className="absolute bottom-6 left-6 flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                      <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                      <span className="text-white font-bold">{tour.averageRating || '4.9'}</span>
                      <span className="text-white/70 ml-1 text-sm">Excellent</span>
                    </div>
                  </div>

                  {/* Premium Content */}
                  <div className="p-8 relative">
                    {/* Category Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full mb-4">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className="text-primary font-semibold text-sm">{tour.category}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                      {tour.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {tour.description}
                    </p>

                    {/* Premium Details */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center bg-gray-50 px-3 py-2 rounded-xl">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700 font-medium text-sm">{tour.duration} days</span>
                      </div>
                      <div className="flex items-center bg-gray-50 px-3 py-2 rounded-xl">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700 font-medium text-sm">Max {tour.maxGuests || '12'}</span>
                      </div>
                    </div>

                    {/* Premium CTA Button */}
                    <LoadingButton
                      onClick={() => handleButtonClick(`tour-more-${tour.id}`, '/auth/login')}
                      isLoading={loadingStates[`tour-more-${tour.id}`]}
                      loadingText="Booking..."
                      className="w-full py-4 text-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                    >
                      Reserve Experience
                    </LoadingButton>
                  </div>

                  {/* Luxury Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}

          {/* Premium View More Button */}
          <div className="text-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <div className="relative">
              <LoadingButton
                onClick={handleViewMoreTours}
                isLoading={isLoadingTours}
                loadingText="Loading Tours..."
                variant="outline"
                size="lg"
                className="px-16 py-5 text-xl gap-4 border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
              >
                {showMoreTours ? 'Show Less Tours' : 'Discover More Adventures'}
                <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${showMoreTours ? 'rotate-180' : ''}`} />
              </LoadingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Why Choose Us Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,119,198,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-32 w-3 h-3 bg-secondary rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-16 bg-gradient-to-b from-primary to-transparent rotate-45 opacity-30"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-20 bg-gradient-to-b from-secondary to-transparent -rotate-45 opacity-30"></div>
        </div>

        <div className="w-[90%] max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full border border-secondary/20 shadow-xl mb-8">
              <Shield className="h-5 w-5 text-secondary mr-3" />
              <span className="text-secondary font-semibold text-lg">Why Choose Us</span>
              <Shield className="h-5 w-5 text-secondary ml-3" />
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Your Trusted
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary">
                Safari Partner
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Over a decade of crafting extraordinary African adventures with unmatched expertise and passion
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            {[
              {
                title: 'Expert Local Guides',
                description: 'Our certified naturalist guides possess decades of intimate knowledge about African wildlife, ecosystems, and cultural heritage, ensuring every moment of your journey is enriching and authentic.',
                icon: Users,
                stats: '50+ Expert Guides',
                gradient: 'from-amber-400 via-orange-500 to-red-500',
                accent: 'from-amber-500/10 to-red-500/10',
                iconBg: 'from-amber-500 to-red-500'
              },
              {
                title: 'Luxury & Comfort',
                description: 'Experience the perfect harmony between wilderness adventure and refined comfort. Our handpicked luxury lodges and camps offer world-class amenities without compromising the authentic safari experience.',
                icon: Heart,
                stats: '5-Star Accommodations',
                gradient: 'from-rose-400 via-pink-500 to-purple-500',
                accent: 'from-rose-500/10 to-purple-500/10',
                iconBg: 'from-rose-500 to-purple-500'
              },
              {
                title: 'Safety First',
                description: 'Your safety and peace of mind are our unwavering priorities. Every tour includes comprehensive insurance coverage, rigorous safety protocols, and 24/7 emergency support systems.',
                icon: Shield,
                stats: '100% Safety Record',
                gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
                accent: 'from-emerald-500/10 to-cyan-500/10',
                iconBg: 'from-emerald-500 to-cyan-500'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.3}s both`
                }}
              >
                {/* Main Card */}
                <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-8 hover:rotate-1 overflow-hidden">
                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Floating Geometric Shapes */}
                  <div className="absolute top-4 right-4 w-16 h-16 border border-gray-200 rounded-full opacity-20 group-hover:animate-spin-slow"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-gray-200 to-transparent rounded-full opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative text-center">
                    {/* Premium Icon Container */}
                    <div className="relative mb-8 flex justify-center">
                      <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${item.iconBg} shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <item.icon className="h-14 w-14 text-white" />
                      </div>
                      
                      {/* Animated Ring */}
                      <div className="absolute inset-0 w-28 h-28 rounded-3xl border-2 border-gray-200 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                      <div className="absolute inset-0 w-28 h-28 rounded-3xl border border-gray-300 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-100"></div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg max-w-sm mx-auto group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    {/* Premium Stats Badge */}
                    <div className="relative">
                      <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                        <span className="font-bold text-white text-lg">{item.stats}</span>
                      </div>
                      
                      {/* Glowing Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    </div>
                  </div>
                </div>

                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 -z-10 scale-105`}></div>
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center mt-20">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl px-12 py-8 rounded-3xl border border-white/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Experience the Difference?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Join thousands of adventurers who trust us for their African journey
                </p>
                <LoadingButton
                  onClick={() => handleButtonClick('why-choose-cta', '/auth/login')}
                  isLoading={loadingStates['why-choose-cta']}
                  loadingText="Starting Adventure..."
                  size="lg"
                  className="px-10 py-4 text-lg gap-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Adventure
                  <ArrowRight className="h-5 w-5" />
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About/CTA Section with Fixed Font Color */}
      <section id="about" className="py-24 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1484318571209-661cf29a69ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="African sunset landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>

        <div className="w-[90%] max-w-7xl mx-auto relative z-10 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-8">
              Ready for Adventure?
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Ready for Your 
              <span className="text-secondary"> African </span>
              Adventure?
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto text-white">
              Join thousands of adventurers who have discovered the magic of Africa with us. 
              Your extraordinary journey starts with a single click.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <LoadingButton
                onClick={() => handleButtonClick('cta-book', '/auth/login')}
                isLoading={loadingStates['cta-book']}
                loadingText="Booking Adventure..."
                size="lg"
                className="px-12 py-5 text-xl gap-3 bg-secondary hover:bg-secondary/90 shadow-2xl"
              >
                Book Your Safari
                <ArrowRight className="h-6 w-6" />
              </LoadingButton>
              
              <LoadingButton
                onClick={() => handleButtonClick('cta-contact', '/auth/login')}
                isLoading={loadingStates['cta-contact']}
                loadingText="Connecting..."
                variant="outline"
                size="lg"
                className="px-12 py-5 text-xl gap-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl"
              >
                Contact Us
                <Phone className="h-6 w-6" />
              </LoadingButton>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Phone, title: 'Call Us', info: '+254 700 123 456' },
                { icon: Mail, title: 'Email Us', info: 'hello@letrumagency.com' },
                { icon: MapPin, title: 'Visit Us', info: 'Nairobi, Kenya' }
              ].map((contact, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                      <contact.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{contact.title}</h3>
                  <p className="text-white/80">{contact.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="w-[90%] max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/20 rounded-xl">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-black">
                  <span className="text-primary">Letrum</span> Agency
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg max-w-md">
                Your trusted partner for extraordinary African safari adventures. 
                Creating memories that last a lifetime since 2010.
              </p>
              <div className="flex space-x-6">
                {[Facebook, Twitter, Instagram].map((Social, index) => (
                  <div key={index} className="p-3 bg-gray-800 hover:bg-primary rounded-xl cursor-pointer transition-colors group">
                    <Social className="h-6 w-6 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Services', 'Tours', 'About', 'Contact', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">+254 700 123 456</p>
                    <p className="text-gray-400">+254 700 123 457</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">hello@letrumagency.com</p>
                    <p className="text-gray-400">info@letrumagency.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Nairobi, Kenya<br />East Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Letrum Agency. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
                  <a key={policy} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {policy}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
