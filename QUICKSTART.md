# SWAP - Quick Start Guide

## 🚀 Run Your Website in 3 Steps

### Step 1: Install Dependencies
```bash
cd /Users/kunalkakkar/Desktop/SWAP
npm install
```

### Step 2: Setup Backend
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```

### Step 3: Start Everything
```bash
cd /Users/kunalkakkar/Desktop/SWAP
./start.sh
```

## 🌐 Access Your Website

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api

## ✨ Features Ready to Use

1. **User Registration/Login** - Create account and login
2. **Mood Logging** - Track daily wellness
3. **Study Sessions** - Start/stop study tracking
4. **Burnout Assessment** - Get AI recommendations
5. **Dashboard** - View wellness & productivity scores
6. **Analytics** - Weekly trends and heatmaps
7. **Smart Scheduler** - Generate study schedules

## 🔧 Manual Start (Alternative)

**Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

**Frontend:**
```bash
cd /Users/kunalkakkar/Desktop/SWAP
npm start
```

## 📱 Test the API

```bash
cd backend
python test_api.py
```

Your SWAP platform is now ready! 🎉