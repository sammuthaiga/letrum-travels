'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Globe } from 'lucide-react'
import { authAPI } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingButton } from '@/components/ui/loading-button'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await authAPI.login(loginData)
      console.log('Login successful:', response)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await authAPI.register({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phoneNumber
      })
      
      console.log('Registration successful:', response)
      
      // Automatically log in and redirect
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Registration error:', error)
      setError(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="African safari landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="h-12 w-auto">
              <Image
                src="/letrum-logo-optimized.png"
                alt="Letrum Agency Logo"
                width={120}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <h1 className="text-3xl font-black text-white">
              <span className="text-primary">Letrum</span> Agency
            </h1>
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">
              {isLogin ? 'Welcome Back' : 'Join Letrum'}
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              {isLogin 
                ? 'Sign in to continue your adventure'
                : 'Create your account to start exploring'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-xl">
                {error}
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex bg-white/10 backdrop-blur-sm p-1 rounded-2xl">
              <Button
                type="button"
                variant={isLogin ? 'default' : 'ghost'}
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  isLogin 
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  setIsLogin(true)
                  setError('')
                }}
              >
                Sign In
              </Button>
              <Button
                type="button"
                variant={!isLogin ? 'default' : 'ghost'}
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  setIsLogin(false)
                  setError('')
                }}
              >
                Sign Up
              </Button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-semibold">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Signing In..."
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-all duration-300"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </LoadingButton>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white font-semibold">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white font-semibold">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="john@example.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 700 123 456"
                    value={registerData.phoneNumber}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white font-semibold">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white font-semibold">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary rounded-xl h-12"
                    required
                  />
                </div>

                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Creating Account..."
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-all duration-300"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </LoadingButton>
              </form>
            )}

            {/* Demo Accounts */}
            <div className="border-t border-white/20 pt-6">
              <p className="text-gray-300 text-sm text-center mb-4">Demo Accounts:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10 text-xs"
                  onClick={() => setLoginData({ email: 'admin@letrumagency.com', password: 'password123' })}
                >
                  Admin Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10 text-xs"
                  onClick={() => setLoginData({ email: 'john.doe@example.com', password: 'password123' })}
                >
                  User Demo
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
