from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.views.static import serve
from frontend.views import home

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),
]

# Serve assets at /assets/ path
# This is needed because Vite builds with relative paths like ./assets/...
# which become /assets/... when served from root
if settings.DEBUG:
    # In development, serve from source build directory
    urlpatterns += [
        path("assets/<path:path>", serve, {
            'document_root': settings.BASE_DIR / "backend" / "frontend" / "build" / "assets"
        }),
    ]
else:
    # In production, serve from collected staticfiles
    urlpatterns += [
        path("assets/<path:path>", serve, {
            'document_root': settings.STATIC_ROOT / "assets"
        }),
    ]
