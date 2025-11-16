// animação tela de login
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-login");
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.add("active-login");
  });

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.remove("active-login");
  });
});

//Salvando nome
const registerForm = document.querySelector(".form-box.register form");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeUser = document.getElementById("nameUser").value;

  localStorage.setItem("usuarioNome", nomeUser);

  window.location.href = "dashboard.html";
});

const loginForm = document.querySelector(".form-box.login form");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  window.location.href = "dashboard.html";
});
