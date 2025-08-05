from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class TaxPeriod(db.Model):
    """Tax period model for organizing tax records"""
    
    __tablename__ = 'tax_periods'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    period_type = db.Column(db.String(50))  # monthly, quarterly, yearly
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    
    # Relationships
    tax_records = db.relationship('TaxRecord', backref='tax_period', lazy='dynamic')
    
    def to_dict(self):
        """Convert tax period to dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'period_type': self.period_type,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_active': self.is_active,
            'business_id': str(self.business_id)
        }
    
    def __repr__(self):
        return f'<TaxPeriod {self.name}>'

class TaxRecord(db.Model):
    """Tax record model for tax calculations and reporting"""
    
    __tablename__ = 'tax_records'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tax_type = db.Column(db.String(50), nullable=False)  # income_tax, sales_tax, vat, etc.
    tax_rate = db.Column(db.Numeric(5, 4), nullable=False)  # Percentage as decimal
    taxable_amount = db.Column(db.Numeric(15, 2), nullable=False)
    tax_amount = db.Column(db.Numeric(15, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    
    # Status
    status = db.Column(db.String(50), default='pending')  # pending, calculated, filed, paid
    filed_date = db.Column(db.Date)
    paid_date = db.Column(db.Date)
    
    # Additional Data
    notes = db.Column(db.Text)
    metadata = db.Column(JSON, default={})
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    tax_period_id = db.Column(UUID(as_uuid=True), db.ForeignKey('tax_periods.id'))
    
    def calculate_tax(self):
        """Calculate tax amount based on rate and taxable amount"""
        self.tax_amount = self.taxable_amount * self.tax_rate
    
    def mark_as_filed(self, filed_date=None):
        """Mark tax record as filed"""
        self.status = 'filed'
        self.filed_date = filed_date or datetime.utcnow().date()
    
    def mark_as_paid(self, paid_date=None):
        """Mark tax record as paid"""
        self.status = 'paid'
        self.paid_date = paid_date or datetime.utcnow().date()
    
    def to_dict(self):
        """Convert tax record to dictionary"""
        return {
            'id': str(self.id),
            'tax_type': self.tax_type,
            'tax_rate': float(self.tax_rate),
            'taxable_amount': float(self.taxable_amount),
            'tax_amount': float(self.tax_amount),
            'currency': self.currency,
            'status': self.status,
            'filed_date': self.filed_date.isoformat() if self.filed_date else None,
            'paid_date': self.paid_date.isoformat() if self.paid_date else None,
            'notes': self.notes,
            'metadata': self.metadata,
            'business_id': str(self.business_id),
            'tax_period_id': str(self.tax_period_id) if self.tax_period_id else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<TaxRecord {self.tax_type} {self.tax_amount}>' 