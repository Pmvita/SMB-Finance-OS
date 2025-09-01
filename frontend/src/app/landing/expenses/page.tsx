'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  CameraIcon,
  ReceiptRefundIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CogIcon,
  ChartPieIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const features = [
  {
    icon: CameraIcon,
    title: 'Receipt Scanning',
    description: 'Automatically capture and process receipts with AI-powered OCR',
    details: ['Mobile camera scanning', 'AI-powered OCR', 'Automatic categorization', 'Data extraction']
  },
  {
    icon: ChartBarIcon,
    title: 'Automatic Categorization',
    description: 'Smart categorization of expenses using machine learning',
    details: ['AI-powered categorization', 'Custom categories', 'Learning algorithms', 'Bulk categorization']
  },
  {
    icon: ReceiptRefundIcon,
    title: 'Tax Preparation',
    description: 'Automated tax calculations and compliance reporting',
    details: ['Tax calculations', 'Compliance reporting', 'Audit trails', 'Multi-jurisdiction support']
  },
  {
    icon: GlobeAltIcon,
    title: 'Multi-Currency Support',
    description: 'Track expenses in multiple currencies with automatic conversion',
    details: ['150+ currencies', 'Real-time conversion', 'Exchange rate tracking', 'Multi-currency reports']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Policy Compliance',
    description: 'Ensure expenses comply with company policies and regulations',
    details: ['Policy enforcement', 'Approval workflows', 'Compliance alerts', 'Audit trails']
  },
  {
    icon: ChartPieIcon,
    title: 'Advanced Analytics',
    description: 'Get insights into spending patterns and trends',
    details: ['Spending analytics', 'Trend analysis', 'Budget tracking', 'Performance metrics']
  }
];

const benefits = [
  {
    title: 'Save Time',
    description: 'Automate expense tracking and categorization',
    metric: '5+ hours saved/month'
  },
  {
    title: 'Improve Accuracy',
    description: 'Reduce manual errors with automated processing',
    metric: '99% accuracy'
  },
  {
    title: 'Better Control',
    description: 'Real-time visibility into spending patterns',
    metric: '100% visibility'
  },
  {
    title: 'Tax Savings',
    description: 'Maximize tax deductions with proper categorization',
    metric: '15% more deductions'
  }
];

const pricing = [
  {
    plan: 'Starter',
    price: '$29',
    features: ['Up to 500 expenses/month', 'Basic categorization', 'Receipt scanning', 'Basic reporting']
  },
  {
    plan: 'Professional',
    price: '$79',
    features: ['Unlimited expenses', 'Advanced categorization', 'Tax preparation', 'Advanced analytics']
  },
  {
    plan: 'Enterprise',
    price: '$199',
    features: ['All features', 'Custom integrations', 'Dedicated support', 'White-label options']
  }
];

export default function ExpensesPage() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex-shrink-0">
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
                <Link href="/landing/testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
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
              <div className="inline-flex p-4 rounded-xl bg-emerald-600 text-white mb-6 shadow-lg">
                <ChartBarIcon className="h-12 w-12" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Smart Expense Tracking for
                <span className="text-emerald-400"> Modern Businesses</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Automatically categorize and track business expenses with receipt scanning. 
                Get insights into your spending patterns and maximize tax deductions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="#features" 
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-emerald-600"
                >
                  View Features
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Expense Tracking Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to track, categorize, and manage business expenses 
              with maximum efficiency and accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 cursor-pointer ${
                  selectedFeature === index ? 'ring-2 ring-emerald-500' : ''
                }`}
                onMouseEnter={() => setSelectedFeature(index)}
                onMouseLeave={() => setSelectedFeature(null)}
              >
                <div className={`inline-flex p-4 rounded-xl bg-emerald-100 text-emerald-600 mb-6 shadow-md transition-transform duration-200 ${
                  selectedFeature === index ? 'scale-110' : ''
                }`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Expense Tracking?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the real impact our expense tracking platform can have on your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <StarIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-emerald-600">{benefit.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your expense tracking needs. All plans include our core features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.plan}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">{plan.price}<span className="text-lg text-gray-500">/month</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Expense Tracking?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already streamlined their expense tracking with SMB Finance OS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/landing/pricing" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-emerald-600"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 