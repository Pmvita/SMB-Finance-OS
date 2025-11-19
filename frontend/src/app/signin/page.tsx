'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  KeyIcon,
  UserIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  Cog6ToothIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Colors } from '../../constants/colors';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [showDevMode, setShowDevMode] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: SignInForm) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate error for demo purposes
      if (data.email === 'demo@error.com') {
        throw new Error('Invalid email or password');
      }
      
      console.log('Sign in data:', data);
      // Here you would typically redirect to dashboard or show success message
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDevMode = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call for dev mode
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Dev mode login successful');
      // Redirect to dashboard with mock data
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Logged in with ${provider}`);
      // Here you would typically redirect to dashboard
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${Colors.neutral[900]} 0%, ${Colors.neutral[800]} 50%, ${Colors.primary[900]} 100%)` 
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </div>

      {/* Back to Home Link - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 z-10"
      >
                 <Link 
           href="/"
           className="inline-flex items-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 group"
           style={{ 
             color: 'white',
             '--tw-ring-color': Colors.primary[500]
           } as React.CSSProperties}
         >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Home</span>
        </Link>
      </motion.div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo/Brand Section */}
          <div className="mb-8">
            <motion.div 
              className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-2xl mb-6"
              style={{ background: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.secondary[500]} 100%)` }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <ShieldCheckIcon className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              Sign in to your Trident Financial OS account
            </p>
          </div>
        </motion.div>

        {/* Sign In Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/20 p-8 relative overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-50 pointer-events-none" />
          <div className="relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Enhanced Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl p-4 flex items-start space-x-3 hover:bg-red-500/30 transition-all cursor-pointer shadow-lg"
                onClick={() => setError(null)}
                title="Click to dismiss"
              >
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-100">
                  <p className="font-bold">Authentication failed</p>
                  <p className="text-red-200">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-3 flex items-center text-white">
                <UserIcon className="h-4 w-4 mr-2 text-white/70" />
                Email address
              </label>
              <div className="relative group">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className={`w-full px-5 py-4 pl-14 border-2 rounded-2xl focus:ring-4 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg ${
                    focusedField === 'email' ? 'shadow-xl scale-[1.02]' : 'shadow-md'
                  } ${errors.email ? 'border-red-500 focus:ring-red-500/30' : 'border-white/30'}`}
                  style={{ 
                    borderColor: focusedField === 'email' ? Colors.primary[500] : 'rgba(255, 255, 255, 0.3)',
                    '--tw-ring-color': Colors.primary[500] + '30'
                  } as React.CSSProperties}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onMouseEnter={() => setIsHovered('email')}
                  onMouseLeave={() => setIsHovered(null)}
                />
                <UserIcon className={`absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${focusedField === 'email' ? 'scale-110' : ''}`} style={{ 
                  color: focusedField === 'email' ? Colors.primary[500] : Colors.neutral[400]
                }} />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm mt-2 flex items-center"
                >
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-3 flex items-center text-white">
                <LockClosedIcon className="h-4 w-4 mr-2 text-white/70" />
                Password
              </label>
              <div className="relative group">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`w-full px-5 py-4 pr-14 border-2 rounded-2xl focus:ring-4 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg ${
                    focusedField === 'password' ? 'shadow-xl scale-[1.02]' : 'shadow-md'
                  } ${errors.password ? 'border-red-500 focus:ring-red-500/30' : 'border-white/30'}`}
                  style={{ 
                    borderColor: focusedField === 'password' ? Colors.primary[500] : 'rgba(255, 255, 255, 0.3)',
                    '--tw-ring-color': Colors.primary[500] + '30'
                  } as React.CSSProperties}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onMouseEnter={() => setIsHovered('password')}
                  onMouseLeave={() => setIsHovered(null)}
                />
                <LockClosedIcon className={`absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${focusedField === 'password' ? 'scale-110' : ''}`} style={{ 
                  color: focusedField === 'password' ? Colors.primary[500] : Colors.neutral[400]
                }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 rounded-lg"
                  style={{ 
                    color: Colors.neutral[500],
                    '--tw-ring-color': Colors.primary[500]
                  } as React.CSSProperties}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm mt-2 flex items-center"
                >
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-white/30 rounded-lg transition-all group-hover:border-blue-400 group-hover:scale-110 bg-white/90"
                />
                <span className="ml-3 text-sm text-white/90 group-hover:text-white transition-colors font-semibold">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-300 hover:text-blue-200 font-bold transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl relative overflow-hidden group"
              style={{ 
                background: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)`,
                color: 'white'
              }}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <KeyIcon className="h-5 w-5 mr-3" />
                    <span>Sign In</span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 backdrop-blur-sm font-bold text-white/70 rounded-full">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <motion.button 
              onClick={() => handleSocialLogin('Google')}
              disabled={isSubmitting}
              className="w-16 h-16 bg-white/90 backdrop-blur-sm hover:bg-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center border-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                color: Colors.neutral[700],
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </motion.button>

            <motion.button 
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isSubmitting}
              className="w-16 h-16 bg-white/90 backdrop-blur-sm hover:bg-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center border-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                color: Colors.neutral[700],
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.button>

            <motion.button 
              onClick={() => handleSocialLogin('X (Twitter)')}
              disabled={isSubmitting}
              className="w-16 h-16 bg-white/90 backdrop-blur-sm hover:bg-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center border-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                color: Colors.neutral[700],
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </motion.button>
          </div>
          </div>
        </motion.div>

        {/* Developer Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <button
            onClick={() => setShowDevMode(!showDevMode)}
            className="inline-flex items-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            style={{ 
              color: 'white',
              '--tw-ring-color': Colors.primary[500]
            } as React.CSSProperties}
          >
            <Cog6ToothIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-semibold">Developer Mode</span>
          </button>
        </motion.div>

        {/* Developer Mode Button */}
        {showDevMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.button
              onClick={handleDevMode}
              disabled={isSubmitting}
              className="w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center border-2 shadow-xl relative overflow-hidden group"
              style={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: Colors.primary[500],
                color: Colors.primary[400]
              }}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent mr-3" style={{ borderColor: Colors.primary[500] }}></div>
                    <span>Loading Dev Data...</span>
                  </>
                ) : (
                  <>
                    <CodeBracketIcon className="h-5 w-5 mr-3" />
                    <span>Login with Mock Data</span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-lg text-white/80">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-bold text-blue-300 hover:text-blue-200 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 