import os

def add_accessibility_to_file(filename, is_product_page=False):
    with open(filename, 'r', encoding='utf-8') as file:
        content = file.read()

    # Ajustar caminho do CSS baseado na localização do arquivo
    css_path = '../accessibility.css' if is_product_page else 'accessibility.css'
    js_path = '../accessibility.js' if is_product_page else 'accessibility.js'

    # Adicionar links no head
    head_content = f'''
    <link rel="stylesheet" href="{css_path}">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <script type="text/javascript">
        function googleTranslateElementInit() {{
            new google.translate.TranslateElement({{
                pageLanguage: 'pt',
                includedLanguages: 'en,pt',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }}, 'google_translate_element');
        }}
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
    '''

    # Adicionar elementos após body
    body_content = '''
    <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
            <div class="vw-plugin-top-wrapper"></div>
        </div>
    </div>

    <div id="google_translate_element"></div>

    <script>
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    </script>
    '''

    # Botões de acessibilidade
    nav_buttons = '''
    <button id="increase-text" aria-label="Aumentar texto">
        <i class='bx bx-zoom-in'></i>
    </button>
    <button id="decrease-text" aria-label="Diminuir texto">
        <i class='bx bx-zoom-out'></i>
    </button>
    <button id="toggle-contrast" aria-label="Alto contraste">
        <i class='bx bx-adjust'></i>
    </button>
    <button id="toggle-dark-mode" aria-label="Modo escuro">
        <i class='bx bx-moon'></i>
    </button>
    <button id="reset-accessibility" aria-label="Resetar configurações">
        <i class='bx bx-reset'></i>
    </button>
    '''

    # Inserir conteúdo
    content = content.replace('</head>', head_content + '</head>')
    content = content.replace('<body', body_content + '<body')

    # Encontrar onde inserir os botões
    # Procurar pelo div class="nav-icon" ou header__right
    nav_icon_pos = content.find('<div class="nav-icon">')
    if nav_icon_pos != -1:
        # Procurar pelo menu-icon para inserir antes dele
        menu_icon_pos = content.find('<div class="bx bx-menu"', nav_icon_pos)
        if menu_icon_pos != -1:
            content = content[:menu_icon_pos] + nav_buttons + content[menu_icon_pos:]
        else:
            # Se não encontrar o menu-icon, inserir antes do fechamento da div nav-icon
            close_div_pos = content.find('</div>', nav_icon_pos)
            if close_div_pos != -1:
                content = content[:close_div_pos] + nav_buttons + content[close_div_pos:]

    # Adicionar o script de acessibilidade
    script_tag = f'<script src="{js_path}"></script>'
    content = content.replace('</body>', script_tag + '</body>')

    # Salvar arquivo
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(content)

# Lista de arquivos para atualizar
files = [
    'busca.html',
    'login.html',
    'produto1.html',
    'pagProdutos/produto3.html',
    'pagProdutos/produto4.html',
    'pagProdutos/produto5.html',
    'pagProdutos/produto6.html',
    'pagProdutos/produto7.html',
    'pagProdutos/produto8.html'
]

# Atualizar cada arquivo
for file in files:
    try:
        add_accessibility_to_file(file, 'pagProdutos' in file)
        print(f'Arquivo {file} atualizado com sucesso!')
    except Exception as e:
        print(f'Erro ao atualizar {file}: {str(e)}') 