from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.wallet import Wallet, Transaction
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount
from datetime import datetime

wallet_bp = Blueprint('wallet', __name__)

@wallet_bp.route('/', methods=['GET'])
@jwt_required()
def get_wallets():
    """Get all wallets for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get wallets
        wallets = Wallet.query.filter_by(
            business_id=business.id, is_active=True
        ).all()
        
        return success_response(
            [wallet.to_dict() for wallet in wallets],
            "Wallets retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve wallets", 500)

@wallet_bp.route('/<wallet_id>', methods=['GET'])
@jwt_required()
def get_wallet(wallet_id):
    """Get a specific wallet"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get wallet
        wallet = Wallet.query.filter_by(
            id=wallet_id, business_id=business.id
        ).first()
        
        if not wallet:
            return not_found_response("Wallet")
        
        return success_response(
            wallet.to_dict(), "Wallet retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve wallet", 500)

@wallet_bp.route('/', methods=['POST'])
@jwt_required()
def create_wallet():
    """Create a new wallet"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        if not data.get('name'):
            return error_response("Wallet name is required", 400)
        
        # Create wallet
        wallet = Wallet(
            name=data['name'],
            wallet_type=data.get('wallet_type', 'operating'),
            currency=data.get('currency', business.currency),
            settings=data.get('settings', {}),
            business_id=business.id
        )
        
        db.session.add(wallet)
        db.session.commit()
        
        return success_response(
            wallet.to_dict(), "Wallet created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create wallet", 500)

@wallet_bp.route('/<wallet_id>/transactions', methods=['GET'])
@jwt_required()
def get_wallet_transactions(wallet_id):
    """Get transactions for a specific wallet"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        transaction_type = request.args.get('transaction_type')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Verify wallet belongs to business
        wallet = Wallet.query.filter_by(
            id=wallet_id, business_id=business.id
        ).first()
        
        if not wallet:
            return not_found_response("Wallet")
        
        # Build query
        query = Transaction.query.filter_by(wallet_id=wallet_id)
        
        # Apply filters
        if transaction_type:
            query = query.filter_by(transaction_type=transaction_type)
        
        # Order by created date
        query = query.order_by(Transaction.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        transactions = [transaction.to_dict() for transaction in pagination.items]
        
        return paginated_response(
            transactions, page, per_page, pagination.total,
            "Transactions retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve transactions", 500)

@wallet_bp.route('/<wallet_id>/add-funds', methods=['POST'])
@jwt_required()
def add_funds_to_wallet(wallet_id):
    """Add funds to a wallet"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['amount', 'description']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate amount
        if not validate_amount(data['amount']):
            return error_response("Invalid amount", 400)
        
        # Get wallet
        wallet = Wallet.query.filter_by(
            id=wallet_id, business_id=business.id
        ).first()
        
        if not wallet:
            return not_found_response("Wallet")
        
        # Add funds
        transaction = wallet.add_funds(
            amount=data['amount'],
            description=data['description'],
            transaction_type=data.get('transaction_type', 'credit')
        )
        
        db.session.commit()
        
        return success_response({
            'wallet': wallet.to_dict(),
            'transaction': transaction.to_dict()
        }, "Funds added successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to add funds", 500)

@wallet_bp.route('/<wallet_id>/transfer', methods=['POST'])
@jwt_required()
def transfer_between_wallets(wallet_id):
    """Transfer funds between wallets"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['to_wallet_id', 'amount', 'description']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate amount
        if not validate_amount(data['amount']):
            return error_response("Invalid amount", 400)
        
        # Get source wallet
        from_wallet = Wallet.query.filter_by(
            id=wallet_id, business_id=business.id
        ).first()
        
        if not from_wallet:
            return not_found_response("Source wallet")
        
        # Get destination wallet
        to_wallet = Wallet.query.filter_by(
            id=data['to_wallet_id'], business_id=business.id
        ).first()
        
        if not to_wallet:
            return not_found_response("Destination wallet")
        
        # Check if source wallet has sufficient funds
        if from_wallet.balance < data['amount']:
            return error_response("Insufficient funds in source wallet", 400)
        
        # Create transactions
        debit_transaction = from_wallet.add_funds(
            amount=data['amount'],
            description=f"Transfer to {to_wallet.name}: {data['description']}",
            transaction_type='debit'
        )
        
        credit_transaction = to_wallet.add_funds(
            amount=data['amount'],
            description=f"Transfer from {from_wallet.name}: {data['description']}",
            transaction_type='credit'
        )
        
        # Link transactions
        debit_transaction.related_transaction_id = credit_transaction.id
        credit_transaction.related_transaction_id = debit_transaction.id
        
        db.session.commit()
        
        return success_response({
            'from_wallet': from_wallet.to_dict(),
            'to_wallet': to_wallet.to_dict(),
            'debit_transaction': debit_transaction.to_dict(),
            'credit_transaction': credit_transaction.to_dict()
        }, "Transfer completed successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to transfer funds", 500) 