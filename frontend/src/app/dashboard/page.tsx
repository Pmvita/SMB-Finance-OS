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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <BuildingOfficeIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Trident Financial OS</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-800">{userData.name}</p>
                  <p className="text-xs text-slate-500">{userData.businessName}</p>
                </div>
              </div>
              <Link
                href="/signin"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {getTimeBasedGreeting()}, {userData.name}!
          </h1>
                      <p className="text-slate-600">Here&apos;s your financial overview for today</p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex items-center text-emerald-600">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{metrics.revenueChange}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-slate-800">${metrics.totalRevenue.toLocaleString()}</p>
          </div>

          {/* Outstanding Invoices */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <DocumentDuplicateIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex items-center text-red-600">
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">-5.2%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Outstanding Invoices</h3>
            <p className="text-2xl font-bold text-slate-800">${metrics.outstandingInvoices.toLocaleString()}</p>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <ReceiptRefundIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex items-center text-amber-600">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{metrics.expenseChange}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Monthly Expenses</h3>
            <p className="text-2xl font-bold text-slate-800">${metrics.monthlyExpenses.toLocaleString()}</p>
          </div>

          {/* Cash Flow */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <WalletIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-emerald-600">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{metrics.cashFlowChange}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Cash Flow</h3>
            <p className="text-2xl font-bold text-slate-800">${metrics.cashFlow.toLocaleString()}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action: MockData['dashboard']['quickActions'][0]) => (
                  <button
                    key={action.id}
                    className="flex flex-col items-center p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200 group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: action.color }}
                    >
                      <DocumentTextIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                      {action.title}
                    </span>
                  </button>
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
                <Link
                  href="#"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
                >
                  View all
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity: MockData['dashboard']['recentActivity'][0]) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: activity.color }}
                    >
                      <DocumentTextIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-800">{activity.title}</h3>
                      <p className="text-sm text-slate-500">{activity.subtitle}</p>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs">2h ago</span>
                    </div>
                  </div>
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
          <Link
            href="/invoices"
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <DocumentDuplicateIcon className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Invoices</h3>
            <p className="text-sm text-slate-600 mb-4">Manage your invoices and payments</p>
            <div className="flex items-center text-orange-600 group-hover:text-orange-700">
              <span className="text-sm font-medium">View invoices</span>
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/expenses"
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <ReceiptRefundIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Expenses</h3>
            <p className="text-sm text-slate-600 mb-4">Track and categorize expenses</p>
            <div className="flex items-center text-red-600 group-hover:text-red-700">
              <span className="text-sm font-medium">View expenses</span>
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/wallet"
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <WalletIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Wallet</h3>
            <p className="text-sm text-slate-600 mb-4">Manage your accounts and transactions</p>
            <div className="flex items-center text-blue-600 group-hover:text-blue-700">
              <span className="text-sm font-medium">View wallet</span>
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/reports"
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Reports</h3>
            <p className="text-sm text-slate-600 mb-4">Generate financial reports and analytics</p>
            <div className="flex items-center text-purple-600 group-hover:text-purple-700">
              <span className="text-sm font-medium">View reports</span>
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
