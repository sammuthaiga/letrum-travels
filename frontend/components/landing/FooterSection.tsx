'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-auto">
                <Image
                  src="/letrum_card.png"
                  alt="Letrum Agency Logo"
                  width={100}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h3 className="text-3xl font-black">
                <span className="text-primary">Letrum</span> Agency
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg max-w-md">
              Your trusted partner for extraordinary African safari adventures. 
              Creating memories that last a lifetime since 2010.
            </p>
            <div className="flex space-x-6">
              {[Facebook, Twitter, Instagram].map((Social, index) => (
                <div key={index} className="p-3 bg-gray-800 hover:bg-primary rounded-xl cursor-pointer transition-colors group">
                  <Social className="h-6 w-6 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Tours', 'About', 'Contact', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">+254 700 123 456</p>
                  <p className="text-gray-400">+254 700 123 457</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">hello@letrumagency.com</p>
                  <p className="text-gray-400">info@letrumagency.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-gray-400">Nairobi, Kenya<br />East Africa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 Letrum Agency. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
                <a key={policy} href="#" className="text-gray-400 hover:text-white transition-colors">
                  {policy}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
