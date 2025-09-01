from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from root .env file
root_dir = Path(__file__).parent.parent.parent
env_path = root_dir / '.env'
load_dotenv(env_path)

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    if config_name == 'development':
        app.config.from_object('config.development.DevelopmentConfig')
    elif config_name == 'production':
        app.config.from_object('config.production.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('config.testing.TestingConfig')
    elif config_name == 'mockdata':
        app.config.from_object('config.mockdata.MockDataConfig')
    else:
        app.config.from_object('config.development.DevelopmentConfig')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    limiter.init_app(app)
    
    # Configure CORS - More permissive for development
    cors_origins = app.config.get('CORS_ORIGINS', [
        'http://localhost:3000',  # Frontend
        'http://localhost:3001',  # Frontend alternative port
        'http://localhost:8081',  # Expo development server
        'http://192.168.2.50:8081',  # Expo on local network
        'exp://192.168.2.50:8081',   # Expo protocol
        'http://localhost:19006',     # Expo web
        'http://localhost:19000',     # Expo dev tools
    ])
    CORS(app, origins=cors_origins, supports_credentials=True)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.invoices import invoices_bp
    from app.routes.expenses import expenses_bp
    from app.routes.wallet import wallet_bp
    from app.routes.payments import payments_bp
    from app.routes.tax import tax_bp
    from app.routes.credit import credit_bp
    from app.routes.payroll import payroll_bp
    from app.routes.users import users_bp
    from app.routes.businesses import businesses_bp
    from app.routes.mockdata import mockdata_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(invoices_bp, url_prefix='/api/v1/invoices')
    app.register_blueprint(expenses_bp, url_prefix='/api/v1/expenses')
    app.register_blueprint(wallet_bp, url_prefix='/api/v1/wallet')
    app.register_blueprint(payments_bp, url_prefix='/api/v1/payments')
    app.register_blueprint(tax_bp, url_prefix='/api/v1/tax')
    app.register_blueprint(credit_bp, url_prefix='/api/v1/credit')
    app.register_blueprint(payroll_bp, url_prefix='/api/v1/payroll')
    app.register_blueprint(users_bp, url_prefix='/api/v1/users')
    app.register_blueprint(businesses_bp, url_prefix='/api/v1/businesses')
    app.register_blueprint(mockdata_bp)  # No prefix for mockdata routes
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return {'error': 'Internal server error'}, 500
    
    @app.errorhandler(422)
    def unprocessable_entity(error):
        return {'error': 'Unprocessable entity'}, 422
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'service': 'Trident Financial OS API'}
    
    return app
