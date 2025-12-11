from pathlib import Path
import os
import dj_database_url

# ---------------------------------------------------------
# BASE DIR (root of the whole repo)
# backend/doubletake/settings.py → parent.parent.parent
# ---------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# ---------------------------------------------------------
# BASIC SETTINGS
# ---------------------------------------------------------
SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
DEBUG = os.environ.get("DEBUG", "True") == "True"

# Allow all localhost + Heroku domains
allowed_hosts_env = os.environ.get("ALLOWED_HOSTS", "")
if allowed_hosts_env:
    hosts = [h.strip() for h in allowed_hosts_env.split(",") if h.strip()]
    if ".herokuapp.com" not in " ".join(hosts):
        hosts.append(".herokuapp.com")
    ALLOWED_HOSTS = hosts
else:
    ALLOWED_HOSTS = [
        ".herokuapp.com",
        "localhost",
        "127.0.0.1",
        "*",
    ]


# ---------------------------------------------------------
# INSTALLED APPS
# ---------------------------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "frontend",
]


# ---------------------------------------------------------
# MIDDLEWARE
# ---------------------------------------------------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ---------------------------------------------------------
# URLS + WSGI
# ---------------------------------------------------------
ROOT_URLCONF = "doubletake.urls"
WSGI_APPLICATION = "doubletake.wsgi.application"


# ---------------------------------------------------------
# TEMPLATES
# ---------------------------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Frontend handled entirely by Vite
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------
DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}


# ---------------------------------------------------------
# PASSWORD VALIDATION
# ---------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# ---------------------------------------------------------
# INTERNATIONALIZATION
# ---------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# ---------------------------------------------------------
# STATIC FILES — IMPORTANT FIX
#
# Your actual structure is:
#
#   doubletake-app/
#       backend/
#           frontend/
#               build/
#                   index.html
#                   assets/*
#
# Django must explicitly collect BOTH the build folder + assets folder.
# ---------------------------------------------------------
STATIC_URL = "/static/"

STATICFILES_DIRS = [
    BASE_DIR / "backend" / "frontend" / "build",
    BASE_DIR / "backend" / "frontend" / "build" / "assets",
]

STATIC_ROOT = BASE_DIR / "staticfiles"

# WhiteNoise
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"


# ---------------------------------------------------------
# MODELS
# ---------------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
