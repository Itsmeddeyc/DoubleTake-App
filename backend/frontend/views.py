from django.http import FileResponse
from django.conf import settings
import os

def home(request):
    build_path = os.path.join(settings.BASE_DIR, "frontend/static/frontend/build/index.html")
    return FileResponse(open(build_path, "rb"))
