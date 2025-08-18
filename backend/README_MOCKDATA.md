# Backend Setup with Mock Data

This guide helps you run the SMB Finance OS backend with mock data, bypassing database dependencies.

## Quick Start

### 1. Install Dependencies

```bash
# Make the install script executable
chmod +x install_dependencies.sh

# Install dependencies (without psycopg2 for Python 3.13 compatibility)
./install_dependencies.sh
```

### 2. Start the Backend with Mock Data

```bash
# Activate virtual environment
source venv/bin/activate

# Start with mock data mode
export MOCK_DATA_MODE=true
python run.py
```

## Available Endpoints

Once running, the following endpoints will be available:

- **Health Check**: `http://localhost:5000/health`
- **All Mock Data**: `http://localhost:5000/api/mockdata`
- **Dashboard Data**: `http://localhost:5000/api/mockdata/dashboard`
- **Invoices**: `http://localhost:5000/api/mockdata/invoices`
- **Expenses**: `http://localhost:5000/api/mockdata/expenses`
- **Wallet**: `http://localhost:5000/api/mockdata/wallet`
- **Profile**: `http://localhost:5000/api/mockdata/profile`
- **User**: `http://localhost:5000/api/mockdata/user`

## Frontend & Mobile App Integration

The backend is configured with CORS to allow connections from:
- Frontend: `http://localhost:3000`
- Mobile App: `http://localhost:8081`, `exp://192.168.2.50:8081`

## Troubleshooting

### Python 3.13 Compatibility
The `psycopg2-binary` package has compatibility issues with Python 3.13. This setup uses `requirements-dev.txt` which excludes this dependency for development.

### Port Already in Use
If port 5000 is already in use, set a different port:
```bash
export PORT=5001
export MOCK_DATA_MODE=true
python run.py
```

## Development Mode

For full development with database:
```bash
# Install full requirements (requires PostgreSQL)
pip install -r requirements.txt

# Start without mock data mode
python run.py
``` 