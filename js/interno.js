const nome = localStorage.getItem("usuarioNome");

if (nome) {
  document.getElementById("welcome").textContent = `Olá, ${nome}`;
  document.getElementById("name-user-perfil").textContent = nome;
}


const openBtn = document.getElementById("open-menu-mobile");
const closeBtn = document.getElementById("close-menu-mobile");
const menu = document.querySelector(".menu-option-mobile");

// Abre o menu
openBtn.addEventListener("click", () => {
  menu.classList.add("show");
});

// Fecha o menu
closeBtn.addEventListener("click", () => {
  menu.classList.remove("show");
});