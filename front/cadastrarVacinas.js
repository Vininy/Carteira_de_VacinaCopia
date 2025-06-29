document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-button');
    const vaccineSections = document.querySelectorAll('.vaccine-section');
    const confirmRegisterButton = document.getElementById('confirmRegisterButton');
    const registerVaccineButtons = document.querySelectorAll('.register-vaccine-button');

    const selectedVaccines = new Set();

    // Mostra a seção "18+" por padrão
    showVaccineSection('18-plus');

    function showVaccineSection(ageGroupSuffix) {
        vaccineSections.forEach(section => {
            section.classList.toggle('hidden', section.id !== `section-${ageGroupSuffix}`);
        });

        filterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.ageGroup === ageGroupSuffix);
        });
    }

    function toggleVaccineSelection(button) {
        const vaccineId = button.dataset.vaccineId;

        if (selectedVaccines.has(vaccineId)) {
            selectedVaccines.delete(vaccineId);
            button.textContent = 'Registrar Vacina';
            button.classList.remove('selected');
        } else {
            selectedVaccines.add(vaccineId);
            button.textContent = 'Selecionada';
            button.classList.add('selected');
        }
    }

    // Evento dos filtros de idade
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            showVaccineSection(this.dataset.ageGroup);
        });
    });

    // Clique em "Registrar Vacina"
    registerVaccineButtons.forEach(button => {
        button.addEventListener('click', function () {
            toggleVaccineSelection(this);
        });
    });

    // Clique em "Confirmar Registro"
    confirmRegisterButton.addEventListener('click', function () {
         if (selectedVaccines.size === 0) {
            alert('Selecione pelo menos uma vacina.');
            return;
        }   


        const vacinas = Array.from(selectedVaccines);
        const token = localStorage.getItem('token'); // PEGA O TOKEN DO LOCALSTORAGE

        if (!token) {
            alert('Você precisa fazer login para registrar vacinas.');
            window.location.href = 'login.html';
            return;
        }


        fetch('https://carteira-de-vacina.onrender.com/api/vacinas', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // ENVIA O TOKEN AQUI
            },
            body: JSON.stringify({ vacinas }),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('Vacinas registradas com sucesso!');
                    window.location.href = 'telaPrincipal.html';
                }
            })
            .catch(error => {
                console.error('Erro ao registrar vacinas:', error);
                alert('Erro ao registrar vacinas.');
            });
    });
});

