document.addEventListener("DOMContentLoaded", function() {

    const pathEstrelaVazia = "../assets/icons/icons para Pagina - Avaliação do Curso/icon_estrela_vazia.svg";
    const pathEstrelaCheia = "../assets/icons/icons para Pagina - Avaliação do Curso/icon_estrela_cheia.svg";

    const todosGruposDeEstrelas = document.querySelectorAll(".avaliacao-estrelas");

    todosGruposDeEstrelas.forEach(grupo => {

        const estrelas = grupo.querySelectorAll("img.estrela-vazia");

        grupo.dataset.rating = -1;

        estrelas.forEach((estrela, index) => {

            estrela.addEventListener("click", function() {
                grupo.dataset.rating = index;
                atualizarAparenciaDasEstrelas(grupo, index);
            });

            estrela.addEventListener("mouseover", function() {
                atualizarAparenciaDasEstrelas(grupo, index);
            });
        });

        grupo.addEventListener("mouseleave", function() {
            const ratingClicado = parseInt(grupo.dataset.rating, 10);
            atualizarAparenciaDasEstrelas(grupo, ratingClicado);
        });
    });

    function atualizarAparenciaDasEstrelas(grupo, notaIndex) {
        const estrelasDoGrupo = grupo.querySelectorAll("img.estrela-vazia");

        estrelasDoGrupo.forEach((estrela, index) => {
            if (index <= notaIndex) {
                estrela.src = pathEstrelaCheia;
                let totalDeEstrelas = index + 1

                estrela.alt = `Você avaliou com ${totalDeEstrelas} estrela de 5 estrelas`;
            } else {
                estrela.src = pathEstrelaVazia;
                estrela.alt = "Estrela vazia";
            }
        });
    }

    const btnAvancar = document.querySelector('a[href="./diagnostico.html"]');

if (btnAvancar) {
    btnAvancar.addEventListener('click', function(event) {
        event.preventDefault(); 

        const avaliacoes = [];
        const grupos = document.querySelectorAll(".avaliacao-estrelas");
        
        const categorias = ["Conteúdo", "Didática", "Usabilidade"];

        grupos.forEach((grupo, index) => {
            let nota = parseInt(grupo.dataset.rating) + 1;
            avaliacoes.push({
                categoria: categorias[index],
                nota: nota
            });
        });

        const comentario = document.querySelector(".comentario-caixa").value;

        const dadosAvaliacao = {
            notas: avaliacoes, 
            comentario: comentario
        };

        localStorage.setItem('dados_engplay_avaliacao', JSON.stringify(dadosAvaliacao));

        window.location.href = "./diagnostico.html";
    });
}
});