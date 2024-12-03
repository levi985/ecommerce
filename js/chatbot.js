class FloraBot {
    constructor() {
        this.responses = {
            'ola': 'Olá! Bem-vindo à Flora Frevo! Como posso ajudar?',
            'oi': 'Olá! Bem-vindo à Flora Frevo! Como posso ajudar?',
            'preço': 'Nossos preços variam de R$27 a R$299. Qual planta específica você gostaria de saber o preço?',
            'entrega': 'Realizamos entregas em todo o Brasil! O prazo médio é de 3 a 7 dias úteis.',
            'pagamento': 'Aceitamos cartão de crédito, PIX, boleto e transferência bancária.',
            'cuidados': 'Cada planta tem cuidados específicos. Qual planta você tem interesse?',
            'duvida': 'Estou aqui para ajudar! Por favor, especifique sua dúvida.',
            'contato': 'Você pode nos contatar pelo WhatsApp (81) 97070-7069 ou email florafrevot@gmail.com',
            'default': 'Desculpe, não entendi. Pode reformular sua pergunta?'
        };
    }

    processMessage(message) {
        const normalizedMessage = message.toLowerCase().trim();
        
        for (let key in this.responses) {
            if (normalizedMessage.includes(key)) {
                return this.responses[key];
            }
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