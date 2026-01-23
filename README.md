# Node Authentication Learning (Day 31–35)

This repository demonstrates backend authentication using Node.js and Express.
It is part of my **90-day full-stack learning plan**.

---

## 📚 Covered Topics

- **Day 31**: Basic login authentication (email & password)
- **Day 32**: Password hashing with bcrypt
- **Day 33**: JWT authentication
- **Day 34**: Protected routes & middleware
- **Day 35**: Role-based access control & authentication flow recap

---

## 🛠 Tech Stack

- Node.js
- Express
- JSON Web Tokens (JWT)
- bcrypt
- CORS
- Vanilla JavaScript (frontend)

---

## 🔐 Full Authentication Flow

### 1️⃣ Login
- User submits email and password
- Frontend sends `POST /login`
- Backend validates credentials
- Backend generates a JWT
- Frontend stores token in `localStorage`

---

### 2️⃣ Access Protected Routes
Protected routes require the token in the request header:  
`Authorization: Bearer <token>`
Flow:
- `verifyToken` middleware validates JWT
- Decodes user info
- Attaches data to `req.user`
- Route executes

---

### 3️⃣ Role-Based Access (Admin)
- `verifyToken` runs first
- `adminOnly` middleware checks user role
- Non-admin users receive `403 Forbidden`
- Admin users are allowed access

---

## 🧩 Route Access Summary

| Route | Access |
|------|-------|
| `/login` | Public |
| `/public` | Public |
| `/dashboard` | Logged-in users |
| `/admin` | Admin only |

---

## ✅ Learning Outcome

This project mirrors real-world authentication used in production applications,
including token-based security and role-based authorization.

## 🧪 Testing the Authentication Flow

Follow these steps to test all authentication scenarios.

---

### 1️⃣ Start the Backend Server

```bash
cd backend
node index.js


Server should run at:
http://localhost:3000

2️⃣ Open the Frontend

Open frontend/index.html using Live Server or directly in the browser.

✅ Test Cases
1.🔓 Public Route (No Login Required)

     Action (Browser Console):

          loadPublic();


      Expected Result:

    {
   "message": "Public content – no login required"
   }

2.👤 User Login (Non-Admin)
   Credentials
    Email: user@test.com
    Password: 1234

    Expected

        ✅ Login success message

        ✅ Token stored in localStorage

        ✅ Access to /dashboard

        ❌ Access to /admin → 403 Forbidden

Test
   loadDashboard(); // ✅ works
   loadAdmin();     // ❌ 403 Forbidden

3.👑 Admin Login
   Credentials
    Email: admin@test.com
    Password: 1234  

   Expected

    ✅ Login success message

    ✅ Token stored in localStorage

    ✅ Access to /dashboard

    ✅ Access to /admin

Test
   loadDashboard(); // ✅ works
   loadAdmin();     // ✅ works
    
###  🔁 Switching Users (Important)

Before testing a different role, clear the old token:

     localStorage.clear();
Then log in again with new credentials.

4.🚫 Invalid Login Test
   Credentials
    Email: wrong@test.com
    Password: 1234


  Expected Result

    {
    "message": "Invalid credentials"
    }   

🔐 Security Notes

Protected routes require a valid JWT

Role-based middleware blocks unauthorized access

Proper HTTP status codes are used (401, 403)

✅ Learning Outcome

✔ Token-based authentication
✔ Middleware-based route protection
✔ Role-based authorization
✔ Production-style authentication flow
-----
```
# 🗄️ Database Fundamentals – MongoDB (Day 36)


### Why Databases
- In-memory arrays reset on server restart
- Databases persist data
- Required for real-world apps

### MongoDB Concepts
- Database → Collection → Document → Field
- JSON-based structure
- Flexible schema

### SQL vs NoSQL
- MongoDB chosen for Node.js compatibility

### Setup
- MongoDB Atlas account created
- Free cluster (M0)
- Connection planned for Day 37

## 📘 Day 36 – MongoDB Basics & Atlas Setup

- Learned why databases are required for persistence
- Understood MongoDB concepts (Database, Collection, Document)
- Compared SQL vs NoSQL
- Created MongoDB Atlas account
- Created free M0 cluster
- Learned Atlas structure (Organization → Project → Cluster)

### 📘 Day 37 – MongoDB Integration
- Installed and configured Mongoose
- Connected MongoDB Atlas to Node.js using Mongoose
- Environment variables handled with dotenv
- Created User schema and model
- Backend now uses persistent storage instead of in-memory arrays(- Verified successful database connection)

## 📘 Day 38 – Project Structure & Auth Refactor

Day 38 focuses on improving backend structure and making the authentication
system closer to real-world production standards.

---

### ✅ What Was Done

- Refactored authentication logic into route files
- Introduced `/routes` and `/models` folders
- Centralized MongoDB connection logic
- Ensured server starts only after database connection
- Improved separation of concerns
- Used environment variables for secrets and configuration

---

### 📂 Backend Structure
backend/
├─ models/
│ └─ User.js
├─ routes/
│ └─ auth.js
├─ index.js
├─ .env (not committed)
├─ package.json


---

### 🔐 Authentication Flow (Updated)

- Login handled via `/auth/login`
- JWT issued on successful login
- Token verified via middleware
- Role-based access enforced for admin routes
- MongoDB used as persistent storage

---

### 🧠 Key Learning

- Clean project structure improves maintainability
- Database connection should block server startup if it fails
- Route separation mirrors real production backends
- Environment variables are mandatory for security
- Authentication logic should never be mixed with UI logic

---

### ✅ Status

Day 38 completed successfully with a clean, scalable backend architecture.

---

## 📘 Day 39 – User Registration & MongoDB Persistence

### What Was Implemented
- User registration endpoint (`POST /auth/register`)
- Password hashing using bcrypt
- MongoDB persistence via Mongoose
- Duplicate user prevention
- Login for registered users with JWT issuance

---

### Registration Flow
1. Client sends email & password to `/auth/register`
2. Backend checks if user already exists
3. Password is hashed using bcrypt
4. User is stored in MongoDB
5. Success or conflict response returned

---

### Login Flow
1. Client sends credentials to `/auth/login`
2. Backend verifies user from MongoDB
3. Password hash is compared
4. JWT token is issued on success

---

### Tested Scenarios

#### ✅ Register New User
```json
POST /auth/register
{
  "email": "newuser@test.com",
  "password": "1234"
}


