from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.business import Business
from app.models.user import User
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_business_type, validate_currency
from datetime import datetime

businesses_bp = Blueprint('businesses', __name__)

@businesses_bp.route('/', methods=['GET'])
@jwt_required()
def get_businesses():
    """Get all businesses (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user or current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        subscription_plan = request.args.get('subscription_plan')
        subscription_status = request.args.get('subscription_status')
        is_active = request.args.get('is_active')
        
        # Build query
        query = Business.query
        
        # Apply filters
        if subscription_plan:
            query = query.filter_by(subscription_plan=subscription_plan)
        if subscription_status:
            query = query.filter_by(subscription_status=subscription_status)
        if is_active is not None:
            query = query.filter_by(is_active=is_active.lower() == 'true')
        
        # Order by created date
        query = query.order_by(Business.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        businesses = [business.to_dict() for business in pagination.items]
        
        return paginated_response(
            businesses, page, per_page, pagination.total,
            "Businesses retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve businesses", 500)

@businesses_bp.route('/my-business', methods=['GET'])
@jwt_required()
def get_my_business():
    """Get current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        
        if not business:
            return error_response("Business not found", 404)
        
        return success_response(
            business.to_dict(), "Business retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve business", 500)

@businesses_bp.route('/<business_id>', methods=['GET'])
@jwt_required()
def get_business(business_id):
    """Get a specific business"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        # Get business
        business = Business.query.get(business_id)
        
        if not business:
            return not_found_response("Business")
        
        # Check if user can access this business
        if str(business.owner_id) != str(current_user_id) and current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        return success_response(
            business.to_dict(), "Business retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve business", 500)

@businesses_bp.route('/', methods=['POST'])
@jwt_required()
def create_business():
    """Create a new business"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Check if user already has a business
        existing_business = Business.query.filter_by(owner_id=current_user_id).first()
        if existing_business:
            return error_response("User already has a business", 409)
        
        # Validate required fields
        required_fields = ['name']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate business type if provided
        if data.get('business_type') and not validate_business_type(data['business_type']):
            return error_response("Invalid business type", 400)
        
        # Validate currency if provided
        if data.get('currency') and not validate_currency(data['currency']):
            return error_response("Invalid currency code", 400)
        
        # Create business
        business = Business(
            name=data['name'],
            legal_name=data.get('legal_name'),
            business_type=data.get('business_type'),
            industry=data.get('industry'),
            tax_id=data.get('tax_id'),
            registration_number=data.get('registration_number'),
            address_line_1=data.get('address_line_1'),
            address_line_2=data.get('address_line_2'),
            city=data.get('city'),
            state=data.get('state'),
            postal_code=data.get('postal_code'),
            country=data.get('country'),
            phone=data.get('phone'),
            website=data.get('website'),
            email=data.get('email'),
            currency=data.get('currency', 'USD'),
            fiscal_year_start=data.get('fiscal_year_start'),
            tax_year=data.get('tax_year'),
            settings=data.get('settings', {}),
            owner_id=current_user_id
        )
        
        db.session.add(business)
        db.session.commit()
        
        return success_response(
            business.to_dict(), "Business created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create business", 500)

@businesses_bp.route('/<business_id>', methods=['PUT'])
@jwt_required()
def update_business(business_id):
    """Update a business"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        data = request.get_json()
        
        # Get business
        business = Business.query.get(business_id)
        
        if not business:
            return not_found_response("Business")
        
        # Check if user can update this business
        if str(business.owner_id) != str(current_user_id) and current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Update fields
        if 'name' in data:
            business.name = data['name']
        if 'legal_name' in data:
            business.legal_name = data['legal_name']
        if 'business_type' in data:
            if validate_business_type(data['business_type']):
                business.business_type = data['business_type']
            else:
                return error_response("Invalid business type", 400)
        if 'industry' in data:
            business.industry = data['industry']
        if 'tax_id' in data:
            business.tax_id = data['tax_id']
        if 'registration_number' in data:
            business.registration_number = data['registration_number']
        if 'address_line_1' in data:
            business.address_line_1 = data['address_line_1']
        if 'address_line_2' in data:
            business.address_line_2 = data['address_line_2']
        if 'city' in data:
            business.city = data['city']
        if 'state' in data:
            business.state = data['state']
        if 'postal_code' in data:
            business.postal_code = data['postal_code']
        if 'country' in data:
            business.country = data['country']
        if 'phone' in data:
            business.phone = data['phone']
        if 'website' in data:
            business.website = data['website']
        if 'email' in data:
            business.email = data['email']
        if 'currency' in data:
            if validate_currency(data['currency']):
                business.currency = data['currency']
            else:
                return error_response("Invalid currency code", 400)
        if 'fiscal_year_start' in data:
            business.fiscal_year_start = data['fiscal_year_start']
        if 'tax_year' in data:
            business.tax_year = data['tax_year']
        if 'settings' in data:
            business.settings = data['settings']
        if 'subscription_plan' in data and current_user.role == 'admin':
            business.subscription_plan = data['subscription_plan']
        if 'subscription_status' in data and current_user.role == 'admin':
            business.subscription_status = data['subscription_status']
        if 'is_active' in data and current_user.role == 'admin':
            business.is_active = data['is_active']
        
        db.session.commit()
        
        return success_response(
            business.to_dict(), "Business updated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update business", 500)

@businesses_bp.route('/<business_id>', methods=['DELETE'])
@jwt_required()
def delete_business(business_id):
    """Delete a business (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get business
        business = Business.query.get(business_id)
        
        if not business:
            return not_found_response("Business")
        
        db.session.delete(business)
        db.session.commit()
        
        return success_response({}, "Business deleted successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to delete business", 500)

@businesses_bp.route('/<business_id>/activate', methods=['POST'])
@jwt_required()
def activate_business(business_id):
    """Activate a business (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get business
        business = Business.query.get(business_id)
        
        if not business:
            return not_found_response("Business")
        
        business.is_active = True
        db.session.commit()
        
        return success_response(
            business.to_dict(), "Business activated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to activate business", 500)

@businesses_bp.route('/<business_id>/deactivate', methods=['POST'])
@jwt_required()
def deactivate_business(business_id):
    """Deactivate a business (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get business
        business = Business.query.get(business_id)
        
        if not business:
            return not_found_response("Business")
        
        business.is_active = False
        db.session.commit()
        
        return success_response(
            business.to_dict(), "Business deactivated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to deactivate business", 500)

@businesses_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_business_stats():
    """Get business statistics (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get statistics
        total_businesses = Business.query.count()
        active_businesses = Business.query.filter_by(is_active=True).count()
        free_plan_businesses = Business.query.filter_by(subscription_plan='free').count()
        pro_plan_businesses = Business.query.filter_by(subscription_plan='pro').count()
        enterprise_plan_businesses = Business.query.filter_by(subscription_plan='enterprise').count()
        
        # Get recent businesses
        recent_businesses = Business.query.order_by(Business.created_at.desc()).limit(5).all()
        
        stats = {
            'total_businesses': total_businesses,
            'active_businesses': active_businesses,
            'free_plan_businesses': free_plan_businesses,
            'pro_plan_businesses': pro_plan_businesses,
            'enterprise_plan_businesses': enterprise_plan_businesses,
            'recent_businesses': [business.to_dict() for business in recent_businesses]
        }
        
        return success_response(stats, "Business statistics retrieved successfully")
        
    except Exception as e:
        return error_response("Failed to retrieve business statistics", 500) 