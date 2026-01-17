const form = document.getElementById("loginForm");
const message = document.getElementById("message");

const API = "http://localhost:3000";

// LOGIN FORM
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
     
  } else {
    message.innerText = "Login failed";
  }
});

// DASHBOARD (any logged-in user)
async function loadDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/dashboard`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  console.log("Dashboard:", data);
}

// ADMIN (admin only – optional button later)
async function loadAdmin() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/admin`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) {
    const text = await res.text();
    alert(text);
    return;
  }

  const data = await res.json();
  console.log("Admin:", data);
}

// PUBLIC (no login)
async function loadPublic() {
  const res = await fetch(`${API}/public`);
  const data = await res.json();
  console.log("Public:", data);
}
