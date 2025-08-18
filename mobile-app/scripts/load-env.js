// Script to load environment variables from root .env file
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from root .env file
const rootDir = path.join(__dirname, '..', '..');
const envPath = path.join(rootDir, '.env');

if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  
  // Update app.json with environment variables
  const appJsonPath = path.join(__dirname, '..', 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  
  // Update extra section with environment variables
  appJson.expo.extra = {
    ...appJson.expo.extra,
    API_BASE_URL: envConfig.API_BASE_URL || 'http://localhost:5000/api/v1',
    API_TIMEOUT: envConfig.API_TIMEOUT || '30000',
    STRIPE_PUBLISHABLE_KEY: envConfig.STRIPE_PUBLISHABLE_KEY || '',
    SENTRY_DSN: envConfig.SENTRY_DSN || '',
    ENABLE_MOCK_DATA: envConfig.ENABLE_MOCK_DATA || 'false',
    ENABLE_ANALYTICS: envConfig.ENABLE_ANALYTICS || 'true',
  };
  
  // Write updated app.json
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  
  console.log('✅ Environment variables loaded from root .env file');
} else {
  console.log('⚠️  No .env file found in root directory, using defaults');
}
