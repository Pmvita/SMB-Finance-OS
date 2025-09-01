import os
from datetime import timedelta

class MockDataConfig:
    """Mock data configuration - runs without database"""
    
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = True
    TESTING = False
    
    # Database Configuration - Use SQLite in memory for compatibility
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 900)))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 604800)))
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'
    
    # CORS Configuration - More permissive for development
    CORS_ORIGINS = [
        'http://localhost:3000',  # Frontend
        'http://localhost:3001',  # Frontend alternative port
        'http://localhost:8081',  # Expo development server
        'http://192.168.2.50:8081',  # Expo on local network
        'exp://192.168.2.50:8081',   # Expo protocol
        'http://localhost:19006',     # Expo web
        'http://localhost:19000',     # Expo dev tools
        'http://localhost:19000',     # Expo dev tools
        'http://localhost:19001',     # Expo dev tools
        'http://localhost:19002',     # Expo dev tools
    ]
    
    # Rate Limiting
    RATELIMIT_STORAGE_URL = 'memory://'
    RATELIMIT_DEFAULT = '1000/hour'  # More permissive for development
    
    # Security
    BCRYPT_LOG_ROUNDS = int(os.getenv('BCRYPT_LOG_ROUNDS', 12))
    
    # External Services
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', '')
    STRIPE_PUBLISHABLE_KEY = os.getenv('STRIPE_PUBLISHABLE_KEY', '')
    
    # Email Configuration
    SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
    
    # File Storage
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID', '')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY', '')
    AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')
    S3_BUCKET = os.getenv('S3_BUCKET', 'trident-financial-os-uploads-dev')
    
    # Redis Configuration
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    
    # Monitoring
    SENTRY_DSN = os.getenv('SENTRY_DSN', '') 