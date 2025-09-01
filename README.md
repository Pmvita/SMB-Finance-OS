# Trident Financial OS 🚀

> The Financial Operating System for Global Small and Medium Businesses

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/trident-financial-os)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)

## 🌍 Mission

Trident Financial OS is designed to serve the financial needs of underserved small and medium-sized businesses across Africa, Southeast Asia, and other emerging markets. We're building the "Stripe for Africa" and "QuickBooks for Southeast Asia" - a comprehensive fintech infrastructure solution from day one.

## ✨ Features

### 🏢 Core Financial Operations
- **📄 Invoicing** - Create, send, and track professional invoices
- **💰 Expense Tracking** - Monitor and categorize business expenses
- **💳 Digital Wallets** - Secure digital wallet for transactions
- **💸 Payments** - Multi-channel payment processing
- **📊 Tax Reporting** - Automated tax calculations and reporting
- **📈 Credit Scoring** - AI-powered credit assessment and lending readiness
- **👥 Payroll** - Employee management and salary processing

### 🛡️ Enterprise Features
- **🔐 Multi-tenant Architecture** - Secure business isolation
- **🌐 Multi-currency Support** - Global business operations
- **📱 Cross-platform** - Web, mobile, and API access
- **🔒 Compliance Ready** - Built for regulatory requirements

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Mobile App    │
│   (Next.js)     │◄──►│   (Flask)       │◄──►│ (React Native)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL     │
                    │   Database       │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 13+
- Docker (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/pmvita/trident-financial-os.git
cd trident-financial-os
```

### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (may take a few minutes due to psycopg2 compilation)
pip install -r requirements.txt

# If psycopg2-binary fails to install, try:
# pip install psycopg2-binary --no-binary :all:

# Option 1: Run with mock data (no database required)
export MOCK_DATA_MODE=true
python run.py

# Option 2: Run with database (requires PostgreSQL)
python run.py
```

**Note**: The backend supports two modes:
- **Mock Data Mode**: No database required, uses pre-configured mock data
- **Database Mode**: Requires PostgreSQL setup with proper credentials in `.env`

### 3. Frontend Setup
```bash
cd frontend
npm install
# Edit .env.local with your API endpoint
npm run dev
```

### 4. Mobile App Setup
```bash
cd mobile-app
npm install
# Edit .env with your API endpoint
npx expo start
```

## 📚 Documentation

- **[API Documentation](/docs/api/)** - Complete API reference
- **[Architecture Guide](/docs/architecture/)** - System design and technical decisions
- **[Onboarding Guide](/docs/onboarding/)** - Getting started for developers
- **[Deployment Guide](/docs/deployment/)** - Production deployment instructions

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API**: RESTful with OpenAPI/Swagger
- **Testing**: pytest

### Frontend
- **Framework**: Next.js 14 (React + TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: Vercel

### Mobile
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit

### Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Database**: PostgreSQL (managed)

## 🔧 Development

### Project Structure
```
trident-financial-os/
├── backend/          # Flask API server
├── frontend/         # Next.js web application
├── mobile-app/       # React Native mobile app
├── shared/           # Shared TypeScript interfaces
├── docs/             # Documentation
├── tests/            # Test suites
├── scripts/          # Deployment scripts
├── docker/           # Docker configurations
└── .env              # Root environment variables (shared across all apps)
```

### Environment Variables (Single Root .env File)

**🎯 Single Source of Truth**: All environment variables are now managed in one place - the root `.env` file.

#### Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your actual values:
   ```bash
   # Edit the root .env file with your configuration
   nano .env  # or use your preferred editor
   ```

3. **All applications will automatically load** from the root `.env` file:
   - ✅ **Backend**: Automatically loads from root `.env`
   - ✅ **Frontend**: Automatically loads from root `.env` 
   - ✅ **Mobile App**: Automatically loads from root `.env`

#### Environment Variables Overview

```bash
# =============================================================================
# FLASK/BACKEND CONFIGURATION
# =============================================================================
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=True

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================
DATABASE_URL=postgresql://username:password@localhost:5432/trident_financial_os
DATABASE_TEST_URL=postgresql://username:password@localhost:5432/trident_financial_os_test

# =============================================================================
# JWT CONFIGURATION
# =============================================================================
JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production
JWT_ACCESS_TOKEN_EXPIRES=900
JWT_REFRESH_TOKEN_EXPIRES=604800

# =============================================================================
# FRONTEND CONFIGURATION (Next.js)
# =============================================================================
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=Trident Financial OS
NEXT_PUBLIC_APP_VERSION=1.0.0

# =============================================================================
# MOBILE APP CONFIGURATION (React Native/Expo)
# =============================================================================
API_BASE_URL=http://localhost:5000/api/v1
API_TIMEOUT=30000

# =============================================================================
# EXTERNAL SERVICES
# =============================================================================
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# =============================================================================
# FEATURE FLAGS (Shared)
# =============================================================================
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=false
ENABLE_MOCK_DATA=false
ENABLE_ANALYTICS=true
```

#### Benefits of Single Root .env

- 🎯 **Single Source of Truth**: All environment variables in one place
- 🔄 **Automatic Sync**: Changes apply to all applications instantly
- 🚀 **Simplified Setup**: No need to manage multiple .env files
- 🛡️ **Better Security**: Centralized environment variable management
- 📝 **Easier Maintenance**: One file to update for all environments

#### Application-Specific Loading

- **Backend**: Uses `python-dotenv` to load from root `.env`
- **Frontend**: Uses `@next/env` to load from root `.env`
- **Mobile App**: Uses custom script to load from root `.env` into `app.json`

### Running Tests
```bash
# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test

# Mobile app tests
cd mobile-app && npm test
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token

### Core Modules
- `GET/POST /invoices` - Invoice management
- `GET/POST /expenses` - Expense tracking
- `GET/POST /wallet` - Digital wallet operations
- `GET/POST /payments` - Payment processing
- `GET/POST /tax` - Tax reporting
- `GET/POST /credit` - Credit scoring
- `GET/POST /payroll` - Payroll management


## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](/docs/contributing.md) for detailed information about our development workflow and contribution process.

### Quick Development Workflow
1. **Fork the repository** (if you're not a collaborator)
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and commit them (`git commit -m 'feat: add amazing feature'`)
4. **Push to your branch** (`git push origin feature/amazing-feature`)
5. **Create a Pull Request** and request review from @Pmvita

### Branch Protection
- ✅ **Pull requests required** for all changes to main
- ✅ **Code review required** before merging
- ✅ **Code owner approval** (@Pmvita) required
- ❌ **No direct pushes** to main branch allowed

For complete details, see our [Contributing Guide](/docs/contributing.md) and [Architecture Documentation](/docs/architecture/).


## 🆘 Support

- **Documentation**: [docs/](/docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/trident-financial-os/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/trident-financial-os/discussions)
- **Email**: support@tridentfinancialos.com

## 🙏 Acknowledgments

- Inspired by Stripe, QuickBooks, and other fintech pioneers
- Built for the underserved SMB market in emerging economies
- Community-driven development approach

---

