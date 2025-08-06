'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CreditCardIcon, 
  DocumentTextIcon, 
  BanknotesIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Smart Invoicing',
    description: 'Create, send, and track professional invoices with automated payment reminders.',
    color: 'bg-blue-600',
    details: [
      'Automated payment reminders',
      'Multi-currency support', 
      'Professional templates',
      'Real-time tracking',
      'Recurring invoices',
      'Payment integration'
    ],
    benefits: [
      'Reduce payment delays by 60%',
      'Professional brand presentation',
      'Multi-language support',
      'Tax compliance built-in'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Expense Tracking',
    description: 'Automatically categorize and track business expenses with receipt scanning.',
    color: 'bg-emerald-600',
    details: [
      'Receipt scanning',
      'Automatic categorization',
      'Expense reports',
      'Tax preparation',
      'Mobile capture',
      'Real-time sync'
    ],
    benefits: [
      'Save 5+ hours per month',
      '100% expense visibility',
      'Automated tax preparation',
      'Policy compliance'
    ]
  },
  {
    icon: BanknotesIcon,
    title: 'Digital Wallets',
    description: 'Manage multiple business accounts and track cash flow in real-time.',
    color: 'bg-amber-600',
    details: [
      'Multi-account management',
      'Real-time cash flow',
      'Budget tracking',
      'Financial insights',
      'Currency conversion',
      'Investment tracking'
    ],
    benefits: [
      'Real-time financial visibility',
      'Better cash flow management',
      'Reduced banking fees',
      'Global currency support'
    ]
  },
  {
    icon: CreditCardIcon,
    title: 'Payment Processing',
    description: 'Accept payments globally with support for multiple currencies and payment methods.',
    color: 'bg-purple-600',
    details: [
      'Global payment methods',
      'Multi-currency support',
      'Secure transactions',
      'Instant settlements',
      'Mobile payments',
      'QR code payments'
    ],
    benefits: [
      'Accept payments worldwide',
      'Lower transaction fees',
      'Faster settlements',
      'Enhanced security'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Tax Reporting',
    description: 'Automated tax calculations and compliance reporting for multiple jurisdictions.',
    color: 'bg-teal-600',
    details: [
      'Automated calculations',
      'Multi-jurisdiction support',
      'Compliance reporting',
      'Tax optimization',
      'Real-time updates',
      'Audit trails'
    ],
    benefits: [
      'Reduce tax preparation time by 80%',
      'Ensure compliance',
      'Optimize tax savings',
      'Audit-ready records'
    ]
  },
  {
    icon: GlobeAltIcon,
    title: 'Credit & Lending',
    description: 'Build business credit scores and access financing opportunities.',
    color: 'bg-indigo-600',
    details: [
      'Credit score building',
      'Lending opportunities',
      'Financial partnerships',
      'Growth financing',
      'Credit monitoring',
      'Loan applications'
    ],
    benefits: [
      'Build business credit',
      'Access better financing',
      'Lower interest rates',
      'Growth opportunities'
    ]
  }
];

const stats = [
  { number: '10,000+', label: 'Active Businesses' },
  { number: '50+', label: 'Countries Supported' },
  { number: '99.9%', label: 'Uptime' },
  { number: '24/7', label: 'Support' }
];

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/landing" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">SMB Finance OS</h1>
              </Link>
              
              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/landing/features" className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm">
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
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
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
                Powerful Features for
                <span className="text-blue-400"> Modern Businesses</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover how our comprehensive financial platform can transform your business operations. 
                From invoicing to lending, we provide everything you need to succeed.
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From invoicing to lending, we provide a complete financial operating system 
              designed specifically for small and medium businesses in emerging markets.
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
                  selectedFeature === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setSelectedFeature(index)}
                onMouseLeave={() => setSelectedFeature(null)}
              >
                <div className={`inline-flex p-4 rounded-xl ${feature.color} text-white mb-6 shadow-md transition-transform duration-200 ${
                  selectedFeature === index ? 'scale-110' : ''
                }`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                {/* Feature details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already streamlined their financial operations with SMB Finance OS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/landing/pricing" 
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Pricing
            </Link>
            <Link 
              href="/signup" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 