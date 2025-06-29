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
