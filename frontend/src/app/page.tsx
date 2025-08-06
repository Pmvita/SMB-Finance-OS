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
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    color: 'bg-blue-600'
  },
  {
    icon: ChartBarIcon,
    title: 'Expense Tracking',
    description: 'Automatically categorize and track business expenses with receipt scanning.',
    color: 'bg-emerald-600'
  },
  {
    icon: BanknotesIcon,
    title: 'Digital Wallets',
    description: 'Manage multiple business accounts and track cash flow in real-time.',
    color: 'bg-amber-600'
  },
  {
    icon: CreditCardIcon,
    title: 'Payment Processing',
    description: 'Accept payments globally with support for multiple currencies and payment methods.',
    color: 'bg-purple-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Tax Reporting',
    description: 'Automated tax calculations and compliance reporting for multiple jurisdictions.',
    color: 'bg-teal-600'
  },
  {
    icon: GlobeAltIcon,
    title: 'Credit & Lending',
    description: 'Build business credit scores and access financing opportunities.',
    color: 'bg-indigo-600'
  }
];

const platformFeatures = [
  {
    icon: ComputerDesktopIcon,
    title: 'Web Dashboard',
    description: 'Full-featured web application for desktop and tablet use',
    features: ['Advanced analytics', 'Bulk operations', 'Detailed reporting', 'Team collaboration']
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile App',
    description: 'Native mobile app for iOS and Android',
    features: ['On-the-go access', 'Push notifications', 'Offline capabilities', 'Mobile payments']
  },
  {
    icon: CloudIcon,
    title: 'API Access',
    description: 'RESTful API for custom integrations',
    features: ['Developer-friendly', 'Webhook support', 'Real-time sync', 'Custom workflows']
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 100 invoices per month',
      'Basic expense tracking',
      '1 digital wallet',
      'Email support',
      'Basic tax reporting'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Unlimited invoices',
      'Advanced expense tracking',
      'Multiple digital wallets',
      'Priority support',
      'Advanced tax reporting',
      'Credit scoring',
      'Payment processing'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For established businesses with complex needs',
    features: [
      'Everything in Professional',
      'Payroll management',
      'Multi-currency support',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics'
    ],
    popular: false
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechStart Solutions',
    content: 'SMB Finance OS transformed our financial operations. The automated invoicing and expense tracking saved us hours every week.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, Green Energy Co.',
    content: 'The multi-currency support and global payment processing helped us expand internationally without the usual financial headaches.',
    rating: 5
  },
  {
    name: 'Aisha Patel',
    role: 'Managing Director, Patel Consulting',
    content: 'The credit scoring feature helped us secure a business loan we desperately needed. The platform is truly comprehensive.',
    rating: 5
  }
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">SMB Finance OS</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                <a href="#platforms" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Platforms</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Testimonials</a>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                The Financial Operating System for
                <span className="text-blue-600"> Global SMBs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Streamline your business finances with our comprehensive platform. From invoicing to lending, 
                we provide everything SMBs need to thrive in emerging markets. Available on web, mobile, and API.
              </p>
              
              {/* Sign Up Form */}
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 bg-white/80 backdrop-blur-sm"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 bg-white/80 backdrop-blur-sm"
                    />
                    {errors.businessName && (
                      <p className="text-red-600 text-sm mt-1">{errors.businessName.message}</p>
                    )}
                  </div>
                  <div>
                    <select
                      {...register('industry')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 bg-white/80 backdrop-blur-sm"
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
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center shadow-lg"
                  >
                    {isSubmitting ? 'Signing up...' : 'Start Free Trial'}
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-3">
                  No credit card required • 14-day free trial
                </p>
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color} text-white mb-4 shadow-md`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 bg-gray-50">
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="inline-flex p-4 rounded-xl bg-blue-100 text-blue-600 mb-6 shadow-md">
                  <platform.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{platform.title}</h3>
                <p className="text-gray-600 mb-6">{platform.description}</p>
                
                <ul className="space-y-3">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-emerald-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {platform.title === 'Mobile App' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm">
                        App Store
                      </button>
                      <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm">
                        Google Play
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business needs. All plans include our core features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg p-8 border border-gray-200 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-emerald-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md">
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about SMB Finance OS
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
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
            Ready to Transform Your Business Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust SMB Finance OS to manage their financial operations.
            Available on web, mobile, and API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg">
              Start Your Free Trial
            </button>
            <button className="bg-transparent hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 border border-white">
              Download Mobile App
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SMB Finance OS</h3>
              <p className="text-gray-400">
                The financial operating system for global small and medium businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SMB Finance OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
