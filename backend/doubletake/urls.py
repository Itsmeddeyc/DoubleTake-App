from django.contrib import admin
from django.urls import path
from frontend.views import home

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
]

# Serve static files (React build assets) in development
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
