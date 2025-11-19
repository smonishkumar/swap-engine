from django.urls import path
from . import views

urlpatterns = [
    path('mood-logs/', views.DailyMoodLogView.as_view(), name='mood_logs'),
    path('study-sessions/', views.StudySessionView.as_view(), name='study_sessions'),
    path('study-sessions/<int:session_id>/end/', views.end_study_session, name='end_study_session'),
    path('burnout-assessment/', views.calculate_burnout, name='calculate_burnout'),
    path('dashboard/', views.dashboard_data, name='dashboard_data'),
    path('generate-schedule/', views.generate_schedule, name='generate_schedule'),
    path('notifications/', views.NotificationView.as_view(), name='notifications'),
]