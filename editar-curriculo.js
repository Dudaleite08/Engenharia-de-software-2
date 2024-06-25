document.addEventListener('DOMContentLoaded', function() {
    const nomeInput = document.getElementById('nome');
    const paisInput = document.getElementById('pais');
    const nomeEmCitacoesInput = document.getElementById('nomeEmCitacoes');
    const formacaoTextarea = document.getElementById('formacao');
    const idiomasTextarea = document.getElementById('idiomas');
    const btnSalvarCurriculo = document.getElementById('btnSalvarCurriculo');


    function carregarDadosCurriculo() {
        const curriculoSalvo = JSON.parse(localStorage.getItem('curriculo'));

        if (curriculoSalvo) {
            nomeInput.value = curriculoSalvo.nome || '';
            paisInput.value = curriculoSalvo.pais || '';
            nomeEmCitacoesInput.value = curriculoSalvo.nomeEmCitacoes || '';
            formacaoTextarea.value = curriculoSalvo.formacao || '';
            idiomasTextarea.value = curriculoSalvo.idiomas || '';
        } else {
            alert('Nenhum currículo encontrado no localStorage.');
        }
    }

    carregarDadosCurriculo();


    btnSalvarCurriculo.addEventListener('click', function() {
        const nome = nomeInput.value;
        const pais = paisInput.value;
        const nomeEmCitacoes = nomeEmCitacoesInput.value;
        const formacao = formacaoTextarea.value;
        const idiomas = idiomasTextarea.value;

        salvarCurriculo(nome, pais, nomeEmCitacoes, formacao, idiomas);
        
        alert('Currículo editado e salvo com sucesso!');
    });


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
});
