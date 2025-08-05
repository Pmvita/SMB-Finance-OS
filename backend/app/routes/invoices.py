from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.invoice import Invoice, InvoiceItem
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount, validate_date
from datetime import datetime
import uuid

invoices_bp = Blueprint('invoices', __name__)

@invoices_bp.route('/', methods=['GET'])
@jwt_required()
def get_invoices():
    """Get all invoices for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        status = request.args.get('status')
        client_name = request.args.get('client_name')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Build query
        query = Invoice.query.filter_by(business_id=business.id)
        
        # Apply filters
        if status:
            query = query.filter_by(status=status)
        if client_name:
            query = query.filter(Invoice.client_name.ilike(f'%{client_name}%'))
        
        # Order by created date
        query = query.order_by(Invoice.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        invoices = [invoice.to_dict() for invoice in pagination.items]
        
        return paginated_response(
            invoices, page, per_page, pagination.total,
            "Invoices retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve invoices", 500)

@invoices_bp.route('/<invoice_id>', methods=['GET'])
@jwt_required()
def get_invoice(invoice_id):
    """Get a specific invoice"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get invoice
        invoice = Invoice.query.filter_by(
            id=invoice_id, business_id=business.id
        ).first()
        
        if not invoice:
            return not_found_response("Invoice")
        
        return success_response(
            invoice.to_dict(), "Invoice retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve invoice", 500)

@invoices_bp.route('/', methods=['POST'])
@jwt_required()
def create_invoice():
    """Create a new invoice"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['client_name', 'issue_date', 'due_date']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate dates
        if not validate_date(data['issue_date']):
            return error_response("Invalid issue date format", 400)
        if not validate_date(data['due_date']):
            return error_response("Invalid due date format", 400)
        
        # Generate invoice number
        invoice_number = f"INV-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
        
        # Create invoice
        invoice = Invoice(
            invoice_number=invoice_number,
            client_name=data['client_name'],
            client_email=data.get('client_email'),
            client_phone=data.get('client_phone'),
            client_address=data.get('client_address'),
            issue_date=datetime.strptime(data['issue_date'], '%Y-%m-%d').date(),
            due_date=datetime.strptime(data['due_date'], '%Y-%m-%d').date(),
            payment_terms=data.get('payment_terms'),
            notes=data.get('notes'),
            currency=data.get('currency', business.currency),
            business_id=business.id
        )
        
        db.session.add(invoice)
        db.session.flush()  # Get the invoice ID
        
        # Add invoice items if provided
        if 'items' in data and isinstance(data['items'], list):
            for item_data in data['items']:
                if not all(key in item_data for key in ['description', 'unit_price']):
                    continue
                
                item = InvoiceItem(
                    description=item_data['description'],
                    quantity=item_data.get('quantity', 1),
                    unit_price=item_data['unit_price'],
                    invoice_id=invoice.id
                )
                item.calculate_total()
                db.session.add(item)
        
        # Calculate totals
        invoice.calculate_totals()
        
        db.session.commit()
        
        return success_response(
            invoice.to_dict(), "Invoice created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create invoice", 500)

@invoices_bp.route('/<invoice_id>', methods=['PUT'])
@jwt_required()
def update_invoice(invoice_id):
    """Update an invoice"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get invoice
        invoice = Invoice.query.filter_by(
            id=invoice_id, business_id=business.id
        ).first()
        
        if not invoice:
            return not_found_response("Invoice")
        
        # Update fields
        if 'client_name' in data:
            invoice.client_name = data['client_name']
        if 'client_email' in data:
            invoice.client_email = data['client_email']
        if 'client_phone' in data:
            invoice.client_phone = data['client_phone']
        if 'client_address' in data:
            invoice.client_address = data['client_address']
        if 'issue_date' in data:
            if validate_date(data['issue_date']):
                invoice.issue_date = datetime.strptime(data['issue_date'], '%Y-%m-%d').date()
        if 'due_date' in data:
            if validate_date(data['due_date']):
                invoice.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
        if 'payment_terms' in data:
            invoice.payment_terms = data['payment_terms']
        if 'notes' in data:
            invoice.notes = data['notes']
        if 'status' in data:
            invoice.status = data['status']
        
        db.session.commit()
        
        return success_response(
            invoice.to_dict(), "Invoice updated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update invoice", 500)

@invoices_bp.route('/<invoice_id>', methods=['DELETE'])
@jwt_required()
def delete_invoice(invoice_id):
    """Delete an invoice"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get invoice
        invoice = Invoice.query.filter_by(
            id=invoice_id, business_id=business.id
        ).first()
        
        if not invoice:
            return not_found_response("Invoice")
        
        db.session.delete(invoice)
        db.session.commit()
        
        return success_response({}, "Invoice deleted successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to delete invoice", 500)

@invoices_bp.route('/<invoice_id>/mark-paid', methods=['POST'])
@jwt_required()
def mark_invoice_paid(invoice_id):
    """Mark an invoice as paid"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get invoice
        invoice = Invoice.query.filter_by(
            id=invoice_id, business_id=business.id
        ).first()
        
        if not invoice:
            return not_found_response("Invoice")
        
        # Mark as paid
        paid_amount = data.get('amount', invoice.total_amount)
        payment_method = data.get('payment_method')
        
        invoice.mark_as_paid(paid_amount, payment_method)
        db.session.commit()
        
        return success_response(
            invoice.to_dict(), "Invoice marked as paid"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to mark invoice as paid", 500) 