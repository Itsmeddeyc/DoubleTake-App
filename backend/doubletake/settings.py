from pathlib import Path
import os
import dj_database_url


# ---------------------------------------------------------
# Correct BASE_DIR: go up THREE levels to reach doubletake-app/
# backend/doubletake/settings.py → parent.parent.parent
# ---------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# ---------------------------------------------------------
# BASIC SETTINGS
# ---------------------------------------------------------
SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
DEBUG = os.environ.get("DEBUG", "True") == "True"

# ALLOWED_HOSTS - handle both comma-separated string and list
allowed_hosts_env = os.environ.get("ALLOWED_HOSTS", "")
if allowed_hosts_env:
    ALLOWED_HOSTS = [host.strip() for host in allowed_hosts_env.split(",") if host.strip()]
else:
    # On Heroku, allow all hosts (Heroku handles routing)
    # In development, restrict to localhost
    ALLOWED_HOSTS = ["*"]


# ---------------------------------------------------------
# INSTALLED APPS
# ---------------------------------------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'frontend',  # your React-serving Django app
]


# ---------------------------------------------------------
# MIDDLEWARE
# ---------------------------------------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# ---------------------------------------------------------
# URLS + WSGI
# ---------------------------------------------------------
ROOT_URLCONF = 'doubletake.urls'
WSGI_APPLICATION = 'doubletake.wsgi.application'


# ---------------------------------------------------------
# TEMPLATES (your version broke – this restores Django defaults)
# ---------------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # you are NOT using Django templates for the frontend
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------
DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600
    )
}


# ---------------------------------------------------------
# PASSWORD VALIDATION
# ---------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ---------------------------------------------------------
# INTERNATIONALIZATION
# ---------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ---------------------------------------------------------
# STATIC FILES – Vite build output lives in: frontend/build/
# ---------------------------------------------------------

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "frontend" / "build",  # <-- correct location
]

STATIC_ROOT = BASE_DIR / "staticfiles"

# WhiteNoise storage for static files
# Using CompressedStaticFilesStorage (not Manifest) since Vite handles its own manifest
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'


# ---------------------------------------------------------
# DEFAULT MODEL FIELD TYPE
# ---------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
