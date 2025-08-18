#!/usr/bin/env python3
"""
SMB Finance OS - Flask Application Entry Point
"""

import os
from app import create_app, db
from app.models import *  # Import all models
from flask_migrate import upgrade

# Create Flask app
app = create_app()

@app.shell_context_processor
def make_shell_context():
    """Make shell context for Flask CLI"""
    return {
        'app': app,
        'db': db,
        'User': User,
        'Business': Business,
        'Invoice': Invoice,
        'Expense': Expense,
        'Wallet': Wallet,
        'Payment': Payment,
        'TaxRecord': TaxRecord,
        'CreditProfile': CreditProfile,
        'Payroll': Payroll,
        'Employee': Employee
    }

@app.cli.command()
def init_db():
    """Initialize the database with tables"""
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")

@app.cli.command()
def seed_db():
    """Seed the database with initial data"""
    from app.utils.seed import seed_database
    with app.app_context():
        seed_database()
        print("Database seeded successfully!")

@app.cli.command()
def test():
    """Run the test suite"""
    import pytest
    pytest.main(['tests/'])

if __name__ == '__main__':
    # Run database migrations (skip if database not available)
    with app.app_context():
        try:
            upgrade()
            print("✅ Database migrations completed successfully!")
        except Exception as e:
            print(f"⚠️  Database migration skipped (this is normal for mockData testing): {e}")
            print("📊 MockData endpoints will still work without database")
    
    # Run the application
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"🚀 Starting SMB Finance OS API on port {port}")
    print(f"📊 Health check: http://localhost:{port}/health")
    print(f"🔗 API Base URL: http://localhost:{port}/api/v1")
    print(f"📋 MockData endpoints:")
    print(f"   - http://localhost:{port}/api/mockdata (all data)")
    print(f"   - http://localhost:{port}/api/mockdata/dashboard")
    print(f"   - http://localhost:{port}/api/mockdata/invoices")
    print(f"   - http://localhost:{port}/api/mockdata/expenses")
    print(f"   - http://localhost:{port}/api/mockdata/wallet")
    print(f"   - http://localhost:{port}/api/mockdata/profile")
    print(f"   - http://localhost:{port}/api/mockdata/user")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
