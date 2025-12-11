from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from pathlib import Path
from django.conf import settings

@require_http_methods(["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"])
def home(request):
    """Serve the React app's index.html for all routes (SPA routing)
    
    Accepts all HTTP methods to support React Router and API calls
    """
    index_file = settings.BASE_DIR / "frontend" / "build" / "index.html"
    try:
        with open(index_file, "r", encoding="utf-8") as f:
            content = f.read()
        return HttpResponse(content, content_type="text/html")
    except FileNotFoundError:
        return HttpResponse(
            "<h1>Build files not found</h1><p>Please run: cd frontend && npm run build</p>",
            status=404
        )
