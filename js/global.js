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
let currentPath = window.location.pathname;

if (currentPath === "/" || currentPath === "/index.html") {
  currentPath = "/index.html";
}

links.forEach((link) => {
  const linkPath = new URL(link.href).pathname;

  link.classList.remove("active");

  if (currentPath.endsWith(linkPath)) {
    link.classList.add("active");
  }
});

//Abrir sumário
const detailsList = document.querySelectorAll(".summary-culture details");

detailsList.forEach((detail) => {
  detail.addEventListener("toggle", () => {
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

//abrir e fechar opções do quiz
document.querySelectorAll(".label-select").forEach((label) => {
  label.addEventListener("click", () => {
    const options = label.nextElementSibling;
    options.classList.toggle("active");
  });
});

//validação do quiz
document.getElementById("quiz-form").addEventListener("submit", function(event) {
  const perguntas = document.querySelectorAll("fieldset");
  const alertBox = document.getElementById("form-alert");
  let valido = true;

  perguntas.forEach(pergunta => {
    const checkboxes = pergunta.querySelectorAll('input[type="checkbox"]');
    const radios = pergunta.querySelectorAll('input[type="radio"]');
    const textarea = pergunta.querySelector('textarea');

    // Validação dos checkboxes
    if (checkboxes.length > 0) {
      const algumMarcado = Array.from(checkboxes).some(input => input.checked);
      if (!algumMarcado) valido = false;
    }

    // Validação dos radios
    if (radios.length > 0) {
      const algumMarcado = Array.from(radios).some(input => input.checked);
      if (!algumMarcado) valido = false;
    }

    // Validação do textarea
    if (textarea && textarea.value.trim() === "") {
      valido = false;
    }
  });

  if (!valido) {
    event.preventDefault();
    alertBox.textContent = "Por favor, responda todas as perguntas antes de enviar.";
    alertBox.classList.add("show");

    // Remove a mensagem após 4 segundos
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 4000);
  } else {
    // exibir uma mensagem de sucesso
    alertBox.textContent = "Enviado com sucesso!";
    alertBox.style.backgroundColor = "#e6ffe6";
    alertBox.style.color = "#006600";
    alertBox.style.borderColor = "#66cc66";
    alertBox.classList.add("show");
  }
});
