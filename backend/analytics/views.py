from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta
from django.db.models import Avg, Sum
from wellness.models import DailyMoodLog, StudySession
from .models import WeeklySummary, HeatmapData
from .serializers import WeeklySummarySerializer, HeatmapDataSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def weekly_analytics(request):
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=7)
    
    # Get mood logs for the week
    mood_logs = DailyMoodLog.objects.filter(
        user=request.user,
        date__range=[start_date, end_date]
    )
    
    # Get study sessions for the week
    study_sessions = StudySession.objects.filter(
        user=request.user,
        start_time__date__range=[start_date, end_date],
        duration_minutes__isnull=False
    )
    
    if not mood_logs.exists():
        return Response({'error': 'No data available for this week'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Calculate averages
    avg_mood = mood_logs.aggregate(Avg('mood'))['mood__avg']
    avg_sleep = mood_logs.aggregate(Avg('sleep_hours'))['sleep_hours__avg']
    avg_stress = mood_logs.aggregate(Avg('stress_level'))['stress_level__avg']
    avg_energy = mood_logs.aggregate(Avg('energy_level'))['energy_level__avg']
    
    # Calculate total study time
    total_study_time = study_sessions.aggregate(Sum('duration_minutes'))['duration_minutes__sum'] or 0
    
    # Daily breakdown
    daily_data = []
    for i in range(7):
        date = start_date + timedelta(days=i)
        day_mood = mood_logs.filter(date=date).first()
        day_study = study_sessions.filter(start_time__date=date).aggregate(Sum('duration_minutes'))['duration_minutes__sum'] or 0
        
        daily_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'day': date.strftime('%A'),
            'mood': day_mood.mood if day_mood else 0,
            'sleep': day_mood.sleep_hours if day_mood else 0,
            'stress': day_mood.stress_level if day_mood else 0,
            'energy': day_mood.energy_level if day_mood else 0,
            'study_time': day_study
        })
    
    return Response({
        'week_summary': {
            'start_date': start_date,
            'end_date': end_date,
            'avg_mood': round(avg_mood, 2),
            'avg_sleep': round(avg_sleep, 2),
            'avg_stress': round(avg_stress, 2),
            'avg_energy': round(avg_energy, 2),
            'total_study_time': total_study_time,
            'total_study_hours': round(total_study_time / 60, 2)
        },
        'daily_data': daily_data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def heatmap_data(request):
    days = int(request.GET.get('days', 30))
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=days)
    
    # Get mood logs
    mood_logs = DailyMoodLog.objects.filter(
        user=request.user,
        date__range=[start_date, end_date]
    ).order_by('date')
    
    # Get study sessions
    study_sessions = StudySession.objects.filter(
        user=request.user,
        start_time__date__range=[start_date, end_date],
        duration_minutes__isnull=False
    )
    
    heatmap_data = []
    for log in mood_logs:
        day_study = study_sessions.filter(start_time__date=log.date).aggregate(Sum('duration_minutes'))['duration_minutes__sum'] or 0
        
        # Calculate wellness score (mood + energy - stress)
        wellness_score = (log.mood + log.energy_level - log.stress_level) * 20 / 3
        
        # Calculate productivity score based on study time vs goal
        goal_minutes = request.user.profile.study_goal_hours * 60
        productivity_score = min(100, (day_study / goal_minutes) * 100) if goal_minutes > 0 else 0
        
        heatmap_data.append({
            'date': log.date.strftime('%Y-%m-%d'),
            'wellness_score': round(wellness_score, 1),
            'productivity_score': round(productivity_score, 1),
            'mood': log.mood,
            'stress_level': log.stress_level,
            'energy_level': log.energy_level,
            'sleep_hours': log.sleep_hours,
            'study_minutes': day_study
        })
    
    return Response(heatmap_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def class_heatmap(request):
    """For teachers to see aggregated class data"""
    if request.user.role != 'teacher':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    days = int(request.GET.get('days', 7))
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=days)
    
    # Get all students (in a real app, you'd filter by class/institution)
    from django.contrib.auth import get_user_model
    User = get_user_model()
    students = User.objects.filter(role='student')
    
    class_data = []
    for i in range(days + 1):
        date = start_date + timedelta(days=i)
        
        # Get mood logs for all students on this date
        day_logs = DailyMoodLog.objects.filter(
            user__in=students,
            date=date
        )
        
        if day_logs.exists():
            avg_wellness = day_logs.aggregate(
                avg_mood=Avg('mood'),
                avg_stress=Avg('stress_level'),
                avg_energy=Avg('energy_level')
            )
            
            wellness_score = (
                avg_wellness['avg_mood'] + 
                avg_wellness['avg_energy'] - 
                avg_wellness['avg_stress']
            ) * 20 / 3
            
            class_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'wellness_score': round(wellness_score, 1),
                'student_count': day_logs.count(),
                'avg_mood': round(avg_wellness['avg_mood'], 2),
                'avg_stress': round(avg_wellness['avg_stress'], 2)
            })
    
    return Response(class_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def productivity_trends(request):
    days = int(request.GET.get('days', 30))
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=days)
    
    # Get study sessions grouped by date
    study_data = []
    for i in range(days + 1):
        date = start_date + timedelta(days=i)
        day_sessions = StudySession.objects.filter(
            user=request.user,
            start_time__date=date,
            duration_minutes__isnull=False
        )
        
        total_minutes = day_sessions.aggregate(Sum('duration_minutes'))['duration_minutes__sum'] or 0
        session_count = day_sessions.count()
        
        study_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'total_minutes': total_minutes,
            'total_hours': round(total_minutes / 60, 2),
            'session_count': session_count,
            'avg_session_length': round(total_minutes / session_count, 1) if session_count > 0 else 0
        })
    
    return Response(study_data)