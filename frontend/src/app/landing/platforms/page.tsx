'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  WifiIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const platforms = [
  {
    icon: ComputerDesktopIcon,
    title: 'Web Dashboard',
    description: 'Full-featured web application for desktop and tablet use',
    features: [
      'Advanced analytics',
      'Bulk operations', 
      'Detailed reporting',
      'Team collaboration',
      'Real-time data sync',
      'Custom dashboards'
    ],
    benefits: [
      'Access from any browser',
      'No installation required',
      'Full feature set',
      'Team management tools'
    ],
    color: 'bg-blue-100 text-blue-600',
    url: '/landing/platforms',
    screenshot: '/web-dashboard.png'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile App',
    description: 'Native mobile app for iOS and Android',
    features: [
      'On-the-go access',
      'Push notifications',
      'Offline capabilities',
      'Mobile payments',
      'Receipt scanning',
      'Quick actions'
    ],
    benefits: [
      'Native performance',
      'Offline functionality',
      'Mobile-optimized UI',
      'Biometric security'
    ],
    color: 'bg-purple-100 text-purple-600',
    url: '/landing/platforms',
    screenshot: '/mobile-app.png'
  },
  {
    icon: CloudIcon,
    title: 'API Access',
    description: 'RESTful API for custom integrations',
    features: [
      'Developer-friendly',
      'Webhook support',
      'Real-time sync',
      'Custom workflows',
      'Documentation',
      'SDK support'
    ],
    benefits: [
      'Custom integrations',
      'Automated workflows',
      'Real-time data',
      'Scalable architecture'
    ],
    color: 'bg-green-100 text-green-600',
    url: '/landing/platforms',
    screenshot: '/api-docs.png'
  }
];

const technicalSpecs = [
  {
    platform: 'Web Dashboard',
    specs: [
      'React.js frontend',
      'Node.js backend',
      'PostgreSQL database',
      'Redis caching',
      'AWS infrastructure',
      '99.9% uptime SLA'
    ]
  },
  {
    platform: 'Mobile App',
    specs: [
      'React Native',
      'iOS 13+ support',
      'Android 8+ support',
      'Offline-first architecture',
      'Push notifications',
      'Biometric authentication'
    ]
  },
  {
    platform: 'API',
    specs: [
      'RESTful API',
      'GraphQL support',
      'OAuth 2.0 authentication',
      'Rate limiting',
      'Webhook support',
      'Comprehensive documentation'
    ]
  }
];

export default function PlatformsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);

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
                <Link href="/landing/platforms" className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm">
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
                Available on
                <span className="text-blue-400"> All Your Devices</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Access your business finances anywhere, anytime. Our cross-platform solution 
                ensures you never miss a beat in your financial operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you prefer web, mobile, or API access, we&apos;ve got you covered. 
              All platforms offer the same powerful features with a consistent experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 cursor-pointer ${
                  selectedPlatform === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setSelectedPlatform(index)}
                onMouseLeave={() => setSelectedPlatform(null)}
              >
                <div className={`inline-flex p-4 rounded-xl ${platform.color} mb-6 shadow-md transition-transform duration-200 ${
                  selectedPlatform === index ? 'scale-110' : ''
                }`}>
                  <platform.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{platform.title}</h3>
                <p className="text-gray-600 mb-6">{platform.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {platform.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={platform.url}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Learn More
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies for reliability, security, and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={spec.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{spec.platform}</h3>
                <ul className="space-y-2">
                  {spec.specs.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <CogIcon className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All platforms work together seamlessly, providing a unified experience across devices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <WifiIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Sync</h3>
              <p className="text-gray-600">Data syncs instantly across all platforms</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-gray-600">Enterprise-grade security on all platforms</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GlobeAltIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Access</h3>
              <p className="text-gray-600">Access from anywhere in the world</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consistent UX</h3>
              <p className="text-gray-600">Unified experience across all platforms</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose your preferred platform and start managing your business finances today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/landing/features" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 