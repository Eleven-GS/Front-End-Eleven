//Lógica menu hamburguer
const menuBtn = document.getElementById("menu-hamburguer");
const nav = document.getElementById("nav");
const body = document.body;

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  body.classList.toggle("menu-open");
});

//Marcar página atual
const links = document.querySelectorAll(".header-primary ul li a");
const currentPath = window.location.pathname;

links.forEach((link) => {
  const linkPath = new URL(link.href).pathname;
  if (currentPath === linkPath) {
    link.classList.add("active");
  }
});

//Abrir sumário
const detailsList = document.querySelectorAll('.summary-culture details');

detailsList.forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      // Fecha todos os outros details
      detailsList.forEach((otherDetail) => {
        if (otherDetail !== detail) {
          otherDetail.open = false;
        }
      });
    }
  });
});
