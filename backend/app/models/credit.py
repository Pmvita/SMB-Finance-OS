from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

class CreditProfile(db.Model):
    """Credit profile model for business credit assessment"""
    
    __tablename__ = 'credit_profiles'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    credit_score = db.Column(db.Integer)  # 300-850 scale
    credit_rating = db.Column(db.String(10))  # A+, A, B+, B, C, D
    risk_level = db.Column(db.String(20))  # low, medium, high
    lending_readiness_score = db.Column(db.Integer)  # 0-100 scale
    
    # Financial Metrics
    annual_revenue = db.Column(db.Numeric(15, 2))
    monthly_cash_flow = db.Column(db.Numeric(15, 2))
    debt_to_income_ratio = db.Column(db.Numeric(5, 4))
    payment_history_score = db.Column(db.Integer)  # 0-100
    
    # Business Metrics
    business_age_months = db.Column(db.Integer)
    industry_risk_score = db.Column(db.Integer)  # 0-100
    market_position_score = db.Column(db.Integer)  # 0-100
    
    # Assessment Data
    assessment_date = db.Column(db.DateTime, default=datetime.utcnow)
    next_assessment_date = db.Column(db.DateTime)
    assessment_factors = db.Column(JSON, default={})
    
    # Status
    is_active = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    business_id = db.Column(UUID(as_uuid=True), db.ForeignKey('businesses.id'), nullable=False, unique=True)
    
    def calculate_credit_score(self):
        """Calculate credit score based on various factors"""
        # This is a simplified calculation - in production, use more sophisticated algorithms
        score = 300  # Base score
        
        # Payment history (30% weight)
        if self.payment_history_score:
            score += (self.payment_history_score * 0.3)
        
        # Debt to income ratio (25% weight)
        if self.debt_to_income_ratio and self.debt_to_income_ratio < 0.5:
            score += 150
        elif self.debt_to_income_ratio and self.debt_to_income_ratio < 0.7:
            score += 100
        
        # Business age (20% weight)
        if self.business_age_months and self.business_age_months > 24:
            score += 100
        elif self.business_age_months and self.business_age_months > 12:
            score += 50
        
        # Revenue stability (15% weight)
        if self.annual_revenue and self.annual_revenue > 100000:
            score += 75
        
        # Industry risk (10% weight)
        if self.industry_risk_score:
            score += (self.industry_risk_score * 0.1)
        
        self.credit_score = min(850, max(300, int(score)))
        return self.credit_score
    
    def calculate_credit_rating(self):
        """Calculate credit rating based on score"""
        if self.credit_score >= 800:
            self.credit_rating = 'A+'
        elif self.credit_score >= 750:
            self.credit_rating = 'A'
        elif self.credit_score >= 700:
            self.credit_rating = 'B+'
        elif self.credit_score >= 650:
            self.credit_rating = 'B'
        elif self.credit_score >= 600:
            self.credit_rating = 'C'
        else:
            self.credit_rating = 'D'
    
    def calculate_lending_readiness(self):
        """Calculate lending readiness score"""
        readiness = 0
        
        # Credit score factor (40%)
        if self.credit_score:
            readiness += (self.credit_score / 850) * 40
        
        # Business stability factor (30%)
        if self.business_age_months and self.business_age_months > 12:
            readiness += 30
        elif self.business_age_months and self.business_age_months > 6:
            readiness += 20
        
        # Financial health factor (30%)
        if self.monthly_cash_flow and self.monthly_cash_flow > 0:
            readiness += 30
        elif self.annual_revenue and self.annual_revenue > 50000:
            readiness += 20
        
        self.lending_readiness_score = min(100, max(0, int(readiness)))
        return self.lending_readiness_score
    
    def to_dict(self):
        """Convert credit profile to dictionary"""
        return {
            'id': str(self.id),
            'credit_score': self.credit_score,
            'credit_rating': self.credit_rating,
            'risk_level': self.risk_level,
            'lending_readiness_score': self.lending_readiness_score,
            'financial_metrics': {
                'annual_revenue': float(self.annual_revenue) if self.annual_revenue else None,
                'monthly_cash_flow': float(self.monthly_cash_flow) if self.monthly_cash_flow else None,
                'debt_to_income_ratio': float(self.debt_to_income_ratio) if self.debt_to_income_ratio else None,
                'payment_history_score': self.payment_history_score
            },
            'business_metrics': {
                'business_age_months': self.business_age_months,
                'industry_risk_score': self.industry_risk_score,
                'market_position_score': self.market_position_score
            },
            'assessment_date': self.assessment_date.isoformat() if self.assessment_date else None,
            'next_assessment_date': self.next_assessment_date.isoformat() if self.next_assessment_date else None,
            'assessment_factors': self.assessment_factors,
            'is_active': self.is_active,
            'business_id': str(self.business_id),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<CreditProfile {self.credit_rating} {self.credit_score}>'

class CreditScore(db.Model):
    """Credit score history model"""
    
    __tablename__ = 'credit_scores'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    score = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.String(10))
    assessment_date = db.Column(db.DateTime, default=datetime.utcnow)
    factors = db.Column(JSON, default={})
    
    # Foreign Keys
    credit_profile_id = db.Column(UUID(as_uuid=True), db.ForeignKey('credit_profiles.id'), nullable=False)
    
    def to_dict(self):
        """Convert credit score to dictionary"""
        return {
            'id': str(self.id),
            'score': self.score,
            'rating': self.rating,
            'assessment_date': self.assessment_date.isoformat() if self.assessment_date else None,
            'factors': self.factors,
            'credit_profile_id': str(self.credit_profile_id)
        }
    
    def __repr__(self):
        return f'<CreditScore {self.score} {self.rating}>' 