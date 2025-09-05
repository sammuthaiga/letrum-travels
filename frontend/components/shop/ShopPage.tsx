'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  ShoppingBag, Search, Filter, Star, Heart,
  Plus, Minus, Eye, ShoppingCart, CreditCard,
  Truck, Shield, Award, ArrowRight, Grid3X3,
  List, SortAsc, Package, MapPin, Clock,
  Check, X, AlertCircle, DollarSign, Tag,
  Users, ThumbsUp, Camera, Zap, Gift
} from 'lucide-react'
import { productsAPI, Product, CartItem, Order } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingButton } from '@/components/ui/loading-button'

// Local types for shop functionality
interface ProductFilters {
  category: string
  minPrice: number
  maxPrice: number
  rating: number
  availability: boolean
}

interface ShoppingCartState {
  items: CartItem[]
  total: number
}

const productCategories = [
  { id: 'SAFARI_GEAR', name: 'Safari Gear', icon: '🎒', description: 'Essential equipment for your safari adventure' },
  { id: 'CLOTHING', name: 'Safari Clothing', icon: '👕', description: 'Comfortable and practical safari wear' },
  { id: 'ELECTRONICS', name: 'Electronics', icon: '📱', description: 'Cameras, GPS, and tech accessories' },
  { id: 'BOOKS', name: 'Travel Guides', icon: '📚', description: 'Comprehensive guides and maps' },
  { id: 'SOUVENIRS', name: 'Souvenirs', icon: '🎁', description: 'Authentic African crafts and gifts' },
  { id: 'CAMPING', name: 'Camping Gear', icon: '⛺', description: 'Tents, sleeping bags, and outdoor equipment' },
]

const featuredProducts = [
  {
    id: '1',
    name: 'Professional Safari Binoculars 10x42',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 127,
    image: '/binoculars.jpg',
    category: 'SAFARI_GEAR',
    badge: 'Best Seller'
  },
  {
    id: '2', 
    name: 'Lightweight Safari Jacket',
    price: 89,
    originalPrice: 129,
    rating: 4.6,
    reviews: 89,
    image: '/safari-jacket.jpg',
    category: 'CLOTHING',
    badge: 'Sale'
  },
  {
    id: '3',
    name: 'Waterproof Camera Case',
    price: 45,
    originalPrice: 59,
    rating: 4.7,
    reviews: 156,
    image: '/camera-case.jpg',
    category: 'ELECTRONICS',
    badge: 'New'
  },
  {
    id: '4',
    name: 'East Africa Wildlife Guide',
    price: 24,
    originalPrice: 29,
    rating: 4.9,
    reviews: 203,
    image: '/wildlife-guide.jpg',
    category: 'BOOKS',
    badge: 'Top Rated'
  }
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredItems, setFeaturedItems] = useState(featuredProducts)
  const [cart, setCart] = useState<ShoppingCartState>({ items: [], total: 0 })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name' | 'newest'>('price')
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    availability: true
  })

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await productsAPI.getAll()
        setProducts(allProducts)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    loadProducts()
  }, [])

  // Calculate cart total
  useEffect(() => {
    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setCart(prev => ({ ...prev, total }))
  }, [cart.items])

  const handleSearch = async () => {
    if (!searchQuery && !selectedCategory) {
      alert('Please enter a search term or select a category')
      return
    }

    setIsLoading(true)
    setHasSearched(true)
    
    try {
      let results = await productsAPI.getAll()
      
      // Filter by search query
      if (searchQuery) {
        results = results.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      // Filter by category
      if (selectedCategory) {
        results = results.filter(product => product.category === selectedCategory)
      }
      
      setProducts(results)
    } catch (error) {
      console.error('Error searching products:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickSearch = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    
    setTimeout(() => {
      handleSearch()
    }, 100)
  }

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.productId === product.id)
      
      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
      } else {
        const newItem: CartItem = {
          productId: product.id,
          price: product.price,
          quantity: quantity,
          product: product
        }
        return {
          ...prev,
          items: [...prev.items, newItem]
        }
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.productId !== productId)
    }))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }))
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Best Seller': 'bg-green-100 text-green-800',
      'Sale': 'bg-red-100 text-red-800',
      'New': 'bg-blue-100 text-blue-800',
      'Top Rated': 'bg-purple-100 text-purple-800'
    }
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false
      if (filters.category && product.category !== filters.category) return false
      if (filters.availability && product.stockQuantity <= 0) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

  if (showCheckout) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowCheckout(false)}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Shop
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600 mt-2">Complete your purchase</p>
            </div>
          </div>
        </div>

        {/* Checkout Interface */}
        <Card className="p-8 border-blue-200 bg-blue-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">E-commerce Checkout System</h2>
            <p className="text-gray-600 mb-8">
              Advanced checkout interface with payment processing, shipping options, and order management is under development.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowCheckout(false)}
                variant="outline"
              >
                Continue Shopping
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Complete Development
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            Safari Shop
          </h1>
          <p className="text-gray-600 mt-2">Essential gear and souvenirs for your African adventure</p>
        </div>
        
        {/* Cart Button */}
        <Button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart ({cart.items.length})
          {cart.items.length > 0 && (
            <Badge className="ml-2 bg-red-500">
              {cart.items.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for safari gear, clothing, electronics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              >
                <option value="">All Categories</option>
                {productCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <LoadingButton
              onClick={handleSearch}
              isLoading={isLoading}
              loadingText="Searching products..."
              size="lg"
              className="px-12 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center gap-3"
            >
              <Search className="h-5 w-5" />
              Search Products
            </LoadingButton>
          </div>
        </div>
      </Card>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <Button variant="outline" size="sm" onClick={() => setShowCart(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {cart.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product?.name || 'Product'}</h3>
                    <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-2 text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total: {formatPrice(cart.total)}</span>
                </div>
                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Product Categories */}
      {!hasSearched && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
              <p className="text-gray-600">Find everything you need for your safari adventure</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
                onClick={() => handleQuickSearch(category.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Featured Products */}
      {!hasSearched && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600">Top-rated safari essentials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((product) => (
              <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow group">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-blue-600 opacity-50" />
                  </div>
                  {product.badge && (
                    <Badge className={`absolute top-2 left-2 ${getBadgeColor(product.badge)}`}>
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        description: 'Featured product description',
                        shortDescription: 'Featured product',
                        price: product.price,
                        currency: 'USD',
                        category: product.category,
                        sku: `SKU-${product.id}`,
                        stockQuantity: 10,
                        lowStockThreshold: 2,
                        images: [],
                        featuredImage: '',
                        tags: [],
                        isActive: true,
                        isFeatured: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                      })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredAndSortedProducts.length > 0 ? `${filteredAndSortedProducts.length} products found` : 'No products found'}
              </h2>
              {filteredAndSortedProducts.length > 0 && (
                <p className="text-gray-600">
                  {searchQuery && `"${searchQuery}" • `}
                  {selectedCategory && `${productCategories.find(c => c.id === selectedCategory)?.name} • `}
                  Showing all results
                </p>
              )}
            </div>

            {filteredAndSortedProducts.length > 0 && (
              <div className="flex gap-4">
                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="price">Sort by Price</option>
                  <option value="name">Sort by Name</option>
                  <option value="newest">Sort by Newest</option>
                </select>

                {/* Filter Button */}
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            )}
          </div>

          {/* Product Grid/List */}
          {isLoading ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredAndSortedProducts.map((product) => (
                <Card key={product.id} className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
                  <div className={`${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                    {/* Product Image */}
                    <div className={`${viewMode === 'list' ? 'w-32 h-32' : 'w-full h-48'} bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mb-4 relative`}>
                      <ShoppingBag className="h-12 w-12 text-blue-600 opacity-50" />
                      {product.stockQuantity <= 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="space-y-2 mb-4">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {productCategories.find(c => c.id === product.category)?.name}
                          </Badge>
                          {product.stockQuantity > 0 ? (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              In Stock ({product.stockQuantity})
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(product.price)}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => addToCart(product)}
                            disabled={product.stockQuantity <= 0}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : hasSearched && !isLoading ? (
            <Card className="p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
                <p className="text-gray-600 mb-8">
                  We couldn't find any products matching your search. Try different keywords or browse by category.
                </p>
                <Button 
                  onClick={() => {
                    setHasSearched(false)
                    setProducts([])
                    setSearchQuery('')
                    setSelectedCategory('')
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Browse All Products
                </Button>
              </div>
            </Card>
          ) : null}
        </div>
      )}

      {/* Info Cards */}
      {!hasSearched && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-6 w-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Free Shipping</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Free shipping on orders over $100. Fast delivery to your location or hotel.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
            </div>
            <p className="text-gray-600 text-sm">
              All products are carefully selected and tested for safari conditions.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-6 w-6 text-purple-600" />
              <h3 className="font-bold text-gray-900">Expert Curation</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Products recommended by experienced safari guides and travelers.
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
