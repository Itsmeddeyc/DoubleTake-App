from django.contrib import admin
from django.urls import path
from frontend.views import home

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Serve the React index.html
    path("", home, name="home"),

    # Django admin
    path("admin/", admin.site.urls),
]

# ---------------------------------------------------------
# SERVE FRONTEND BUILD FILES (JS, CSS, assets)
# ---------------------------------------------------------
# This maps URLs like:
#   /assets/index-XYZ.js
#   /assets/index-XYZ.css
#
# to files located in:
#   BASE_DIR/frontend/build/assets/
# ---------------------------------------------------------

urlpatterns += static(
    "/assets/",
    document_root=settings.BASE_DIR / "frontend" / "build" / "assets"
)

# ---------------------------------------------------------
# OPTIONAL: Serve other build root files (e.g., favicon)
# ---------------------------------------------------------
urlpatterns += static(
    "/",
    document_root=settings.BASE_DIR / "frontend" / "build"
)
