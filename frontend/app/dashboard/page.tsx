'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  User, MapPin, Calendar, Clock, CreditCard, 
  Bell, Settings, LogOut, Home, Plane, Car,
  Package, FileText, ShoppingBag, Star,
  Eye, Edit, Trash2, Download, Filter,
  Search, Plus, Globe, Heart, TrendingUp,
  Award, BookOpen, Phone, Mail,
  ChevronRight, ArrowUpRight, ExternalLink,
  Menu, X, ChevronDown, CheckCircle2,
  AlertTriangle, Loader2
} from 'lucide-react'
import { authAPI, usersAPI, toursAPI, Tour, Booking, User as UserType } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { LoadingButton } from '@/components/ui/loading-button'
import FlightsPageComponent from '@/components/flights/FlightsPage'
import CarsPage from '@/components/cars/CarsPage'
import VisaPage from '@/components/visa/VisaPage'
import ToursPageComponent from '@/components/tours/ToursPage'
import ShopPageComponent from '@/components/shop/ShopPage'

// Define pages/sections
type DashboardPage = 
  | 'overview' 
  | 'flights' 
  | 'cars' 
  | 'tours' 
  | 'bookings' 
  | 'visa' 
  | 'shop' 
  | 'profile'
  | 'flight-search'
  | 'car-search'
  | 'tour-details'
  | 'visa-apply'
  | 'shop-products'

interface NavigationItem {
  id: DashboardPage
  label: string
  icon: React.ElementType
  badge?: string
  color?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [currentPage, setCurrentPage] = useState<DashboardPage>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState<Tour[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  // Navigation items with company colors
  const navigationItems: NavigationItem[] = [
    { id: 'overview', label: 'Overview', icon: Home, color: '#809fff' },
    { id: 'tours', label: 'Tours & Safari', icon: MapPin, color: '#008080' },
    { id: 'cars', label: 'Hire a Car', icon: Car, color: '#FFE500' },
    { id: 'visa', label: 'Visa Services', icon: FileText, color: '#008080' },
    { id: 'flights', label: 'Flights', icon: Plane, badge: 'New', color: '#FFE500' },
    { id: 'shop', label: 'Products', icon: ShoppingBag, color: '#008080' },
    { id: 'bookings', label: 'My Bookings', icon: Calendar, color: '#FFE500' },
    { id: 'profile', label: 'Profile', icon: User, color: '#008080' },
  ]

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = authAPI.isAuthenticated()
      if (!isAuth) {
        router.push('/auth/login')
        return
      }

      const user = authAPI.getCurrentUser()
      if (user) {
        setCurrentUser(user)
        await loadDashboardData()
      } else {
        router.push('/auth/login')
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      const [toursData, bookingsData] = await Promise.all([
        toursAPI.getPopular(8),
        toursAPI.getMyBookings().catch(() => []), // Fallback if no bookings
      ])
      setTours(toursData)
      setBookings(bookingsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  // Handle logout
  const handleLogout = () => {
    authAPI.logout()
    router.push('/')
  }

  // Handle loading states
  const handleAction = async (actionId: string, action: () => Promise<void>) => {
    setLoadingStates(prev => ({ ...prev, [actionId]: true }))
    try {
      await action()
    } catch (error) {
      console.error(`Action ${actionId} failed:`, error)
    } finally {
      setLoadingStates(prev => ({ ...prev, [actionId]: false }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-20 h-20 mb-4 mx-auto text-blue-600 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Please wait while we prepare your travel companion</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              <span className="text-primary">Letrum</span> Dashboard
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-10 w-10 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-primary">Letrum</span> Agency
                </h1>
              </div>

              {/* User Profile Card */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {currentUser?.email}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {currentUser?.role}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start h-12 ${
                      isActive 
                        ? 'shadow-lg' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={isActive ? { 
                      backgroundColor: item.color || '#FFE500', 
                      color: item.color === '#FFE500' ? '#000000' : '#FFFFFF'
                    } : {}}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setIsSidebarOpen(false)
                    }}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? 'secondary' : 'default'} 
                        className={`ml-2 ${isActive ? 'bg-white/20' : 'bg-primary text-white'}`}
                        style={isActive ? { 
                          backgroundColor: item.color === '#FFE500' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                          color: item.color === '#FFE500' ? '#000000' : '#FFFFFF'
                        } : {}}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className={`h-4 w-4 ml-2 ${isActive ? (item.color === '#FFE500' ? 'text-black' : 'text-white') : 'text-gray-400'}`} />
                  </Button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-gray-200 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-12"
                onClick={() => setCurrentPage('profile')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            {currentPage === 'overview' && <OverviewPage 
              user={currentUser} 
              tours={tours} 
              bookings={bookings} 
              onNavigate={setCurrentPage}
              loadingStates={loadingStates}
              onAction={handleAction}
            />}
            {currentPage === 'flights' && <FlightsPage />}
            {currentPage === 'cars' && <CarsPageComponent />}
            {currentPage === 'tours' && <ToursPageWrapper />}
            {currentPage === 'bookings' && <BookingsPage bookings={bookings} />}
            {currentPage === 'visa' && <VisaPageComponent />}
            {currentPage === 'shop' && <ShopPageWrapper />}
            {currentPage === 'profile' && <ProfilePage user={currentUser} />}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Overview Page Component
function OverviewPage({ 
  user, 
  tours, 
  bookings, 
  onNavigate, 
  loadingStates, 
  onAction 
}: { 
  user: UserType | null
  tours: Tour[]
  bookings: Booking[]
  onNavigate: (page: DashboardPage) => void
  loadingStates: Record<string, boolean>
  onAction: (id: string, action: () => Promise<void>) => Promise<void>
}) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 text-gray-900 relative overflow-hidden border border-gray-200 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-xl mb-6 max-w-2xl text-black">
                Ready for your next African adventure? Explore breathtaking destinations, 
                book flights, and discover the magic of safari life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <LoadingButton
                isLoading={loadingStates['quick-tour']}
                loadingText="Loading..."
                className="border border-gray-300 backdrop-blur-sm px-6 py-3 text-black hover:bg-gray-100"
                onClick={() => onAction('quick-tour', async () => onNavigate('tours'))}
                style={{ backgroundColor: '#FFE500', borderColor: '#008080' }}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Tours
              </LoadingButton>
              <LoadingButton
                isLoading={loadingStates['quick-flight']}
                loadingText="Loading..."
                className="px-6 py-3 text-white hover:opacity-90"
                onClick={() => onAction('quick-flight', async () => onNavigate('flights'))}
                style={{ backgroundColor: '#008080' }}
              >
                <Plane className="h-5 w-5 mr-2" />
                Book Flight
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Countries Visited', value: '3', icon: Globe, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Upcoming Trips', value: bookings.filter(b => b.status === 'CONFIRMED').length, icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Loyalty Points', value: '2,450', icon: Award, color: 'text-orange-600', bg: 'bg-orange-100' },
        ].map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600">Get started with your next adventure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Search Flights', 
              description: 'Find the best flight deals', 
              icon: Plane, 
              color: 'from-blue-500 to-cyan-500',
              action: () => onNavigate('flights')
            },
            { 
              title: 'Rent a Car', 
              description: 'Browse available vehicles', 
              icon: Car, 
              color: 'from-green-500 to-emerald-500',
              action: () => onNavigate('cars')
            },
            { 
              title: 'Book Tours', 
              description: 'Discover amazing experiences', 
              icon: MapPin, 
              color: 'from-purple-500 to-pink-500',
              action: () => onNavigate('tours')
            },
            { 
              title: 'Apply for Visa', 
              description: 'Get travel documents', 
              icon: FileText, 
              color: 'from-orange-500 to-red-500',
              action: () => onNavigate('visa')
            },
          ].map((action, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
              onClick={action.action}
            >
              <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Featured Tours */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Tours</h2>
            <p className="text-gray-600">Handpicked adventures waiting for you</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => onNavigate('tours')}
            className="gap-2"
          >
            View All Tours
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.slice(0, 4).map((tour, index) => (
            <div 
              key={tour.id} 
              className="group cursor-pointer"
              onClick={() => onNavigate('tours')}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.featuredImage || tour.images[0] || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-gray-900">${tour.price}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    <span className="text-white font-medium text-sm">{tour.averageRating || '4.9'}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-primary mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{tour.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {tour.shortDesc || tour.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {tour.duration} days
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Bookings */}
      {bookings.length > 0 && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
              <p className="text-gray-600">Keep track of your adventures</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onNavigate('bookings')}
              className="gap-2"
            >
              View All Bookings
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking, index) => (
              <div key={booking.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {booking.tour?.title || `${booking.type} Booking`}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Booking ID: {booking.id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}
                    className={
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {booking.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">${booking.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// Placeholder components for other pages (to be implemented next)
function FlightsPage() {
  return <FlightsPageComponent />
}

function CarsPageComponent() {
  return <CarsPage />
}

function ToursPageWrapper() {
  return <ToursPageComponent />
}

function BookingsPage({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">Manage all your travel bookings in one place</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <Card className="p-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Bookings Yet</h2>
            <p className="text-gray-600 mb-8">Start planning your African adventure!</p>
            <Button className="bg-primary hover:bg-primary/90">
              <MapPin className="h-4 w-4 mr-2" />
              Explore Tours
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {booking.tour?.title || `${booking.type} Booking`}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ID: {booking.id} • Amount: ${booking.totalAmount}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}
                  className={
                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function VisaPageComponent() {
  return <VisaPage />
}

function ShopPageWrapper() {
  return <ShopPageComponent />
}

function ProfilePage({ user }: { user: UserType | null }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary text-white font-bold text-xl">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-600">{user?.email}</p>
                <Badge variant="secondary" className="mt-2">
                  {user?.role}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <Input value={user?.firstName || ''} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <Input value={user?.lastName || ''} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input value={user?.email || ''} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input value={user?.phone || 'Not provided'} disabled />
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-primary hover:bg-primary/90">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Account Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Member Since</span>
              <span className="font-medium">{new Date(user?.createdAt || '').getFullYear()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Account Status</span>
              <Badge variant={user?.isActive ? 'default' : 'secondary'}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Bookings</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Loyalty Points</span>
              <span className="font-medium">2,450</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}