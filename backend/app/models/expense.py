from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class ExpenseCategory(db.Model):
    """Expense category model for organizing expenses"""
    
    __tablename__ = 'expense_categories'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    color = db.Column(db.String(7))  # Hex color code
    icon = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    
    # Relationships
    expenses = db.relationship('Expense', backref='category', lazy='dynamic')
    
    def to_dict(self):
        """Convert expense category to dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'color': self.color,
            'icon': self.icon,
            'is_active': self.is_active,
            'business_id': str(self.business_id)
        }
    
    def __repr__(self):
        return f'<ExpenseCategory {self.name}>'

class Expense(db.Model):
    """Expense model for tracking business expenses"""
    
    __tablename__ = 'expenses'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    description = db.Column(db.String(500), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    date = db.Column(db.Date, nullable=False)
    
    # Payment Details
    payment_method = db.Column(db.String(50))  # cash, card, bank_transfer, etc.
    receipt_url = db.Column(db.String(500))
    vendor = db.Column(db.String(255))
    
    # Status
    status = db.Column(db.String(50), default='pending')  # pending, approved, rejected
    approved_by = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'))
    approved_at = db.Column(db.DateTime)
    
    # Additional Data
    tags = db.Column(JSON, default=[])
    notes = db.Column(db.Text)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    category_id = db.Column(UUID(as_uuid=True), db.ForeignKey('expense_categories.id'))
    created_by = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    approver = db.relationship('User', foreign_keys=[approved_by])
    creator = db.relationship('User', foreign_keys=[created_by])
    
    def approve(self, approved_by_user):
        """Approve expense"""
        self.status = 'approved'
        self.approved_by = approved_by_user.id
        self.approved_at = datetime.utcnow()
    
    def reject(self, approved_by_user):
        """Reject expense"""
        self.status = 'rejected'
        self.approved_by = approved_by_user.id
        self.approved_at = datetime.utcnow()
    
    def to_dict(self):
        """Convert expense to dictionary"""
        return {
            'id': str(self.id),
            'description': self.description,
            'amount': float(self.amount),
            'currency': self.currency,
            'date': self.date.isoformat() if self.date else None,
            'payment_method': self.payment_method,
            'receipt_url': self.receipt_url,
            'vendor': self.vendor,
            'status': self.status,
            'approved_by': str(self.approved_by) if self.approved_by else None,
            'approved_at': self.approved_at.isoformat() if self.approved_at else None,
            'tags': self.tags,
            'notes': self.notes,
            'business_id': str(self.business_id),
            'category_id': str(self.category_id) if self.category_id else None,
            'created_by': str(self.created_by),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'category': self.category.to_dict() if self.category else None
        }
    
    def __repr__(self):
        return f'<Expense {self.description}>' 