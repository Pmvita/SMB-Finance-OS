'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CreditCardIcon, 
  DocumentTextIcon, 
  BanknotesIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CloudIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Colors } from '../../constants/colors';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Smart Invoicing',
    description: 'Create, send, and track professional invoices with automated payment reminders.',
    color: Colors.primary[500],
    details: ['Automated payment reminders', 'Multi-currency support', 'Professional templates', 'Real-time tracking']
  },
  {
    icon: ChartBarIcon,
    title: 'Expense Tracking',
    description: 'Automatically categorize and track business expenses with receipt scanning.',
    color: Colors.secondary[500],
    details: ['Receipt scanning', 'Automatic categorization', 'Expense reports', 'Tax preparation']
  },
  {
    icon: BanknotesIcon,
    title: 'Digital Wallets',
    description: 'Manage multiple business accounts and track cash flow in real-time.',
    color: Colors.accent[500],
    details: ['Multi-account management', 'Real-time cash flow', 'Budget tracking', 'Financial insights']
  },
  {
    icon: CreditCardIcon,
    title: 'Payment Processing',
    description: 'Accept payments globally with support for multiple currencies and payment methods.',
    color: Colors.primary[600],
    details: ['Global payment methods', 'Multi-currency support', 'Secure transactions', 'Instant settlements']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Tax Reporting',
    description: 'Automated tax calculations and compliance reporting for multiple jurisdictions.',
    color: Colors.secondary[600],
    details: ['Automated calculations', 'Multi-jurisdiction support', 'Compliance reporting', 'Tax optimization']
  },
  {
    icon: GlobeAltIcon,
    title: 'Credit & Lending',
    description: 'Build business credit scores and access financing opportunities.',
    color: Colors.accent[600],
    details: ['Credit score building', 'Lending opportunities', 'Financial partnerships', 'Growth financing']
  }
];

const platformFeatures = [
  {
    icon: ComputerDesktopIcon,
    title: 'Web Dashboard',
    description: 'Full-featured web application for desktop and tablet use',
    features: ['Advanced analytics', 'Bulk operations', 'Detailed reporting', 'Team collaboration'],
    color: Colors.primary[100],
    textColor: Colors.primary[600],
    url: '/landing/platforms'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile App',
    description: 'Native mobile app for iOS and Android',
    features: ['On-the-go access', 'Push notifications', 'Offline capabilities', 'Mobile payments'],
    color: Colors.secondary[100],
    textColor: Colors.secondary[600],
    url: '/landing/platforms'
  },
  {
    icon: CloudIcon,
    title: 'API Access',
    description: 'RESTful API for custom integrations',
    features: ['Developer-friendly', 'Webhook support', 'Real-time sync', 'Custom workflows'],
    color: Colors.accent[100],
    textColor: Colors.accent[600],
    url: '/landing/platforms'
  }
];

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  });

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (data: SignUpForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sign up data:', data);
    reset();
    setIsSubmitting(false);
    // Here you would typically redirect to signup or show success message
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(135deg, ${Colors.neutral[800]} 0%, ${Colors.neutral[700]} 50%, ${Colors.neutral[600]} 100%)` 
      }}
    >
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
                          <div className="flex items-center space-x-8">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-white">Trident Financial OS</h1>
                </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: Colors.neutral[300] }}>
                    Products
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={{ borderColor: Colors.neutral[200] }}>
                    <div className="p-4 space-y-3">
                      <Link href="/landing/invoicing" className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50">
                        <DocumentTextIcon className="h-5 w-5 mr-3" style={{ color: Colors.primary[600] }} />
                        <div>
                          <div className="font-medium" style={{ color: Colors.neutral[900] }}>Invoicing</div>
                          <div className="text-sm" style={{ color: Colors.neutral[500] }}>Create and track invoices</div>
                        </div>
                      </Link>
                      <Link href="/landing/expenses" className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50">
                        <ChartBarIcon className="h-5 w-5 mr-3" style={{ color: Colors.secondary[600] }} />
                        <div>
                          <div className="font-medium" style={{ color: Colors.neutral[900] }}>Expense Tracking</div>
                          <div className="text-sm" style={{ color: Colors.neutral[500] }}>Track and categorize expenses</div>
                        </div>
                      </Link>
                      <Link href="/landing/payments" className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50">
                        <CreditCardIcon className="h-5 w-5 mr-3" style={{ color: Colors.accent[600] }} />
                        <div>
                          <div className="font-medium" style={{ color: Colors.neutral[900] }}>Payments</div>
                          <div className="text-sm" style={{ color: Colors.neutral[500] }}>Process payments globally</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <Link href="/landing/features" className="px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: Colors.neutral[300] }}>
                  Features
                </Link>
                <Link href="/landing/platforms" className="px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: Colors.neutral[300] }}>
                  Platforms
                </Link>
                <Link href="/landing/pricing" className="px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: Colors.neutral[300] }}>
                  Pricing
                </Link>
                <Link href="/landing/testimonials" className="px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: Colors.neutral[300] }}>
                  Testimonials
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Desktop Sign In Button */}
              <Link 
                href="/signin" 
                className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                style={{ 
                  backgroundColor: Colors.secondary[500],
                  color: 'white'
                }}
              >
                Sign In
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Products Section */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-900 mb-2">Products</div>
                <div className="space-y-1">
                  <Link 
                    href="/landing/invoicing" 
                    className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-3" />
                    Invoicing
                  </Link>
                  <Link 
                    href="/landing/expenses" 
                    className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ChartBarIcon className="h-5 w-5 text-emerald-600 mr-3" />
                    Expense Tracking
                  </Link>
                  <Link 
                    href="/landing/payments" 
                    className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CreditCardIcon className="h-5 w-5 text-purple-600 mr-3" />
                    Payments
                  </Link>
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <Link 
                href="/landing/features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/landing/platforms" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platforms
              </Link>
              <Link 
                href="/landing/pricing" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/landing/testimonials" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              
              {/* Mobile Sign In Button */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link 
                  href="/signin" 
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with enhanced browser interactions */}
      <section className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'white' }}>
                The Financial Operating System for
                <span style={{ color: Colors.primary[400] }}> Global SMBs</span>
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: Colors.neutral[300] }}>
                Streamline your business finances with our comprehensive platform. From invoicing to lending, 
                we provide everything SMBs need to thrive in emerging markets. Available on web, mobile, and API.
              </p>
              
              {/* Enhanced Sign Up Form */}
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      style={{ 
                        borderColor: Colors.neutral[300],
                        '--tw-ring-color': Colors.primary[600]
                      } as React.CSSProperties}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('businessName')}
                      type="text"
                      placeholder="Business name"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      style={{ 
                        borderColor: Colors.neutral[300],
                        '--tw-ring-color': Colors.primary[600]
                      } as React.CSSProperties}
                    />
                    {errors.businessName && (
                      <p className="text-red-600 text-sm mt-1">{errors.businessName.message}</p>
                    )}
                  </div>
                  <div>
                    <select
                      {...register('industry')}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      style={{ 
                        borderColor: Colors.neutral[300],
                        '--tw-ring-color': Colors.primary[600]
                      } as React.CSSProperties}
                    >
                      <option value="">Select your industry</option>
                      <option value="technology">Technology</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-600 text-sm mt-1">{errors.industry.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ 
                      backgroundColor: Colors.primary[500],
                      color: 'white',
                      '--tw-ring-color': Colors.primary[500]
                    } as React.CSSProperties}
                  >
                    {isSubmitting ? 'Signing up...' : 'Start Free Trial'}
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </form>
                <p className="text-sm text-gray-400 mt-3">
                  No credit card required • 14-day free trial
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with hover interactions */}
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
                  hoveredFeature === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`inline-flex p-4 rounded-xl text-white mb-6 shadow-md transition-transform duration-200 ${
                  hoveredFeature === index ? 'scale-110' : ''
                }`} style={{ backgroundColor: feature.color }}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
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

      {/* Enhanced Platforms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available on All Your Devices
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access your business finances anywhere, anytime. Our cross-platform solution 
              ensures you never miss a beat in your financial operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`inline-flex p-4 rounded-xl ${platform.color} mb-6 shadow-md`}>
                  <platform.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{platform.title}</h3>
                <p className="text-gray-600 mb-6">{platform.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already streamlined their financial operations with Trident Financial OS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Trident Financial OS</h3>
              <p className="text-gray-400">
                The financial operating system for global small and medium businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/landing/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/landing/platforms" className="hover:text-white transition-colors">Platforms</Link></li>
                <li><Link href="/landing/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/landing/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/landing/invoicing" className="hover:text-white transition-colors">Invoicing</Link></li>
                <li><Link href="/landing/expenses" className="hover:text-white transition-colors">Expense Tracking</Link></li>
                <li><Link href="/landing/payments" className="hover:text-white transition-colors">Payment Processing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signin" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Trident Financial OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 