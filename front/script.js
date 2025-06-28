
document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');
    const cpfInput = document.getElementById('cpf');
    const formCadastrarVacinas = document.getElementById('formCadastrarVacinas');

    /* Máscara de CPF */
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
            }
            e.target.value = value;
        });
    }

    /* Cadastro */
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const email = document.getElementById('email')?.value || null;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            const tipoSanguineo = document.getElementById('tipoSanguineo')?.value || null;
            const fotoCarteira = document.getElementById('fotoCarteira')?.files[0] || null;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            // Chamada para backend
            fetch('https://carteira-de-vacina.onrender.com/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, cpf, email, senha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // LocalStorage como fallback adicional
                    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

                    if (usuarios.find(u => u.cpf === cpf)) {
                        alert('CPF já cadastrado localmente.');
                        return;
                    }

                    usuarios.push({
                        id: Date.now(),
                        nome,
                        cpf,
                        dataNascimento,
                        senha,
                        tipoSanguineo,
                        fotoCarteira: fotoCarteira ? {
                            name: fotoCarteira.name,
                            size: fotoCarteira.size,
                            type: fotoCarteira.type
                        } : null
                    });

                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Erro no cadastro:', error);
                alert('Erro ao cadastrar usuário');
            });
        });
    }

    /* Login */
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const loginEmail = document.getElementById('loginEmail').value;
            const loginSenha = document.getElementById('loginSenha').value;

            // Backend login
            fetch('https://carteira-de-vacina.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, senha: loginSenha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    alert('Login realizado com sucesso!');
                    window.location.href = 'carteira.html';
                } else {
                    // Fallback: login com localStorage
                    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                    const usuarioLogado = usuarios.find(user =>
                        (user.email === loginEmail || user.cpf === loginEmail) && user.senha === loginSenha
                    );

                    if (usuarioLogado) {
                        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                        alert('Login local realizado com sucesso!');
                        window.location.href = 'carteira.html';
                    } else {
                        alert(data.error || 'Email/CPF ou senha incorretos.');
                    }
                }
            })
            .catch(error => {
                console.error('Erro no login:', error);
                alert('Erro ao tentar login');
            });
        });
    }

    /* Cadastrar Vacinas */
    if (formCadastrarVacinas) {
        formCadastrarVacinas.addEventListener('submit', function(e) {
            e.preventDefault();

            const vacinasSelecionadas = [];
            const checkboxes = document.querySelectorAll('input[name="vacinasTomadas"]:checked');
            checkboxes.forEach(cb => vacinasSelecionadas.push(cb.value));

            let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
            if (usuarioLogado) {
                usuarioLogado.vacinasTomadas = vacinasSelecionadas;

                let todosUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                todosUsuarios = todosUsuarios.map(user => user.id === usuarioLogado.id ? usuarioLogado : user);
                localStorage.setItem('usuarios', JSON.stringify(todosUsuarios));
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

                alert('Vacinas cadastradas com sucesso!');
                window.location.href = 'telaPrincipal.html';
            } else {
                alert('Nenhum usuário logado. Por favor, faça login.');
                window.location.href = 'login.html';
            }
        });
    }
});

