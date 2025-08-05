from flask import jsonify
from datetime import datetime

def success_response(data=None, message="Success", status_code=200):
    """Create a standardized success response"""
    response = {
        "success": True,
        "message": message,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    }
    return jsonify(response), status_code

def error_response(message="Error", status_code=400, details=None):
    """Create a standardized error response"""
    response = {
        "success": False,
        "error": {
            "message": message,
            "code": status_code
        },
        "timestamp": datetime.utcnow().isoformat()
    }
    
    if details:
        response["error"]["details"] = details
    
    return jsonify(response), status_code

def paginated_response(data, page, per_page, total, message="Success"):
    """Create a paginated response"""
    total_pages = (total + per_page - 1) // per_page
    
    response = {
        "success": True,
        "message": message,
        "data": data,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        },
        "timestamp": datetime.utcnow().isoformat()
    }
    
    return jsonify(response), 200

def validation_error_response(errors, message="Validation failed"):
    """Create a validation error response"""
    return error_response(
        message=message,
        status_code=422,
        details={"validation_errors": errors}
    )

def not_found_response(resource="Resource"):
    """Create a not found response"""
    return error_response(f"{resource} not found", 404)

def unauthorized_response(message="Unauthorized"):
    """Create an unauthorized response"""
    return error_response(message, 401)

def forbidden_response(message="Forbidden"):
    """Create a forbidden response"""
    return error_response(message, 403)

def server_error_response(message="Internal server error"):
    """Create a server error response"""
    return error_response(message, 500) 