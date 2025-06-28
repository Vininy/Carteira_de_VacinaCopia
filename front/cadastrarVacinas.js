document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const vaccineSections = document.querySelectorAll('.vaccine-section');
    const confirmRegisterButton = document.getElementById('confirmRegisterButton');
    const registerVaccineButtons = document.querySelectorAll('.register-vaccine-button');

    // Funções para gerenciar o estado do usuário e vacinas no localStorage
    function getUsuarioLogado() {
        return JSON.parse(localStorage.getItem('usuarioLogado'));
    }

    function setUsuarioLogado(usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }

    function getAllUsuarios() {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    function setAllUsuarios(usuarios) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Inicializa a exibição das seções e o estado dos botões de vacina
    function initializeVacunasScreen() {
        // Exibe a seção ativa por padrão (18+ anos, usando o novo sufixo)
        showVaccineSection('18-plus');

        // Carrega as vacinas já registradas para o usuário logado
        const usuario = getUsuarioLogado();
        if (usuario && usuario.vacinasTomadas) {
            usuario.vacinasTomadas.forEach(vacinaId => {
                const button = document.querySelector(`.register-vaccine-button[data-vaccine-id="${vacinaId}"]`);
                if (button) {
                    markVaccineAsRegistered(button);
                }
            });
        }
    }

    // Função para mostrar a seção de vacinas correta e ocultar as outras
    // O parâmetro ageGroupSuffix agora deve vir formatado corretamente (ex: "18-plus")
    function showVaccineSection(ageGroupSuffix) {
        vaccineSections.forEach(section => {
            // Comparação direta com o ID
            if (section.id === `section-${ageGroupSuffix}`) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        // Atualiza a classe 'active' nos botões de filtro
        filterButtons.forEach(button => {
            if (button.dataset.ageGroup === ageGroupSuffix) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Função para marcar um botão de vacina como "Registrado"
    function markVaccineAsRegistered(button) {
        button.textContent = 'Registrada'; // Muda o texto
        button.classList.add('registered'); // Adiciona classe para mudar a cor/estilo
        button.disabled = true; // Desabilita o botão para evitar cliques repetidos
    }

    // Lida com o clique nos botões de filtro de idade
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Pega o valor data-age-group diretamente
            const ageGroup = this.dataset.ageGroup;
            showVaccineSection(ageGroup);
        });
    });

    // Lida com o clique nos botões "Registrar Vacina"
    registerVaccineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vaccineId = this.dataset.vaccine-id;
            const usuario = getUsuarioLogado();

            if (usuario) {
                if (!usuario.vacinasTomadas) {
                    usuario.vacinasTomadas = [];
                }
                if (!usuario.vacinasTomadas.includes(vaccineId)) {
                    usuario.vacinasTomadas.push(vaccineId);
                    setUsuarioLogado(usuario);

                    let todosUsuarios = getAllUsuarios();
                    todosUsuarios = todosUsuarios.map(user => {
                        if (user.id === usuario.id) {
                            return usuario;
                        }
                        return user;
                    });
                    setAllUsuarios(todosUsuarios);

                    markVaccineAsRegistered(this);
                    alert(`Vacina "${vaccineId}" registrada para ${usuario.nome}.`);
                } else {
                    alert(`Vacina "${vaccineId}" já está registrada.`);
                }
            } else {
                alert('Nenhum usuário logado. Por favor, faça login para registrar vacinas.');
                window.location.href = 'login.html';
            }
        });
    });

    // Lida com o clique no botão "Confirmar Registro"
    if (confirmRegisterButton) {
        confirmRegisterButton.addEventListener('click', function() {
            alert('Registro(s) de vacina(s) confirmado(s)!');
            window.location.href = 'telaPrincipal.html';
        });
    }

    // Inicializa a tela quando o DOM estiver carregado
    initializeVacunasScreen();
});