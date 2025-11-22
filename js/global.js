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
document
  .getElementById("quiz-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const alertBox = document.getElementById("form-alert");

    // 1. Capturar dados do formulário
    function getCheckedValues(name) {
      return Array.from(
        document.querySelectorAll(`input[name="${name}"]:checked`)
      ).map((input) => input.value);
    }

    const payload = {
      motivacao: getCheckedValues("motivacao"),
      perfil_trabalho: getCheckedValues("perfil_trabalho"),
      areas: getCheckedValues("areas"),
      habilidades: getCheckedValues("habilidades"),
      impacto: getCheckedValues("impacto"),
      mudancas: getCheckedValues("mudancas"),
      futuro: getCheckedValues("futuro"),
      aprender_novo: document
        .querySelector('textarea[name="aprender_novo"]')
        .value.trim(),
      valores: getCheckedValues("valores"),
      aprendizado: getCheckedValues("aprendizado"),
    };

    // 2. Validação
    const perguntas = document.querySelectorAll("fieldset");
    let valido = true;

    perguntas.forEach((pergunta) => {
      const checkboxes = pergunta.querySelectorAll('input[type="checkbox"]');
      const textarea = pergunta.querySelector("textarea");

      if (checkboxes.length > 0) {
        if (!Array.from(checkboxes).some((c) => c.checked)) valido = false;
      }

      if (textarea && textarea.value.trim() === "") valido = false;
    });

    if (!valido) {
      alertBox.textContent =
        "Por favor, responda todas as perguntas antes de enviar.";
      alertBox.classList.add("show");
      return;
    }

    // 3. Chamada ao back-end
    alertBox.textContent = "Enviando suas respostas...";
    alertBox.classList.add("show");

    try {
      const response = await fetch("https://quiz-eleven.onrender.com/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Status da resposta:", response.status);

      const rawResult = await response.json();
      console.log("Conteúdo do rawResult:", rawResult);

      // ✅ Extrair JSON de dentro de raw_text
      let data;
      try {
        const cleaned = rawResult.raw_text.replace(/```json|```/g, "").trim();
        data = JSON.parse(cleaned);
      } catch (err) {
        console.error("Erro ao interpretar raw_text:", err);
        document.getElementById("quiz-result-content").innerHTML =
          "<p>Não foi possível gerar recomendações.</p>";
        return;
      }

      renderQuizResult(data);

      alertBox.textContent = "Resultado gerado com sucesso.";
      alertBox.classList.add("show");
    } catch (err) {
      console.error("Erro no fetch:", err);
      alertBox.textContent = "Erro de comunicação com o servidor.";
      alertBox.classList.add("show");
    }
  });

function renderQuizResult(data) {
  const section = document.getElementById("quiz-result");
  const content = document.getElementById("quiz-result-content");
  const summary = document.getElementById("short-summary");

  section.style.display = "block";
  content.innerHTML = "";
  summary.textContent = data.short_summary || "";

  if (!data.tracks || data.tracks.length === 0) {
    content.innerHTML = "<p>Não foi possível gerar recomendações.</p>";
    return;
  }

  data.tracks.forEach((track) => {
    const card = document.createElement("div");
    card.className = "track-card";

    card.innerHTML = `
      <div class="track-header">
        <h3 class="track-name">${track.name}</h3>
        <span class="match-score">${Math.round(track.match_score * 100)}%</span>
      </div>

      <p class="track-summary">${track.summary}</p>

      <p class="track-reason"><strong>Por que você combina:</strong> ${
        track.reason
      }</p>

      <p class="track-steps-title">Primeiros passos:</p>
      <ul class="track-steps">
        ${track.first_steps.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    `;

    content.appendChild(card);
  });
}

//validação form de contato
document
  .getElementById("form-contact")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const nome = form.name;
    const email = form.email;
    const assunto = form.assunto;
    const successMsg = document.getElementById("form-alert");

    let valido = true;

    form
      .querySelectorAll(".error-message")
      .forEach((msg) => (msg.textContent = ""));

    if (nome.value.trim().length < 2) {
      nome.nextElementSibling.textContent =
        "Por favor, insira seu nome completo.";
      valido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
      email.nextElementSibling.textContent = "Digite um e-mail válido.";
      valido = false;
    }

    if (assunto.value.trim() === "") {
      assunto.nextElementSibling.textContent =
        "Por favor, escreva uma mensagem.";
      valido = false;
    }
  });
