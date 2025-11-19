from django.urls import path
from . import views

urlpatterns = [
    path('weekly/', views.weekly_analytics, name='weekly_analytics'),
    path('heatmap/', views.heatmap_data, name='heatmap_data'),
    path('class-heatmap/', views.class_heatmap, name='class_heatmap'),
    path('productivity-trends/', views.productivity_trends, name='productivity_trends'),
]