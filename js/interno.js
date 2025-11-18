const openBtn = document.getElementById("open-menu-mobile");
const closeBtn = document.getElementById("close-menu-mobile");
const menu = document.querySelector(".menu-option-mobile");

if (openBtn && closeBtn && menu) {
  openBtn.addEventListener("click", () => {
    menu.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    menu.classList.remove("show");
  });
}

const nome = localStorage.getItem("usuarioNome");

const welcome = document.getElementById("welcome");
const perfilName = document.getElementById("name-user-perfil");

if (nome && welcome) {
  welcome.textContent = `Olá, ${nome}`;
}

if (nome && perfilName) {
  perfilName.textContent = nome;
}