const loginForm = document.getElementById("login");
const logoutForm = document.getElementById("logout");
const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");
const welcomeMsg = document.getElementById("welcomeMsg");

const signupForm = document.getElementById("signup");
const signUpUser = document.getElementById("signUpUser");
const signUpPass = document.getElementById("signUpPass");

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

logoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch ("/api/logout", {
    method: "POST"
  });

  location.reload();
})

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: signUpUser.value,
      pass: signUpPass.value
    })
  });
  const data = await res.json();

  welcomeMsg.innerHTML = `Tack för att du registrerat dig, ${data.user}!`;
})

const isLoggedIn = async () => {
  const res = await fetch("/api/loggedin");
  const data = await res.json();

  if (data.user) {
    welcomeMsg.innerText = `Welcome ${data.user}`;
    loginForm.hidden = true;
    signupForm.hidden = true;
  } else {
    logoutForm.hidden = true;
  }
}

isLoggedIn();