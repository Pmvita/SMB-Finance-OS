from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.payroll import Payroll, Employee
from app.models.business import Business
from app.utils.response import success_response, error_response, paginated_response, not_found_response
from app.utils.validators import validate_required_fields, validate_amount, validate_date
from datetime import datetime

payroll_bp = Blueprint('payroll', __name__)

# Employee Routes
@payroll_bp.route('/employees', methods=['GET'])
@jwt_required()
def get_employees():
    """Get all employees for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        status = request.args.get('status')
        department = request.args.get('department')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Build query
        query = Employee.query.filter_by(business_id=business.id)
        
        # Apply filters
        if status:
            query = query.filter_by(employment_status=status)
        if department:
            query = query.filter_by(department=department)
        
        # Order by name
        query = query.order_by(Employee.first_name, Employee.last_name)
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        employees = [employee.to_dict() for employee in pagination.items]
        
        return paginated_response(
            employees, page, per_page, pagination.total,
            "Employees retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve employees", 500)

@payroll_bp.route('/employees/<employee_id>', methods=['GET'])
@jwt_required()
def get_employee(employee_id):
    """Get a specific employee"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get employee
        employee = Employee.query.filter_by(
            id=employee_id, business_id=business.id
        ).first()
        
        if not employee:
            return not_found_response("Employee")
        
        return success_response(
            employee.to_dict(), "Employee retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve employee", 500)

@payroll_bp.route('/employees', methods=['POST'])
@jwt_required()
def create_employee():
    """Create a new employee"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['employee_id', 'first_name', 'last_name', 'hire_date']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate hire date
        if not validate_date(data['hire_date']):
            return error_response("Invalid hire date format", 400)
        
        # Check if employee ID already exists
        existing_employee = Employee.query.filter_by(
            employee_id=data['employee_id'], business_id=business.id
        ).first()
        
        if existing_employee:
            return error_response("Employee ID already exists", 409)
        
        # Create employee
        employee = Employee(
            employee_id=data['employee_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data.get('email'),
            phone=data.get('phone'),
            position=data.get('position'),
            department=data.get('department'),
            hire_date=datetime.strptime(data['hire_date'], '%Y-%m-%d').date(),
            salary=data.get('salary'),
            hourly_rate=data.get('hourly_rate'),
            pay_frequency=data.get('pay_frequency', 'monthly'),
            currency=data.get('currency', business.currency),
            tax_id=data.get('tax_id'),
            tax_withholding=data.get('tax_withholding'),
            bank_name=data.get('bank_name'),
            bank_account_number=data.get('bank_account_number'),
            routing_number=data.get('routing_number'),
            address=data.get('address'),
            emergency_contact=data.get('emergency_contact'),
            notes=data.get('notes'),
            business_id=business.id
        )
        
        db.session.add(employee)
        db.session.commit()
        
        return success_response(
            employee.to_dict(), "Employee created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create employee", 500)

@payroll_bp.route('/employees/<employee_id>', methods=['PUT'])
@jwt_required()
def update_employee(employee_id):
    """Update an employee"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get employee
        employee = Employee.query.filter_by(
            id=employee_id, business_id=business.id
        ).first()
        
        if not employee:
            return not_found_response("Employee")
        
        # Update fields
        if 'first_name' in data:
            employee.first_name = data['first_name']
        if 'last_name' in data:
            employee.last_name = data['last_name']
        if 'email' in data:
            employee.email = data['email']
        if 'phone' in data:
            employee.phone = data['phone']
        if 'position' in data:
            employee.position = data['position']
        if 'department' in data:
            employee.department = data['department']
        if 'salary' in data:
            employee.salary = data['salary']
        if 'hourly_rate' in data:
            employee.hourly_rate = data['hourly_rate']
        if 'pay_frequency' in data:
            employee.pay_frequency = data['pay_frequency']
        if 'tax_id' in data:
            employee.tax_id = data['tax_id']
        if 'tax_withholding' in data:
            employee.tax_withholding = data['tax_withholding']
        if 'bank_name' in data:
            employee.bank_name = data['bank_name']
        if 'bank_account_number' in data:
            employee.bank_account_number = data['bank_account_number']
        if 'routing_number' in data:
            employee.routing_number = data['routing_number']
        if 'address' in data:
            employee.address = data['address']
        if 'emergency_contact' in data:
            employee.emergency_contact = data['emergency_contact']
        if 'notes' in data:
            employee.notes = data['notes']
        if 'employment_status' in data:
            employee.employment_status = data['employment_status']
        if 'termination_date' in data:
            if validate_date(data['termination_date']):
                employee.termination_date = datetime.strptime(data['termination_date'], '%Y-%m-%d').date()
        
        db.session.commit()
        
        return success_response(
            employee.to_dict(), "Employee updated successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to update employee", 500)

@payroll_bp.route('/employees/<employee_id>', methods=['DELETE'])
@jwt_required()
def delete_employee(employee_id):
    """Delete an employee"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get employee
        employee = Employee.query.filter_by(
            id=employee_id, business_id=business.id
        ).first()
        
        if not employee:
            return not_found_response("Employee")
        
        db.session.delete(employee)
        db.session.commit()
        
        return success_response({}, "Employee deleted successfully")
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to delete employee", 500)

# Payroll Routes
@payroll_bp.route('/payrolls', methods=['GET'])
@jwt_required()
def get_payrolls():
    """Get all payrolls for the current user's business"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        employee_id = request.args.get('employee_id')
        status = request.args.get('status')
        payroll_period = request.args.get('payroll_period')
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Build query
        query = Payroll.query.filter_by(business_id=business.id)
        
        # Apply filters
        if employee_id:
            query = query.filter_by(employee_id=employee_id)
        if status:
            query = query.filter_by(status=status)
        if payroll_period:
            query = query.filter_by(payroll_period=payroll_period)
        
        # Order by created date
        query = query.order_by(Payroll.created_at.desc())
        
        # Paginate
        pagination = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        payrolls = [payroll.to_dict() for payroll in pagination.items]
        
        return paginated_response(
            payrolls, page, per_page, pagination.total,
            "Payrolls retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve payrolls", 500)

@payroll_bp.route('/payrolls/<payroll_id>', methods=['GET'])
@jwt_required()
def get_payroll(payroll_id):
    """Get a specific payroll"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payroll
        payroll = Payroll.query.filter_by(
            id=payroll_id, business_id=business.id
        ).first()
        
        if not payroll:
            return not_found_response("Payroll")
        
        return success_response(
            payroll.to_dict(), "Payroll retrieved successfully"
        )
        
    except Exception as e:
        return error_response("Failed to retrieve payroll", 500)

@payroll_bp.route('/payrolls', methods=['POST'])
@jwt_required()
def create_payroll():
    """Create a new payroll"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Validate required fields
        required_fields = ['employee_id', 'payroll_period', 'start_date', 'end_date']
        missing_fields = validate_required_fields(data, required_fields)
        if missing_fields:
            return error_response(f"Missing required fields: {', '.join(missing_fields)}", 400)
        
        # Validate dates
        if not validate_date(data['start_date']):
            return error_response("Invalid start date format", 400)
        if not validate_date(data['end_date']):
            return error_response("Invalid end date format", 400)
        
        # Verify employee exists and belongs to business
        employee = Employee.query.filter_by(
            id=data['employee_id'], business_id=business.id
        ).first()
        
        if not employee:
            return error_response("Employee not found", 404)
        
        # Create payroll
        payroll = Payroll(
            payroll_period=data['payroll_period'],
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date(),
            regular_hours=data.get('regular_hours', 0),
            overtime_hours=data.get('overtime_hours', 0),
            regular_pay=data.get('regular_pay', 0),
            overtime_pay=data.get('overtime_pay', 0),
            bonus=data.get('bonus', 0),
            tax_withholding=data.get('tax_withholding', 0),
            social_security=data.get('social_security', 0),
            medicare=data.get('medicare', 0),
            other_deductions=data.get('other_deductions', 0),
            currency=data.get('currency', business.currency),
            notes=data.get('notes'),
            metadata=data.get('metadata', {}),
            business_id=business.id,
            employee_id=data['employee_id']
        )
        
        # Calculate payroll
        payroll.process_payroll()
        
        db.session.add(payroll)
        db.session.commit()
        
        return success_response(
            payroll.to_dict(), "Payroll created successfully", 201
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to create payroll", 500)

@payroll_bp.route('/payrolls/<payroll_id>/process', methods=['POST'])
@jwt_required()
def process_payroll(payroll_id):
    """Process a payroll"""
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payroll
        payroll = Payroll.query.filter_by(
            id=payroll_id, business_id=business.id
        ).first()
        
        if not payroll:
            return not_found_response("Payroll")
        
        # Process payroll
        payroll.process_payroll()
        db.session.commit()
        
        return success_response(
            payroll.to_dict(), "Payroll processed successfully"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to process payroll", 500)

@payroll_bp.route('/payrolls/<payroll_id>/pay', methods=['POST'])
@jwt_required()
def pay_payroll(payroll_id):
    """Mark payroll as paid"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Get user's business
        business = Business.query.filter_by(owner_id=current_user_id).first()
        if not business:
            return error_response("Business not found", 404)
        
        # Get payroll
        payroll = Payroll.query.filter_by(
            id=payroll_id, business_id=business.id
        ).first()
        
        if not payroll:
            return not_found_response("Payroll")
        
        # Mark as paid
        payment_method = data.get('payment_method')
        payroll.mark_as_paid(payment_method)
        db.session.commit()
        
        return success_response(
            payroll.to_dict(), "Payroll marked as paid"
        )
        
    except Exception as e:
        db.session.rollback()
        return error_response("Failed to mark payroll as paid", 500) 