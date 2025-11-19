from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta
import json
from .models import DailyMoodLog, StudySession, BurnoutAssessment, Schedule, Notification
from .serializers import (
    DailyMoodLogSerializer, StudySessionSerializer, BurnoutAssessmentSerializer,
    ScheduleSerializer, NotificationSerializer
)

class DailyMoodLogView(generics.ListCreateAPIView):
    serializer_class = DailyMoodLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DailyMoodLog.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class StudySessionView(generics.ListCreateAPIView):
    serializer_class = StudySessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StudySession.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def end_study_session(request, session_id):
    try:
        session = StudySession.objects.get(id=session_id, user=request.user, is_active=True)
        session.end_time = timezone.now()
        session.save()
        return Response(StudySessionSerializer(session).data)
    except StudySession.DoesNotExist:
        return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calculate_burnout(request):
    # Get recent mood logs
    recent_logs = DailyMoodLog.objects.filter(
        user=request.user,
        date__gte=timezone.now().date() - timedelta(days=7)
    )
    
    if not recent_logs.exists():
        return Response({'error': 'Not enough data for assessment'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Simple burnout calculation
    avg_mood = sum(log.mood for log in recent_logs) / len(recent_logs)
    avg_sleep = sum(log.sleep_hours for log in recent_logs) / len(recent_logs)
    avg_stress = sum(log.stress_level for log in recent_logs) / len(recent_logs)
    avg_energy = sum(log.energy_level for log in recent_logs) / len(recent_logs)
    
    # Calculate burnout score (0-100)
    score = (
        (5 - avg_mood) * 20 +  # Lower mood = higher burnout
        max(0, (8 - avg_sleep)) * 10 +  # Less sleep = higher burnout
        avg_stress * 15 +  # Higher stress = higher burnout
        (5 - avg_energy) * 15  # Lower energy = higher burnout
    )
    
    # Determine risk level
    if score < 30:
        risk_level = 'low'
        recommendation = "You're doing great! Keep maintaining your healthy habits."
    elif score < 60:
        risk_level = 'medium'
        recommendation = "Consider taking more breaks and ensuring adequate sleep."
    else:
        risk_level = 'high'
        recommendation = "Take immediate action: reduce workload, prioritize sleep, and consider seeking support."
    
    factors = {
        'mood': avg_mood,
        'sleep': avg_sleep,
        'stress': avg_stress,
        'energy': avg_energy
    }
    
    assessment = BurnoutAssessment.objects.create(
        user=request.user,
        risk_level=risk_level,
        score=score,
        recommendation=recommendation,
        factors=factors
    )
    
    return Response(BurnoutAssessmentSerializer(assessment).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_data(request):
    today = timezone.now().date()
    week_ago = today - timedelta(days=7)
    
    # Get recent mood log
    recent_mood = DailyMoodLog.objects.filter(user=request.user, date=today).first()
    
    # Calculate wellness score
    recent_logs = DailyMoodLog.objects.filter(user=request.user, date__gte=week_ago)
    if recent_logs.exists():
        wellness_score = sum(log.mood for log in recent_logs) / len(recent_logs) * 20
    else:
        wellness_score = 0
    
    # Calculate productivity score
    recent_sessions = StudySession.objects.filter(
        user=request.user,
        start_time__date__gte=week_ago,
        duration_minutes__isnull=False
    )
    total_study_time = sum(session.duration_minutes for session in recent_sessions)
    productivity_score = min(100, (total_study_time / (7 * request.user.profile.study_goal_hours * 60)) * 100)
    
    # Calculate streak
    streak = 0
    current_date = today
    while True:
        if DailyMoodLog.objects.filter(user=request.user, date=current_date).exists():
            streak += 1
            current_date -= timedelta(days=1)
        else:
            break
    
    # Get latest burnout assessment
    latest_assessment = BurnoutAssessment.objects.filter(user=request.user).order_by('-created_at').first()
    
    return Response({
        'wellness_score': round(wellness_score, 1),
        'productivity_score': round(productivity_score, 1),
        'streak': streak,
        'today_mood': recent_mood.mood if recent_mood else None,
        'burnout_risk': latest_assessment.risk_level if latest_assessment else 'unknown',
        'recommendation': latest_assessment.recommendation if latest_assessment else 'Log your daily mood to get personalized recommendations'
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_schedule(request):
    date = request.data.get('date', timezone.now().date())
    if isinstance(date, str):
        date = datetime.strptime(date, '%Y-%m-%d').date()
    
    # Clear existing schedule for the date
    Schedule.objects.filter(user=request.user, date=date).delete()
    
    # Simple schedule generation
    study_hours = request.user.profile.study_goal_hours
    sessions_per_day = max(1, int(study_hours / 2))  # 2-hour sessions
    
    schedules = []
    start_hour = 9  # Start at 9 AM
    
    for i in range(sessions_per_day):
        schedule = Schedule.objects.create(
            user=request.user,
            date=date,
            time_slot=f"{start_hour + i * 3}:00",
            activity=f"Study Session {i + 1}",
            duration_minutes=120
        )
        schedules.append(schedule)
        
        # Add break
        if i < sessions_per_day - 1:
            Schedule.objects.create(
                user=request.user,
                date=date,
                time_slot=f"{start_hour + i * 3 + 2}:00",
                activity="Break",
                duration_minutes=30
            )
    
    return Response(ScheduleSerializer(schedules, many=True).data)

class NotificationView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user, is_read=False).order_by('-created_at')