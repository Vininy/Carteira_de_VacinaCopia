document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        alert("Usuário não está logado. Redirecionando para o login...");
        window.location.href = 'login.html';
        return;
    }

    // 1. VACINAS APLICADAS
    const vacinas = usuarioLogado.vacinasTomadas || [];
    const vacinasAplicadas = vacinas.length;

    // 2. AGENDAMENTOS
    // Exemplo: cria estrutura padrão se não existir
    const agendamentos = usuarioLogado.agendamentos || [];

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Normaliza para comparar só datas

    // Próximos Agendamentos: data futura e ainda não aplicada
    const proximosAgendamentos = agendamentos.filter(ag => {
        const dataAgendamento = new Date(ag.data);
        dataAgendamento.setHours(0, 0, 0, 0);
        return dataAgendamento >= hoje && ag.aplicada === false;
    }).length;

    // Vacinas Atrasadas: data passada e não aplicada
    const vacinasAtrasadas = agendamentos.filter(ag => {
        const dataAgendamento = new Date(ag.data);
        dataAgendamento.setHours(0, 0, 0, 0);
        return dataAgendamento < hoje && ag.aplicada === false;
    }).length;

    // 3. Atualiza os números nos cards do HTML
    document.querySelector('.dashboard-card.blue-border .card-number').textContent = vacinasAplicadas;
    document.querySelector('.dashboard-card.green-border .card-number').textContent = proximosAgendamentos;
    document.querySelector('.dashboard-card.red-border .card-number').textContent = vacinasAtrasadas;
});
