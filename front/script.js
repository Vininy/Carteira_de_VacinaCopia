document.addEventListener('DOMContentLoaded', function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');
    const cpfInput = document.getElementById('cpf');
    const formCadastrarVacinas = document.getElementById('formCadastrarVacinas');

    /* Máscara de CPF */
    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
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
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const email = document.getElementById('email')?.value || '';
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            const tipoSanguineo = document.getElementById('tipoSanguineo')?.value || '';
            const fotoCarteira = document.getElementById('fotoCarteira')?.files[0] || null;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            fetch('https://carteira-de-vacina.onrender.com/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome,
                    cpf,
                    email,
                    senha,
                    dataNascimento,
                    tipoSanguineo
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
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
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const loginEmail = document.getElementById('loginEmail').value;
            const loginSenha = document.getElementById('loginSenha').value;

            fetch('https://carteira-de-vacina.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, senha: loginSenha })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('token', data.token); // você pode manter o token se quiser autenticação depois
                        alert('Login realizado com sucesso!');
                        window.location.href = 'telaPrincipal.html';
                    } else {
                        alert(data.error || 'Email ou senha incorretos.');
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
        formCadastrarVacinas.addEventListener('submit', function (e) {
            e.preventDefault();

            const vacinasSelecionadas = [];
            const checkboxes = document.querySelectorAll('input[name="vacinasTomadas"]:checked');
            checkboxes.forEach(cb => vacinasSelecionadas.push(cb.value));

            const token = localStorage.getItem('token');

            if (!token) {
                alert('Usuário não autenticado. Faça login.');
                window.location.href = 'login.html';
                return;
            }

            // Supondo que a API aceite o envio das vacinas
            fetch('https://carteira-de-vacina.onrender.com/api/vacinas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ vacinas: vacinasSelecionadas })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert('Vacinas cadastradas com sucesso!');
                        window.location.href = 'telaPrincipal.html';
                    }
                })
                .catch(error => {
                    console.error('Erro ao cadastrar vacinas:', error);
                    alert('Erro ao cadastrar vacinas.');
                });
        });
    }
});
