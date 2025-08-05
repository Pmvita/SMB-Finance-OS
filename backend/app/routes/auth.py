from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models.user import User
from app.utils.validators import validate_email, validate_password
from app.utils.response import success_response, error_response
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return error_response(f"Missing required field: {field}", 400)
        
        # Validate email format
        if not validate_email(data['email']):
            return error_response("Invalid email format", 400)
        
        # Validate password strength
        if not validate_password(data['password']):
            return error_response("Password must be at least 8 characters long", 400)
        
        # Check if user already exists
        if User.query.filter_by(email=data['email'].lower()).first():
            return error_response("User with this email already exists", 409)
        
        # Create new user
        user = User(
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone'),
            role=data.get('role', 'user')
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Create tokens
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        
        return success_response({
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }, "User registered successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Registration failed", 500)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user and return JWT tokens"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return error_response("Email and password are required", 400)
        
        # Find user
        user = User.query.filter_by(email=data['email'].lower()).first()
        if not user:
            return error_response("Invalid email or password", 401)
        
        # Check password
        if not user.check_password(data['password']):
            return error_response("Invalid email or password", 401)
        
        # Check if user is active
        if not user.is_active:
            return error_response("Account is deactivated", 401)
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create tokens
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        
        return success_response({
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }, "Login successful")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Login failed", 500)

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        access_token = create_access_token(identity=current_user_id)
        
        return success_response({
            'access_token': access_token
        }, "Token refreshed successfully")
        
    except Exception as e:
        return error_response("Token refresh failed", 500)

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return error_response("User not found", 404)
        
        return success_response({
            'user': user.to_dict()
        }, "Profile retrieved successfully")
        
    except Exception as e:
        return error_response("Failed to retrieve profile", 500)

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update current user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return error_response("User not found", 404)
        
        data = request.get_json()
        
        # Update allowed fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'phone' in data:
            user.phone = data['phone']
        
        db.session.commit()
        
        return success_response({
            'user': user.to_dict()
        }, "Profile updated successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update profile", 500)

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return error_response("User not found", 404)
        
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['current_password', 'new_password']):
            return error_response("Current password and new password are required", 400)
        
        # Verify current password
        if not user.check_password(data['current_password']):
            return error_response("Current password is incorrect", 401)
        
        # Validate new password
        if not validate_password(data['new_password']):
            return error_response("New password must be at least 8 characters long", 400)
        
        # Update password
        user.password_hash = user._hash_password(data['new_password'])
        db.session.commit()
        
        return success_response({}, "Password changed successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to change password", 500)

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout user (client should discard tokens)"""
    try:
        # In a real application, you might want to blacklist the token
        # For now, we'll just return a success response
        return success_response({}, "Logout successful")
        
    except Exception as e:
        return error_response("Logout failed", 500) 