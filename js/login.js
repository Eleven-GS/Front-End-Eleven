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