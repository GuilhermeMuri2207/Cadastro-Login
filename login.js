document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let login = document.getElementById("login").value.trim();
    let senha = document.getElementById("senha").value.trim();
    
    // Recupera os dados armazenados no localStorage durante o cadastro

    let storedLogin = localStorage.getItem("userLogin");
    let storedSenha = localStorage.getItem("userSenha");
    
    // Verifica se os campos login e senha foram preenchidos corretamente

    if (login === "" || senha === "") {
        showToast("Por favor, preencha todos os campos.", "error");
        return;
    }
    
    // Verifica se o login e a senha correspondem aos valores armazenados

    if (login === storedLogin && senha === storedSenha) {
        showToast("Login realizado com sucesso!", "success");

        // Armazena o login do usuário logado no localStorage

        localStorage.setItem("loggedUser", login);
        
        // Redireciona para a Tela 3 após um breve intervalo

        setTimeout(function() {
            window.location.href = "principal.html";
        }, 1500);
    } else {
        showToast("Login ou senha incorretos.", "error");
    }
});

function showToast(message, type) {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast', 'align-items-center', 'text-bg-' + (type === 'error' ? 'danger' : 'success'), 'border-0');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
