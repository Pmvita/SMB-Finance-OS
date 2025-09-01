'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  ReceiptRefundIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
  ArrowRightIcon,
  EyeIcon,
  PencilIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  MegaphoneIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { 
  CurrencyDollarIcon,
  BriefcaseIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import MockDataService, { MockData } from '../../services/mockDataService';

export default function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [expensesData, setExpensesData] = useState<MockData['expenses'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExpensesData();
  }, []);

  const loadExpensesData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mockService = MockDataService.getInstance();
      const data = await mockService.fetchExpenses();
      setExpensesData(data);
    } catch (error) {
      console.error('Error loading expenses data:', error);
      setError('Failed to load expenses data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'office supplies':
        return <BriefcaseIcon className="h-6 w-6 text-white" />;
      case 'travel':
        return <PaperAirplaneIcon className="h-6 w-6 text-white" />;
      case 'marketing':
        return <MegaphoneIcon className="h-6 w-6 text-white" />;
      case 'software':
        return <ComputerDesktopIcon className="h-6 w-6 text-white" />;
      default:
        return <ReceiptRefundIcon className="h-6 w-6 text-white" />;
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
          <p className="text-slate-600 text-lg">Loading expenses...</p>
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
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Expenses</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={loadExpensesData}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!expensesData) {
    return null;
  }

  const { summary, categories, recent } = expensesData;

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

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/invoices"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Invoices
              </Link>
              <Link
                href="/wallet"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Wallet
              </Link>
              <Link
                href="/profile"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Expenses</h1>
          <p className="text-slate-600">Track and categorize your business expenses</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <ReceiptRefundIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Expenses</h3>
            <p className="text-2xl font-bold text-slate-800">${summary.totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-red-600 font-medium">-12% this month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">This Month</h3>
            <p className="text-2xl font-bold text-slate-800">${summary.thisMonth.toLocaleString()}</p>
            <p className="text-sm text-emerald-600 font-medium">+8% vs last month</p>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: category.color }}
                >
                  {getCategoryIcon(category.name)}
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">{category.name}</h3>
                <p className="text-lg font-bold text-slate-800 mb-1">${category.amount.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{category.count} expenses</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Add Expense
          </button>
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <PhotoIcon className="h-5 w-5" />
            Scan Receipt
          </button>
        </motion.div>

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Recent Expenses</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {recent.map((expense) => (
              <div key={expense.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <ReceiptRefundIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{expense.id}</h3>
                      <p className="text-sm text-slate-600">{expense.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                      {expense.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">{expense.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Amount</p>
                    <p className="text-lg font-semibold text-slate-800">${expense.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Date</p>
                    <p className="text-sm text-slate-800">{expense.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
