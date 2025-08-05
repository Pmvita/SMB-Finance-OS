from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Business(db.Model):
    """Business model for multi-tenant architecture"""
    
    __tablename__ = 'businesses'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), nullable=False)
    legal_name = db.Column(db.String(255))
    business_type = db.Column(db.String(100))  # sole_proprietorship, llc, corporation, etc.
    industry = db.Column(db.String(100))
    tax_id = db.Column(db.String(50))
    registration_number = db.Column(db.String(100))
    
    # Address
    address_line_1 = db.Column(db.String(255))
    address_line_2 = db.Column(db.String(255))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    postal_code = db.Column(db.String(20))
    country = db.Column(db.String(100))
    
    # Contact
    phone = db.Column(db.String(20))
    website = db.Column(db.String(255))
    email = db.Column(db.String(255))
    
    # Financial
    currency = db.Column(db.String(3), default='USD')
    fiscal_year_start = db.Column(db.Date)
    tax_year = db.Column(db.Integer)
    
    # Settings
    settings = db.Column(JSON, default={})
    is_active = db.Column(db.Boolean, default=True)
    subscription_plan = db.Column(db.String(50), default='free')  # free, basic, pro, enterprise
    subscription_status = db.Column(db.String(50), default='active')  # active, suspended, cancelled
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    owner_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    invoices = db.relationship('Invoice', backref='business', lazy='dynamic')
    expenses = db.relationship('Expense', backref='business', lazy='dynamic')
    wallets = db.relationship('Wallet', backref='business', lazy='dynamic')
    payments = db.relationship('Payment', backref='business', lazy='dynamic')
    tax_records = db.relationship('TaxRecord', backref='business', lazy='dynamic')
    credit_profile = db.relationship('CreditProfile', backref='business', uselist=False)
    payrolls = db.relationship('Payroll', backref='business', lazy='dynamic')
    employees = db.relationship('Employee', backref='business', lazy='dynamic')
    
    def to_dict(self):
        """Convert business to dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'legal_name': self.legal_name,
            'business_type': self.business_type,
            'industry': self.industry,
            'tax_id': self.tax_id,
            'registration_number': self.registration_number,
            'address': {
                'line_1': self.address_line_1,
                'line_2': self.address_line_2,
                'city': self.city,
                'state': self.state,
                'postal_code': self.postal_code,
                'country': self.country
            },
            'contact': {
                'phone': self.phone,
                'website': self.website,
                'email': self.email
            },
            'financial': {
                'currency': self.currency,
                'fiscal_year_start': self.fiscal_year_start.isoformat() if self.fiscal_year_start else None,
                'tax_year': self.tax_year
            },
            'settings': self.settings,
            'is_active': self.is_active,
            'subscription_plan': self.subscription_plan,
            'subscription_status': self.subscription_status,
            'owner_id': str(self.owner_id),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Business {self.name}>' 