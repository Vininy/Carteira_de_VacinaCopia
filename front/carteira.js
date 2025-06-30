document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';

  try {
    const res = await fetch('http://localhost:3000/api/minhas-vacinas', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const vacinas = await res.json();

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // limpa conteúdo atual

    vacinas.forEach(vac => {
      const tr = document.createElement('tr');
      const aplicada = vac.aplicada;
      const status = aplicada ? 'complete' : 'pending';
      const statusLabel = aplicada ? 'Completa' : 'Pendente';
      const dotClass = aplicada ? 'status-completa' : 'status-pendente';

      const dataAplic = vac.dataAplicacao ? new Date(vac.dataAplicacao).toLocaleDateString('pt-BR') : '—';

      tr.setAttribute('data-status', status);
      tr.innerHTML = `
        <td>${vac.nome}</td>
        <td>Única</td>
        <td>${dataAplic}</td>
        <td>–</td>
        <td><div class="status ${dotClass}"><div class="dot"></div><span>${statusLabel}</span></div></td>
      `;
      tbody.appendChild(tr);
    });

    // Recalcula os contadores
    updateCounts();
  } catch (err) {
    console.error('Erro ao carregar vacinas:', err);
    alert('Erro ao buscar vacinas. Faça login novamente.');
    window.location.href = 'login.html';
  }
});

function atualizarTabelaVacinas(vacinas) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = ''; // limpa linhas antigas

  vacinas.forEach(vacina => {
    const tr = document.createElement('tr');
    tr.dataset.status = vacina.aplicada ? 'complete' : 'pending';
    tr.dataset.next = 'false'; // ou lógica pra próxima dose

    tr.innerHTML = `
      <td>${vacina.nome}</td>
      <td>--</td> <!-- Dose, você pode adaptar -->
      <td>${vacina.dataAplicacao || '-'}</td>
      <td>--</td> <!-- Próxima dose, adaptar -->
      <td>
        <div class="status ${vacina.aplicada ? 'status-completa' : 'status-pendente'}">
          <div class="dot"></div>
          <span>${vacina.aplicada ? 'Completa' : 'Pendente'}</span>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

