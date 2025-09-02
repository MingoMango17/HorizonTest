# Todo List Web Application

A full-stack Todo List application built with Django REST API backend and Next.js frontend, featuring user authentication and responsive design.

## 🚀 Features

- **User Authentication**: Basic login system using Django
- **Todo Management**: Create, read, update, and delete tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Dynamic task management with popup forms
- **RESTful API**: Django REST Framework backend
- **Modern UI**: Next.js with TypeScript and TailwindCSS

## 🛠 Tech Stack

### Backend
- **Python** with **Django** framework
- **Django REST Framework** for API endpoints
- **SQLite** database for data storage
- Custom authentication system

### Frontend
- **Next.js** with **TypeScript**
- **React** for UI components
- **TailwindCSS** for styling
- Responsive design principles

## 🚀 Quick Start

### Backend Setup (Django)

1. **Navigate to backend directory**
   ```bash
   cd BACKEND
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On macOS/Linux
   source venv/bin/activate
   
   # On Windows
   venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start Django development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at: `http://localhost:8000`

### Frontend Setup (Next.js)

1. **Navigate to frontend directory**
   ```bash
   cd FRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Frontend will be available at: `http://localhost:3000`

## 🔐 Default Credentials

For testing purposes, use these pre-configured accounts:

### Admin Account
- **Username**: `admin`
- **Password**: `admin`
- **Access**: Full admin privileges at `http://localhost:8000/admin/`

### Test User Account
- **Username**: `testuser`
- **Password**: `testpass123`
- **Access**: Standard user access

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **TypeScript**: Type-safe development
- **Modern React**: Using Next.js 14+ with App Router
- **Popup Forms**: Modal dialogs for task creation/editing
- **Auto-refresh**: Real-time updates without page reload

## ⚙️ Common Commands

### Backend (Django)
| Command | Description |
|---------|-------------|
| `python manage.py runserver` | Start development server |
| `python manage.py migrate` | Apply database migrations |
| `python manage.py makemigrations` | Create new migrations |
| `python manage.py createsuperuser` | Create admin user |
| `python manage.py test` | Run backend tests |

### Frontend (Next.js)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checker |
