document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu
    const accessibilityToggle = document.querySelector('.accessibility-toggle');
    const accessibilityContent = document.querySelector('.accessibility-content');
    const closeAccessibility = document.querySelector('.close-accessibility');
    
    // Botões de funcionalidade
    const increaseTextBtn = document.getElementById('increase-text');
    const decreaseTextBtn = document.getElementById('decrease-text');
    const contrastBtn = document.getElementById('toggle-contrast');
    const darkModeBtn = document.getElementById('toggle-dark-mode');
    const resetBtn = document.getElementById('reset-accessibility');

    // Variáveis de controle
    let zoomLevel = 100;
    const MAX_ZOOM = 150;
    const MIN_ZOOM = 90;
    const ZOOM_STEP = 10;

    // Função para aplicar zoom
    function applyZoom(level) {
        document.documentElement.style.zoom = `${level}%`;
        // Para navegadores que não suportam zoom
        document.body.style.transform = `scale(${level/100})`;
        document.body.style.transformOrigin = 'top left';
        
        // Salvar no localStorage
        localStorage.setItem('zoomLevel', level);
    }

    // Carregar zoom salvo
    const savedZoom = localStorage.getItem('zoomLevel');
    if (savedZoom) {
        zoomLevel = parseInt(savedZoom);
        applyZoom(zoomLevel);
    }

    // Aumentar texto
    increaseTextBtn.addEventListener('click', () => {
        if (zoomLevel < MAX_ZOOM) {
            zoomLevel += ZOOM_STEP;
            applyZoom(zoomLevel);
        }
    });

    // Diminuir texto
    decreaseTextBtn.addEventListener('click', () => {
        if (zoomLevel > MIN_ZOOM) {
            zoomLevel -= ZOOM_STEP;
            applyZoom(zoomLevel);
        }
    });

    // Alto contraste
    contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    });

    // Modo escuro
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Resetar configurações
    resetBtn.addEventListener('click', () => {
        // Reset zoom
        zoomLevel = 100;
        applyZoom(zoomLevel);
        
        // Reset outros
        document.body.classList.remove('high-contrast', 'dark-mode');
        localStorage.removeItem('highContrast');
        localStorage.removeItem('darkMode');
        localStorage.removeItem('zoomLevel');

        // Reset do Google Translate
        const iframe = document.querySelector('.goog-te-menu-frame');
        if (iframe) {
            const selectElement = iframe.contentWindow.document.querySelector('.goog-te-menu2-item:first-child div');
            if (selectElement) selectElement.click();
        }

        // Reset do VLibras
        const vLibrasWidget = document.querySelector('.vw-text');
        if (vLibrasWidget) {
            vLibrasWidget.click();
        }
    });

    // Carregar configurações salvas
    window.addEventListener('load', () => {
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    });

    // Abrir/fechar menu
    accessibilityToggle.addEventListener('click', () => {
        accessibilityContent.classList.toggle('active');
    });

    closeAccessibility.addEventListener('click', () => {
        accessibilityContent.classList.remove('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!accessibilityContent.contains(e.target) && 
            !accessibilityToggle.contains(e.target)) {
            accessibilityContent.classList.remove('active');
        }
    });

    // Suporte a atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // CTRL + '+' para aumentar
        if (e.ctrlKey && e.key === '+') {
            e.preventDefault();
            if (zoomLevel < MAX_ZOOM) {
                zoomLevel += ZOOM_STEP;
                applyZoom(zoomLevel);
            }
        }
        // CTRL + '-' para diminuir
        if (e.ctrlKey && e.key === '-') {
            e.preventDefault();
            if (zoomLevel > MIN_ZOOM) {
                zoomLevel -= ZOOM_STEP;
                applyZoom(zoomLevel);
            }
        }
        // CTRL + '0' para resetar zoom
        if (e.ctrlKey && e.key === '0') {
            e.preventDefault();
            zoomLevel = 100;
            applyZoom(zoomLevel);
        }
    });

    // Novos elementos
    const languageBtn = document.getElementById('toggle-language');
    const librasBtn = document.getElementById('toggle-libras');

    // Função para carregar o script do Google Translate
    function loadGoogleTranslate() {
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);

        // Criar div para o Google Translate
        if (!document.getElementById('google_translate_element')) {
            const translateDiv = document.createElement('div');
            translateDiv.id = 'google_translate_element';
            translateDiv.style.display = 'none';
            document.body.appendChild(translateDiv);
        }
    }

    // Função de inicialização do Google Translate
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'pt',
            includedLanguages: 'en,pt',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };

    // Função para carregar o VLibras
    function loadVLibras() {
        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.onload = function() {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        };
        document.body.appendChild(script);
    }

    // Evento para o botão de tradução
    languageBtn.addEventListener('click', () => {
        if (!window.google?.translate) {
            loadGoogleTranslate();
        }
        
        const iframe = document.querySelector('.goog-te-menu-frame');
        if (iframe) {
            iframe.contentWindow.document.querySelector('.goog-te-menu2-item div').click();
        } else {
            const translateElement = document.getElementById('google_translate_element');
            translateElement.querySelector('select').click();
        }
    });

    // Evento para o botão de libras
    librasBtn.addEventListener('click', () => {
        if (!window.VLibras) {
            loadVLibras();
        } else {
            const vLibrasWidget = document.querySelector('.vw-text');
            if (vLibrasWidget) {
                vLibrasWidget.click();
            }
        }
    });

    // Função para alternar o VLibras
    function toggleVLibras() {
        const vLibrasWidget = document.querySelector('.enabled');
        if (vLibrasWidget) {
            if (vLibrasWidget.style.display === 'none') {
                vLibrasWidget.style.display = 'block';
            } else {
                vLibrasWidget.style.display = 'none';
            }
        }
    }

    // Função para alternar o idioma
    function toggleLanguage() {
        const iframe = document.querySelector('.goog-te-menu-frame');
        if (iframe) {
            const items = iframe.contentWindow.document.querySelectorAll('.goog-te-menu2-item');
            items.forEach(item => {
                const text = item.querySelector('div span.text').textContent;
                if (text === 'English') {
                    item.click();
                }
            });
        }
    }

    // Adicione os event listeners
    document.getElementById('toggle-libras').addEventListener('click', toggleVLibras);
    document.getElementById('toggle-language').addEventListener('click', toggleLanguage);
}); 