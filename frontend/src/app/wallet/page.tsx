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
import { Colors } from '../../constants/colors';

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
        return <CreditCardIcon className="h-6 w-6" style={{ color: Colors.primary[600] }} />;
      case 'savings':
        return <BanknotesIcon className="h-6 w-6" style={{ color: Colors.success[600] }} />;
      case 'reserve':
        return <WalletIcon className="h-6 w-6" style={{ color: Colors.secondary[600] }} />;
      default:
        return <WalletIcon className="h-6 w-6" style={{ color: Colors.neutral[600] }} />;
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
          <p className="text-lg" style={{ color: Colors.neutral[600] }}>Loading wallet...</p>
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
          <h2 className="text-xl font-semibold mb-2" style={{ color: Colors.neutral[800] }}>Error Loading Wallet</h2>
          <p className="mb-6" style={{ color: Colors.neutral[600] }}>{error}</p>
          <button
            onClick={loadWalletData}
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

  if (!walletData) {
    return null;
  }

  const { totalBalance, balanceChange, changePercent, accounts, recentTransactions } = walletData;

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(135deg, ${Colors.neutral[50]} 0%, ${Colors.neutral[100]} 100%)` 
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
        style={{ borderColor: Colors.neutral[200] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: Colors.primary[500] }}>
                <BuildingOfficeIcon className="h-5 w-5" style={{ color: 'white' }} />
              </div>
              <span className="text-xl font-bold" style={{ color: Colors.neutral[800] }}>Trident Financial OS</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="transition-colors"
                style={{ color: Colors.neutral[500] }}
              >
                Dashboard
              </Link>
              <Link
                href="/invoices"
                className="transition-colors"
                style={{ color: Colors.neutral[500] }}
              >
                Invoices
              </Link>
              <Link
                href="/expenses"
                className="transition-colors"
                style={{ color: Colors.neutral[500] }}
              >
                Expenses
              </Link>
              <Link
                href="/profile"
                className="transition-colors"
                style={{ color: Colors.neutral[500] }}
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
          className="rounded-2xl p-8 mb-8 text-center"
          style={{ backgroundColor: Colors.neutral[800] }}
        >
          <h2 className="text-lg mb-4" style={{ color: Colors.neutral[300] }}>Total Balance</h2>
          <p className="text-4xl font-bold mb-4" style={{ color: 'white' }}>${totalBalance.toLocaleString()}</p>
          <div className="flex items-center justify-center space-x-2">
            <ArrowUpIcon className="h-5 w-5" style={{ color: Colors.success[400] }} />
            <span className="font-semibold" style={{ color: Colors.success[400] }}>
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
          <h2 className="text-lg font-semibold mb-6" style={{ color: Colors.neutral[800] }}>Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <div key={account.id} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow" style={{ borderColor: Colors.neutral[200] }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Colors.neutral[100] }}>
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: Colors.neutral[800] }}>{account.name}</h3>
                      <p className="text-sm" style={{ color: Colors.neutral[500] }}>{account.accountNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-2xl font-bold" style={{ color: Colors.neutral[800] }}>${account.balance.toLocaleString()}</p>
                  <p className="text-sm" style={{ color: Colors.neutral[500] }}>{account.currency}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: Colors.neutral[100], color: Colors.neutral[700] }}>
                    {account.type.toUpperCase()}
                  </span>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" style={{ color: Colors.neutral[500] }}>
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
          <button className="flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2" style={{ 
            backgroundColor: Colors.success[500],
            color: 'white'
          }}>
            <PlusIcon className="h-5 w-5" />
            Add Money
          </button>
          <button className="flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2" style={{ 
            backgroundColor: Colors.primary[500],
            color: 'white'
          }}>
            <ArrowUpIcon className="h-5 w-5" />
            Send Money
          </button>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border overflow-hidden"
          style={{ borderColor: Colors.neutral[200] }}
        >
          <div className="px-6 py-4 border-b" style={{ borderColor: Colors.neutral[200] }}>
            <h2 className="text-lg font-semibold" style={{ color: Colors.neutral[800] }}>Recent Transactions</h2>
          </div>
          <div className="divide-y" style={{ borderColor: Colors.neutral[200] }}>
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ 
                      backgroundColor: transaction.type === 'credit' ? Colors.success[100] : Colors.danger[100]
                    }}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownIcon className="h-5 w-5" style={{ color: Colors.success[600] }} />
                      ) : (
                        <ArrowUpIcon className="h-5 w-5" style={{ color: Colors.danger[600] }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold" style={{ color: Colors.neutral[800] }}>{transaction.description}</h3>
                      <p className="text-xs" style={{ color: Colors.neutral[500] }}>{transaction.date} • {transaction.account}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ 
                      color: transaction.type === 'credit' ? Colors.success[600] : Colors.danger[600]
                    }}>
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
