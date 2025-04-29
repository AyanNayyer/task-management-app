# Task Manager 😉

A modern, full-stack task management application built with **React** (frontend) and **Flask + SQLAlchemy** (backend).  
Users can register, log in, and manage their personal tasks with priorities, completion status, and filtering.

---

## ✨ Features

- **User Authentication:** Register and log in securely with JWT.
- **Task CRUD:** Add, view, complete, and delete tasks.
- **Priority Levels:** Set task priority (Low, Medium, High).
- **Status Filtering:** Filter tasks by All, Active, or Completed.
- **Responsive UI:** Clean, modern, and mobile-friendly interface.
- **Persistent Storage:** All data stored in a SQL database (SQLite by default).
- **CORS Support:** Seamless frontend-backend integration on localhost.

---

## 📦 Tech Stack

- **Frontend:** React, React Router, React Query, Axios
- **Backend:** Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-CORS, Flask-Bcrypt
- **Database:** SQLite (easy to swap for PostgreSQL/MySQL)
- **Other:** Python-dotenv, modern CSS

---

## 🚀 Quick Start

### 1. **Clone the Repository**

### 2. **Backend Setup**

```
cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```


#### **Create a `.env` file in `backend/`:**

```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:///tasks.db
```


#### **Seed the database (optional but recommended):**

```python seed.py```


#### **Run the backend:**

```python app.py```


- The backend will be available at `http://127.0.0.1:5000`

---

### 3. **Frontend Setup**

```
cd ../frontend
npm install
npm run dev
```


- The frontend will run on `http://localhost:5173` (or another available port).

---

### 4. **Login with Seed Users**

- **alice@example.com** / `password123`
- **bob@example.com** / `password123`

Or, register a new account!

---


---

## 🛠️ Configuration & Environment

- **Database:** Uses SQLite by default.  
  To use PostgreSQL or MySQL, change `DATABASE_URL` in `.env`.
- **CORS:** Configured for local development; see `app.py` for details.
- **JWT:** Secret keys set in `.env`.

---

## 📋 Database Schema

- **User:** `id`, `email`, `password`
- **Task:** `id`, `title`, `description`, `status`, `priority`, `created_at`, `user_id`

---

## 🧪 Seed Data

The backend includes a `seed.py` script to load test users and tasks for demo and testing.

---

## 💡 How to Use

1. Register or log in.
2. Add tasks with title, description, and priority.
3. Mark tasks as complete/incomplete using the checkbox.
4. Delete tasks you no longer need.
5. Filter tasks by All, Active, or Completed.

---


