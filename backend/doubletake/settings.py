from pathlib import Path
import os

# ---------------------------------------------------------
# Correct BASE_DIR: go up THREE levels to reach doubletake-app/
# backend/doubletake/settings.py → parent.parent.parent
# ---------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# ---------------------------------------------------------
# BASIC SETTINGS
# ---------------------------------------------------------
SECRET_KEY = 'django-insecure-zb2ja)t9p0f$z13=c29t-psa=t06d9g#)qyk_ghs*3jb1+vh^9'
DEBUG = True
ALLOWED_HOSTS = []


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
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
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


# ---------------------------------------------------------
# DEFAULT MODEL FIELD TYPE
# ---------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
