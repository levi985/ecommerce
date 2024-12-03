class FloraBot {
    constructor() {
        this.responses = {
            // Saudações
            'ola': 'Olá! Bem-vindo à Flora Frevo! Como posso ajudar?',
            'oi': 'Olá! Bem-vindo à Flora Frevo! Como posso ajudar?',
            'bom dia': 'Bom dia! Como posso ajudar você hoje?',
            'boa tarde': 'Boa tarde! Em que posso ser útil?',
            'boa noite': 'Boa noite! Como posso ajudar?',
            
            // Informações sobre produtos específicos
            'costela de adao': 'A Costela-de-Adão (Monstera deliciosa) custa entre R$60 e R$149. É uma planta tropical que precisa de luz indireta e água moderada. Quer saber mais detalhes?',
            'monstera': 'A Monstera (Costela-de-Adão) é perfeita para ambientes internos, com folhas grandes e recortadas. Preços de R$60 a R$149. Deseja ver fotos?',
            'palmeira': 'A Palmeira Areca custa entre R$50 e R$159. É ótima para purificar o ar e dar um toque tropical ao ambiente. Quer conhecer mais?',
            'filodendro': 'O Filodendro custa entre R$39 e R$128. É uma planta resistente e versátil, ideal para iniciantes. Posso te mostrar algumas variedades?',
            'samambaia': 'A Samambaia custa entre R$27 e R$80. É perfeita para ambientes úmidos como banheiros. Quer dicas de cuidados?',
            'antúrio': 'O Antúrio custa entre R$89 e R$299. Suas flores vermelhas duram muito tempo. Quer saber como cuidar?',
            
            // Dúvidas sobre cuidados
            'cuidados': 'Que planta específica você quer saber sobre os cuidados? Temos guias detalhados para cada espécie.',
            'regar': 'A frequência de rega depende da planta. Qual espécie você tem interesse? Posso dar dicas específicas.',
            'luz': 'Cada planta tem sua necessidade de luz. Algumas preferem sol direto, outras luz indireta. Qual planta você quer saber?',
            'adubo': 'Recomendamos adubo orgânico a cada 3 meses. Temos opções à venda. Quer conhecer?',
            'terra': 'Usamos substrato especial para cada tipo de planta. Quer saber qual é o ideal para sua planta?',
            'poda': 'A poda varia conforme a espécie. Qual planta você precisa podar?',
            
            // Informações de compra
            'preco': 'Nossos preços variam de R$27 a R$299. Qual planta específica você gostaria de saber o preço?',
            'preços': 'Temos plantas para todos os orçamentos, de R$27 a R$299. Qual faixa de preço você procura?',
            'desconto': 'Temos descontos para compras acima de R$200 e promoções semanais. Quer receber nossas ofertas?',
            'promocao': 'Atualmente temos 20% OFF em todas as samambaias! Quer ver as opções?',
            'frete': 'O frete é calculado pelo CEP. Pode me informar seu CEP para calcular?',
            
            // Entrega e envio
            'entrega': 'Realizamos entregas em todo o Brasil! O prazo médio é de 3 a 7 dias úteis. Quer calcular o prazo para sua região?',
            'prazo': 'O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização. Quer fazer uma consulta?',
            'rastreio': 'Para rastrear seu pedido, use o código enviado no seu email de confirmação. Precisa de ajuda para encontrar?',
            
            // Pagamento
            'pagamento': 'Aceitamos cartão de crédito, PIX, boleto e transferência bancária. Qual forma prefere?',
            'parcela': 'Parcelamos em até 12x sem juros no cartão de crédito. Quer simular o valor das parcelas?',
            'pix': 'Oferecemos 5% de desconto para pagamentos via PIX. Quer saber mais?',
            'boleto': 'O boleto tem vencimento em 3 dias úteis. Posso gerar um para você?',
            
            // Problemas e suporte
            'problema': 'Sinto muito pelo inconveniente. Pode me detalhar qual o problema para que eu possa ajudar?',
            'troca': 'Nossa política de trocas é válida por 7 dias após o recebimento. Qual o motivo da troca?',
            'devolucao': 'Para devoluções, a planta deve estar em perfeito estado. Quer conhecer o processo?',
            'reclamacao': 'Lamento pelo ocorrido. Pode me dar mais detalhes para que possamos resolver?',
            
            // Contato
            'contato': 'Você pode nos contatar pelo WhatsApp (81) 97070-7069 ou email florafrevot@gmail.com',
            'telefone': 'Nosso telefone é (81) 97070-7069. Posso passar mais alguma informação?',
            'email': 'Nosso email é florafrevot@gmail.com. Respondemos em até 24h úteis.',
            'endereco': 'Estamos localizados em: 1993 Tão Tão Distante, Pernambuco Brasil',
            'horario': 'Nosso atendimento é de segunda a sexta, das 8h às 18h, e sábados das 9h às 13h.',
            
            // Dúvidas gerais
            'duvida': 'Estou aqui para ajudar! Por favor, especifique sua dúvida.',
            'ajuda': 'Claro! Em que posso ajudar você hoje?',
            'obrigado': 'Por nada! Estou sempre à disposição para ajudar! Precisa de mais alguma coisa?',
            'tchau': 'Até logo! Volte sempre à Flora Frevo!',
            
            // Resposta padrão
            'default': 'Desculpe, não entendi completamente. Pode reformular sua pergunta? Estou aqui para ajudar!'
        };
    }

    processMessage(message) {
        const normalizedMessage = message.toLowerCase().trim();
        
        // Verifica múltiplas palavras-chave na mensagem
        for (let key in this.responses) {
            if (normalizedMessage.includes(key)) {
                return this.responses[key];
            }
        }

        // Se a mensagem contiver "planta" ou "flores", mas não encontrou resposta específica
        if (normalizedMessage.includes('planta') || normalizedMessage.includes('flores')) {
            return 'Temos uma grande variedade de plantas tropicais. Você procura alguma espécie específica? Posso te ajudar a encontrar a planta ideal para você!';
        }

        // Se a mensagem contiver "quanto" ou "valor", mas não encontrou resposta específica
        if (normalizedMessage.includes('quanto') || normalizedMessage.includes('valor')) {
            return 'Nossos preços variam conforme a espécie e o tamanho da planta. Qual planta específica você gostaria de saber o valor?';
        }

        return this.responses.default;
    }
}

// Interface do Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new FloraBot();
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';
    
    const chatIcon = document.createElement('div');
    chatIcon.id = 'chat-icon';
    chatIcon.innerHTML = '💬';
    
    const chatBox = document.createElement('div');
    chatBox.id = 'chat-box';
    chatBox.style.display = 'none';
    
    const chatHeader = document.createElement('div');
    chatHeader.id = 'chat-header';
    chatHeader.innerHTML = `
        <h3>Flora Bot 🌿</h3>
        <button id="close-chat">×</button>
    `;
    
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    
    const chatInput = document.createElement('div');
    chatInput.id = 'chat-input';
    chatInput.innerHTML = `
        <input type="text" placeholder="Digite sua mensagem...">
        <button id="send-message">Enviar</button>
    `;
    
    chatBox.appendChild(chatHeader);
    chatBox.appendChild(chatMessages);
    chatBox.appendChild(chatInput);
    
    chatContainer.appendChild(chatIcon);
    chatContainer.appendChild(chatBox);
    document.body.appendChild(chatContainer);
    
    // Adicionar mensagem inicial
    addMessage('bot', 'Olá! Sou o Flora Bot, assistente virtual da Flora Frevo. Como posso ajudar?');
    
    // Event Listeners
    chatIcon.addEventListener('click', () => {
        chatBox.style.display = 'flex';
        chatIcon.style.display = 'none';
    });
    
    document.getElementById('close-chat').addEventListener('click', () => {
        chatBox.style.display = 'none';
        chatIcon.style.display = 'flex';
    });
    
    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.querySelector('#chat-input input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function sendMessage() {
        const input = document.querySelector('#chat-input input');
        const message = input.value.trim();
        
        if (message) {
            addMessage('user', message);
            const response = chatbot.processMessage(message);
            setTimeout(() => addMessage('bot', response), 500);
            input.value = '';
        }
    }
    
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        document.getElementById('chat-messages').appendChild(messageDiv);
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    }
}); 