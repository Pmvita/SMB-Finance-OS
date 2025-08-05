from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.expense import Expense, ExpenseCategory
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount, validate_date
from datetime import datetime

expenses_bp = Blueprint('expenses', __name__)

@expenses_bp.route('/', methods=['GET'])
@jwt_required()
def get_expenses():
    """Get all expenses for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        status = request.args.get('status')
        category_id = request.args.get('category_id')
        date_from = request.args.get('date_from')
        date_to = request.args.get('date_to')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Build query
        query = Expense.query.filter_by(business_id=business.id)
        
        # Apply filters
        if status:
            query = query.filter_by(status=status)
        if category_id:
            query = query.filter_by(category_id=category_id)
        if date_from:
            query = query.filter(Expense.date >= date_from)
        if date_to:
            query = query.filter(Expense.date <= date_to)
        
        # Order by date
        query = query.order_by(Expense.date.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        expenses = [expense.to_dict() for expense in pagination.items]
        
        return paginated_response(
            expenses, page, per_page, pagination.total,
            "Expenses retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve expenses", 500)

@expenses_bp.route('/<expense_id>', methods=['GET'])
@jwt_required()
def get_expense(expense_id):
    """Get a specific expense"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get expense
        expense = Expense.query.filter_by(
            id=expense_id, business_id=business.id
        ).first()
        
        if not expense:
            return not_found_response("Expense")
        
        return success_response(
            expense.to_dict(), "Expense retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve expense", 500)

@expenses_bp.route('/', methods=['POST'])
@jwt_required()
def create_expense():
    """Create a new expense"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['description', 'amount', 'date']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate amount
        if not validate_amount(data['amount']):
            return error_response("Invalid amount", 400)
        
        # Validate date
        if not validate_date(data['date']):
            return error_response("Invalid date format", 400)
        
        # Create expense
        expense = Expense(
            description=data['description'],
            amount=data['amount'],
            currency=data.get('currency', business.currency),
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            payment_method=data.get('payment_method'),
            receipt_url=data.get('receipt_url'),
            vendor=data.get('vendor'),
            tags=data.get('tags', []),
            notes=data.get('notes'),
            business_id=business.id,
            created_by=current_user_id,
            category_id=data.get('category_id')
        )
        
        db.session.add(expense)
        db.session.commit()
        
        return success_response(
            expense.to_dict(), "Expense created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create expense", 500)

@expenses_bp.route('/<expense_id>', methods=['PUT'])
@jwt_required()
def update_expense(expense_id):
    """Update an expense"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get expense
        expense = Expense.query.filter_by(
            id=expense_id, business_id=business.id
        ).first()
        
        if not expense:
            return not_found_response("Expense")
        
        # Update fields
        if 'description' in data:
            expense.description = data['description']
        if 'amount' in data:
            if validate_amount(data['amount']):
                expense.amount = data['amount']
        if 'date' in data:
            if validate_date(data['date']):
                expense.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'payment_method' in data:
            expense.payment_method = data['payment_method']
        if 'receipt_url' in data:
            expense.receipt_url = data['receipt_url']
        if 'vendor' in data:
            expense.vendor = data['vendor']
        if 'tags' in data:
            expense.tags = data['tags']
        if 'notes' in data:
            expense.notes = data['notes']
        if 'category_id' in data:
            expense.category_id = data['category_id']
        
        db.session.commit()
        
        return success_response(
            expense.to_dict(), "Expense updated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update expense", 500)

@expenses_bp.route('/<expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    """Delete an expense"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get expense
        expense = Expense.query.filter_by(
            id=expense_id, business_id=business.id
        ).first()
        
        if not expense:
            return not_found_response("Expense")
        
        db.session.delete(expense)
        db.session.commit()
        
        return success_response({}, "Expense deleted successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to delete expense", 500)

@expenses_bp.route('/categories', methods=['GET'])
@jwt_required()
def get_expense_categories():
    """Get expense categories for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get categories
        categories = ExpenseCategory.query.filter_by(
            business_id=business.id, is_active=True
        ).all()
        
        return success_response(
            [category.to_dict() for category in categories],
            "Expense categories retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve expense categories", 500)

@expenses_bp.route('/categories', methods=['POST'])
@jwt_required()
def create_expense_category():
    """Create a new expense category"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        if not data.get('name'):
            return error_response("Category name is required", 400)
        
        # Create category
        category = ExpenseCategory(
            name=data['name'],
            description=data.get('description'),
            color=data.get('color'),
            icon=data.get('icon'),
            business_id=business.id
        )
        
        db.session.add(category)
        db.session.commit()
        
        return success_response(
            category.to_dict(), "Expense category created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create expense category", 500) 