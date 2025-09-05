'use client'

import React from 'react'
import { ArrowRight, Mountain } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void
}

export default function TourCategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const categories = [
    {
      id: 'safari',
      name: 'Safari',
      icon: '🦁',
      description: 'Wildlife adventures'
    },
    {
      id: 'cultural',
      name: 'Cultural Tours',
      icon: '🏛️',
      description: 'Local experiences'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      icon: '🏔️',
      description: 'Thrill seeking'
    },
    {
      id: 'beach',
      name: 'Beach & Islands',
      icon: '🏖️',
      description: 'Coastal getaways'
    },
    {
      id: 'wildlife',
      name: 'Wildlife',
      icon: '🐘',
      description: 'Animal encounters'
    },
    {
      id: 'mountain',
      name: 'Mountain Climbing',
      icon: '⛰️',
      description: 'Peak adventures'
    }
  ]
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tour Categories</h2>
          <p className="text-gray-600">Choose your perfect adventure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{category.icon}</div>
              <ArrowRight className="h-5 w-5 text-gray-400 transition-colors" style={{ color: '#008080' }} />
            </div>
            <h3 className="font-bold text-gray-900 transition-colors mb-2" style={{ color: '#008080' }}>
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
