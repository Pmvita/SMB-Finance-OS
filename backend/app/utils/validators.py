import re
from datetime import datetime

def validate_email(email):
    """Validate email format"""
    if not email:
        return False
    
    # Basic email regex pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password strength"""
    if not password:
        return False
    
    # Password must be at least 8 characters long
    if len(password) < 8:
        return False
    
    return True

def validate_phone(phone):
    """Validate phone number format"""
    if not phone:
        return True  # Phone is optional
    
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', phone)
    
    # Check if it's a valid length (7-15 digits)
    return 7 <= len(digits_only) <= 15

def validate_uuid(uuid_string):
    """Validate UUID format"""
    if not uuid_string:
        return False
    
    pattern = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    return re.match(pattern, uuid_string.lower()) is not None

def validate_date(date_string):
    """Validate date format (YYYY-MM-DD)"""
    if not date_string:
        return False
    
    try:
        datetime.strptime(date_string, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_datetime(datetime_string):
    """Validate datetime format (ISO format)"""
    if not datetime_string:
        return False
    
    try:
        datetime.fromisoformat(datetime_string.replace('Z', '+00:00'))
        return True
    except ValueError:
        return False

def validate_amount(amount):
    """Validate monetary amount"""
    if amount is None:
        return False
    
    try:
        float_amount = float(amount)
        return float_amount >= 0
    except (ValueError, TypeError):
        return False

def validate_currency(currency):
    """Validate currency code (3-letter ISO)"""
    if not currency:
        return False
    
    # Common currency codes
    valid_currencies = {
        'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL',
        'MXN', 'KRW', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'PLN', 'CZK', 'HUF',
        'RUB', 'TRY', 'ZAR', 'NGN', 'KES', 'GHS', 'UGX', 'TZS', 'ETB', 'MAD'
    }
    
    return currency.upper() in valid_currencies

def validate_business_type(business_type):
    """Validate business type"""
    if not business_type:
        return True  # Optional field
    
    valid_types = {
        'sole_proprietorship', 'partnership', 'llc', 'corporation', 'nonprofit',
        'cooperative', 'franchise', 'other'
    }
    
    return business_type.lower() in valid_types

def validate_payment_method(payment_method):
    """Validate payment method"""
    if not payment_method:
        return True  # Optional field
    
    valid_methods = {
        'cash', 'check', 'bank_transfer', 'credit_card', 'debit_card',
        'stripe', 'paypal', 'mobile_money', 'crypto', 'other'
    }
    
    return payment_method.lower() in valid_methods

def sanitize_string(value, max_length=255):
    """Sanitize string input"""
    if not value:
        return None
    
    # Remove leading/trailing whitespace
    sanitized = str(value).strip()
    
    # Limit length
    if len(sanitized) > max_length:
        sanitized = sanitized[:max_length]
    
    return sanitized

def validate_required_fields(data, required_fields):
    """Validate that all required fields are present"""
    missing_fields = []
    
    for field in required_fields:
        if field not in data or data[field] is None or data[field] == '':
            missing_fields.append(field)
    
    return missing_fields 