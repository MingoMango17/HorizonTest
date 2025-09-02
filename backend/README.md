# Django Multi-App Project

## Prerequisites

## Features

- **Custom Authentication System** (`custom_auth` app)
- **Task Management** (`task` app) with API endpoints
- **Django REST Framework** integration with serializers
- **Database migrations** with initial data setup
- **Admin interface** for all apps

- Python 3.8 or higher
- pip package manager

## Installation

### 1. Navigate to Backend Directory
```bash
cd BACKEND
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Database Setup
Run the database migrations to set up your database schema:
```bash
python manage.py migrate
```

### 6. Create Superuser (Optional)
To create your own admin user:
```bash
python manage.py createsuperuser
```

## Running the Application

Start the development server:
```bash
python manage.py runserver
```

The application will be available at: `http://127.0.0.1:8000/`

## Default Accounts

For testing purposes, the following accounts are pre-configured:

### Admin Account
- **Username:** `admin`
- **Password:** `admin`
- **Access:** Full admin privileges at `/admin/`

### Test User Account
- **Username:** `testuser`
- **Password:** `testpass123`
- **Access:** Standard user account

## Project Structure

```
BACKEND/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── .gitignore
├── venv/
├── central/                    # Main Django project
│   ├── __pycache__/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── custom_auth/               # Custom authentication app
│   ├── __pycache__/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
└── task/                      # Task management app
    ├── __pycache__/
    ├── migrations/
    │   ├── __pycache__/
    │   ├── __init__.py
    │   ├── 0001_initial.py
    │   └── 0002_add_test_data.py
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── tests.py
    ├── urls.py
    └── views.py
```

## Common Commands

The project includes REST API endpoints through Django REST Framework:

### Task App API
- Task management endpoints available in the `task` app
- Serializers defined in `task/serializers.py`
- API views in `task/views.py`

### Custom Authentication
- Custom authentication logic in `custom_auth` app
- User management and authentication views

## Apps Overview

### `central` - Main Project Configuration
- Main Django project settings
- URL routing configuration
- WSGI/ASGI configuration

### `custom_auth` - Authentication System  
- Custom user authentication
- Authentication-related URLs

### `task` - Task Management
- Task models and business logic
- REST API serializers
- Task-related views and endpoints
- Migrations with test data setup

| Command | Description |
|---------|-------------|
| `python manage.py runserver` | Start development server |
| `python manage.py migrate` | Apply database migrations |
| `python manage.py makemigrations` | Create new migrations |
| `python manage.py collectstatic` | Collect static files |
| `python manage.py test` | Run tests |

## Troubleshooting

### Common Issues

**Virtual environment not found:**
- Ensure you've activated the virtual environment before running commands

**Migration errors:**
- Try `python manage.py makemigrations` then `python manage.py migrate`

**Port already in use:**
- Use a different port: `python manage.py runserver 8080`

## License

This project is licensed under the MIT License - see the LICENSE file for details.