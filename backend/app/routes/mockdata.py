from flask import Blueprint, jsonify
import json
import os
from pathlib import Path

mockdata_bp = Blueprint('mockdata', __name__)

def load_json_file(file_path: Path):
    """Helper function to load JSON files"""
    if not file_path.exists():
        return None
    
    with open(file_path, 'r') as f:
        return json.load(f)

def get_mockdata_dir():
    """Get the mockData directory path"""
    current_dir = Path(__file__).parent.parent.parent
    return current_dir / 'mockData'

@mockdata_bp.route('/api/mockdata', methods=['GET'])
def get_mock_data():
    """
    Serve all mock data by combining individual JSON files
    """
    try:
        mockdata_dir = get_mockdata_dir()
        
        # Load the main api.json file to get the structure
        api_json_path = mockdata_dir / 'api.json'
        if not api_json_path.exists():
            return jsonify({'error': 'Mock data structure file not found'}), 404
        
        with open(api_json_path, 'r') as f:
            structure = json.load(f)
        
        # Load all the individual JSON files
        combined_data = {}
        for key, filename in structure.items():
            file_path = mockdata_dir / filename
            data = load_json_file(file_path)
            if data is not None:
                combined_data[key] = data
            else:
                return jsonify({'error': f'Mock data file {filename} not found'}), 404
        
        return jsonify(combined_data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load mock data: {str(e)}'}), 500

@mockdata_bp.route('/api/mockdata/dashboard', methods=['GET'])
def get_dashboard_data():
    """
    Serve dashboard mock data
    """
    try:
        mockdata_dir = get_mockdata_dir()
        dashboard_path = mockdata_dir / 'dashboard.json'
        
        data = load_json_file(dashboard_path)
        if data is None:
            return jsonify({'error': 'Dashboard mock data file not found'}), 404
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load dashboard data: {str(e)}'}), 500

@mockdata_bp.route('/api/mockdata/invoices', methods=['GET'])
def get_invoices_data():
    """
    Serve invoices mock data
    """
    try:
        mockdata_dir = get_mockdata_dir()
        invoices_path = mockdata_dir / 'invoices.json'
        
        data = load_json_file(invoices_path)
        if data is None:
            return jsonify({'error': 'Invoices mock data file not found'}), 404
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load invoices data: {str(e)}'}), 500

@mockdata_bp.route('/api/mockdata/expenses', methods=['GET'])
def get_expenses_data():
    """
    Serve expenses mock data
    """
    try:
        mockdata_dir = get_mockdata_dir()
        expenses_path = mockdata_dir / 'expenses.json'
        
        data = load_json_file(expenses_path)
        if data is None:
            return jsonify({'error': 'Expenses mock data file not found'}), 404
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load expenses data: {str(e)}'}), 500

@mockdata_bp.route('/api/mockdata/wallet', methods=['GET'])
def get_wallet_data():
    """
    Serve wallet mock data
    """
    try:
        mockdata_dir = get_mockdata_dir()
        wallet_path = mockdata_dir / 'wallet.json'
        
        data = load_json_file(wallet_path)
        if data is None:
            return jsonify({'error': 'Wallet mock data file not found'}), 404
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load wallet data: {str(e)}'}), 500

@mockdata_bp.route('/api/mockdata/profile', methods=['GET'])
def get_profile_data():
    """
    Serve profile mock data
    """
    try:
        mockdata_dir = get_mockdata_dir()
        profile_path = mockdata_dir / 'profile.json'
        
        data = load_json_file(profile_path)
        if data is None:
            return jsonify({'error': 'Profile mock data file not found'}), 404
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load profile data: {str(e)}'}), 500

@mockdata_bp.route('/api/mockdata/user', methods=['GET'])
def get_user_data():
    """
    Serve user mock data
    """
    try:
        mockdata_dir = get_mockdata_dir()
        user_path = mockdata_dir / 'user.json'
        
        data = load_json_file(user_path)
        if data is None:
            return jsonify({'error': 'User mock data file not found'}), 404
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to load user data: {str(e)}'}), 500 