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


