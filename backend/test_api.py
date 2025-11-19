#!/usr/bin/env python3
"""
Simple API test script to verify backend functionality
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_registration():
    """Test user registration"""
    data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpass123",
        "password_confirm": "testpass123",
        "role": "student"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register/", json=data)
    print(f"Registration: {response.status_code}")
    if response.status_code == 201:
        return response.json()
    else:
        print(f"Error: {response.text}")
        return None

def test_login():
    """Test user login"""
    data = {
        "email": "test@example.com",
        "password": "testpass123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login/", json=data)
    print(f"Login: {response.status_code}")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.text}")
        return None

if __name__ == "__main__":
    print("Testing SWAP Backend API...")
    
    # Test registration
    user_data = test_registration()
    if user_data:
        print("✅ Registration successful")
        
        # Test login
        login_data = test_login()
        if login_data:
            print("✅ Login successful")
            print(f"Access Token: {login_data['access'][:20]}...")
        else:
            print("❌ Login failed")
    else:
        print("❌ Registration failed")