const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

   if (data.token) {
    localStorage.setItem("token", data.token);
    message.innerText = "Login successful!";
    loadDashboard();
  } else {
    message.innerText = "Login failed";
  }
});

async function loadDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log("Dashboard:", data);
};


/* To test this code: Day31
Test in browser console AGAIN

paste this (DevTools Console):

fetch("http://localhost:3000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@test.com",
    password: "1234"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err)); */

// Day32-Authentication Flow (JWT Basics + Protected Routes)
/* Token Generation-Server gives a token after login
Day32:
✔ JWT creation
✔ Token-based login
✔ Middleware
✔ Protected backend routes
✔ Real frontend → backend auth flow */