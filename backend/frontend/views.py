from django.http import FileResponse
from pathlib import Path
from django.conf import settings

def home(request):
    index_file = settings.BASE_DIR / "frontend" / "build" / "index.html"
    return FileResponse(open(index_file, "rb"))
