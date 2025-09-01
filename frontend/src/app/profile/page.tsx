'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  MoonIcon,
  BuildingOfficeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { 
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ReceiptRefundIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import MockDataService, { MockData } from '../../services/mockDataService';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<MockData['profile'] | null>(null);
  const [userData, setUserData] = useState<MockData['user'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mockService = MockDataService.getInstance();
      const [profile, user] = await Promise.all([
        mockService.fetchProfile(),
        mockService.fetchUser()
      ]);
      
      setProfileData(profile);
      setUserData(user);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setError('Failed to load profile data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      window.location.href = '/signin';
    }
  };

  const handleSettingPress = (setting: { action: string; title: string }) => {
    if (setting.action === 'toggle') {
      if (setting.title === 'Notifications') {
        setNotificationsEnabled(!notificationsEnabled);
      }
    } else {
      alert(`${setting.title} will be available soon!`);
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
          <p className="text-slate-600 text-lg">Loading profile...</p>
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
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Profile</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={loadProfileData}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!profileData || !userData) {
    return null;
  }

  const { stats, settings } = profileData;

  // Add language setting to the settings array
  const enhancedSettings = [
    ...settings,
    {
      title: 'Language',
      icon: 'language',
      color: '#06b6d4',
      action: 'navigate',
      value: 'English'
    }
  ];

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
                href="/expenses"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Expenses
              </Link>
              <Link
                href="/wallet"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Wallet
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{userData.name}</h1>
              <p className="text-slate-300 mb-1">{userData.email}</p>
              <p className="text-emerald-400 font-semibold">{userData.businessName}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DocumentDuplicateIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800 mb-1">{stats.invoices}</p>
            <p className="text-sm text-slate-600">Invoices</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800 mb-1">${stats.balance.toLocaleString()}</p>
            <p className="text-sm text-slate-600">Balance</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ReceiptRefundIcon className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800 mb-1">{stats.expenses}</p>
            <p className="text-sm text-slate-600">Expenses</p>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Settings</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {enhancedSettings.map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleSettingPress(setting)}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: setting.color }}
                  >
                    {setting.title === 'Notifications' && <BellIcon className="h-5 w-5 text-white" />}
                    {setting.title === 'Security' && <ShieldCheckIcon className="h-5 w-5 text-white" />}
                    {setting.title === 'Language' && <GlobeAltIcon className="h-5 w-5 text-white" />}
                    {setting.title === 'Dark Mode' && <MoonIcon className="h-5 w-5 text-white" />}
                    {setting.title === 'General' && <Cog6ToothIcon className="h-5 w-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{setting.title}</h3>
                    {setting.title === 'Language' && (
                      <p className="text-xs text-slate-500">{setting.value}</p>
                    )}
                  </div>
                </div>
                {setting.action === 'toggle' ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={setting.title === 'Notifications' ? notificationsEnabled : Boolean(setting.value)}
                      onChange={() => {
                        if (setting.title === 'Notifications') {
                          setNotificationsEnabled(!notificationsEnabled);
                        }
                      }}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                    />
                  </div>
                ) : (
                  <ArrowRightIcon className="h-5 w-5 text-slate-400" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <button
            onClick={handleLogout}
            className="w-full bg-white hover:bg-red-50 text-red-600 font-semibold py-4 px-6 rounded-2xl border border-red-200 hover:border-red-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
