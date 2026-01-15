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

  message.innerText = data.message;
});


/* To test this code:
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

