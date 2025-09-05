'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'

interface AboutCTAProps {
  handleButtonClick: (buttonId: string, redirectUrl?: string) => Promise<void>
  loadingStates: Record<string, boolean>
}

export default function AboutCTASection({ handleButtonClick, loadingStates }: AboutCTAProps) {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="African sunset landscape"
          fill
          className="object-cover"
          unoptimized
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
              onClick={() => handleButtonClick('cta-book', '/login')}
              isLoading={loadingStates['cta-book']}
              loadingText="Booking Adventure..."
              size="lg"
              className="px-12 py-5 text-xl gap-3 bg-secondary hover:bg-secondary/90 shadow-2xl"
            >
              Book Your Safari
              <ArrowRight className="h-6 w-6" />
            </LoadingButton>
            
            <LoadingButton
              onClick={() => handleButtonClick('cta-contact', '/login')}
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
  )
}
