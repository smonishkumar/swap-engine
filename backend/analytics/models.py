from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class WeeklySummary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week_start = models.DateField()
    week_end = models.DateField()
    avg_mood = models.FloatField()
    avg_sleep = models.FloatField()
    avg_stress = models.FloatField()
    avg_energy = models.FloatField()
    total_study_time = models.IntegerField()  # in minutes
    productivity_score = models.FloatField()
    wellness_score = models.FloatField()
    best_day = models.CharField(max_length=20)
    worst_day = models.CharField(max_length=20)
    recommendations = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'week_start']

class HeatmapData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    wellness_score = models.FloatField()
    productivity_score = models.FloatField()
    stress_level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'date']