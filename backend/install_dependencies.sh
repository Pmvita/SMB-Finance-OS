#!/bin/bash

echo "🚀 Installing SMB Finance OS Backend Dependencies..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies (using dev requirements without psycopg2)
echo "📥 Installing dependencies..."
pip install -r requirements-dev.txt

echo "✅ Dependencies installed successfully!"
echo ""
echo "To start the backend with mock data:"
echo "  export MOCK_DATA_MODE=true"
echo "  python run.py"
echo ""
echo "To start the backend with database:"
echo "  python run.py" 