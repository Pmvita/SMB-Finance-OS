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
    # Run database migrations
    with app.app_context():
        try:
            upgrade()
        except Exception as e:
            print(f"Migration error (this is normal for first run): {e}")
    
    # Run the application
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"🚀 Starting SMB Finance OS API on port {port}")
    print(f"📊 Health check: http://localhost:{port}/health")
    print(f"🔗 API Base URL: http://localhost:{port}/api/v1")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
