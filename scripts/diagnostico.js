import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWWGRp20dDA2sAnMfurfeBAnNutIWd5NM",
  authDomain: "engplay-cancelamento.firebaseapp.com",
  projectId: "engplay-cancelamento",
  storageBucket: "engplay-cancelamento.firebasestorage.app",
  messagingSenderId: "572790546606",
  appId: "1:572790546606:web:c54f85dbd4a8b1875e4d3f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {

    const btnConfirmar = document.getElementById('confirmar-perdas-btn');
    const linkConfirmar = document.getElementById('link-confirmar-perdas');

    linkConfirmar.addEventListener('click', async function(event) {
        event.preventDefault(); 

        if (btnConfirmar.disabled) return;

        const motivosSelecionados = [];
        document.querySelectorAll('.opcao-bloco.selecionado').forEach(bloco => {
            const titulo = bloco.querySelector('h3').innerText.replace(":", ""); 
            motivosSelecionados.push(titulo);
        });

        
        const dadosSalvosAnteriores = localStorage.getItem('dados_engplay_avaliacao');
        const dadosAvaliacao = dadosSalvosAnteriores ? JSON.parse(dadosSalvosAnteriores) : { notas: [], comentario: "" };

        const dadosAluno = {
            nome: "João da Silva", 
            email: "joao.aluno@email.com",
            dataCancelamento: new Date().toISOString(), 
            dataLegivel: new Date().toLocaleString('pt-BR') 
        };

        const pacoteFinal = {
            aluno: {
                nome: dadosAluno.nome,
                email: dadosAluno.email
            },
            feedback: {
                estrelas: dadosAvaliacao.notas, 
                comentario: dadosAvaliacao.comentario
            },
            motivosCancelamento: motivosSelecionados,
            metadata: {
                canceladoEm: dadosAluno.dataCancelamento,
                displayData: dadosAluno.dataLegivel
            }
        };

        console.log("Enviando para o banco...", pacoteFinal);

        try {
            const docRef = await addDoc(collection(db, "cancelamentos"), pacoteFinal);
            
            console.log("Documento salvo com ID: ", docRef.id);
            
            localStorage.removeItem('dados_engplay_avaliacao');

            window.location.href = "./confirmacao.html"; 

        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            alert("Erro ao processar cancelamento. Tente novamente.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const blocosOpcoes = document.querySelectorAll('.opcao-bloco');
    const checkTermos = document.getElementById('termos-check');
    const checkPerda = document.getElementById('perda-check');
    const btnConfirmar = document.getElementById('confirmar-perdas-btn');
    const linkConfirmar = document.getElementById('link-confirmar-perdas');
    const verificarTema = document.getElementById('tema-claro-css');

    if (blocosOpcoes.length && checkTermos && checkPerda && btnConfirmar && linkConfirmar) {
        
        const imgNaoMarcado = "../assets/icons/icones para Pagina - Diagnostico/icon - check box --- nao marcado --- Light mode.svg";
        const imgMarcado = "../assets/icons/icones para Pagina - Diagnostico/icon - check box --- marcado.svg";

        checkTermos.dataset.checked = 'false';
        checkPerda.dataset.checked = 'false';

        btnConfirmar.disabled = true;

        blocosOpcoes.forEach(blocoOpcao => {
            blocoOpcao.addEventListener('click', function() {
                blocoOpcao.classList.toggle('selecionado');
            });
        });

        checkTermos.addEventListener('click', function() {
            const img = checkTermos.querySelector('img');
            const isChecked = checkTermos.dataset.checked === 'true';
            checkTermos.dataset.checked = isChecked ? 'false' : 'true';

            img.src = !isChecked ? imgMarcado : imgNaoMarcado;
            
            verificarEstadoBotao();
        });

        checkPerda.addEventListener('click', function() {
            const img = checkPerda.querySelector('img');
            const isChecked = checkPerda.dataset.checked === 'true';
            checkPerda.dataset.checked = isChecked ? 'false' : 'true';
            
            img.src = !isChecked ? imgMarcado : imgNaoMarcado;

            verificarEstadoBotao();
        });

        function verificarEstadoBotao() {
            const termosMarcado = checkTermos.dataset.checked === 'true';
            const perdaMarcado = checkPerda.dataset.checked === 'true';

            btnConfirmar.disabled = !(termosMarcado && perdaMarcado);
        }
        
        linkConfirmar.addEventListener('click', function(event) {
            if (btnConfirmar.disabled) {
                event.preventDefault();
            }
        });
    }


});
