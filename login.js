document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (email === 'admin@email.com' && password === 'admin') {
        message.style.color = 'green';
        message.textContent = 'Login bem-sucedido!';
        // Redirecionar para a página de cadastro de currículo
        window.location.href = 'cadastro.html';
    } else {
        message.style.color = 'red';
        message.textContent = 'Email ou senha incorretos!';
    }
});
