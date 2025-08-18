from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Payment(db.Model):
    """Payment model for processing payments"""
    
    __tablename__ = 'payments'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    payment_type = db.Column(db.String(50), nullable=False)  # incoming, outgoing
    amount = db.Column(db.Numeric(15, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    status = db.Column(db.String(50), default='pending')  # pending, processing, completed, failed, cancelled
    
    # Payment Method
    payment_method = db.Column(db.String(50))  # stripe, bank_transfer, cash, etc.
    payment_gateway = db.Column(db.String(50))  # stripe, paypal, etc.
    gateway_transaction_id = db.Column(db.String(255))
    
    # Parties
    payer_name = db.Column(db.String(255))
    payer_email = db.Column(db.String(255))
    payee_name = db.Column(db.String(255))
    payee_email = db.Column(db.String(255))
    
    # Description
    description = db.Column(db.String(500))
    reference = db.Column(db.String(100))
    
    # Processing
    processed_at = db.Column(db.DateTime)
    failure_reason = db.Column(db.Text)
    
    # Additional Data
    payment_metadata = db.Column(JSON, default={})
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    wallet_id = db.Column(UUID(as_uuid=True), db.ForeignKey('wallets.id'))
    
    # Relationships
    wallet = db.relationship('Wallet', backref='payments')
    
    def process_payment(self):
        """Process the payment"""
        self.status = 'processing'
        self.processed_at = datetime.utcnow()
    
    def complete_payment(self):
        """Mark payment as completed"""
        self.status = 'completed'
        self.processed_at = datetime.utcnow()
    
    def fail_payment(self, reason):
        """Mark payment as failed"""
        self.status = 'failed'
        self.failure_reason = reason
        self.processed_at = datetime.utcnow()
    
    def to_dict(self):
        """Convert payment to dictionary"""
        return {
            'id': str(self.id),
            'payment_type': self.payment_type,
            'amount': float(self.amount),
            'currency': self.currency,
            'status': self.status,
            'payment_method': self.payment_method,
            'payment_gateway': self.payment_gateway,
            'gateway_transaction_id': self.gateway_transaction_id,
            'payer': {
                'name': self.payer_name,
                'email': self.payer_email
            },
            'payee': {
                'name': self.payee_name,
                'email': self.payee_email
            },
            'description': self.description,
            'reference': self.reference,
            'processed_at': self.processed_at.isoformat() if self.processed_at else None,
            'failure_reason': self.failure_reason,
            'metadata': self.payment_metadata,
            'business_id': str(self.business_id),
            'wallet_id': str(self.wallet_id) if self.wallet_id else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Payment {self.payment_type} {self.amount}>' 