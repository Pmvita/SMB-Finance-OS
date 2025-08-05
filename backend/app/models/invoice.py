from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid
from decimal import Decimal

class Invoice(db.Model):
    """Invoice model for billing and invoicing"""
    
    __tablename__ = 'invoices'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    invoice_number = db.Column(db.String(50), unique=True, nullable=False, index=True)
    status = db.Column(db.String(50), default='draft')  # draft, sent, paid, overdue, cancelled
    
    # Client Information
    client_name = db.Column(db.String(255), nullable=False)
    client_email = db.Column(db.String(255))
    client_phone = db.Column(db.String(20))
    client_address = db.Column(JSON)
    
    # Invoice Details
    issue_date = db.Column(db.Date, nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    payment_terms = db.Column(db.String(100))  # Net 30, Net 15, etc.
    notes = db.Column(db.Text)
    
    # Financial
    subtotal = db.Column(db.Numeric(10, 2), default=0)
    tax_amount = db.Column(db.Numeric(10, 2), default=0)
    discount_amount = db.Column(db.Numeric(10, 2), default=0)
    total_amount = db.Column(db.Numeric(10, 2), default=0)
    currency = db.Column(db.String(3), default='USD')
    
    # Payment
    paid_amount = db.Column(db.Numeric(10, 2), default=0)
    paid_date = db.Column(db.DateTime)
    payment_method = db.Column(db.String(50))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    
    # Relationships
    items = db.relationship('InvoiceItem', backref='invoice', lazy='dynamic', cascade='all, delete-orphan')
    
    def calculate_totals(self):
        """Calculate invoice totals"""
        self.subtotal = sum(item.total for item in self.items)
        self.total_amount = self.subtotal + self.tax_amount - self.discount_amount
    
    def mark_as_paid(self, amount, payment_method=None):
        """Mark invoice as paid"""
        self.status = 'paid'
        self.paid_amount = amount
        self.paid_date = datetime.utcnow()
        if payment_method:
            self.payment_method = payment_method
    
    def to_dict(self):
        """Convert invoice to dictionary"""
        return {
            'id': str(self.id),
            'invoice_number': self.invoice_number,
            'status': self.status,
            'client': {
                'name': self.client_name,
                'email': self.client_email,
                'phone': self.client_phone,
                'address': self.client_address
            },
            'dates': {
                'issue_date': self.issue_date.isoformat() if self.issue_date else None,
                'due_date': self.due_date.isoformat() if self.due_date else None,
                'paid_date': self.paid_date.isoformat() if self.paid_date else None
            },
            'payment_terms': self.payment_terms,
            'notes': self.notes,
            'financial': {
                'subtotal': float(self.subtotal),
                'tax_amount': float(self.tax_amount),
                'discount_amount': float(self.discount_amount),
                'total_amount': float(self.total_amount),
                'paid_amount': float(self.paid_amount),
                'currency': self.currency
            },
            'payment_method': self.payment_method,
            'business_id': str(self.business_id),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'items': [item.to_dict() for item in self.items]
        }
    
    def __repr__(self):
        return f'<Invoice {self.invoice_number}>'

class InvoiceItem(db.Model):
    """Invoice item model for line items"""
    
    __tablename__ = 'invoice_items'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    description = db.Column(db.String(500), nullable=False)
    quantity = db.Column(db.Numeric(10, 2), default=1)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Foreign Keys
    invoice_id = db.Column(UUID(as_uuid=True), db.ForeignKey('invoices.id'), nullable=False)
    
    def calculate_total(self):
        """Calculate item total"""
        self.total = self.quantity * self.unit_price
    
    def to_dict(self):
        """Convert invoice item to dictionary"""
        return {
            'id': str(self.id),
            'description': self.description,
            'quantity': float(self.quantity),
            'unit_price': float(self.unit_price),
            'total': float(self.total)
        }
    
    def __repr__(self):
        return f'<InvoiceItem {self.description}>' 