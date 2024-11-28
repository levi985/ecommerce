document.addEventListener('DOMContentLoaded', function() {
    // Variáveis de controle
    let zoomLevel = 100;
    const MAX_ZOOM = 150;
    const MIN_ZOOM = 90;
    const ZOOM_STEP = 10;

    // Função para aplicar zoom
    function applyZoom(level) {
        document.documentElement.style.zoom = `${level}%`;
        document.body.style.transform = `scale(${level/100})`;
        document.body.style.transformOrigin = 'top left';
        localStorage.setItem('zoomLevel', level);
    }

    // Carregar configurações salvas
    const savedZoom = localStorage.getItem('zoomLevel');
    if (savedZoom) {
        zoomLevel = parseInt(savedZoom);
        applyZoom(zoomLevel);
    }

    // Carregar modo escuro salvo
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Carregar alto contraste salvo
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    // Event Listeners para os botões
    document.getElementById('increase-text')?.addEventListener('click', () => {
        if (zoomLevel < MAX_ZOOM) {
            zoomLevel += ZOOM_STEP;
            applyZoom(zoomLevel);
        }
    });

    document.getElementById('decrease-text')?.addEventListener('click', () => {
        if (zoomLevel > MIN_ZOOM) {
            zoomLevel -= ZOOM_STEP;
            applyZoom(zoomLevel);
        }
    });

    document.getElementById('toggle-contrast')?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    });

    document.getElementById('toggle-dark-mode')?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    document.getElementById('reset-accessibility')?.addEventListener('click', () => {
        // Reset zoom
        zoomLevel = 100;
        applyZoom(zoomLevel);
        
        // Reset modos
        document.body.classList.remove('high-contrast', 'dark-mode');
        localStorage.removeItem('highContrast');
        localStorage.removeItem('darkMode');
        localStorage.removeItem('zoomLevel');
    });

    // Suporte a atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            if (e.key === '+') {
                e.preventDefault();
                if (zoomLevel < MAX_ZOOM) {
                    zoomLevel += ZOOM_STEP;
                    applyZoom(zoomLevel);
                }
            } else if (e.key === '-') {
                e.preventDefault();
                if (zoomLevel > MIN_ZOOM) {
                    zoomLevel -= ZOOM_STEP;
                    applyZoom(zoomLevel);
                }
            } else if (e.key === '0') {
                e.preventDefault();
                zoomLevel = 100;
                applyZoom(zoomLevel);
            }
        }
    });
}); 