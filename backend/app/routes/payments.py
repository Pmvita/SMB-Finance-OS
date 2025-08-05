from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.payment import Payment
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount, validate_payment_method
from datetime import datetime

payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/', methods=['GET'])
@jwt_required()
def get_payments():
    """Get all payments for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        payment_type = request.args.get('payment_type')
        status = request.args.get('status')
        payment_method = request.args.get('payment_method')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Build query
        query = Payment.query.filter_by(business_id=business.id)
        
        # Apply filters
        if payment_type:
            query = query.filter_by(payment_type=payment_type)
        if status:
            query = query.filter_by(status=status)
        if payment_method:
            query = query.filter_by(payment_method=payment_method)
        
        # Order by created date
        query = query.order_by(Payment.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        payments = [payment.to_dict() for payment in pagination.items]
        
        return paginated_response(
            payments, page, per_page, pagination.total,
            "Payments retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve payments", 500)

@payments_bp.route('/<payment_id>', methods=['GET'])
@jwt_required()
def get_payment(payment_id):
    """Get a specific payment"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payment
        payment = Payment.query.filter_by(
            id=payment_id, business_id=business.id
        ).first()
        
        if not payment:
            return not_found_response("Payment")
        
        return success_response(
            payment.to_dict(), "Payment retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve payment", 500)

@payments_bp.route('/', methods=['POST'])
@jwt_required()
def create_payment():
    """Create a new payment"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['payment_type', 'amount', 'description']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate amount
        if not validate_amount(data['amount']):
            return error_response("Invalid amount", 400)
        
        # Validate payment method if provided
        if data.get('payment_method') and not validate_payment_method(data['payment_method']):
            return error_response("Invalid payment method", 400)
        
        # Create payment
        payment = Payment(
            payment_type=data['payment_type'],
            amount=data['amount'],
            currency=data.get('currency', business.currency),
            payment_method=data.get('payment_method'),
            payment_gateway=data.get('payment_gateway'),
            gateway_transaction_id=data.get('gateway_transaction_id'),
            payer_name=data.get('payer_name'),
            payer_email=data.get('payer_email'),
            payee_name=data.get('payee_name'),
            payee_email=data.get('payee_email'),
            description=data['description'],
            reference=data.get('reference'),
            metadata=data.get('metadata', {}),
            business_id=business.id,
            wallet_id=data.get('wallet_id')
        )
        
        db.session.add(payment)
        db.session.commit()
        
        return success_response(
            payment.to_dict(), "Payment created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create payment", 500)

@payments_bp.route('/<payment_id>/process', methods=['POST'])
@jwt_required()
def process_payment(payment_id):
    """Process a payment"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payment
        payment = Payment.query.filter_by(
            id=payment_id, business_id=business.id
        ).first()
        
        if not payment:
            return not_found_response("Payment")
        
        # Process payment
        payment.process_payment()
        db.session.commit()
        
        return success_response(
            payment.to_dict(), "Payment processed successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to process payment", 500)

@payments_bp.route('/<payment_id>/complete', methods=['POST'])
@jwt_required()
def complete_payment(payment_id):
    """Complete a payment"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payment
        payment = Payment.query.filter_by(
            id=payment_id, business_id=business.id
        ).first()
        
        if not payment:
            return not_found_response("Payment")
        
        # Complete payment
        payment_method = data.get('payment_method')
        payment.complete_payment(payment_method)
        db.session.commit()
        
        return success_response(
            payment.to_dict(), "Payment completed successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to complete payment", 500)

@payments_bp.route('/<payment_id>/fail', methods=['POST'])
@jwt_required()
def fail_payment(payment_id):
    """Mark a payment as failed"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payment
        payment = Payment.query.filter_by(
            id=payment_id, business_id=business.id
        ).first()
        
        if not payment:
            return not_found_response("Payment")
        
        # Mark as failed
        reason = data.get('reason', 'Payment failed')
        payment.fail_payment(reason)
        db.session.commit()
        
        return success_response(
            payment.to_dict(), "Payment marked as failed"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to mark payment as failed", 500) 