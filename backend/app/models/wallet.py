from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Wallet(db.Model):
    """Digital wallet model for storing funds"""
    
    __tablename__ = 'wallets'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), nullable=False)
    wallet_type = db.Column(db.String(50), default='operating')  # operating, savings, tax_reserve
    currency = db.Column(db.String(3), default='USD')
    balance = db.Column(db.Numeric(15, 2), default=0)
    is_active = db.Column(db.Boolean, default=True)
    
    # Settings
    settings = db.Column(JSON, default={})
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    
    # Relationships
    transactions = db.relationship('Transaction', backref='wallet', lazy='dynamic')
    
    def add_funds(self, amount, description, transaction_type='credit'):
        """Add funds to wallet"""
        if transaction_type == 'credit':
            self.balance += amount
        else:
            self.balance -= amount
        
        # Create transaction record
        transaction = Transaction(
            wallet_id=self.id,
            amount=amount,
            description=description,
            transaction_type=transaction_type,
            balance_after=self.balance
        )
        db.session.add(transaction)
        return transaction
    
    def to_dict(self):
        """Convert wallet to dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'wallet_type': self.wallet_type,
            'currency': self.currency,
            'balance': float(self.balance),
            'is_active': self.is_active,
            'settings': self.settings,
            'business_id': str(self.business_id),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Wallet {self.name}>'

class Transaction(db.Model):
    """Transaction model for wallet transactions"""
    
    __tablename__ = 'transactions'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    transaction_type = db.Column(db.String(50), nullable=False)  # credit, debit, transfer
    amount = db.Column(db.Numeric(15, 2), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    reference = db.Column(db.String(100))  # External reference number
    balance_after = db.Column(db.Numeric(15, 2), nullable=False)
    
    # Additional Data
    transaction_metadata = db.Column(JSON, default={})
    tags = db.Column(JSON, default=[])
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Foreign Keys
    wallet_id = db.Column(UUID(as_uuid=True), db.ForeignKey('wallets.id'), nullable=False)
    related_transaction_id = db.Column(UUID(as_uuid=True), db.ForeignKey('transactions.id'))
    
    # Relationships
    related_transaction = db.relationship('Transaction', remote_side=[id])
    
    def to_dict(self):
        """Convert transaction to dictionary"""
        return {
            'id': str(self.id),
            'transaction_type': self.transaction_type,
            'amount': float(self.amount),
            'description': self.description,
            'reference': self.reference,
            'balance_after': float(self.balance_after),
            'metadata': self.transaction_metadata,
            'tags': self.tags,
            'wallet_id': str(self.wallet_id),
            'related_transaction_id': str(self.related_transaction_id) if self.related_transaction_id else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Transaction {self.transaction_type} {self.amount}>' 