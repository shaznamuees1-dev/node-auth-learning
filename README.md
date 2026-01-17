# Node Authentication Learning (Day 31–35)

This repository contains backend authentication learning using Node.js and Express.

## Covered Topics
- Day 31: Basic login authentication
- Day 32: Password hashing with bcrypt
- Day 33: JWT authentication
- Day 34: Protected routes & middleware
- Day 35: Role-based access control

## Tech Stack
- Node.js
- Express
- CORS
- bcrypt
- JWT

This project is part of my 90-day full-stack learning plan.

//Day 31-	Login basics (email + password)
//Day 32-Express + JWT
//Day33-Role-based authorization

//Day 34 = Protected Routes + Middleware Refinement
      //How real apps protect routes
      //How to reuse middleware properly
      //Difference between public, private, and admin-only routes
      //Cleaner backend structure (without over-engineering)

//DAY 35 – Authentication Flow Wrap-up & Real-World Readiness      
      //Authentication fundamentals (Login → Token → Protected routes)


  # Node Authentication Basics (Day 31–35)

This project demonstrates a complete authentication flow using
Node.js, Express, JWT, and role-based authorization.

---

## 🔐 Full Authentication Flow

### 1️⃣ Login
- User submits email and password
- Frontend sends `POST /login`
- Backend validates credentials
- Backend generates and returns a JWT
- Frontend stores token in `localStorage`

---

### 2️⃣ Access Protected Routes
- Frontend sends requests with header:Authorization: Bearer <token>
- `verifyToken` middleware runs:
- Validates JWT
- Decodes user data
- Attaches user to `req.user`
- Protected route executes

---

### 3️⃣ Role-Based Access (Admin)
- `verifyToken` runs first
- `adminOnly` middleware checks role
- Non-admin users receive `403 Forbidden`
- Admin users are allowed access

---

## 🧩 Route Types

| Route | Access |
|---|---|
| `/login` | Public |
| `/public` | Public |
| `/dashboard` | Logged-in users |
| `/admin` | Admin only |

---

## 🛠 Tech Stack
- Node.js
- Express
- JSON Web Tokens (JWT)
- CORS
- Vanilla JS (frontend)

---

## 📌 Learning Outcome
This mirrors real-world authentication used in production applications.
