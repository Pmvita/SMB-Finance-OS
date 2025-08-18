// Mobile App Environment Configuration
// Loads environment variables from root .env file using Expo's approach

import Constants from 'expo-constants';

interface EnvironmentConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  STRIPE_PUBLISHABLE_KEY: string;
  SENTRY_DSN: string;
  ENABLE_MOCK_DATA: boolean;
  ENABLE_ANALYTICS: boolean;
}

// Default values
const defaultConfig: EnvironmentConfig = {
  API_BASE_URL: 'http://localhost:5000/api/v1',
  API_TIMEOUT: 30000,
  STRIPE_PUBLISHABLE_KEY: '',
  SENTRY_DSN: '',
  ENABLE_MOCK_DATA: false,
  ENABLE_ANALYTICS: true,
};

// Load environment variables from root .env file
const loadEnvConfig = (): EnvironmentConfig => {
  const config: EnvironmentConfig = { ...defaultConfig };

  // Use Expo Constants to access environment variables
  const expoConfig = Constants.expoConfig || {};
  const extra = expoConfig.extra || {};

  // Load from Expo's extra config (which can be populated from .env)
  config.API_BASE_URL = extra.API_BASE_URL || process.env.API_BASE_URL || defaultConfig.API_BASE_URL;
  config.API_TIMEOUT = parseInt(extra.API_TIMEOUT || process.env.API_TIMEOUT || '30000', 10);
  config.STRIPE_PUBLISHABLE_KEY = extra.STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || '';
  config.SENTRY_DSN = extra.SENTRY_DSN || process.env.SENTRY_DSN || '';
  config.ENABLE_MOCK_DATA = extra.ENABLE_MOCK_DATA === 'true' || process.env.ENABLE_MOCK_DATA === 'true';
  config.ENABLE_ANALYTICS = extra.ENABLE_ANALYTICS !== 'false' && process.env.ENABLE_ANALYTICS !== 'false';

  return config;
};

export const env = loadEnvConfig();
export default env;
