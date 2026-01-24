# Node Authentication Learning (Day 31–35)
# Day31-Day40 - AUTH CHAPTER 

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

Response:

{ "message": "User registered successfully" }

❌ Duplicate Registration

Status: 409 Conflict

{ "message": "User already exists" }

✅ Login Registered User
POST /auth/login
{
  "email": "newuser@test.com",
  "password": "1234"
}
Response:

{ "token": "<JWT_TOKEN>" }
🔒 Protected Route Access
Valid token required

Role-based restrictions enforced

Non-admin users receive 403 Forbidden

```
### Learning Outcome
MongoDB-backed authentication

Secure password storage

Real-world registration flow

Proper HTTP status usage

JWT-based session handling

---

## 📘 Day 40 – Production-Ready Authentication

### What Was Built
- User registration with hashed passwords
- Secure login using JWT
- MongoDB persistence via Mongoose
- Role-based authorization (admin vs user)
- Centralized error handling
- Clean project structure (routes, models)

### API Endpoints
| Method | Route | Access |
|------|------|-------|
| POST | /auth/register | Public |
| POST | /auth/login | Public |
| GET | /public | Public |
| GET | /dashboard | Authenticated users |
| GET | /admin | Admin only |

### Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Role-based route protection
- Proper HTTP status codes (401, 403, 409)

### Testing Summary
- Invalid credentials rejected
- Duplicate users blocked
- Tokens required for protected routes
- Admin-only routes enforced
- MongoDB used instead of in-memory data

 ## 🧪 Testing the Authentication Flow

Use the **Browser DevTools Console** (or Postman) to run the following tests.
These confirm validation, authentication, authorization, and role-based access.

---

### 🧪 TEST 1 — Missing Fields (Validation)

📍 **Where**: Browser Console  
📍 **Why**: Test backend validation

```js
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "" })
})
.then(res => res.json())
.then(data => console.log(data));

✅ Expected

{
  "success": false,
  "message": "Email and password are required"
}


✔ Confirms: request validation works

🧪 TEST 2 — Wrong Password
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@test.com",
    password: "wrongpass"
  })
})
.then(res => res.json())
.then(data => console.log(data));


✅ Expected

{
  "success": false,
  "message": "Invalid email or password"
}


✔ Confirms: password hashing & comparison works

🧪 TEST 3 — Protected Route WITHOUT Token
fetch("http://localhost:3000/dashboard")
.then(res => res.text())
.then(data => console.log(data));


✅ Expected

Forbidden


✔ Confirms: JWT protection is enforced

🧪 TEST 4 — Valid Login (MOST IMPORTANT)
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@test.com",
    password: "1234"
  })
})
.then(res => res.json())
.then(data => {
  console.log(data);
  localStorage.setItem("token", data.token);
});


✅ Expected

Token printed in console

Token stored in localStorage

✔ Confirms: login + JWT generation works

🧪 TEST 5 — Dashboard WITH Token
fetch("http://localhost:3000/dashboard", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
})
.then(res => res.json())
.then(data => console.log(data));


✅ Expected

{
  "message": "User dashboard",
  "user": {
    "email": "admin@test.com",
    "role": "admin",
    "iat": "...",
    "exp": "..."
  }
}


✔ Confirms: token decoding & middleware execution

🧪 TEST 6 — Admin Route (Role Check)
fetch("http://localhost:3000/admin", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
})
.then(res => res.json())
.then(data => console.log(data));


✅ Expected

{
  "message": "Admin dashboard"
}


✔ Confirms: role-based authorization works

🧪 TEST 7 — Register New User
fetch("http://localhost:3000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "newuser@test.com",
    password: "1234"
  })
})
.then(res => res.json())
.then(data => console.log(data));


✅ Expected

{ "message": "User registered successfully" }


✔ Confirms: user registration works

🧪 TEST 8 — Duplicate Registration

Run TEST 7 again with the same email.

✅ Expected

{ "message": "User already exists" }


✔ Confirms: unique email constraint enforced

🧪 TEST 9 — Non-Admin Access to Admin Route
1️⃣ Login as normal user
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "newuser@test.com",
    password: "1234"
  })
})
.then(res => res.json())
.then(data => {
  localStorage.setItem("token", data.token);
});

2️⃣ Try admin route
fetch("http://localhost:3000/admin", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
})
.then(res => res.text())
.then(data => console.log(data));


✅ Expected

Admins only


✔ Confirms: role-based access restriction works

🔁 Important Testing Note

MongoDB persists data across server restarts.
If a user already exists, registration correctly returns 409 Conflict.
Use a new email or delete the user from MongoDB Atlas to re-test registration.

### Outcome
This setup mirrors **real-world production authentication systems**
used in modern web applications.
```
## 📘 Day 41 — Security & Sessions  
### Refresh Tokens & Session Management

Day 41 focuses on improving authentication security and user experience
by introducing **refresh tokens**.

Until now, the application used only access tokens (JWT),
which require users to log in again after expiration.
This is not ideal for real-world applications.

---

## 🔐 Why Refresh Tokens Are Needed

Problems with access-token-only authentication:
- Users are logged out frequently
- Long-lived tokens increase security risk
- Token theft gives full access until expiry

**Solution:**  
👉 Use **two-token authentication**

### Why Refresh Tokens?
- Access tokens are short-lived for security
- Refresh tokens allow users to stay logged in
- Prevent frequent re-login

---

## 🔑 Token Types

| Token | Purpose | Lifetime |
|------|--------|----------|
| Access Token | Access protected APIs | Short (minutes–1 hour) |
| Refresh Token | Generate new access tokens | Long (days/weeks) |

---

## 🔄 Authentication Flow

### 1️⃣ Login
- User logs in with email & password
- Server returns:
  - **Access Token** → short expiry (1 hour)
  - **Refresh Token** → long expiry (7 days)

### 2️⃣ Access Protected Routes
- Frontend sends access token in `Authorization` header
- Backend verifies token using middleware

### 3️⃣ Token Expiry
- When access token expires:
  - Frontend sends refresh token to `/auth/refresh`
  - Backend validates refresh token
  - New access token is issued
  - User remains logged in without re-authentication

---

## 🛠 Backend Changes

- Refresh tokens introduced at the API level
- Tokens are **not persisted yet**
- Tokens are handled in-memory for learning purposes
- Added `/auth/refresh` endpoint
- Improved session-style authentication flow

> 🔒 Secure storage, rotation, and revocation will be implemented in later days

---

## 📂 Files Modified / Added

- `routes/auth.js`
- `index.js`
- `models/User.js`

---

## 🌍 Real-World Note

Production systems store refresh tokens securely using:
- HTTP-only cookies
- Database storage
- Token rotation & revocation strategies

---

## ✅ Learning Outcome

✔ Understand secure session management  
✔ Implement refresh-token-based authentication  
✔ Match real-world production auth flows  
✔ Prepare system for logout & token revocation  
---
## 📘 Day 42 — Refresh Tokens, Logout & Token Utilities

Day 42 extends authentication to a **production-grade session model**
by introducing **refresh tokens**, **logout**, and **token utilities**.

---

## 🔐 What Was Implemented

- Access token + refresh token authentication
- Refresh tokens stored securely in the database
- Logout functionality (refresh token invalidation)
- Centralized token generation using utility functions
- Improved session handling without forcing re-login

---

## 🧠 Key Concepts

| Concept | Purpose |
|------|--------|
| Access Token | Short-lived token for API access |
| Refresh Token | Long-lived token to renew access |
| Token Rotation | Prevents long-term token abuse |
| Logout | Revokes refresh token |

---

## 📂 Files Added / Updated

- `models/User.js` → stores refresh token
- `routes/auth.js` → register, login, refresh, logout
- `utils/token.js` → token helper functions
- `index.js` → clean app initialization

---

## 🧪 Testing (Browser Console)

### 1️⃣ Register User
```js
fetch("http://localhost:3000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "day42user@test.com",
    password: "1234"
  })
}).then(res => res.json()).then(console.log);

✅ Expected:

{ "message": "User registered successfully" }

2️⃣ Login (Get Tokens)
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "day42user@test.com",
    password: "1234"
  })
}).then(res => res.json()).then(data => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
});


✅ Expected:

Access token

Refresh token

3️⃣ Access Dashboard
fetch("http://localhost:3000/dashboard", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken")
  }
}).then(res => res.json()).then(console.log);

4️⃣ Refresh Access Token
fetch("http://localhost:3000/auth/refresh", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    refreshToken: localStorage.getItem("refreshToken")
  })
}).then(res => res.json()).then(data => {
  localStorage.setItem("accessToken", data.accessToken);
});

5️⃣ Logout
fetch("http://localhost:3000/auth/logout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    refreshToken: localStorage.getItem("refreshToken")
  })
}).then(res => res.json()).then(console.log);

✅ Learning Outcome

✔ Real-world session handling
✔ Secure refresh token strategy
✔ Logout without server restart
✔ Clean backend architecture
✔ Ready for frontend integration

🔐 Production Note
In real systems:
Refresh tokens are stored in HTTP-only cookies
Token rotation & revocation lists are used
Shorter access token expiry is git addenforced
 
```
## 📘 Day 43 — Security Hardening (Password Policy & Brute-Force Protection)

Day 43 focuses on strengthening authentication security by adding password rules
and brute-force protection. These are **mandatory features in real production systems**.

---

## 🔐 Features Implemented

### 1️⃣ Password Strength Enforcement
- Password must be **at least 8 characters**
- Prevents weak credentials
- Applied during user registration

### 2️⃣ Brute-Force Protection (Rate Limiting)
- Limits login attempts to **5 per 15 minutes**
- Blocks repeated wrong-password attempts
- Protects against credential-stuffing attacks

---

## 🧠 Why the Server Sometimes Didn’t Respond

### Root Cause
Multiple Node.js servers were running at the same time on **port 3000**.

This caused:
- Requests hitting an **old server**
- Code changes not reflecting
- Confusing results in browser console

---

## 🛑 How to Kill Old Servers (IMPORTANT)

### 🔹 Windows (PowerShell)

``` bash 
netstat -ano | findstr :3000
```
You’ll see a PID like:

TCP    127.0.0.1:3000    LISTENING    12345


Kill it:
 ``` bash
taskkill /PID 12345 /F
```
🔹 Quick Kill (All Node Processes)
``` bash
     taskkill /IM node.exe /F

```
Then restart the server:
``` bash
node index.js
```
### 🧪 Testing the Security Features
🧪 Test 1 — Weak Password (Registration)
```js
fetch("http://localhost:3000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "weak_" + Date.now() + "@test.com",
    password: "1234"
  })
})
.then(res => res.json())
.then(console.log);


✅ Expected:

{
  "success": false,
  "message": "Password must be at least 8 characters long"
}


✔ Confirms password policy works

🧪 Test 2 — Strong Password (Registration)
fetch("http://localhost:3000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "strong_" + Date.now() + "@test.com",
    password: "StrongPass123"
  })
})
.then(res => res.json())
.then(console.log);


✅ Expected:

{
  "success": true,
  "message": "User registered successfully"
}


✔ Confirms valid users can register

🧪 Test 3 — Wrong Login Attempt (Repeat 6 Times)
fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@test.com",
    password: "wrongpassword"
  })
})
.then(res => res.json())
.then(console.log);


🔁 Run 5 times → normal error

✅ Expected (first 5 attempts):

{
  "success": false,
  "message": "Invalid email or password"
}

🧪 Test 4 — Brute-Force Lock (6th Attempt)

✅ Expected on 6th attempt:

{
  "success": false,
  "message": "Too many login attempts. Try again later."
}
```
HTTP Status: 429 Too Many Requests
✔ Confirms brute-force protection works

## 🛡️ Security Summary
Feature	Status
Password length enforcement	✅
Duplicate account protection	✅
Login rate limiting	✅
Brute-force attack prevention	✅
Production-style security	✅

### ✅ Learning Outcome

✔ Enforced password policies
✔ Prevented weak credentials
✔ Implemented brute-force protection
✔ Learned to debug server conflicts
✔ Gained real-world backend security experience