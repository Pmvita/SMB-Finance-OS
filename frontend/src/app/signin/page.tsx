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
      // Here you would typically redirect to dashboard with dev data
      
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
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-lg p-2 group"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          {/* Logo/Brand Section */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
              <ShieldCheckIcon className="h-10 w-10 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Sign in to your SMB Finance OS account
            </p>
          </div>
        </motion.div>

        {/* Sign In Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Enhanced Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 hover:bg-red-100 transition-colors cursor-pointer"
                onClick={() => setError(null)}
                title="Click to dismiss"
              >
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700">
                  <p className="font-semibold">Authentication failed</p>
                  <p className="text-red-600">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <UserIcon className="h-4 w-4 mr-2 text-slate-500" />
                Email address
              </label>
              <div className="relative group">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white hover:bg-slate-50 ${
                    focusedField === 'email' ? 'border-emerald-500 shadow-lg shadow-emerald-500/25' : 'border-slate-200'
                  } ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onMouseEnter={() => setIsHovered('email')}
                  onMouseLeave={() => setIsHovered(null)}
                />
                <UserIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                  focusedField === 'email' ? 'text-emerald-500' : 'text-slate-400'
                }`} />
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
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <LockClosedIcon className="h-4 w-4 mr-2 text-slate-500" />
                Password
              </label>
              <div className="relative group">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-4 pr-12 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white hover:bg-slate-50 ${
                    focusedField === 'password' ? 'border-emerald-500 shadow-lg shadow-emerald-500/25' : 'border-slate-200'
                  } ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onMouseEnter={() => setIsHovered('password')}
                  onMouseLeave={() => setIsHovered(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
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
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded transition-colors group-hover:border-emerald-400"
                />
                <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900 transition-colors font-medium">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <KeyIcon className="h-5 w-5 mr-3" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => handleSocialLogin('Google')}
              disabled={isSubmitting}
              className="w-14 h-14 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full transition-all duration-200 flex items-center justify-center border-2 border-slate-200 hover:border-slate-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-500/20 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            <button 
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isSubmitting}
              className="w-14 h-14 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full transition-all duration-200 flex items-center justify-center border-2 border-slate-200 hover:border-slate-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-500/20 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            <button 
              onClick={() => handleSocialLogin('X (Twitter)')}
              disabled={isSubmitting}
              className="w-14 h-14 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full transition-all duration-200 flex items-center justify-center border-2 border-slate-200 hover:border-slate-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-500/20 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
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
            className="inline-flex items-center text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-lg p-2"
          >
            <Cog6ToothIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Developer Mode</span>
          </button>
        </motion.div>

        {/* Developer Mode Button */}
        {showDevMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <button
              onClick={handleDevMode}
              disabled={isSubmitting}
              className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-600 text-emerald-500 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center border-2 border-emerald-500 hover:border-emerald-400 transform hover:-translate-y-1 disabled:transform-none focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500 mr-3"></div>
                  <span>Loading Dev Data...</span>
                </>
              ) : (
                <>
                  <CodeBracketIcon className="h-5 w-5 mr-3" />
                  <span>Login with Mock Data</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-300 text-base">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-lg"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 