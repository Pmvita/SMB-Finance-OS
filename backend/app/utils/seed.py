from app import db
from app.models.user import User
from app.models.business import Business
from app.models.expense import ExpenseCategory
from app.models.wallet import Wallet
from app.models.credit import CreditProfile
from datetime import datetime, date
import uuid

def seed_database():
    """Seed the database with initial data"""
    
    # Create admin user
    admin_user = User(
        email='admin@smbfinanceos.com',
        password='admin123456',
        first_name='Admin',
        last_name='User',
        role='admin',
        is_verified=True,
        is_active=True
    )
    
    # Create demo business owner
    demo_user = User(
        email='demo@smbfinanceos.com',
        password='demo123456',
        first_name='Demo',
        last_name='Business',
        role='business_owner',
        is_verified=True,
        is_active=True
    )
    
    db.session.add(admin_user)
    db.session.add(demo_user)
    db.session.flush()  # Get the user IDs
    
    # Create demo business
    demo_business = Business(
        name='Demo Business Inc.',
        legal_name='Demo Business Incorporated',
        business_type='llc',
        industry='Technology',
        tax_id='12-3456789',
        address_line_1='123 Business Street',
        city='San Francisco',
        state='CA',
        postal_code='94105',
        country='USA',
        phone='+1-555-0123',
        email='contact@demobusiness.com',
        website='https://demobusiness.com',
        currency='USD',
        fiscal_year_start=date(2024, 1, 1),
        tax_year=2024,
        subscription_plan='pro',
        subscription_status='active',
        is_active=True,
        owner_id=demo_user.id
    )
    
    db.session.add(demo_business)
    db.session.flush()
    
    # Create default expense categories
    default_categories = [
        {
            'name': 'Office Supplies',
            'description': 'Office equipment and supplies',
            'color': '#3B82F6',
            'icon': 'briefcase'
        },
        {
            'name': 'Travel & Entertainment',
            'description': 'Business travel and entertainment expenses',
            'color': '#10B981',
            'icon': 'airplane'
        },
        {
            'name': 'Marketing & Advertising',
            'description': 'Marketing and advertising expenses',
            'color': '#F59E0B',
            'icon': 'megaphone'
        },
        {
            'name': 'Software & Subscriptions',
            'description': 'Software licenses and subscriptions',
            'color': '#8B5CF6',
            'icon': 'computer'
        },
        {
            'name': 'Utilities',
            'description': 'Electricity, water, internet, etc.',
            'color': '#EF4444',
            'icon': 'lightning'
        },
        {
            'name': 'Professional Services',
            'description': 'Legal, accounting, consulting fees',
            'color': '#06B6D4',
            'icon': 'user-tie'
        }
    ]
    
    for category_data in default_categories:
        category = ExpenseCategory(
            name=category_data['name'],
            description=category_data['description'],
            color=category_data['color'],
            icon=category_data['icon'],
            business_id=demo_business.id
        )
        db.session.add(category)
    
    # Create default wallets
    default_wallets = [
        {
            'name': 'Operating Account',
            'wallet_type': 'operating',
            'currency': 'USD',
            'balance': 50000.00
        },
        {
            'name': 'Tax Reserve',
            'wallet_type': 'tax_reserve',
            'currency': 'USD',
            'balance': 15000.00
        },
        {
            'name': 'Savings Account',
            'wallet_type': 'savings',
            'currency': 'USD',
            'balance': 100000.00
        }
    ]
    
    for wallet_data in default_wallets:
        wallet = Wallet(
            name=wallet_data['name'],
            wallet_type=wallet_data['wallet_type'],
            currency=wallet_data['currency'],
            balance=wallet_data['balance'],
            business_id=demo_business.id
        )
        db.session.add(wallet)
    
    # Create credit profile
    credit_profile = CreditProfile(
        annual_revenue=500000.00,
        monthly_cash_flow=25000.00,
        debt_to_income_ratio=0.35,
        payment_history_score=85,
        business_age_months=24,
        industry_risk_score=70,
        market_position_score=80,
        assessment_factors={
            'payment_history': 'excellent',
            'business_stability': 'stable',
            'industry_growth': 'positive',
            'market_position': 'strong'
        },
        business_id=demo_business.id
    )
    
    # Calculate scores
    credit_profile.calculate_credit_score()
    credit_profile.calculate_credit_rating()
    credit_profile.calculate_lending_readiness()
    
    db.session.add(credit_profile)
    
    # Commit all changes
    db.session.commit()
    
    print("✅ Database seeded successfully!")
    print(f"📧 Admin user: admin@smbfinanceos.com / admin123456")
    print(f"📧 Demo user: demo@smbfinanceos.com / demo123456")
    print(f"🏢 Demo business: Demo Business Inc.")
    print(f"💰 Default wallets created with sample balances")
    print(f"📊 Credit profile created with sample data")
    print(f"📁 Default expense categories created")

def clear_database():
    """Clear all data from the database"""
    try:
        # Delete all data in reverse order of dependencies
        db.session.execute('DELETE FROM credit_scores')
        db.session.execute('DELETE FROM credit_profiles')
        db.session.execute('DELETE FROM transactions')
        db.session.execute('DELETE FROM wallets')
        db.session.execute('DELETE FROM payrolls')
        db.session.execute('DELETE FROM employees')
        db.session.execute('DELETE FROM tax_records')
        db.session.execute('DELETE FROM tax_periods')
        db.session.execute('DELETE FROM payments')
        db.session.execute('DELETE FROM expenses')
        db.session.execute('DELETE FROM expense_categories')
        db.session.execute('DELETE FROM invoice_items')
        db.session.execute('DELETE FROM invoices')
        db.session.execute('DELETE FROM businesses')
        db.session.execute('DELETE FROM users')
        
        db.session.commit()
        print("✅ Database cleared successfully!")
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error clearing database: {e}")

def reset_database():
    """Reset the database (clear and reseed)"""
    print("🗑️  Clearing database...")
    clear_database()
    
    print("🌱 Seeding database...")
    seed_database()
    
    print("✅ Database reset successfully!") 