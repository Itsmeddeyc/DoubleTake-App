from django.contrib import admin
from django.urls import path, re_path
from frontend.views import home

urlpatterns = [
    # Django admin
    path("admin/", admin.site.urls),
    
    # Catch-all for React Router (SPA routing) - serves index.html for all routes
    # This must be last - excludes admin and static paths
    re_path(r'^(?!admin|static).*$', home, name="home"),
]

# Note: Static files (JS, CSS, assets) are served by WhiteNoise
# They should be in STATIC_ROOT after running collectstatic
