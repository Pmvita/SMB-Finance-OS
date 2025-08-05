from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.tax import TaxRecord, TaxPeriod
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount, validate_date
from datetime import datetime

tax_bp = Blueprint('tax', __name__)

@tax_bp.route('/records', methods=['GET'])
@jwt_required()
def get_tax_records():
    """Get all tax records for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        tax_type = request.args.get('tax_type')
        status = request.args.get('status')
        period_id = request.args.get('period_id')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Build query
        query = TaxRecord.query.filter_by(business_id=business.id)
        
        # Apply filters
        if tax_type:
            query = query.filter_by(tax_type=tax_type)
        if status:
            query = query.filter_by(status=status)
        if period_id:
            query = query.filter_by(tax_period_id=period_id)
        
        # Order by created date
        query = query.order_by(TaxRecord.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        tax_records = [record.to_dict() for record in pagination.items]
        
        return paginated_response(
            tax_records, page, per_page, pagination.total,
            "Tax records retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve tax records", 500)

@tax_bp.route('/records/<record_id>', methods=['GET'])
@jwt_required()
def get_tax_record(record_id):
    """Get a specific tax record"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get tax record
        tax_record = TaxRecord.query.filter_by(
            id=record_id, business_id=business.id
        ).first()
        
        if not tax_record:
            return not_found_response("Tax record")
        
        return success_response(
            tax_record.to_dict(), "Tax record retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve tax record", 500)

@tax_bp.route('/records', methods=['POST'])
@jwt_required()
def create_tax_record():
    """Create a new tax record"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['tax_type', 'tax_rate', 'taxable_amount']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate amounts
        if not validate_amount(data['tax_rate']):
            return error_response("Invalid tax rate", 400)
        if not validate_amount(data['taxable_amount']):
            return error_response("Invalid taxable amount", 400)
        
        # Create tax record
        tax_record = TaxRecord(
            tax_type=data['tax_type'],
            tax_rate=data['tax_rate'],
            taxable_amount=data['taxable_amount'],
            currency=data.get('currency', business.currency),
            notes=data.get('notes'),
            metadata=data.get('metadata', {}),
            business_id=business.id,
            tax_period_id=data.get('tax_period_id')
        )
        
        # Calculate tax amount
        tax_record.calculate_tax()
        
        db.session.add(tax_record)
        db.session.commit()
        
        return success_response(
            tax_record.to_dict(), "Tax record created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create tax record", 500)

@tax_bp.route('/records/<record_id>/file', methods=['POST'])
@jwt_required()
def file_tax_record(record_id):
    """Mark a tax record as filed"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get tax record
        tax_record = TaxRecord.query.filter_by(
            id=record_id, business_id=business.id
        ).first()
        
        if not tax_record:
            return not_found_response("Tax record")
        
        # Mark as filed
        filed_date = data.get('filed_date')
        tax_record.mark_as_filed(filed_date)
        db.session.commit()
        
        return success_response(
            tax_record.to_dict(), "Tax record marked as filed"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to mark tax record as filed", 500)

@tax_bp.route('/records/<record_id>/pay', methods=['POST'])
@jwt_required()
def pay_tax_record(record_id):
    """Mark a tax record as paid"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get tax record
        tax_record = TaxRecord.query.filter_by(
            id=record_id, business_id=business.id
        ).first()
        
        if not tax_record:
            return not_found_response("Tax record")
        
        # Mark as paid
        paid_date = data.get('paid_date')
        tax_record.mark_as_paid(paid_date)
        db.session.commit()
        
        return success_response(
            tax_record.to_dict(), "Tax record marked as paid"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to mark tax record as paid", 500)

@tax_bp.route('/periods', methods=['GET'])
@jwt_required()
def get_tax_periods():
    """Get all tax periods for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get tax periods
        tax_periods = TaxPeriod.query.filter_by(
            business_id=business.id, is_active=True
        ).order_by(TaxPeriod.start_date.desc()).all()
        
        return success_response(
            [period.to_dict() for period in tax_periods],
            "Tax periods retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve tax periods", 500)

@tax_bp.route('/periods', methods=['POST'])
@jwt_required()
def create_tax_period():
    """Create a new tax period"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['name', 'start_date', 'end_date']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate dates
        if not validate_date(data['start_date']):
            return error_response("Invalid start date format", 400)
        if not validate_date(data['end_date']):
            return error_response("Invalid end date format", 400)
        
        # Create tax period
        tax_period = TaxPeriod(
            name=data['name'],
            period_type=data.get('period_type'),
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date(),
            business_id=business.id
        )
        
        db.session.add(tax_period)
        db.session.commit()
        
        return success_response(
            tax_period.to_dict(), "Tax period created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create tax period", 500) 