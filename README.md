# SWAP - Student Wellness & Productivity Platform

A comprehensive platform for tracking student wellness, productivity, and preventing burnout using React frontend and Django backend.

## Features

### 🔐 Authentication
- User registration/login with JWT tokens
- Role-based access (Student/Teacher)
- Secure password handling

### 📊 Wellness Tracking
- Daily mood logging
- Sleep hours tracking
- Stress and energy level monitoring
- Burnout risk assessment with AI recommendations

### ⏱️ Study Session Management
- Start/stop study sessions
- Subject-wise tracking
- Duration calculation
- Productivity scoring

### 📅 Smart Scheduler
- AI-generated study schedules
- Break recommendations
- Workload balancing
- Personalized timing

### 📈 Analytics & Insights
- Weekly wellness summaries
- Productivity trends
- Interactive heatmaps
- Class-level analytics (for teachers)

### 🎯 Dashboard
- Real-time wellness score
- Productivity metrics
- Streak tracking
- Personalized recommendations

## Quick Start

### Backend Setup (Django)

1. Navigate to backend directory:
```bash
cd backend
```

2. Activate virtual environment and install dependencies:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Start Django server:
```bash
python manage.py runserver 0.0.0.0:8000
```

Or use the convenience script:
```bash
./run_server.py
```

### Frontend Setup (React)

1. Navigate to project root:
```bash
cd /Users/kunalkakkar/Desktop/SWAP
```

2. Install dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/me/` - Get user info
- `PATCH /api/auth/profile/` - Update user profile

### Wellness
- `POST /api/wellness/mood-logs/` - Log daily mood
- `GET /api/wellness/mood-logs/` - Get mood history
- `POST /api/wellness/study-sessions/` - Start study session
- `POST /api/wellness/study-sessions/{id}/end/` - End study session
- `POST /api/wellness/burnout-assessment/` - Calculate burnout risk
- `GET /api/wellness/dashboard/` - Get dashboard data
- `POST /api/wellness/generate-schedule/` - Generate smart schedule

### Analytics
- `GET /api/analytics/weekly/` - Weekly analytics
- `GET /api/analytics/heatmap/` - Heatmap data
- `GET /api/analytics/class-heatmap/` - Class heatmap (teachers)
- `GET /api/analytics/productivity-trends/` - Productivity trends

## Architecture

### Backend (Django)
- **authentication/** - User management and JWT auth
- **wellness/** - Mood tracking, study sessions, burnout assessment
- **analytics/** - Data analysis and reporting
- **SQLite database** - Development database (easily upgradeable to PostgreSQL)

### Frontend (React)
- **components/** - Reusable UI components
- **pages/** - Main application pages
- **hooks/** - Custom React hooks
- **services/** - API integration layer

## Key Features Implementation

### 1. Burnout Prediction Algorithm
```python
# Simple rule-based burnout calculation
score = (
    (5 - avg_mood) * 20 +      # Lower mood = higher burnout
    max(0, (8 - avg_sleep)) * 10 +  # Less sleep = higher burnout
    avg_stress * 15 +          # Higher stress = higher burnout
    (5 - avg_energy) * 15      # Lower energy = higher burnout
)
```

### 2. Smart Scheduler
- Analyzes user's study goals and preferences
- Generates balanced daily schedules
- Includes break recommendations
- Adapts to user patterns over time

### 3. Real-time Dashboard
- Wellness score calculation
- Productivity metrics
- Streak tracking
- Personalized recommendations

### 4. Analytics Engine
- Weekly trend analysis
- Heatmap visualizations
- Class-level insights for teachers
- Productivity pattern recognition

## Security Features

- JWT token authentication
- CORS protection
- Input validation and sanitization
- Role-based access control
- Secure password hashing

## Development Notes

### Database Models
- **User** - Extended Django user with roles
- **UserProfile** - Additional user information
- **DailyMoodLog** - Daily wellness tracking
- **StudySession** - Study time tracking
- **BurnoutAssessment** - Risk assessment results
- **Schedule** - Generated schedules
- **WeeklySummary** - Analytics summaries

### API Integration
- RESTful API design
- JSON responses
- Error handling
- Token-based authentication
- CORS enabled for React frontend

## Testing

Test the API endpoints:
```bash
cd backend
python test_api.py
```

## Production Deployment

1. Update Django settings for production
2. Use PostgreSQL database
3. Configure static file serving
4. Set up proper CORS origins
5. Use environment variables for secrets
6. Deploy with gunicorn + nginx

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details