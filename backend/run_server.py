#!/usr/bin/env python3
"""
Script to run the Django development server
"""
import os
import sys
import subprocess

def run_server():
    """Run Django development server"""
    print("🚀 Starting SWAP Backend Server...")
    
    # Activate virtual environment and run server
    activate_script = "source venv/bin/activate"
    run_command = "python manage.py runserver 0.0.0.0:8000"
    
    full_command = f"{activate_script} && {run_command}"
    
    try:
        subprocess.run(full_command, shell=True, cwd=os.path.dirname(__file__))
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")

if __name__ == "__main__":
    run_server()