'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  EyeIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { 
  CurrencyDollarIcon,
  WalletIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import MockDataService, { MockData } from '../../services/mockDataService';

export default function Wallet() {
  const [isLoading, setIsLoading] = useState(true);
  const [walletData, setWalletData] = useState<MockData['wallet'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mockService = MockDataService.getInstance();
      const data = await mockService.fetchWallet();
      setWalletData(data);
    } catch (error) {
      console.error('Error loading wallet data:', error);
      setError('Failed to load wallet data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'checking':
        return <CreditCardIcon className="h-6 w-6 text-blue-600" />;
      case 'savings':
        return <BanknotesIcon className="h-6 w-6 text-emerald-600" />;
      case 'reserve':
        return <WalletIcon className="h-6 w-6 text-purple-600" />;
      default:
        return <WalletIcon className="h-6 w-6 text-slate-600" />;
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
          <p className="text-slate-600 text-lg">Loading wallet...</p>
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
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Wallet</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={loadWalletData}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!walletData) {
    return null;
  }

  const { totalBalance, balanceChange, changePercent, accounts, recentTransactions } = walletData;

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
              <span className="text-xl font-bold text-slate-800">SMB Finance OS</span>
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
                href="/expenses"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Expenses
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
        {/* Total Balance Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8 text-center"
        >
          <h2 className="text-lg text-slate-300 mb-4">Total Balance</h2>
          <p className="text-4xl font-bold text-white mb-4">${totalBalance.toLocaleString()}</p>
          <div className="flex items-center justify-center space-x-2">
            <ArrowUpIcon className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">
              +${balanceChange.toLocaleString()} ({changePercent}%)
            </span>
          </div>
        </motion.div>

        {/* Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <div key={account.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{account.name}</h3>
                      <p className="text-sm text-slate-500">{account.accountNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-2xl font-bold text-slate-800">${account.balance.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">{account.currency}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                    {account.type.toUpperCase()}
                  </span>
                  <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Add Money
          </button>
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <ArrowUpIcon className="h-5 w-5" />
            Send Money
          </button>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-emerald-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownIcon className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <ArrowUpIcon className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-800">{transaction.description}</h3>
                      <p className="text-xs text-slate-500">{transaction.date} • {transaction.account}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
