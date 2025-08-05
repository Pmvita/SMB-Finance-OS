from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.credit import CreditProfile, CreditScore
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount
from datetime import datetime

credit_bp = Blueprint('credit', __name__)

@credit_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_credit_profile():
    """Get credit profile for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get credit profile
        credit_profile = CreditProfile.query.filter_by(
            business_id=business.id, is_active=True
        ).first()
        
        if not credit_profile:
            return error_response("Credit profile not found", 404)
        
        return success_response(
            credit_profile.to_dict(), "Credit profile retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve credit profile", 500)

@credit_bp.route('/profile', methods=['POST'])
@jwt_required()
def create_credit_profile():
    """Create a new credit profile"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Check if profile already exists
        existing_profile = CreditProfile.query.filter_by(
            business_id=business.id, is_active=True
        ).first()
        
        if existing_profile:
            return error_response("Credit profile already exists", 409)
        
        # Create credit profile
        credit_profile = CreditProfile(
            annual_revenue=data.get('annual_revenue'),
            monthly_cash_flow=data.get('monthly_cash_flow'),
            debt_to_income_ratio=data.get('debt_to_income_ratio'),
            payment_history_score=data.get('payment_history_score'),
            business_age_months=data.get('business_age_months'),
            industry_risk_score=data.get('industry_risk_score'),
            market_position_score=data.get('market_position_score'),
            assessment_factors=data.get('assessment_factors', {}),
            business_id=business.id
        )
        
        # Calculate scores
        credit_profile.calculate_credit_score()
        credit_profile.calculate_credit_rating()
        credit_profile.calculate_lending_readiness()
        
        db.session.add(credit_profile)
        db.session.commit()
        
        return success_response(
            credit_profile.to_dict(), "Credit profile created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create credit profile", 500)

@credit_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_credit_profile():
    """Update credit profile"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get credit profile
        credit_profile = CreditProfile.query.filter_by(
            business_id=business.id, is_active=True
        ).first()
        
        if not credit_profile:
            return error_response("Credit profile not found", 404)
        
        # Update fields
        if 'annual_revenue' in data:
            credit_profile.annual_revenue = data['annual_revenue']
        if 'monthly_cash_flow' in data:
            credit_profile.monthly_cash_flow = data['monthly_cash_flow']
        if 'debt_to_income_ratio' in data:
            credit_profile.debt_to_income_ratio = data['debt_to_income_ratio']
        if 'payment_history_score' in data:
            credit_profile.payment_history_score = data['payment_history_score']
        if 'business_age_months' in data:
            credit_profile.business_age_months = data['business_age_months']
        if 'industry_risk_score' in data:
            credit_profile.industry_risk_score = data['industry_risk_score']
        if 'market_position_score' in data:
            credit_profile.market_position_score = data['market_position_score']
        if 'assessment_factors' in data:
            credit_profile.assessment_factors = data['assessment_factors']
        
        # Recalculate scores
        credit_profile.calculate_credit_score()
        credit_profile.calculate_credit_rating()
        credit_profile.calculate_lending_readiness()
        
        db.session.commit()
        
        return success_response(
            credit_profile.to_dict(), "Credit profile updated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update credit profile", 500)

@credit_bp.route('/profile/assess', methods=['POST'])
@jwt_required()
def assess_credit_profile():
    """Trigger a new credit assessment"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get credit profile
        credit_profile = CreditProfile.query.filter_by(
            business_id=business.id, is_active=True
        ).first()
        
        if not credit_profile:
            return error_response("Credit profile not found", 404)
        
        # Update assessment data
        if 'annual_revenue' in data:
            credit_profile.annual_revenue = data['annual_revenue']
        if 'monthly_cash_flow' in data:
            credit_profile.monthly_cash_flow = data['monthly_cash_flow']
        if 'debt_to_income_ratio' in data:
            credit_profile.debt_to_income_ratio = data['debt_to_income_ratio']
        if 'payment_history_score' in data:
            credit_profile.payment_history_score = data['payment_history_score']
        if 'business_age_months' in data:
            credit_profile.business_age_months = data['business_age_months']
        if 'industry_risk_score' in data:
            credit_profile.industry_risk_score = data['industry_risk_score']
        if 'market_position_score' in data:
            credit_profile.market_position_score = data['market_position_score']
        
        # Create credit score record
        credit_score = CreditScore(
            score=credit_profile.credit_score,
            rating=credit_profile.credit_rating,
            factors=data.get('factors', {}),
            credit_profile_id=credit_profile.id
        )
        
        # Recalculate scores
        credit_profile.calculate_credit_score()
        credit_profile.calculate_credit_rating()
        credit_profile.calculate_lending_readiness()
        credit_profile.assessment_date = datetime.utcnow()
        
        db.session.add(credit_score)
        db.session.commit()
        
        return success_response({
            'credit_profile': credit_profile.to_dict(),
            'credit_score': credit_score.to_dict()
        }, "Credit assessment completed successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to assess credit profile", 500)

@credit_bp.route('/scores', methods=['GET'])
@jwt_required()
def get_credit_scores():
    """Get credit score history"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get credit profile
        credit_profile = CreditProfile.query.filter_by(
            business_id=business.id, is_active=True
        ).first()
        
        if not credit_profile:
            return error_response("Credit profile not found", 404)
        
        # Get credit scores
        query = CreditScore.query.filter_by(credit_profile_id=credit_profile.id)
        query = query.order_by(CreditScore.assessment_date.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        credit_scores = [score.to_dict() for score in pagination.items]
        
        return paginated_response(
            credit_scores, page, per_page, pagination.total,
            "Credit scores retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve credit scores", 500)

@credit_bp.route('/lending-readiness', methods=['GET'])
@jwt_required()
def get_lending_readiness():
    """Get lending readiness assessment"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get credit profile
        credit_profile = CreditProfile.query.filter_by(
            business_id=business.id, is_active=True
        ).first()
        
        if not credit_profile:
            return error_response("Credit profile not found", 404)
        
        # Calculate lending readiness
        lending_readiness = credit_profile.calculate_lending_readiness()
        
        return success_response({
            'lending_readiness_score': lending_readiness,
            'credit_score': credit_profile.credit_score,
            'credit_rating': credit_profile.credit_rating,
            'risk_level': credit_profile.risk_level,
            'assessment_date': credit_profile.assessment_date.isoformat() if credit_profile.assessment_date else None
        }, "Lending readiness assessment retrieved successfully")
        
    except Exception as e:
        return error_response("Failed to retrieve lending readiness", 500) 