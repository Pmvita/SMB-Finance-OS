# Trident Financial OS 🚀

> The Financial Operating System for Global Small and Medium Businesses

<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/Pmvita/smb-finance-os?style=for-the-badge&logo=github&logoColor=white)
![GitHub forks](https://img.shields.io/github/forks/Pmvita/smb-finance-os?style=for-the-badge&logo=github&logoColor=white)
![GitHub issues](https://img.shields.io/github/issues/Pmvita/smb-finance-os?style=for-the-badge&logo=github&logoColor=white)
![GitHub license](https://img.shields.io/github/license/Pmvita/smb-finance-os?style=for-the-badge&logo=github&logoColor=white)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Pmvita.smb-finance-os&left_color=blue&right_color=green)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Pmvita/smb-finance-os)

</div>

<div align="center">

## 🚀 Development Status

![Status](https://img.shields.io/badge/Status-In_Development-yellow?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 🌐 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pierre-mvita/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://pierre-mvita.vercel.app/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:Petermvita@hotmail.com)

## 🐍 Backend Stack

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![pytest](https://img.shields.io/badge/pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white)

## 💻 Frontend Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📱 Mobile Stack

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## 💾 Database & Infrastructure

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## 💳 Payment & FinTech

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

## 🐳 DevOps & Deployment

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

</div>

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

```mermaid
flowchart TB
    subgraph APPS["📱 Applications"]
        Frontend["🌐 Frontend<br/>(Next.js)"]
        Backend["🔧 Backend<br/>(Flask)"]
        Mobile["📱 Mobile App<br/>(React Native)"]
    end

    subgraph DATA["💾 Data Layer"]
        DB["🐘 PostgreSQL<br/>Database"]
    end

    Frontend <--> Backend
    Backend <--> Mobile
    Frontend --> DB
    Backend --> DB
    Mobile --> DB

    style APPS fill:#E8F5E9,stroke:#4CAF50,color:#000
    style DATA fill:#E3F2FD,stroke:#2196F3,color:#000
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


## 📊 GitHub Stats

<div align="center">

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=Pmvita&repo=smb-finance-os&show_icons=true&theme=dark&hide_border=true&bg_color=0D1117&title_color=00FF00&icon_color=00FF00)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=Pmvita&repo=smb-finance-os&layout=compact&theme=dark&hide_border=true&bg_color=0D1117&title_color=00FF00)

![GitHub Streak](https://github-readme-streak-stats.demolab.com/?user=Pmvita&repo=smb-finance-os&theme=dark&hide_border=true&background=0D1117&ring=00FF00&fire=00FF00&currStreakLabel=00FF00)

</div>

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
- **Issues**: [GitHub Issues](https://github.com/Pmvita/smb-finance-os/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Pmvita/smb-finance-os/discussions)
- **Email**: Petermvita@hotmail.com

## 🙏 Acknowledgments

- Inspired by Stripe, QuickBooks, and other fintech pioneers
- Built for the underserved SMB market in emerging economies
- Community-driven development approach

---

