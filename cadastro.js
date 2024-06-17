document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            parseLattesFile(text);
        };
        reader.readAsText(file);
    }
}

function parseLattesFile(text) {
    // Simulação de parser do currículo Lattes
    const dummyData = {
        nome: "Fulano de Tal",
        email: "fulano@exemplo.com",
        endereco: "Rua Exemplo, 123",
        experiencia: "Professor na Universidade X, Pesquisador no Instituto Y",
        formacao: "Doutorado em Ciência da Computação, Mestrado em Engenharia",
        idiomas: "Inglês, Espanhol"
    };

    // Populando os campos do formulário com os dados simulados
    document.getElementById('nome').value = dummyData.nome;
    document.getElementById('email').value = dummyData.email;
    document.getElementById('endereco').value = dummyData.endereco;
    document.getElementById('experiencia').value = dummyData.experiencia;
    document.getElementById('formacao').value = dummyData.formacao;
    document.getElementById('idiomas').value = dummyData.idiomas;
}

document.getElementById('curriculoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Currículo cadastrado com sucesso!');
});
