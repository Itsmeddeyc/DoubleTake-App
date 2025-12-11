from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from pathlib import Path
from django.conf import settings

@require_http_methods(["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"])
def home(request):
    """Serve the React app's index.html for all routes (SPA routing)
    
    Accepts all HTTP methods to support React Router and API calls
    """
    # Try multiple possible locations for the build file
    possible_paths = [
        settings.BASE_DIR / "frontend" / "build" / "index.html",
        settings.BASE_DIR / "staticfiles" / "index.html",  # After collectstatic
    ]
    
    for index_file in possible_paths:
        if index_file.exists():
            try:
                with open(index_file, "r", encoding="utf-8") as f:
                    content = f.read()
                return HttpResponse(content, content_type="text/html")
            except Exception as e:
                continue
    
    # If no build file found, return helpful error
    return HttpResponse(
        f"<h1>Build files not found</h1><p>Expected locations:<br>"
        f"{possible_paths[0]}<br>{possible_paths[1]}</p>"
        f"<p>Please ensure the frontend is built and collectstatic has run.</p>",
        status=500
    )
