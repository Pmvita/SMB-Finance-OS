'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  XMarkIcon,
  BoltIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { 
  ChartBarIcon as ChartBarSolid,
  CreditCardIcon as CreditCardSolid,
  DocumentTextIcon as DocumentTextSolid,
  BanknotesIcon as BanknotesSolid,
  ShieldCheckIcon as ShieldCheckSolid,
  GlobeAltIcon as GlobeAltSolid
} from '@heroicons/react/24/solid';
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

const stats = [
  { value: '50K+', label: 'Active Businesses', icon: ChartBarSolid, color: Colors.primary[500] },
  { value: '$2B+', label: 'Processed Annually', icon: CurrencyDollarIcon, color: Colors.secondary[500] },
  { value: '150+', label: 'Countries Served', icon: GlobeAltSolid, color: Colors.accent[500] },
  { value: '99.9%', label: 'Uptime Guarantee', icon: ShieldCheckSolid, color: Colors.success[500] },
];

const features = [
  {
    icon: DocumentTextIcon,
    iconSolid: DocumentTextSolid,
    title: 'Smart Invoicing',
    description: 'Create, send, and track professional invoices with automated payment reminders.',
    color: Colors.primary[500],
    gradient: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)`,
    details: ['Automated payment reminders', 'Multi-currency support', 'Professional templates', 'Real-time tracking']
  },
  {
    icon: ChartBarIcon,
    iconSolid: ChartBarSolid,
    title: 'Expense Tracking',
    description: 'Automatically categorize and track business expenses with receipt scanning.',
    color: Colors.secondary[500],
    gradient: `linear-gradient(135deg, ${Colors.secondary[500]} 0%, ${Colors.secondary[700]} 100%)`,
    details: ['Receipt scanning', 'Automatic categorization', 'Expense reports', 'Tax preparation']
  },
  {
    icon: BanknotesIcon,
    iconSolid: BanknotesSolid,
    title: 'Digital Wallets',
    description: 'Manage multiple business accounts and track cash flow in real-time.',
    color: Colors.accent[500],
    gradient: `linear-gradient(135deg, ${Colors.accent[500]} 0%, ${Colors.accent[700]} 100%)`,
    details: ['Multi-account management', 'Real-time cash flow', 'Budget tracking', 'Financial insights']
  },
  {
    icon: CreditCardIcon,
    iconSolid: CreditCardSolid,
    title: 'Payment Processing',
    description: 'Accept payments globally with support for multiple currencies and payment methods.',
    color: Colors.primary[600],
    gradient: `linear-gradient(135deg, ${Colors.primary[600]} 0%, ${Colors.primary[800]} 100%)`,
    details: ['Global payment methods', 'Multi-currency support', 'Secure transactions', 'Instant settlements']
  },
  {
    icon: ShieldCheckIcon,
    iconSolid: ShieldCheckSolid,
    title: 'Tax Reporting',
    description: 'Automated tax calculations and compliance reporting for multiple jurisdictions.',
    color: Colors.secondary[600],
    gradient: `linear-gradient(135deg, ${Colors.secondary[600]} 0%, ${Colors.secondary[800]} 100%)`,
    details: ['Automated calculations', 'Multi-jurisdiction support', 'Compliance reporting', 'Tax optimization']
  },
  {
    icon: GlobeAltIcon,
    iconSolid: GlobeAltSolid,
    title: 'Credit & Lending',
    description: 'Build business credit scores and access financing opportunities.',
    color: Colors.accent[600],
    gradient: `linear-gradient(135deg, ${Colors.accent[600]} 0%, ${Colors.accent[800]} 100%)`,
    details: ['Credit score building', 'Lending opportunities', 'Financial partnerships', 'Growth financing']
  }
];

const platformFeatures = [
  {
    icon: ComputerDesktopIcon,
    title: 'Web Dashboard',
    description: 'Full-featured web application for desktop and tablet use',
    features: ['Advanced analytics', 'Bulk operations', 'Detailed reporting', 'Team collaboration'],
    gradient: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)`,
    url: '/landing/platforms'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile App',
    description: 'Native mobile app for iOS and Android',
    features: ['On-the-go access', 'Push notifications', 'Offline capabilities', 'Mobile payments'],
    gradient: `linear-gradient(135deg, ${Colors.secondary[500]} 0%, ${Colors.secondary[700]} 100%)`,
    url: '/landing/platforms'
  },
  {
    icon: CloudIcon,
    title: 'API Access',
    description: 'RESTful API for custom integrations',
    features: ['Developer-friendly', 'Webhook support', 'Real-time sync', 'Custom workflows'],
    gradient: `linear-gradient(135deg, ${Colors.accent[500]} 0%, ${Colors.accent[700]} 100%)`,
    url: '/landing/platforms'
  }
];

// Floating particles component
const FloatingParticle = ({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      background: `radial-gradient(circle, ${Colors.primary[400]} 0%, transparent 70%)`,
      left: `${x}%`,
      top: `${y}%`,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, Math.random() * 20 - 10, 0],
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sign up data:', data);
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${Colors.primary[500]} 0%, transparent 70%)` }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${Colors.secondary[500]} 0%, transparent 70%)` }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${Colors.accent[500]} 0%, transparent 70%)` }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${Colors.primary[500]} 1px, transparent 1px), linear-gradient(90deg, ${Colors.primary[500]} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    Trident
                  </span>
                  <span className={isScrolled ? 'text-gray-900' : 'text-white'}> Financial OS</span>
                </h1>
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="relative group">
                  <button className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'}`}>
                    Products
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-gray-200">
                    <div className="p-4 space-y-3">
                      <Link href="/landing/invoicing" className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50 group/item">
                        <DocumentTextIcon className="h-5 w-5 mr-3 text-blue-600 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium text-gray-900">Invoicing</div>
                          <div className="text-sm text-gray-500">Create and track invoices</div>
                        </div>
                      </Link>
                      <Link href="/landing/expenses" className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50 group/item">
                        <ChartBarIcon className="h-5 w-5 mr-3 text-emerald-600 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium text-gray-900">Expense Tracking</div>
                          <div className="text-sm text-gray-500">Track and categorize expenses</div>
                        </div>
                      </Link>
                      <Link href="/landing/payments" className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50 group/item">
                        <CreditCardIcon className="h-5 w-5 mr-3 text-purple-600 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium text-gray-900">Payments</div>
                          <div className="text-sm text-gray-500">Process payments globally</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {['Features', 'Platforms', 'Pricing', 'Testimonials'].map((item) => (
                  <Link 
                    key={item}
                    href={`/landing/${item.toLowerCase()}`}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/signin" 
                className={`hidden sm:inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                Sign In
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden inline-flex items-center justify-center p-2 rounded-lg ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
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
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
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
              
              {['Features', 'Platforms', 'Pricing', 'Testimonials'].map((item) => (
                <Link 
                  key={item}
                  href={`/landing/${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link 
                  href="/signin" 
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with enhanced visual elements */}
      <section className="relative overflow-hidden pt-32 pb-24 min-h-[90vh] flex items-center">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <BoltIcon className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-white/90">
                Trusted by 50,000+ businesses worldwide
              </span>
              <StarIcon className="h-4 w-4 text-yellow-400 ml-2" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight"
            >
              <span className="block text-white mb-2">
                The Financial OS for
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Global SMBs
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/80"
            >
              Streamline your business finances with our comprehensive platform. 
              From invoicing to lending, we provide everything SMBs need to thrive in emerging markets. 
              <span className="block mt-2 text-lg text-white/70">
                Available on web, mobile, and API.
              </span>
            </motion.p>
            
            {/* Enhanced Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/20 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('businessName')}
                      type="text"
                      placeholder="Business name"
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/20 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.businessName && (
                      <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>
                    )}
                  </div>
                  <div>
                    <select
                      {...register('industry')}
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/20 bg-white/90 backdrop-blur-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>
                    )}
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing up...
                    </>
                  ) : (
                    <>
                      Start Free Trial
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-white/70 mt-4 text-center">
                  ✨ No credit card required • 🎁 14-day free trial • ⚡ Instant setup
                </p>
              </form>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5 text-blue-400" />
                <span>150+ countries</span>
              </div>
              <div className="flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-cyan-400" />
                <span>99.9% uptime</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className="inline-flex p-4 rounded-2xl mb-4"
                  style={{ background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm md:text-base text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From invoicing to lending, we provide a complete financial operating system 
              designed specifically for small and medium businesses in emerging markets.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                  hoveredFeature === index 
                    ? 'border-blue-500 scale-105' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {/* Animated background gradient on hover */}
                <div 
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  style={{ background: feature.gradient }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className={`inline-flex p-4 rounded-2xl mb-6 shadow-lg transition-all duration-300 ${
                      hoveredFeature === index ? 'scale-110' : ''
                    }`}
                    style={{ background: feature.gradient }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {hoveredFeature === index ? (
                      <feature.iconSolid className="h-8 w-8 text-white" />
                    ) : (
                      <feature.icon className="h-8 w-8 text-white" />
                    )}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-sm text-gray-600 flex items-center group/item"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                      >
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Platforms Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${Colors.primary[400]} 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Available on All Your Devices
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Access your business finances anywhere, anytime. Our cross-platform solution 
              ensures you never miss a beat in your financial operations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <motion.div 
                  className="inline-flex p-5 rounded-2xl mb-6 shadow-xl"
                  style={{ background: platform.gradient }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <platform.icon className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">{platform.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{platform.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-white/80 flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={platform.url}
                  className="inline-flex items-center text-white font-semibold group/link hover:text-cyan-400 transition-colors"
                >
                  Learn More
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of businesses that have already streamlined their financial operations 
            with Trident Financial OS. Start your free trial today.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/signup"
              className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white text-blue-600 font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-200 hover:scale-105"
            >
              Start Free Trial
              <ArrowRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/landing/pricing"
              className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-transparent border-3 border-white text-white font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105"
            >
              View Pricing
              <ArrowRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Trident Financial OS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The financial operating system for global small and medium businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                {['Features', 'Platforms', 'Pricing', 'Testimonials'].map((item) => (
                  <li key={item}>
                    <Link href={`/landing/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Solutions</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/landing/invoicing" className="hover:text-white transition-colors">Invoicing</Link></li>
                <li><Link href="/landing/expenses" className="hover:text-white transition-colors">Expense Tracking</Link></li>
                <li><Link href="/landing/payments" className="hover:text-white transition-colors">Payment Processing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/signin" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Trident Financial OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
