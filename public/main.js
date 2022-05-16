const loginForm = document.getElementById("login");
const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");
const welcomeMsg = document.getElementById("welcomeMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: userInput.value,
      pass: passInput.value
    })
  });

  location.reload();

})

const isLoggedIn = async () => {
  const res = await fetch("/api/loggedin");
  const data = await res.json();

  if (data.user) {
    welcomeMsg.innerText = `Welcome ${data.user}`;
    loginForm.hidden = true;
  }
}

isLoggedIn();