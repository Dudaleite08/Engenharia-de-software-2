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
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const dadosGerais = xmlDoc.getElementsByTagName("DADOS-GERAIS")[0];
        const nomeEmCitacoes = dadosGerais.getAttribute("NOME-EM-CITACOES-BIBLIOGRAFICAS");
        const nomeCompleto = dadosGerais.getAttribute("NOME-COMPLETO");
        const paisDeNacionalidade = dadosGerais.getAttribute("PAIS-DE-NACIONALIDADE");

        if (!nomeEmCitacoes || !nomeCompleto || !paisDeNacionalidade) {
            throw new Error('Elementos necessários não encontrados no XML do Lattes.');
        }

        document.getElementById('nome').value = nomeCompleto;
        document.getElementById('pais').value = paisDeNacionalidade;
        document.getElementById('nomeEmCitacoes').value = nomeEmCitacoes;

        const trabalhosEmEventos = xmlDoc.getElementsByTagName("TRABALHO-EM-EVENTOS");
        for (let i = 0; i < trabalhosEmEventos.length; i++) {
            const trabalho = trabalhosEmEventos[i];
            const dadosBasicos = trabalho.getElementsByTagName("DADOS-BASICOS-DO-TRABALHO")[0];
            const homePageDoTrabalho = dadosBasicos.getAttribute("HOME-PAGE-DO-TRABALHO");
            const titulo = dadosBasicos.getAttribute("TITULO-DO-TRABALHO")

            if (homePageDoTrabalho) {
                const linkElement = document.createElement('a');
                linkElement.href = homePageDoTrabalho;
                linkElement.textContent = titulo;
                linkElement.target = "_blank"; // Abrir o link em uma nova aba
                linkElement.classList.add('home-page-link'); // Adicionar classe para estilização opcional
                document.getElementById('artigos-container').appendChild(linkElement);
            } else {
                console.error('Link da home page do trabalho não encontrado no XML.');
            }
        }

        const atividadesProfissionais = xmlDoc.getElementsByTagName("ATUACOES-PROFISSIONAIS")[0];
        if (atividadesProfissionais) {
            const atuacoesProfissionais = atividadesProfissionais.getElementsByTagName("ATUACAO-PROFISSIONAL");
            for (let i = 0; i < atuacoesProfissionais.length; i++) {
                const projetosPesquisa = atuacoesProfissionais[i].getElementsByTagName("PROJETO-DE-PESQUISA");
                for (let j = 0; j < projetosPesquisa.length; j++) {
                    const projeto = projetosPesquisa[j];
                    const nomeProjeto = projeto.getAttribute("NOME-DO-PROJETO");
                    const anoInicio = projeto.getAttribute("ANO-INICIO");
                    const situacao = projeto.getAttribute("SITUACAO");
                    const descricaoProjeto = projeto.getAttribute("DESCRICAO-DO-PROJETO");

                    // Exemplo de atualização de elementos HTML na página
                    const projetoDiv = document.createElement('div');
                    projetoDiv.classList.add('projeto');
                    projetoDiv.innerHTML = `
                        <h3>${nomeProjeto}</h3>
                        <p><strong>Ano de Início:</strong> ${anoInicio}</p>
                        <p><strong>Situação:</strong> ${situacao}</p>
                        <p><strong>Descrição:</strong> ${descricaoProjeto}</p>
                    `;
                    document.getElementById('projetos-container').appendChild(projetoDiv);
                }
            }
        }

    } catch (error) {
        console.error('Erro ao analisar o XML do Lattes:', error);
    }
}

function salvarCurriculo(nome, pais, nomeEmCitacoes, formacao, idiomas) {
    const curriculo = {
        nome: nome,
        pais: pais,
        nomeEmCitacoes: nomeEmCitacoes,
        formacao: formacao,
        idiomas: idiomas
    };
    localStorage.setItem('curriculo', JSON.stringify(curriculo));
}

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão pelo ID
    const btnSalvarCurriculo = document.getElementById('btnSalvarCurriculo');
    
    // Adiciona um evento de clique ao botão
    btnSalvarCurriculo.addEventListener('click', function() {
        // Obtem os dados do formulário
        const nome = document.getElementById('nome').value;
        const pais = document.getElementById('pais').value;
        const nomeEmCitacoes = document.getElementById('nomeEmCitacoes').value;
        const formacao = document.getElementById('formacao').value;
        const idiomas = document.getElementById('idiomas').value;
        
        // Chama a função para salvar o currículo
        salvarCurriculo(nome, pais, nomeEmCitacoes, formacao, idiomas);
        
        // Exibe uma mensagem de sucesso (opcional)
        alert('Currículo salvo com sucesso!');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const btnToggleProjetos = document.getElementById('toggleProjetos');
    const projetosContainer = document.getElementById('projetos-container');

    // Adiciona um evento de clique ao botão
    btnToggleProjetos.addEventListener('click', function() {
        projetosContainer.style.display === 'none'
        // Alterna a visibilidade da div projetos-container
        if (projetosContainer.style.display === 'none') {
            projetosContainer.style.display = 'block';
            btnToggleProjetos.textContent = 'Ocultar Projetos';
        } else {
            projetosContainer.style.display = 'none';
            btnToggleProjetos.textContent = 'Mostrar Projetos';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const btnToggleProjetos = document.getElementById('toggleArtigos');
    const projetosContainer = document.getElementById('artigos-container');

    // Adiciona um evento de clique ao botão
    btnToggleProjetos.addEventListener('click', function() {
        projetosContainer.style.display === 'none'
        // Alterna a visibilidade da div projetos-container
        if (projetosContainer.style.display === 'none') {
            projetosContainer.style.display = 'block';
            btnToggleProjetos.textContent = 'Ocultar Artigos';
        } else {
            projetosContainer.style.display = 'none';
            btnToggleProjetos.textContent = 'Mostrar Artigos';
        }
    });
});