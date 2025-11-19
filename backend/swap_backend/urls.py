from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/wellness/', include('wellness.urls')),
    path('api/analytics/', include('analytics.urls')),
]