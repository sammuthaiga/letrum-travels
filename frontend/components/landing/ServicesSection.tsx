'use client'

import React from 'react'
import { Globe, Plane, Car, FileText, ShoppingBag, User } from 'lucide-react'

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-20 px-2">
          <div className="inline-block px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold mb-6">
            Our Services
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Everything You Need for the Perfect Trip
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From luxury safari tours to cultural experiences, we provide comprehensive travel solutions
          </p>
        </div>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 lg:gap-8">
          {[
            {
              id: 'safari-tours',
              title: 'Safari Tours',
              description: 'Experience the African wilderness with expert guides and luxury accommodations.',
              icon: Globe,
              image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
              id: 'flight-booking',
              title: 'Flight Booking',
              description: 'Seamless flight booking with competitive prices and flexible options.',
              icon: Plane,
              image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
              id: 'car-rentals',
              title: 'Car Rentals',
              description: 'Premium 4WD vehicles with experienced drivers for safe travel.',
              icon: Car,
              image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
              id: 'visa-processing',
              title: 'Visa Processing',
              description: 'Complete visa assistance and document processing services.',
              icon: FileText,
              image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
              id: 'travel-products',
              title: 'Travel Products',
              description: 'Essential travel gear and accessories for your adventures.',
              icon: ShoppingBag,
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
              id: 'client-account',
              title: 'Client Account',
              description: 'Personalized dashboard to manage bookings and exclusive offers.',
              icon: User,
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            }
          ].map((service, index) => (
                        <div
              key={index}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              onClick={() => window.location.href = `/services/${service.id}`}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Icon */}
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {service.description}
                </p>
                
                <button className="w-full py-3 text-lg shadow-lg bg-[#008080] hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}