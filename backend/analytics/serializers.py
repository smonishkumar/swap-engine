from rest_framework import serializers
from .models import WeeklySummary, HeatmapData

class WeeklySummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklySummary
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class HeatmapDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeatmapData
        fields = '__all__'
        read_only_fields = ('user', 'created_at')