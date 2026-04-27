document.addEventListener('DOMContentLoaded', () => {
  // Pega o botão flutuante já existente do WhatsApp
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInputField = document.getElementById('chatbot-input-field');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');

  // Adicione sua chave de API do Google AI Studio aqui
  const API_KEY = 'AIzaSyAQN_Y186goZaZ9YiaeaLXcXwPorFPpWSQ'; 
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', (e) => {
      e.preventDefault(); // Impede de abrir o Whatsapp diretamente ao clicar no botão
      chatbotContainer.classList.add('active');
      whatsappFloat.style.display = 'none'; // Esconde o botão do WhatsApp
    });
  }

  chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    if (whatsappFloat) whatsappFloat.style.display = 'flex'; // Mostra o botão novamente
  });

  // Fecha o chat se o usuário clicar fora dele
  document.addEventListener('click', (e) => {
    if (
      chatbotContainer.classList.contains('active') && 
      !chatbotContainer.contains(e.target) && 
      (!whatsappFloat || !whatsappFloat.contains(e.target))
    ) {
      chatbotContainer.classList.remove('active');
      if (whatsappFloat) whatsappFloat.style.display = 'flex';
    }
  });

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  async function sendMessageToGemini(message) {
    if (API_KEY === 'SUA_CHAVE_API_AQUI') {
      return "Para que o chat funcione, você precisa inserir sua chave da API do Google AI Studio no arquivo js/chatbot.js.";
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é uma assistente virtual da Acumaru Consultoria Ambiental. 
Abaixo estão as informações e dados sobre a empresa que você DEVE usar para basear as suas respostas:

${typeof CONTEXTO_CONSULTORIA !== 'undefined' ? CONTEXTO_CONSULTORIA : ''}

=== PERGUNTA DO CLIENTE: ===
${message}
=== 
Responda de forma breve e humanizada e somente ajude o cliente com base no contexto acima se ele pedir(deixe a resposta limpa, sem tags nem outros simbolos se quiser referenciar ou algo do tipo).`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Erro ao chamar API Gemini:", error);
      return "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.";
    }
  }

  async function handleSend() {
    const text = chatbotInputField.value.trim();
    if (!text) return;

    // Adiciona a mensagem do usuário
    addMessage(text, 'user');
    chatbotInputField.value = '';

    // Mostra indicação de digitando
    const typingMessage = document.createElement('div');
    typingMessage.classList.add('message', 'bot-message');
    typingMessage.textContent = 'Digitando...';
    typingMessage.id = 'typing-indicator';
    chatbotMessages.appendChild(typingMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Pega a resposta do Gemini
    const reply = await sendMessageToGemini(text);

    // Remove o "digitando"
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();

    // Adiciona a resposta final
    // Transforma links em hiperlinks clicáveis usando regex
    const formattedReply = reply.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Como a addMessage insere via textContent por segurança, 
    // precisamos ajustar a função internamente para suportar o link:
    addMessageHTML(formattedReply, 'bot');
  }

  function addMessageHTML(html, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    // Sanitize simples caso necessite evitar scripts:
    messageDiv.innerHTML = html;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  chatbotSendBtn.addEventListener('click', handleSend);
  chatbotInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });
});
