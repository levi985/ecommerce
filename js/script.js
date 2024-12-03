document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio do formulário

        // Simples animação de transição
        form.style.opacity = '0';
        setTimeout(() => {
            alert('Login bem-sucedido! Redirecionando...');
            // Redirecionar para a página principal ou realizar outras ações aqui
        }, 1000);
    });
});

