from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_email, validate_phone
from datetime import datetime

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    """Get all users (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user or current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        role = request.args.get('role')
        is_active = request.args.get('is_active')
        
        # Build query
        query = User.query
        
        # Apply filters
        if role:
            query = query.filter_by(role=role)
        if is_active is not None:
            query = query.filter_by(is_active=is_active.lower() == 'true')
        
        # Order by created date
        query = query.order_by(User.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        users = [user.to_dict() for user in pagination.items]
        
        return paginated_response(
            users, page, per_page, pagination.total,
            "Users retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve users", 500)

@users_bp.route('/<user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    """Get a specific user"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        # Check if user can access this profile
        if str(current_user_id) != user_id and current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get user
        user = User.query.get(user_id)
        
        if not user:
            return not_found_response("User")
        
        return success_response(
            user.to_dict(), "User retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve user", 500)

@users_bp.route('/<user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """Update a user"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        data = request.get_json()
        
        # Check if user can update this profile
        if str(current_user_id) != user_id and current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get user
        user = User.query.get(user_id)
        
        if not user:
            return not_found_response("User")
        
        # Update fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'phone' in data:
            if validate_phone(data['phone']):
                user.phone = data['phone']
            else:
                return error_response("Invalid phone number format", 400)
        if 'is_active' in data and current_user.role == 'admin':
            user.is_active = data['is_active']
        if 'role' in data and current_user.role == 'admin':
            user.role = data['role']
        if 'is_verified' in data and current_user.role == 'admin':
            user.is_verified = data['is_verified']
        
        db.session.commit()
        
        return success_response(
            user.to_dict(), "User updated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update user", 500)

@users_bp.route('/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """Delete a user (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get user
        user = User.query.get(user_id)
        
        if not user:
            return not_found_response("User")
        
        # Prevent self-deletion
        if str(current_user_id) == user_id:
            return error_response("Cannot delete your own account", 400)
        
        db.session.delete(user)
        db.session.commit()
        
        return success_response({}, "User deleted successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to delete user", 500)

@users_bp.route('/<user_id>/activate', methods=['POST'])
@jwt_required()
def activate_user(user_id):
    """Activate a user (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get user
        user = User.query.get(user_id)
        
        if not user:
            return not_found_response("User")
        
        user.is_active = True
        db.session.commit()
        
        return success_response(
            user.to_dict(), "User activated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to activate user", 500)

@users_bp.route('/<user_id>/deactivate', methods=['POST'])
@jwt_required()
def deactivate_user(user_id):
    """Deactivate a user (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get user
        user = User.query.get(user_id)
        
        if not user:
            return not_found_response("User")
        
        # Prevent self-deactivation
        if str(current_user_id) == user_id:
            return error_response("Cannot deactivate your own account", 400)
        
        user.is_active = False
        db.session.commit()
        
        return success_response(
            user.to_dict(), "User deactivated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to deactivate user", 500)

@users_bp.route('/<user_id>/verify', methods=['POST'])
@jwt_required()
def verify_user(user_id):
    """Verify a user (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get user
        user = User.query.get(user_id)
        
        if not user:
            return not_found_response("User")
        
        user.is_verified = True
        db.session.commit()
        
        return success_response(
            user.to_dict(), "User verified successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to verify user", 500)

@users_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_user_stats():
    """Get user statistics (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role != 'admin':
            return error_response("Unauthorized", 403)
        
        # Get statistics
        total_users = User.query.count()
        active_users = User.query.filter_by(is_active=True).count()
        verified_users = User.query.filter_by(is_verified=True).count()
        admin_users = User.query.filter_by(role='admin').count()
        business_owners = User.query.filter_by(role='business_owner').count()
        
        # Get recent registrations
        recent_users = User.query.order_by(User.created_at.desc()).limit(5).all()
        
        stats = {
            'total_users': total_users,
            'active_users': active_users,
            'verified_users': verified_users,
            'admin_users': admin_users,
            'business_owners': business_owners,
            'recent_registrations': [user.to_dict() for user in recent_users]
        }
        
        return success_response(stats, "User statistics retrieved successfully")
        
    except Exception as e:
        return error_response("Failed to retrieve user statistics", 500) 