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
