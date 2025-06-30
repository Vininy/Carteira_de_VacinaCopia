document.addEventListener("DOMContentLoaded", async () => {
  await carregarVacinas();
});

function gerarCabecalhos(vacinas) {
  const headerRow = document.getElementById("table-headers");
  if (!headerRow) return;
  headerRow.innerHTML = "";
  if (!vacinas || vacinas.length === 0) return;
  const allKeys = new Set();
  vacinas.forEach(vacina => Object.keys(vacina).forEach(key => allKeys.add(key)));
  allKeys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    headerRow.appendChild(th);
  });
  if (allKeys.has("aplicada")) {
    const th = document.createElement("th");
    th.textContent = "Status";
    headerRow.appendChild(th);
  }
}

function atualizarTabelaVacinas(vacinas) {
  gerarCabecalhos(vacinas);
  const tbody = document.getElementById("vacina-table");
  if (!tbody) return;
  tbody.innerHTML = "";
  const headerRow = document.getElementById("table-headers");
  const colunas = Array.from(headerRow.children).map(th => th.textContent.toLowerCase());
  vacinas.forEach((vacina) => {
    const tr = document.createElement("tr");
    tr.dataset.status = vacina.aplicada ? "complete" : "pending";
    tr.dataset.next = vacina.proximaDose ? "true" : "false";
    colunas.forEach((coluna) => {
      if (coluna === "status") return;
      const valor = vacina[coluna] ?? "-";
      const td = document.createElement("td");
      if (typeof valor === "string" && valor.match(/^\d{4}-\d{2}-\d{2}/)) {
        td.textContent = new Date(valor).toLocaleDateString("pt-BR");
      } else if (typeof valor === "boolean") {
        td.textContent = valor ? "Sim" : "Não";
      } else {
        td.textContent = valor;
      }
      tr.appendChild(td);
    });
    if ("aplicada" in vacina) {
      const td = document.createElement("td");
      td.innerHTML = `
        <div class="status ${vacina.aplicada ? "status-completa" : "status-pendente"}">
          <div class="dot"></div>
          <span>${vacina.aplicada ? "Completa" : "Pendente"}</span>
        </div>
      `;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  atualizarContadores(vacinas);
  atualizarProgresso(vacinas);
}

function atualizarContadores(vacinas) {
  document.getElementById("count-all").textContent = vacinas.length;
  document.getElementById("count-applied").textContent = vacinas.filter(vacina => vacina.aplicada).length;
  document.getElementById("count-pending").textContent = vacinas.filter(vacina => !vacina.aplicada).length;
  document.getElementById("count-next").textContent = vacinas.filter(vacina => vacina.proximaDose).length;
}

function atualizarProgresso(vacinas) {
  const totalVacinas = vacinas.length;
  const aplicadas = vacinas.filter(vacina => vacina.aplicada).length;
  const progresso = totalVacinas ? (aplicadas / totalVacinas) * 100 : 0;
  document.getElementById("progress-percentage").textContent = `${Math.round(progresso)}%`;
  document.getElementById("progress-bar").style.width = `${progresso}%`;
}

async function carregarVacinas() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado!");
      window.location.href = "login.html";
      return;
    }
    const response = await fetch("https://carteira-de-vacina.onrender.com/api/vacinas", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar vacinas");
    }
    const vacinas = await response.json();
    atualizarTabelaVacinas(vacinas);
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar as vacinas.");
    window.location.href = "login.html";
  }
}