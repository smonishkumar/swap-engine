from rest_framework import serializers
from .models import DailyMoodLog, StudySession, BurnoutAssessment, Schedule, Notification

class DailyMoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyMoodLog
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class StudySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySession
        fields = '__all__'
        read_only_fields = ('user', 'duration_minutes', 'created_at')

class BurnoutAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BurnoutAssessment
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ('user', 'created_at')