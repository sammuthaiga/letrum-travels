// frontend/app/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Shield, Star, Users, Globe, Heart, Phone, Mail, Facebook, Twitter, Instagram, Menu, X, ChevronDown } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  // Handle loading states for interactive elements
  const handleButtonClick = async (buttonId: string, redirectUrl?: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }))
    
    // Simulate loading for 2 seconds for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (redirectUrl) {
      window.location.href = redirectUrl
    }
    
    setLoadingStates(prev => ({ ...prev, [buttonId]: false }))
  }

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close mobile menu when clicking on links
  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container-custom py-4">
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
                onClick={() => handleButtonClick('nav-login', '/login')}
                isLoading={loadingStates['nav-login']}
                loadingText="Signing In..."
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Sign In
              </LoadingButton>
              <LoadingButton
                onClick={() => handleButtonClick('nav-register', '/login')}
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
                    onClick={() => handleButtonClick('mobile-login', '/login')}
                    isLoading={loadingStates['mobile-login']}
                    loadingText="Signing In..."
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleButtonClick('mobile-register', '/login')}
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

        <div className="container-custom relative z-10 text-white">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              Discover the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Magic </span>
              of Africa
            </h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 max-w-2xl">
              Embark on extraordinary safari adventures and cultural experiences 
              that will create memories to last a lifetime. From the Big Five to breathtaking landscapes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <LoadingButton
                onClick={() => handleButtonClick('hero-explore', '/login')}
                isLoading={loadingStates['hero-explore']}
                loadingText="Starting Adventure..."
                size="lg"
                className="px-10 py-5 text-xl gap-3 bg-primary hover:bg-primary/90 shadow-2xl"
              >
                Start Your Adventure
                <ArrowRight className="h-6 w-6" />
              </LoadingButton>
              
              <LoadingButton
                onClick={() => handleButtonClick('hero-plans', '/login')}
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

      {/* Enhanced Services Section */}
      <section id="services" className="space-section bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold mb-6">
              Our Services
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Premier Travel Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From breathtaking safari tours to seamless travel arrangements, 
              we provide comprehensive travel solutions for your African adventure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                id: 'safari',
                image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                icon: MapPin,
                title: 'Safari Tours',
                description: 'Witness the Big Five in their natural habitat across Kenya\'s premier national parks.',
                color: 'primary'
              },
              {
                id: 'rental',
                image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                icon: Globe,
                title: 'Car Rentals',
                description: 'Premium vehicle rentals with experienced drivers for comfortable journeys.',
                color: 'secondary'
              },
              {
                id: 'visa',
                image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                icon: Shield,
                title: 'Visa Services',
                description: 'Complete visa assistance and documentation support for hassle-free travel.',
                color: 'primary'
              },
              {
                id: 'products',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                icon: Heart,
                title: 'Travel Products',
                description: 'Essential travel gear, souvenirs, and authentic African crafts.',
                color: 'secondary'
              }
            ].map((service, index) => (
              <div key={service.id} className="group bg-white rounded-3xl shadow-xl overflow-hidden card-hover border border-gray-100 hover:border-primary/30 transition-all duration-500">
                <div className="relative h-56">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className={`p-4 bg-${service.color}/10 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 -mt-8 relative z-10`}>
                  <service.icon className={`h-12 w-12 text-${service.color} mx-auto`} />
                </div>
                
                <div className="px-8 pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-center">
                    {service.description}
                  </p>
                  
                  <LoadingButton
                    onClick={() => handleButtonClick(`service-${service.id}`, '/login')}
                    isLoading={loadingStates[`service-${service.id}`]}
                    loadingText="Booking..."
                    variant={service.color as 'primary' | 'secondary'}
                    className="w-full gap-2"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Tours Section */}
      <section id="tours" className="space-section bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block px-6 py-3 bg-secondary/20 rounded-full text-gray-800 font-semibold mb-6">
              Popular Tours
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Featured Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our most popular safari packages and cultural experiences, carefully curated for unforgettable memories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                id: 'masai-mara',
                image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Masai Mara Safari',
                description: 'Experience the Great Migration and witness millions of wildebeest crossing.',
                rating: 4.9,
                price: 599,
                featured: true
              },
              {
                id: 'amboseli',
                image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Amboseli Explorer',
                description: 'Marvel at elephants against the backdrop of Mount Kilimanjaro.',
                rating: 4.7,
                price: 449,
                featured: false
              },
              {
                id: 'tsavo',
                image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Tsavo Adventure',
                description: 'Discover the famous red elephants and diverse wildlife of Tsavo.',
                rating: 4.6,
                price: 399,
                featured: false
              }
            ].map((tour, index) => (
              <div key={tour.id} className="group bg-white rounded-3xl shadow-xl overflow-hidden card-hover border border-gray-100 hover:border-primary/30 transition-all duration-500">
                <div className="relative h-72">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {tour.featured && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ✨ Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {tour.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(tour.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                      <span className="ml-2 text-gray-700 font-semibold">{tour.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">${tour.price}</div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>
                  
                  <LoadingButton
                    onClick={() => handleButtonClick(`tour-${tour.id}`, '/login')}
                    isLoading={loadingStates[`tour-${tour.id}`]}
                    loadingText="Booking..."
                    className="w-full gap-2 text-lg py-4"
                  >
                    Book Adventure
                    <ArrowRight className="h-5 w-5" />
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>

          {/* View All Tours Button */}
          <div className="text-center mt-16">
            <LoadingButton
              onClick={() => handleButtonClick('view-all-tours', '/login')}
              isLoading={loadingStates['view-all-tours']}
              loadingText="Loading Tours..."
              variant="outline"
              size="lg"
              className="px-12 py-4 text-lg border-2 border-primary hover:bg-primary hover:text-white"
            >
              View All Tours
              <ChevronDown className="h-5 w-5 ml-2" />
            </LoadingButton>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="space-section bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-block px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold mb-8">
                Why Choose Us
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Your Trusted African Adventure Partner
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                With over a decade of experience in African tourism, we&apos;ve crafted unforgettable 
                experiences for thousands of travelers. Our deep local knowledge and commitment to 
                sustainable tourism ensures you get authentic, responsible adventures.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                {[
                  { icon: Users, title: 'Expert Guides', desc: 'Local experts with deep wildlife knowledge', color: 'primary' },
                  { icon: Shield, title: 'Safe & Secure', desc: 'Fully licensed with comprehensive insurance', color: 'secondary' },
                  { icon: Heart, title: 'Sustainable Tourism', desc: 'Supporting local communities and conservation', color: 'primary' },
                  { icon: Globe, title: '24/7 Support', desc: 'Round-the-clock assistance during your trip', color: 'secondary' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/50 transition-colors">
                    <div className={`p-3 rounded-xl ${feature.color === 'secondary' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                      <feature.icon className={`h-8 w-8 ${feature.color === 'secondary' ? 'text-secondary' : 'text-primary'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <LoadingButton
                onClick={() => handleButtonClick('start-planning', '/login')}
                isLoading={loadingStates['start-planning']}
                loadingText="Starting..."
                size="lg"
                className="px-10 py-5 text-xl gap-3"
              >
                Start Planning Your Trip
                <ArrowRight className="h-6 w-6" />
              </LoadingButton>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Safari guide explaining wildlife to tourists"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Enhanced Floating Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl border border-primary/10">
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Star className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-gray-600">Customer Rating</div>
                    <div className="text-sm text-primary font-semibold">Based on 1,500+ reviews</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-2xl border border-secondary/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">ISO Certified</div>
                  <div className="text-sm text-gray-600">Travel Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="space-section bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready for Your African Adventure?
            </h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Join thousands of satisfied travelers who have experienced the magic of Africa with us. 
              Your dream safari is just one click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
              <LoadingButton
                onClick={() => handleButtonClick('book-safari', '/login')}
                isLoading={loadingStates['book-safari']}
                loadingText="Preparing Safari..."
                className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-6 gap-3 shadow-2xl"
              >
                Book Your Safari Today
                <ArrowRight className="h-6 w-6" />
              </LoadingButton>
              
              <a 
                href="tel:+254712345678" 
                className="text-white hover:text-white/80 font-semibold flex items-center text-xl p-4 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
              >
                Or call us: +254 712 345 678
                <Phone className="ml-3 h-6 w-6" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">100%</div>
                <div className="text-sm">Money Back Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">1,500+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container-custom py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Letrum Agency
              </h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Creating unforgettable African adventures since 2010. We specialize in authentic safari 
                experiences, cultural tours, and sustainable tourism that benefits local communities.
              </p>
              <div className="flex space-x-6">
                {[
                  { icon: Facebook, url: '#', label: 'Facebook' },
                  { icon: Instagram, url: '#', label: 'Instagram' },
                  { icon: Twitter, url: '#', label: 'Twitter' },
                  { icon: Globe, url: '#', label: 'Website' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className="p-3 bg-gray-800 hover:bg-primary rounded-xl transition-colors group" 
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-primary">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Safari Tours', href: '#tours' },
                  { name: 'Cultural Experiences', href: '#services' },
                  { name: 'Visa Services', href: '/login' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Blog', href: '/login' }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-primary transition-colors text-lg hover:translate-x-2 transform duration-200 block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-secondary">Contact Info</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold">+254 712 345 678</div>
                    <div className="text-sm text-gray-400">24/7 Support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold">info@letrumtours.com</div>
                    <div className="text-sm text-gray-400">Quick Response</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Nairobi, Kenya</div>
                    <div className="text-sm text-gray-400">East Africa Hub</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
              <div className="text-lg mb-4 md:mb-0">
                © 2024 Letrum Agency. All rights reserved.
              </div>
              <div className="flex space-x-8 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
