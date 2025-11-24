document.addEventListener('DOMContentLoaded', function () {

    function getPathPrefix() {
        return window.location.pathname.includes('/HTML/') ? '..' : '.';
    }

    const body = document.body;
    const barraLateral = document.getElementById('lateral');

    const sidebarSalva = localStorage.getItem('sidebarStatus');

    if (barraLateral && sidebarSalva === 'retraida') {
        barraLateral.style.transition = 'none';
        barraLateral.classList.add('retraida');
        body.classList.add('sidebar-retraida');
        setTimeout(() => barraLateral.style.transition = '', 100);
    }

    const temaSalvo = localStorage.getItem('tema');

    function ativarTemaClaro() {
        if (document.getElementById('tema-claro-css')) return;
        const prefix = getPathPrefix();
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = `${prefix}/CSS/estilo_layout/light_mode.css`;
        link.id = "tema-claro-css";
        document.head.appendChild(link);
    }

    function desativarTemaClaro() {
        const link = document.getElementById('tema-claro-css');
        if (link) link.remove();
    }

        function ativarTemaEscuro() {
        if (document.getElementById('tema-escuro-css')) return;
        const prefix = getPathPrefix();
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = `${prefix}/CSS/estilo_layout/dark_mode.css`;
        link.id = "tema-escuro-css";
        document.head.appendChild(link);
    }

    function desativarTemaEscuro() {
        const link = document.getElementById('tema-escuro-css');
        if (link) link.remove();
    }

    function atualizarIconeVisualmente(isLightMode) {
        const icone = document.querySelector('#lateral #icone-tema');
        if (!icone) return;

        const prefix = getPathPrefix();

        if (isLightMode) {
            icone.src = `${prefix}/assets/icons/barra superior/temas/tema_claro.svg`;
            icone.alt = "Modo claro ativo";
        } else {
            icone.src = `${prefix}/assets/icons/barra superior/temas/tema_escuro.svg`;
            icone.alt = "Modo escuro ativo";
        }
    }

    if (temaSalvo === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        ativarTemaClaro();
        desativarTemaEscuro();
        atualizarIconeVisualmente(true);
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        desativarTemaClaro();
        ativarTemaEscuro();
        atualizarIconeVisualmente(false);
    }

    document.addEventListener('click', function (e) {

        const botaoToggle = e.target.closest('#superior-left button');
        if (botaoToggle && barraLateral) {
            barraLateral.classList.toggle('retraida');
            body.classList.toggle('sidebar-retraida');

            if (barraLateral.classList.contains('retraida')) {
                localStorage.setItem('sidebarStatus', 'retraida');
            } else {
                localStorage.setItem('sidebarStatus', 'expandida');
            }
        }

        const btnTema = e.target.closest('#lateral #icone-tema') || e.target.closest('#icones-temas');
        if (btnTema) {
            e.preventDefault();

            const isLightMode = !body.classList.contains('light-mode');

            if (isLightMode) {
                body.classList.add('light-mode');
                body.classList.remove('dark-mode');
                ativarTemaClaro();
                localStorage.setItem('tema', 'light');
            } else {
                body.classList.add('dark-mode');
                body.classList.remove('light-mode');
                desativarTemaClaro();
                localStorage.setItem('tema', 'dark');
            }

            atualizarIconeVisualmente(isLightMode);
        }
    });
});
