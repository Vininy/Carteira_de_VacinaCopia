document.addEventListener('DOMContentLoaded', function () {

        // 1. VACINAS APLICADAS
        const vacinas = usuario.vacinasTomadas || [];
        const vacinasAplicadas = vacinas.length;

        // 2. AGENDAMENTOS
        const agendamentos = usuario.agendamentos || [];

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        // Próximos agendamentos
        const proximosAgendamentos = agendamentos.filter(ag => {
            const dataAgendamento = new Date(ag.data);
            dataAgendamento.setHours(0, 0, 0, 0);
            return dataAgendamento >= hoje && ag.aplicada === false;
        }).length;

        // Vacinas atrasadas
        const vacinasAtrasadas = agendamentos.filter(ag => {
            const dataAgendamento = new Date(ag.data);
            dataAgendamento.setHours(0, 0, 0, 0);
            return dataAgendamento < hoje && ag.aplicada === false;
        }).length;

        // 3. Atualiza os cards
        document.querySelector('.dashboard-card.blue-border .card-number').textContent = vacinasAplicadas;
        document.querySelector('.dashboard-card.green-border .card-number').textContent = proximosAgendamentos;
        document.querySelector('.dashboard-card.red-border .card-number').textContent = vacinasAtrasadas;
    })
    .catch(error => {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro ao carregar informações. Redirecionando para o login...");
        window.location.href = 'login.html';
    });

