'use client'

import React from 'react'
import { Users, Heart, Shield } from 'lucide-react'

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Africa like never before with our expert guides, luxury accommodations, and unmatched service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Expert Local Guides',
              description: 'Our experienced guides know every corner of Africa and will make your safari unforgettable with their deep knowledge of wildlife and culture.',
              icon: Users
            },
            {
              title: 'Luxury Accommodations',
              description: 'Stay in carefully selected luxury lodges and camps that offer comfort and authenticity in the heart of the wilderness.',
              icon: Heart
            },
            {
              title: 'Safety & Security',
              description: 'Your safety is our top priority. All our tours are fully insured with comprehensive safety protocols and 24/7 support.',
              icon: Shield
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
