import os
from datetime import timedelta

class TestingConfig:
    """Testing configuration"""
    
    # Flask Configuration
    SECRET_KEY = 'test-secret-key'
    DEBUG = True
    TESTING = True
    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_TEST_URL', 'postgresql://localhost/smb_finance_os_test')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }
    
    # JWT Configuration
    JWT_SECRET_KEY = 'test-jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=900)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(seconds=604800)
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'
    
    # CORS Configuration
    CORS_ORIGINS = ['http://localhost:3000']
    
    # Rate Limiting
    RATELIMIT_STORAGE_URL = 'memory://'
    RATELIMIT_DEFAULT = '1000/hour'
    
    # Security
    BCRYPT_LOG_ROUNDS = 4  # Faster for testing
    
    # External Services (mock)
    STRIPE_SECRET_KEY = 'sk_test_mock'
    STRIPE_PUBLISHABLE_KEY = 'pk_test_mock'
    
    # Email Configuration (mock)
    SMTP_HOST = 'localhost'
    SMTP_PORT = 1025
    SMTP_USERNAME = 'test'
    SMTP_PASSWORD = 'test'
    
    # File Storage (mock)
    AWS_ACCESS_KEY_ID = 'test'
    AWS_SECRET_ACCESS_KEY = 'test'
    AWS_REGION = 'us-east-1'
    S3_BUCKET = 'test-bucket'
    
    # Redis Configuration (mock)
    REDIS_URL = 'redis://localhost:6379/1'
    
    # Monitoring
    SENTRY_DSN = '' 