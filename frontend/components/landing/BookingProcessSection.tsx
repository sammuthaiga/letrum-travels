'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Plane, Car, ShoppingBag, Play } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

interface BookingProcessProps {
  handleButtonClick: (buttonId: string, redirectUrl?: string) => Promise<void>
  loadingStates: Record<string, boolean>
}

export default function BookingProcessSection({ handleButtonClick, loadingStates }: BookingProcessProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="w-[90%] max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold mb-6">
            How It Works
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Your Journey to Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From dream to destination - discover how easy it is to book your perfect African adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {[
            {
              step: '01',
              title: 'Choose Your Destination',
              description: 'Browse our curated safari tours and select your perfect adventure',
              icon: MapPin,
              image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              color: 'primary'
            },
            {
              step: '02',
              title: 'Book Your Flight',
              description: 'Seamless flight booking integration to get you to your destination',
              icon: Plane,
              image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              color: 'secondary'
            },
            {
              step: '03',
              title: 'Rent a Vehicle',
              description: 'Choose from premium 4WD vehicles or let our drivers guide you',
              icon: Car,
              image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              color: 'primary'
            },
            {
              step: '04',
              title: 'Get Safari Essentials',
              description: 'Shop for travel gear, souvenirs, and authentic African products',
              icon: ShoppingBag,
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              color: 'secondary'
            }
          ].map((step, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
              }}
            >
              {/* Step Number */}
              <div className={`absolute top-6 right-6 w-12 h-12 rounded-full ${step.color === 'secondary' ? 'bg-secondary' : 'bg-primary'} text-white font-bold text-lg flex items-center justify-center z-10 shadow-lg`}>
                {step.step}
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Icon */}
              <div className={`relative -mt-6 mx-auto w-12 h-12 rounded-xl ${step.color === 'secondary' ? 'bg-secondary' : 'bg-primary'} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 z-10`}>
                <step.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <div className="p-8 pt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Animated Arrow for Connection */}
              {index < 3 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <ArrowRight className="h-8 w-8 text-primary/60 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <LoadingButton
            onClick={() => handleButtonClick('start-journey', '/login')}
            isLoading={loadingStates['start-journey']}
            loadingText="Starting Journey..."
            size="lg"
            className="px-12 py-4 text-xl gap-3 shadow-2xl"
          >
            Start Your Journey Today
            <Play className="h-6 w-6" />
          </LoadingButton>
        </div>
      </div>
    </section>
  )
}
