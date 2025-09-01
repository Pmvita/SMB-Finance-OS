'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow Solutions',
    location: 'Singapore',
    industry: 'Technology',
    rating: 5,
    content: 'SMB Finance OS has completely transformed how we manage our finances. The automated invoicing and expense tracking have saved us countless hours every month. The mobile app is fantastic for on-the-go access.',
    avatar: '/avatars/sarah-chen.jpg',
    metrics: {
      timeSaved: '15 hours/month',
      revenueIncrease: '25%',
      efficiencyGain: '40%'
    }
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Founder',
    company: 'Global Trade Co.',
    location: 'Mexico City',
    industry: 'Import/Export',
    rating: 5,
    content: 'As a growing import/export business, we needed a solution that could handle multiple currencies and international payments. SMB Finance OS exceeded our expectations with its global capabilities.',
    avatar: '/avatars/miguel-rodriguez.jpg',
    metrics: {
      timeSaved: '20 hours/month',
      revenueIncrease: '35%',
      efficiencyGain: '50%'
    }
  },
  {
    name: 'Aisha Patel',
    role: 'Managing Director',
    company: 'Green Energy Solutions',
    location: 'Mumbai',
    industry: 'Renewable Energy',
    rating: 5,
    content: 'The tax reporting features alone have made this platform worth every penny. Automated calculations and compliance reporting have reduced our tax preparation time by 80%.',
    avatar: '/avatars/aisha-patel.jpg',
    metrics: {
      timeSaved: '25 hours/month',
      revenueIncrease: '30%',
      efficiencyGain: '45%'
    }
  },
  {
    name: 'David Kim',
    role: 'Operations Manager',
    company: 'Urban Logistics',
    location: 'Seoul',
    industry: 'Logistics',
    rating: 5,
    content: 'The real-time cash flow tracking and digital wallet features have given us unprecedented visibility into our financial health. This has been crucial for our expansion plans.',
    avatar: '/avatars/david-kim.jpg',
    metrics: {
      timeSaved: '18 hours/month',
      revenueIncrease: '28%',
      efficiencyGain: '42%'
    }
  },
  {
    name: 'Fatima Al-Zahra',
    role: 'CEO',
    company: 'Desert Rose Trading',
    location: 'Dubai',
    industry: 'Retail',
    rating: 5,
    content: 'The multi-language support and local compliance features made it easy for us to expand across the Middle East. The platform truly understands global business needs.',
    avatar: '/avatars/fatima-al-zahra.jpg',
    metrics: {
      timeSaved: '22 hours/month',
      revenueIncrease: '32%',
      efficiencyGain: '48%'
    }
  },
  {
    name: 'Carlos Silva',
    role: 'Founder',
    company: 'Brazilian Coffee Co.',
    location: 'São Paulo',
    industry: 'Agriculture',
    rating: 5,
    content: 'From managing our coffee exports to handling local payments, SMB Finance OS has streamlined every aspect of our financial operations. The mobile app is perfect for our field operations.',
    avatar: '/avatars/carlos-silva.jpg',
    metrics: {
      timeSaved: '16 hours/month',
      revenueIncrease: '22%',
      efficiencyGain: '38%'
    }
  }
];

const stats = [
  { number: '10,000+', label: 'Happy Customers' },
  { number: '50+', label: 'Countries' },
  { number: '4.9/5', label: 'Average Rating' },
  { number: '95%', label: 'Customer Satisfaction' }
];

const industries = [
  'Technology', 'Retail', 'Manufacturing', 'Services', 'Healthcare', 'Agriculture', 'Logistics', 'Finance'
];

export default function TestimonialsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  const filteredTestimonials = selectedIndustry === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/landing" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Trident Financial OS</h1>
              </Link>
              
              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/landing/features" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Features
                </Link>
                <Link href="/landing/platforms" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Platforms
                </Link>
                <Link href="/landing/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Pricing
                </Link>
                <Link href="/landing/testimonials" className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm">
                  Testimonials
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/signin" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                What Our Customers
                <span className="text-blue-400"> Say</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover how businesses around the world are transforming their financial operations 
                with Trident Financial OS. Real stories from real customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Filter by Industry</h2>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedIndustry('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedIndustry === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Industries
              </button>
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedIndustry === industry
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 cursor-pointer ${
                  selectedTestimonial === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setSelectedTestimonial(index)}
                onMouseLeave={() => setSelectedTestimonial(null)}
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <div className="mb-6">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <UserIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                      {testimonial.company}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <GlobeAltIcon className="h-4 w-4 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{testimonial.metrics.timeSaved}</div>
                      <div className="text-gray-500">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{testimonial.metrics.revenueIncrease}</div>
                      <div className="text-gray-500">Revenue Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{testimonial.metrics.efficiencyGain}</div>
                      <div className="text-gray-500">Efficiency Gain</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real businesses achieving real results with SMB Finance OS.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">TechFlow Solutions</h3>
              <p className="text-gray-700 mb-6">
                A Singapore-based technology company that increased their efficiency by 40% 
                and saved 15 hours per month using our automated invoicing and expense tracking.
              </p>
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-blue-600 font-semibold">40% Efficiency Increase</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Trade Co.</h3>
              <p className="text-gray-700 mb-6">
                A Mexican import/export business that expanded to 15 countries using our 
                multi-currency support and international payment processing.
              </p>
              <div className="flex items-center">
                <GlobeAltIcon className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold">15 Countries Expansion</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Success Stories
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your business finances? Start your journey with SMB Finance OS today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/landing/pricing" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 