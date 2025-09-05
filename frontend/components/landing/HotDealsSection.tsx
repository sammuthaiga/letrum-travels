'use client'

import React, { useState, useEffect } from 'react'
import { Clock, MapPin, Users, Star, Heart, Badge, Percent, Calendar, Eye, EyeOff } from 'lucide-react'

interface HotDeal {
  id: string
  title: string
  description: string
  shortDesc: string
  originalPrice: number
  discountPrice: number
  discountPercent: number
  duration: string
  location: string
  images: string[]
  featuredImage: string
  highlights: string[]
  inclusions: string[]
  maxGuests: number
  category: string
  difficulty: string
  startDate: string
  endDate: string
  isActive: boolean
  isFeatured: boolean
  availableSlots: number
  bookedSlots: number
  createdAt: string
  updatedAt: string
}

export default function HotDealsSection() {
  const [hotDeals, setHotDeals] = useState<HotDeal[]>([])
  const [loading, setLoading] = useState(true)
  const [likedDeals, setLikedDeals] = useState<Set<string>>(new Set())
  const [showAll, setShowAll] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [priceAnimations, setPriceAnimations] = useState<Record<string, boolean>>({})
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  // High-quality, verified Kenya tourism images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1549366021-9f761d040115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1468359601543-843bfaef291a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]

  useEffect(() => {
    fetchHotDeals()
  }, [])

  // Staggered visibility animation
  useEffect(() => {
    if (!loading && hotDeals.length > 0) {
      const displayedDeals = getDisplayedDeals()
      displayedDeals.forEach((deal, index) => {
        setTimeout(() => {
          setVisibleCards(prev => new Set([...prev, deal.id]))
        }, index * 200)
      })
    }
  }, [hotDeals, loading, showAll])

  const fetchHotDeals = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/v1/hot-deals?active=true&limit=8')
      if (response.ok) {
        const data = await response.json()
        const dealsWithImages = data.map((deal: HotDeal, index: number) => ({
          ...deal,
          featuredImage: deal.featuredImage || fallbackImages[index % fallbackImages.length]
        }))
        setHotDeals(dealsWithImages)
      } else {
        console.error('Failed to fetch hot deals')
        createFallbackDeals()
      }
    } catch (error) {
      console.error('Error fetching hot deals:', error)
      createFallbackDeals()
    } finally {
      setLoading(false)
    }
  }

  const createFallbackDeals = () => {
    const fallbackDeals: HotDeal[] = Array.from({ length: 8 }, (_, index) => ({
      id: `deal-${index + 1}`,
      title: `Tsavo East & West National Parks`,
      shortDesc: "Amazing safari experience in Kenya's wilderness",
      originalPrice: 3000 + (index * 200),
      discountPrice: 2250 + (index * 150),
      discountPercent: 25,
      duration: `${6 + index} Days / ${5 + index} Nights`,
      location: ["Tsavo East & West National Parks", "Amboseli National Park", "Maasai Mara National Reserve", "Aberdare National Park"][index % 4],
      featuredImage: fallbackImages[index % fallbackImages.length],
      category: index % 2 === 0 ? "Safari" : "Adventure",
      maxGuests: 8,
      availableSlots: 12,
      bookedSlots: 3,
      endDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
      description: "",
      images: [fallbackImages[index % fallbackImages.length]],
      highlights: ["Great experience", "Professional guides"],
      inclusions: ["Accommodation", "Meals"],
      difficulty: "Easy",
      startDate: new Date().toISOString(),
      isActive: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
    setHotDeals(fallbackDeals)
  }

  const toggleLike = (dealId: string) => {
    setLikedDeals(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(dealId)) {
        newLiked.delete(dealId)
      } else {
        newLiked.add(dealId)
      }
      return newLiked
    })
  }

  const handleCardHover = (dealId: string) => {
    setHoveredCard(dealId)
    setTimeout(() => {
      setPriceAnimations(prev => ({ ...prev, [dealId]: true }))
    }, 300)
  }

  const handleCardLeave = (dealId: string) => {
    setHoveredCard(null)
    setPriceAnimations(prev => ({ ...prev, [dealId]: false }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getDisplayedDeals = () => {
    return showAll ? hotDeals.slice(0, 8) : hotDeals.slice(0, 4)
  }

  if (loading) {
    return (
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #e6fffa 0%, #ccfbf1 50%, #a7f3d0 100%)' }}>
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl h-[560px]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e6fffa 0%, #ccfbf1 50%' }}>
      {/* Background Decorations with #008080 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #008080, #006666)' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #008080, #004d4d)', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #008080, #00a0a0)', animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with #008080 theme */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full font-bold mb-8 shadow-2xl animate-bounce-subtle" style={{ background: 'linear-gradient(45deg, #008080, #00a0a0, #008080)' }}>
            <Badge className="w-6 h-6 animate-spin-slow" />
            <span className="text-lg">🔥 HOT DEALS 🔥</span>
            <Percent className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight animate-gradient-text" style={{ background: 'linear-gradient(45deg, #008080, #00a0a0, #006666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Kenya's Best Deals
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            🎯 Limited-time offers on Kenya's most spectacular destinations. Book now and save up to 30%! ⏰
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {getDisplayedDeals().map((deal, index) => (
            <div
              key={deal.id}
              className={`
                group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer
                transform transition-all duration-700 ease-out h-[580px] flex flex-col
                hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.03]
                ${visibleCards.has(deal.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              onMouseEnter={() => handleCardHover(deal.id)}
              onMouseLeave={() => handleCardLeave(deal.id)}
              style={{
                transitionDelay: visibleCards.has(deal.id) ? '0ms' : `${index * 200}ms`
              }}
            >
              {/* Discount Badge with #008080 */}
              <div className="absolute top-4 left-4 z-20">
                <div className={`text-white px-3 py-1 rounded-full font-bold shadow-xl transition-all duration-500 ${
                  hoveredCard === deal.id ? 'scale-110 shadow-2xl rotate-3' : ''
                }`} style={{ background: 'linear-gradient(45deg, #008080, #00a0a0)' }}>
                  <span className="text-xs">-{deal.discountPercent}% OFF</span>
                </div>
              </div>

              {/* Save Amount with #008080 */}
              <div className={`absolute top-4 right-4 z-20 transition-all duration-1000 ease-out transform ${
                hoveredCard === deal.id 
                  ? 'translate-x-0 opacity-100 scale-100 delay-300' 
                  : 'translate-x-full opacity-0 scale-75'
              }`}>
                <div className="text-white px-3 py-1 rounded-full font-bold shadow-xl" style={{ background: 'linear-gradient(45deg, #008080, #006666)' }}>
                  <span className="text-xs">💰 Save {formatPrice(deal.originalPrice - deal.discountPrice)}</span>
                </div>
              </div>

              {/* Heart Icon with #008080 */}
              <button
                onClick={() => toggleLike(deal.id)}
                className={`absolute z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 transition-all duration-500 ease-out hover:scale-125 hover:bg-white shadow-lg ${
                  hoveredCard === deal.id ? 'top-12 right-4' : 'top-4 right-12'
                }`}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    likedDeals.has(deal.id) 
                      ? 'animate-heartbeat' 
                      : 'text-gray-600'
                  }`}
                  style={{
                    fill: likedDeals.has(deal.id) ? '#008080' : 'none',
                    color: likedDeals.has(deal.id) ? '#008080' : '#6b7280'
                  }}
                />
              </button>

              {/* Image Section - Fixed height with consistent aspect ratio */}
              <div className="relative overflow-hidden h-[340px] flex-shrink-0">
                <img
                  src={deal.featuredImage}
                  alt={deal.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImages[index % fallbackImages.length]
                  }}
                />

                {/* Days Left Badge - Enhanced positioning */}
                <div className={`absolute bottom-4 left-4 transition-all duration-1000 ease-out transform ${
                  hoveredCard === deal.id 
                    ? 'translate-y-0 opacity-100 scale-100 delay-700' 
                    : 'translate-y-8 opacity-0 scale-75'
                }`}>
                  <div 
                    className="text-white px-4 py-2 rounded-full font-bold border border-white/30 backdrop-blur-sm" 
                    style={{ 
                      background: 'linear-gradient(45deg, #008080, #00a0a0)',
                      boxShadow: '0 4px 20px rgba(0, 128, 128, 0.6)'
                    }}
                  >
                    <Clock className="w-6 h-6 inline mr-2 text-white" />
                    <span className="text-sm font-bold">{getDaysLeft(deal.endDate)} days left</span>
                  </div>
                </div>

                {/* Image Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-700 ease-out"></div>

                {/* Image Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-1000 ease-out">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>
              </div>

              {/* Content Section - Flexible with guaranteed button space */}
              <div className="px-6 py-5 flex flex-col flex-grow min-h-[240px]">
                {/* Title */}
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-[#008080] transition-colors duration-300">
                  {deal.title}
                </h3>

                {/* Location and Duration - More spaced */}
                <div className="space-y-2 mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#008080' }} />
                    <span className="text-sm text-gray-600 truncate">{deal.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#008080' }} />
                    <span className="text-sm text-gray-600">{deal.duration}</span>
                  </div>
                </div>

                {/* Spacer to push pricing and button to bottom */}
                <div className="flex-grow"></div>

                {/* Pricing Section - Always at bottom */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`font-bold text-xl transition-all duration-700 ease-out ${
                          priceAnimations[deal.id] ? 'scale-110' : ''
                        }`}
                        style={{ 
                          color: priceAnimations[deal.id] ? '#008080' : '#1f2937'
                        }}
                      >
                        {formatPrice(deal.discountPrice)}
                      </span>
                      <span className={`text-gray-500 line-through text-base transition-all duration-700 ease-out ${
                        priceAnimations[deal.id] ? 'opacity-100 scale-105 text-red-500' : 'opacity-70'
                      }`}>
                        {formatPrice(deal.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">4.8</span>
                    </div>
                  </div>
                  
                  <span className="text-sm text-gray-600 mb-4 block">per person</span>

                  {/* Book Now Button - Always fully visible at bottom */}
                  <button 
                    className="w-full text-white font-bold rounded-xl transition-all duration-500 ease-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl py-4 px-4 text-base"
                    style={{ 
                      backgroundColor: '#008080',
                      boxShadow: '0 4px 12px rgba(0, 128, 128, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#006666'
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 128, 128, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#008080'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 128, 128, 0.3)'
                    }}
                  >
                    🔥 Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More/Less Button with #008080 */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setShowAll(!showAll)
              setVisibleCards(new Set())
            }}
            className="group bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-gray-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out border border-gray-200 transform hover:scale-105"
            style={{
              borderColor: hoveredCard ? '#008080' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#008080'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <div className="flex items-center gap-3">
              {showAll ? (
                <>
                  <EyeOff className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  View Less Deals
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  View All 8 Deals
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradientText 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          max-height: 2.8em;
        }
      `}</style>
    </section>
  )
}
























// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Clock, MapPin, Users, Star, Heart, Badge, Percent, Calendar, Eye, EyeOff } from 'lucide-react'

// interface HotDeal {
//   id: string
//   title: string
//   description: string
//   shortDesc: string
//   originalPrice: number
//   discountPrice: number
//   discountPercent: number
//   duration: string
//   location: string
//   images: string[]
//   featuredImage: string
//   highlights: string[]
//   inclusions: string[]
//   maxGuests: number
//   category: string
//   difficulty: string
//   startDate: string
//   endDate: string
//   isActive: boolean
//   isFeatured: boolean
//   availableSlots: number
//   bookedSlots: number
//   createdAt: string
//   updatedAt: string
// }

// export default function HotDealsSection() {
//   const [hotDeals, setHotDeals] = useState<HotDeal[]>([])
//   const [loading, setLoading] = useState(true)
//   const [likedDeals, setLikedDeals] = useState<Set<string>>(new Set())
//   const [showAll, setShowAll] = useState(false)
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null)
//   const [priceAnimations, setPriceAnimations] = useState<Record<string, boolean>>({})

//   // High-quality, verified Kenya tourism images
//   const fallbackImages = [
//     "https://images.unsplash.com/photo-1549366021-9f761d040115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Safari
//     "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Elephants
//     "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Lions
//     "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Beach
//     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Mountain
//     "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Coast
//     "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Culture
//     "https://images.unsplash.com/photo-1468359601543-843bfaef291a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Adventure
//     "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Birds
//     "https://images.unsplash.com/photo-1562786193-89d5c5b69fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Landscape
//   ]

//   useEffect(() => {
//     fetchHotDeals()
//   }, [])

//   const fetchHotDeals = async () => {
//     try {
//       setLoading(true)
//       // Fetch all active deals, not just featured ones
//       const response = await fetch('http://localhost:5000/api/v1/hot-deals?active=true&limit=10')
//       if (response.ok) {
//         const data = await response.json()
//         // Ensure each deal has a working image
//         const dealsWithImages = data.map((deal: HotDeal, index: number) => ({
//           ...deal,
//           featuredImage: deal.featuredImage || fallbackImages[index % fallbackImages.length]
//         }))
//         setHotDeals(dealsWithImages)
//       } else {
//         console.error('Failed to fetch hot deals')
//         // Use fallback data if API fails
//         createFallbackDeals()
//       }
//     } catch (error) {
//       console.error('Error fetching hot deals:', error)
//       createFallbackDeals()
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createFallbackDeals = () => {
//     const fallbackDeals: HotDeal[] = Array.from({ length: 10 }, (_, index) => ({
//       id: `deal-${index + 1}`,
//       title: `Kenya Adventure ${index + 1}`,
//       shortDesc: "Amazing safari experience in Kenya's wilderness",
//       originalPrice: 2000 + (index * 200),
//       discountPrice: 1500 + (index * 150),
//       discountPercent: 25,
//       duration: `${3 + index} Days`,
//       location: "Kenya",
//       featuredImage: fallbackImages[index],
//       category: index % 2 === 0 ? "Safari" : "Adventure",
//       maxGuests: 8,
//       availableSlots: 12,
//       bookedSlots: 3,
//       endDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
//       // ... other required fields with default values
//       description: "",
//       images: [fallbackImages[index]],
//       highlights: ["Great experience", "Professional guides"],
//       inclusions: ["Accommodation", "Meals"],
//       difficulty: "Easy",
//       startDate: new Date().toISOString(),
//       isActive: true,
//       isFeatured: true,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     }))
//     setHotDeals(fallbackDeals)
//   }

//   const toggleLike = (dealId: string) => {
//     setLikedDeals(prev => {
//       const newLiked = new Set(prev)
//       if (newLiked.has(dealId)) {
//         newLiked.delete(dealId)
//       } else {
//         newLiked.add(dealId)
//       }
//       return newLiked
//     })
//   }

//   const handleCardHover = (dealId: string) => {
//     setHoveredCard(dealId)
//     // Trigger price animation after a delay
//     setTimeout(() => {
//       setPriceAnimations(prev => ({ ...prev, [dealId]: true }))
//     }, 500)
//   }

//   const handleCardLeave = (dealId: string) => {
//     setHoveredCard(null)
//     setPriceAnimations(prev => ({ ...prev, [dealId]: false }))
//   }

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//     }).format(price)
//   }

//   const getDaysLeft = (endDate: string) => {
//     const end = new Date(endDate)
//     const now = new Date()
//     const diffTime = end.getTime() - now.getTime()
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//     return diffDays > 0 ? diffDays : 0
//   }

//   const getDisplayedDeals = () => {
//     return showAll ? hotDeals : hotDeals.slice(0, 4)
//   }

//   const getGridClass = () => {
//     if (showAll) {
//       return "grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6"
//     }
//     return "grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8"
//   }

//   const getCardClass = (index: number) => {
//     const baseClass = "group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-4 hover:scale-[1.03] cursor-pointer flex flex-col"
//     const animationDelay = `animation-delay-${index * 100}`
    
//     if (showAll) {
//       return `${baseClass} ${animationDelay} animate-fade-in-up min-h-[450px]`
//     }
//     return `${baseClass} ${animationDelay} animate-fade-in-up min-h-[550px]`
//   }

//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
//         <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="animate-pulse">
//               <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mx-auto mb-4"></div>
//               <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 mx-auto"></div>
//             </div>
//           </div>
//           <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl h-[500px]"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
//       {/* Enhanced Background Decorations */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
//       </div>

//       <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Enhanced Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-full font-bold mb-8 shadow-2xl animate-bounce-subtle">
//             <Badge className="w-6 h-6 animate-spin-slow" />
//             <span className="text-lg">🔥 HOT DEALS 🔥</span>
//             <Percent className="w-6 h-6 animate-pulse" />
//           </div>
//           <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-8 leading-tight animate-gradient-text">
//             Kenya's Best Deals
//           </h2>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
//             🎯 Limited-time offers on Kenya's most spectacular destinations. Book now and save up to 30%! ⏰
//           </p>
//         </div>

//         {/* Enhanced Cards Grid */}
//         <div className={getGridClass()}>
//           {getDisplayedDeals().map((deal, index) => (
//             <div
//               key={deal.id}
//               className={getCardClass(index)}
//               onMouseEnter={() => handleCardHover(deal.id)}
//               onMouseLeave={() => handleCardLeave(deal.id)}
//               style={{
//                 animationDelay: `${index * 150}ms`
//               }}
//             >
//               {/* Enhanced Discount Badge with Hover Animation */}
//               <div className="absolute top-4 left-4 z-20">
//                 <div className={`bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-xl transition-all duration-500 ${
//                   hoveredCard === deal.id ? 'scale-110 shadow-2xl rotate-3' : ''
//                 }`}>
//                   <span className={`transition-all duration-300 ${showAll ? 'text-xs' : 'text-sm'}`}>
//                     -{deal.discountPercent}% OFF
//                   </span>
//                 </div>
//               </div>

//               {/* Enhanced Animated Save Amount - Slides in slowly first */}
//               <div className={`absolute top-4 right-4 z-20 transition-all duration-500 transform ${
//                 hoveredCard === deal.id 
//                   ? 'translate-x-0 opacity-100 scale-100 delay-150' 
//                   : 'translate-x-full opacity-0 scale-75'
//               }`}>
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-full font-bold shadow-xl border border-green-400/30">
//                   <span className={`${showAll ? 'text-xs' : 'text-sm'} flex items-center gap-2`}>
//                     💰 Save {formatPrice(deal.originalPrice - deal.discountPrice)}
//                   </span>
//                 </div>
//               </div>

//               {/* Enhanced Heart Icon */}
//               <button
//                 onClick={() => toggleLike(deal.id)}
//                 className={`absolute z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-125 hover:bg-white shadow-lg ${
//                   hoveredCard === deal.id ? 'top-16 right-4' : 'top-4 right-16'
//                 }`}
//               >
//                 <Heart
//                   className={`w-5 h-5 transition-all duration-300 ${
//                     likedDeals.has(deal.id) 
//                       ? 'fill-red-500 text-red-500 animate-heartbeat' 
//                       : 'text-gray-600 hover:text-red-400'
//                   }`}
//                 />
//               </button>

//               {/* Enhanced Image with Better Fallback - Significantly Larger */}
//               <div className={`relative overflow-hidden ${showAll ? 'h-72' : 'h-96'}`}>
//                 <img
//                   src={deal.featuredImage}
//                   alt={deal.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement
//                     target.src = fallbackImages[index % fallbackImages.length]
//                   }}
//                 />
//                 {/* Enhanced gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
//                 {/* Enhanced Days Left - Hidden initially, appears after save amount */}
//                 <div className={`absolute bottom-4 left-4 transition-all duration-700 transform ${
//                   hoveredCard === deal.id 
//                     ? 'translate-y-0 opacity-100 scale-100 delay-500' 
//                     : 'translate-y-8 opacity-0 scale-75'
//                 }`}>
//                   <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-bold shadow-xl border border-white/20">
//                     <Clock className="w-4 h-4 inline mr-2 text-orange-500" />
//                     <span className={`${showAll ? 'text-sm' : 'text-base'}`}>
//                       {getDaysLeft(deal.endDate)} days left
//                     </span>
//                   </div>
//                 </div>

//                 {/* Category Badge */}
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-orange-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold shadow-xl">
//                     <span className={`${showAll ? 'text-xs' : 'text-sm'}`}>
//                       {deal.category}
//                     </span>
//                   </span>
//                 </div>

//                 {/* Enhanced Image Shine Effect */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 </div>
//               </div>

//               {/* Compact Content Section - Optimized for better image-to-content ratio */}
//               <div className={`${showAll ? 'p-3' : 'p-4'} flex flex-col h-full`}>
//                 {/* Title - More compact */}
//                 <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 ${
//                   showAll ? 'text-sm' : 'text-lg'
//                 }`}>
//                   {deal.title}
//                 </h3>

//                 {/* Consolidated Essential Details - Removed spacing */}
//                 <div className="space-y-1 mb-2 flex-1">
//                   <div className={`flex items-center gap-2 text-gray-600 ${showAll ? 'text-xs' : 'text-sm'}`}>
//                     <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
//                     <span className="truncate">{deal.location}</span>
//                   </div>
//                   <div className={`flex items-center gap-2 text-gray-600 ${showAll ? 'text-xs' : 'text-sm'}`}>
//                     <Calendar className="w-3 h-3 text-orange-500 flex-shrink-0" />
//                     <span>{deal.duration}</span>
//                   </div>
//                 </div>

//                 {/* Enhanced Animated Pricing - Tighter spacing */}
//                 <div className="mb-2">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className={`font-bold text-gray-900 transition-all duration-700 ${
//                       priceAnimations[deal.id] ? 'scale-110 text-green-600 animate-pulse' : ''
//                     } ${showAll ? 'text-lg' : 'text-xl'}`}>
//                       {formatPrice(deal.discountPrice)}
//                     </span>
//                     <span className={`text-gray-500 line-through transition-all duration-1000 ${
//                       priceAnimations[deal.id] ? 'opacity-100 scale-105 text-red-500' : hoveredCard === deal.id ? 'opacity-100' : 'opacity-70'
//                     } ${showAll ? 'text-sm' : 'text-base'}`}>
//                       {formatPrice(deal.originalPrice)}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className={`text-gray-600 ${showAll ? 'text-xs' : 'text-sm'}`}>per person</span>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       <span className={`font-medium text-gray-600 ${showAll ? 'text-xs' : 'text-sm'}`}>4.8</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Enhanced Book Now Button - Compact with no top margin */}
//                 <button className={`w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group-hover:shadow-2xl ${
//                   showAll ? 'py-2 px-3 text-xs' : 'py-3 px-4 text-sm'
//                 }`}>
//                   <span className="flex items-center justify-center gap-2">
//                     🔥 Book Now
//                   </span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Enhanced View More/Less Button */}
//         <div className="text-center mt-12">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="group bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-gray-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-300"
//           >
//             <div className="flex items-center gap-3">
//               {showAll ? (
//                 <>
//                   <EyeOff className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//                   View Less Deals
//                 </>
//               ) : (
//                 <>
//                   <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//                   View All {hotDeals.length} Deals
//                 </>
//               )}
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Enhanced Custom Styles */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes heartbeat {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.1); }
//         }

//         @keyframes gradientText {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }

//         @keyframes bounceSubtle {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-5px); }
//         }

//         @keyframes spinSlow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }

//         .animate-slide-in {
//           animation: slideIn 0.5s ease-out forwards;
//         }

//         .animate-heartbeat {
//           animation: heartbeat 1s ease-in-out infinite;
//         }

//         .animate-gradient-text {
//           background-size: 200% 200%;
//           animation: gradientText 3s ease-in-out infinite;
//         }

//         .animate-bounce-subtle {
//           animation: bounceSubtle 2s ease-in-out infinite;
//         }

//         .animate-spin-slow {
//           animation: spinSlow 3s linear infinite;
//         }

//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .animation-delay-0 { animation-delay: 0ms; }
//         .animation-delay-100 { animation-delay: 100ms; }
//         .animation-delay-200 { animation-delay: 200ms; }
//         .animation-delay-300 { animation-delay: 300ms; }
//         .animation-delay-400 { animation-delay: 400ms; }
//         .animation-delay-500 { animation-delay: 500ms; }
//         .animation-delay-600 { animation-delay: 600ms; }
//         .animation-delay-700 { animation-delay: 700ms; }
//         .animation-delay-800 { animation-delay: 800ms; }
//         .animation-delay-900 { animation-delay: 900ms; }
//       `}</style>
//     </section>
//   )
// }
