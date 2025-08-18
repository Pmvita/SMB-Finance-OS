from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class Employee(db.Model):
    """Employee model for payroll management"""
    
    __tablename__ = 'employees'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    
    # Employment Details
    position = db.Column(db.String(100))
    department = db.Column(db.String(100))
    hire_date = db.Column(db.Date, nullable=False)
    termination_date = db.Column(db.Date)
    employment_status = db.Column(db.String(50), default='active')  # active, terminated, on_leave
    
    # Compensation
    salary = db.Column(db.Numeric(10, 2))
    hourly_rate = db.Column(db.Numeric(8, 2))
    pay_frequency = db.Column(db.String(20), default='monthly')  # weekly, biweekly, monthly
    currency = db.Column(db.String(3), default='USD')
    
    # Tax Information
    tax_id = db.Column(db.String(50))
    tax_withholding = db.Column(db.Numeric(5, 4))  # Percentage as decimal
    
    # Bank Information
    bank_name = db.Column(db.String(255))
    bank_account_number = db.Column(db.String(50))
    routing_number = db.Column(db.String(20))
    
    # Additional Data
    address = db.Column(JSON)
    emergency_contact = db.Column(JSON)
    notes = db.Column(db.Text)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    
    # Relationships
    payrolls = db.relationship('Payroll', backref='employee', lazy='dynamic')
    
    def get_full_name(self):
        """Get employee full name"""
        return f"{self.first_name} {self.last_name}"
    
    def is_active_employee(self):
        """Check if employee is currently active"""
        return self.employment_status == 'active' and not self.termination_date
    
    def to_dict(self):
        """Convert employee to dictionary"""
        return {
            'id': str(self.id),
            'employee_id': self.employee_id,
            'name': {
                'first_name': self.first_name,
                'last_name': self.last_name,
                'full_name': self.get_full_name()
            },
            'contact': {
                'email': self.email,
                'phone': self.phone
            },
            'employment': {
                'position': self.position,
                'department': self.department,
                'hire_date': self.hire_date.isoformat() if self.hire_date else None,
                'termination_date': self.termination_date.isoformat() if self.termination_date else None,
                'status': self.employment_status
            },
            'compensation': {
                'salary': float(self.salary) if self.salary else None,
                'hourly_rate': float(self.hourly_rate) if self.hourly_rate else None,
                'pay_frequency': self.pay_frequency,
                'currency': self.currency
            },
            'tax': {
                'tax_id': self.tax_id,
                'tax_withholding': float(self.tax_withholding) if self.tax_withholding else None
            },
            'bank': {
                'bank_name': self.bank_name,
                'bank_account_number': self.bank_account_number,
                'routing_number': self.routing_number
            },
            'address': self.address,
            'emergency_contact': self.emergency_contact,
            'notes': self.notes,
            'business_id': str(self.business_id),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Employee {self.get_full_name()}>'

class Payroll(db.Model):
    """Payroll model for salary processing"""
    
    __tablename__ = 'payrolls'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    payroll_period = db.Column(db.String(50), nullable=False)  # weekly, biweekly, monthly
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    
    # Earnings
    regular_hours = db.Column(db.Numeric(8, 2), default=0)
    overtime_hours = db.Column(db.Numeric(8, 2), default=0)
    regular_pay = db.Column(db.Numeric(10, 2), default=0)
    overtime_pay = db.Column(db.Numeric(10, 2), default=0)
    bonus = db.Column(db.Numeric(10, 2), default=0)
    gross_pay = db.Column(db.Numeric(10, 2), default=0)
    
    # Deductions
    tax_withholding = db.Column(db.Numeric(10, 2), default=0)
    social_security = db.Column(db.Numeric(10, 2), default=0)
    medicare = db.Column(db.Numeric(10, 2), default=0)
    other_deductions = db.Column(db.Numeric(10, 2), default=0)
    total_deductions = db.Column(db.Numeric(10, 2), default=0)
    
    # Net Pay
    net_pay = db.Column(db.Numeric(10, 2), default=0)
    currency = db.Column(db.String(3), default='USD')
    
    # Status
    status = db.Column(db.String(50), default='pending')  # pending, processed, paid, cancelled
    payment_method = db.Column(db.String(50))  # bank_transfer, check, cash
    payment_date = db.Column(db.DateTime)
    
    # Additional Data
    notes = db.Column(db.Text)
    payroll_metadata = db.Column(JSON, default={})
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False)
    employee_id = db.Column(UUID(as_uuid=True), db.ForeignKey('employees.id'), nullable=False)
    
    def calculate_gross_pay(self):
        """Calculate gross pay"""
        self.gross_pay = self.regular_pay + self.overtime_pay + self.bonus
    
    def calculate_deductions(self):
        """Calculate total deductions"""
        self.total_deductions = self.tax_withholding + self.social_security + self.medicare + self.other_deductions
    
    def calculate_net_pay(self):
        """Calculate net pay"""
        self.net_pay = self.gross_pay - self.total_deductions
    
    def process_payroll(self):
        """Process the payroll"""
        self.calculate_gross_pay()
        self.calculate_deductions()
        self.calculate_net_pay()
        self.status = 'processed'
    
    def mark_as_paid(self, payment_method=None):
        """Mark payroll as paid"""
        self.status = 'paid'
        self.payment_date = datetime.utcnow()
        if payment_method:
            self.payment_method = payment_method
    
    def to_dict(self):
        """Convert payroll to dictionary"""
        return {
            'id': str(self.id),
            'payroll_period': self.payroll_period,
            'period': {
                'start_date': self.start_date.isoformat() if self.start_date else None,
                'end_date': self.end_date.isoformat() if self.end_date else None
            },
            'earnings': {
                'regular_hours': float(self.regular_hours),
                'overtime_hours': float(self.overtime_hours),
                'regular_pay': float(self.regular_pay),
                'overtime_pay': float(self.overtime_pay),
                'bonus': float(self.bonus),
                'gross_pay': float(self.gross_pay)
            },
            'deductions': {
                'tax_withholding': float(self.tax_withholding),
                'social_security': float(self.social_security),
                'medicare': float(self.medicare),
                'other_deductions': float(self.other_deductions),
                'total_deductions': float(self.total_deductions)
            },
            'net_pay': float(self.net_pay),
            'currency': self.currency,
            'status': self.status,
            'payment_method': self.payment_method,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'notes': self.notes,
            'metadata': self.payroll_metadata,
            'business_id': str(self.business_id),
            'employee_id': str(self.employee_id),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Payroll {self.payroll_period} {self.net_pay}>' 