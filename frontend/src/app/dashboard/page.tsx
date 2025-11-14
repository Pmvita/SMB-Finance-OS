'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { 
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ReceiptRefundIcon,
  WalletIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import MockDataService, { MockData } from '../../services/mockDataService';
import { Colors } from '../../constants/colors';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<MockData['dashboard'] | null>(null);
  const [userData, setUserData] = useState<MockData['user'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get appropriate greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mockService = MockDataService.getInstance();
      const [dashboard, user] = await Promise.all([
        mockService.fetchDashboard(),
        mockService.fetchUser()
      ]);
      
      setDashboardData(dashboard);
      setUserData(user);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          background: `linear-gradient(135deg, ${Colors.neutral[50]} 0%, ${Colors.neutral[100]} 100%)` 
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: Colors.primary[500] }}></div>
          <p className="text-lg" style={{ color: Colors.neutral[600] }}>Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ 
          background: `linear-gradient(135deg, ${Colors.neutral[50]} 0%, ${Colors.neutral[100]} 100%)` 
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <ExclamationTriangleIcon className="h-16 w-16 mx-auto mb-4" style={{ color: Colors.danger[500] }} />
          <h2 className="text-xl font-semibold mb-2" style={{ color: Colors.neutral[800] }}>Error Loading Dashboard</h2>
          <p className="mb-6" style={{ color: Colors.neutral[600] }}>{error}</p>
          <button
            onClick={loadDashboardData}
            className="font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            style={{ 
              backgroundColor: Colors.primary[500],
              color: 'white'
            }}
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!dashboardData || !userData) {
    return null;
  }

  const { metrics, quickActions, recentActivity } = dashboardData;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${Colors.neutral[50]} 0%, ${Colors.primary[50]} 50%, ${Colors.secondary[50]} 100%)` 
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${Colors.primary[400]} 0%, transparent 70%)` }}
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
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${Colors.secondary[400]} 0%, transparent 70%)` }}
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
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl shadow-lg border-b relative z-10"
        style={{ borderColor: Colors.neutral[200] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/dashboard" className="flex items-center group">
              <motion.div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BuildingOfficeIcon className="h-5 w-5" style={{ color: 'white' }} />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Trident Financial OS
              </span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: Colors.primary[100] }}>
                  <UserIcon className="h-4 w-4" style={{ color: Colors.primary[600] }} />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium" style={{ color: Colors.neutral[800] }}>{userData.name}</p>
                  <p className="text-xs" style={{ color: Colors.neutral[500] }}>{userData.businessName}</p>
                </div>
              </div>
              <Link
                href="/signin"
                className="transition-colors"
                style={{ color: Colors.neutral[500] }}
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            {getTimeBasedGreeting()}, {userData.name}!
          </h1>
          <p className="text-lg text-gray-600">Here&apos;s your financial overview for today</p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Revenue */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            style={{ borderColor: Colors.success[200] }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.success[500]} 0%, ${Colors.success[700]} 100%)` }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CurrencyDollarIcon className="h-7 w-7 text-white" />
                </motion.div>
                <motion.div 
                  className="flex items-center px-3 py-1.5 rounded-full bg-green-50"
                  style={{ color: Colors.success[700] }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">+{metrics.revenueChange}%</span>
                </motion.div>
              </div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">Total Revenue</h3>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${metrics.totalRevenue.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Outstanding Invoices */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            style={{ borderColor: Colors.warning[200] }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.warning[500]} 0%, ${Colors.warning[700]} 100%)` }}
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <DocumentDuplicateIcon className="h-7 w-7 text-white" />
                </motion.div>
                <motion.div 
                  className="flex items-center px-3 py-1.5 rounded-full bg-red-50"
                  style={{ color: Colors.danger[700] }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">-5.2%</span>
                </motion.div>
              </div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">Outstanding Invoices</h3>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${metrics.outstandingInvoices.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Monthly Expenses */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            style={{ borderColor: Colors.danger[200] }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.danger[500]} 0%, ${Colors.danger[700]} 100%)` }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ReceiptRefundIcon className="h-7 w-7 text-white" />
                </motion.div>
                <motion.div 
                  className="flex items-center px-3 py-1.5 rounded-full bg-orange-50"
                  style={{ color: Colors.warning[700] }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">+{metrics.expenseChange}%</span>
                </motion.div>
              </div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">Monthly Expenses</h3>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${metrics.monthlyExpenses.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Cash Flow */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            style={{ borderColor: Colors.primary[200] }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)` }}
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WalletIcon className="h-7 w-7 text-white" />
                </motion.div>
                <motion.div 
                  className="flex items-center px-3 py-1.5 rounded-full bg-green-50"
                  style={{ color: Colors.success[700] }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">+{metrics.cashFlowChange}%</span>
                </motion.div>
              </div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">Cash Flow</h3>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${metrics.cashFlow.toLocaleString()}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2" style={{ borderColor: Colors.neutral[200] }}>
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action: MockData['dashboard']['quickActions'][0], index: number) => (
                  <motion.button
                    key={action.id}
                    className="flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden"
                    style={{ 
                      borderColor: Colors.neutral[200],
                      backgroundColor: 'white'
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg relative z-10"
                      style={{ background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <DocumentTextIcon className="h-7 w-7 text-white" />
                    </motion.div>
                    <span className="text-sm font-bold group-hover:text-blue-700 transition-colors relative z-10" style={{ color: Colors.neutral[700] }}>
                      {action.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2" style={{ borderColor: Colors.neutral[200] }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recent Activity</h2>
                <Link
                  href="#"
                  className="text-sm font-bold flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  View all
                  <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity: MockData['dashboard']['recentActivity'][0], index: number) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-center p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg group relative overflow-hidden"
                    style={{ borderColor: Colors.neutral[200], backgroundColor: 'white' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-md relative z-10"
                      style={{ background: `linear-gradient(135deg, ${activity.color} 0%, ${activity.color}dd 100%)` }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <DocumentTextIcon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="flex-1 relative z-10">
                      <h3 className="text-sm font-bold mb-1 text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.subtitle}</p>
                    </div>
                    <div className="flex items-center text-gray-400 relative z-10">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">2h ago</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/invoices"
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden block"
              style={{ borderColor: Colors.warning[200] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.warning[500]} 0%, ${Colors.warning[700]} 100%)` }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <DocumentDuplicateIcon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Invoices</h3>
                <p className="text-sm mb-4 text-gray-600">Manage your invoices and payments</p>
                <div className="flex items-center text-orange-600 font-bold">
                  <span className="text-sm">View invoices</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/expenses"
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden block"
              style={{ borderColor: Colors.danger[200] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.danger[500]} 0%, ${Colors.danger[700]} 100%)` }}
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ReceiptRefundIcon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Expenses</h3>
                <p className="text-sm mb-4 text-gray-600">Track and categorize expenses</p>
                <div className="flex items-center text-red-600 font-bold">
                  <span className="text-sm">View expenses</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/wallet"
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden block"
              style={{ borderColor: Colors.primary[200] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)` }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <WalletIcon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Wallet</h3>
                <p className="text-sm mb-4 text-gray-600">Manage your accounts and transactions</p>
                <div className="flex items-center text-blue-600 font-bold">
                  <span className="text-sm">View wallet</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              href="/reports"
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden block"
              style={{ borderColor: Colors.secondary[200] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${Colors.secondary[500]} 0%, ${Colors.secondary[700]} 100%)` }}
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ChartBarIcon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Reports</h3>
                <p className="text-sm mb-4 text-gray-600">Generate financial reports and analytics</p>
                <div className="flex items-center text-teal-600 font-bold">
                  <span className="text-sm">View reports</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
