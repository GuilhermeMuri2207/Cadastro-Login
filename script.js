document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validações do formulário

    const nome = document.getElementById('nome').value;
    if (nome.length < 15 || nome.length > 60 || !/^[A-Za-z\s]+$/.test(nome)) {
        showToast("O nome deve ter entre 15 e 60 caracteres alfabéticos.", 'danger');
        return;
    }

    const cpf = document.getElementById('cpf').value;
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
        showToast("O CPF deve conter 11 dígitos numéricos.", 'danger');
        return;
    }

    const telefoneCelular = document.getElementById('telefoneCelular').value;
    const celularRegex = /^\(?\+?55\)?\s?\d{2}\s?\d{5}-?\d{4}$/;
    if (!celularRegex.test(telefoneCelular)) {
        showToast("O Telefone Celular deve estar no formato (+55) 11 91234-5678.", 'danger');
        return;
    }


    const login = document.getElementById('login').value;
    if (login.length !== 6 || !/^[A-Za-z]+$/.test(login)) {
        showToast("O Login deve ter exatamente 6 caracteres alfabéticos.", 'danger');
        return;
    }

    const senha = document.getElementById('senha').value;
    if (senha.length !== 8 || !/^[A-Za-z]+$/.test(senha)) {
        showToast("A Senha deve ter 8 caracteres alfabéticos.", 'danger');
        return;
    }

    const confirmaSenha = document.getElementById('confirmaSenha').value;
    if (senha !== confirmaSenha) {
        showToast("As senhas não coincidem.", 'danger');
        return;
    }

    // Armazenar login e senha no localStorage

    localStorage.setItem("userLogin", login);
    localStorage.setItem("userSenha", senha);


    // Exibir mensagem de sucesso e redirecionar para a tela de login

    showToast("Cadastro realizado com sucesso!", 'success');
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});

function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Remover o toast após desaparecer
    toast.addEventListener('hidden.bs.toast', () => {
        toastContainer.removeChild(toast);
    });
}
