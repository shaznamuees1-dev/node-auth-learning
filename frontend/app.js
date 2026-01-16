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

  const res = await fetch("http://localhost:3000/admin", {
    headers: {
      Authorization:  "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();
  console.log("Dashboard:", data);
};

async function login(email, password) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  console.log("Token saved for",email);
}

async function getAdmin() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/admin", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) {
    const text = await res.text(); // handle non-JSON
    console.error("Admin access failed:", text);
    alert(text);
    return;
  }

  const data = await res.json();
  console.log(data);
}

 //Fetch + localStorage