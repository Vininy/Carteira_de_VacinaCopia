document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

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

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
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
                    localStorage.setItem('token', data.token); // 🔐 armazena o JWT
                    alert('Login realizado com sucesso!');
                    window.location.href = 'carteira.html';
                } else {
                    alert(data.error || 'Erro ao fazer login');
                }
            })
            .catch(error => {
                console.error('Erro no login:', error);
                alert('Erro ao tentar login');
            });
        });
    }
});
