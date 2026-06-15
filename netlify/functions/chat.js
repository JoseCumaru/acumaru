exports.handler = async function(event, context) {
  // Apenas aceitar requisições do tipo POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Pega a mensagem e o contexto enviados pelo front-end
    const { message, contextText } = JSON.parse(event.body);

    // Variável de ambiente configurada no painel do Netlify
    const apiKey = process.env.OPENROUTER_API_KEY;

    // Faz a chamada verdadeira para a OpenAI/OpenRouter (Escondido do usuário)
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://acumaru.netlify.app',
        'X-Title': 'Acumaru Consultoria'
      },
      body: JSON.stringify({
        model: 'nemotron-3-super-120b-a12b:free',
        //model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
        messages: [
          {
            role: 'system',
            content: `Você é uma assistente virtual da Acumaru Consultoria Ambiental. \n\nAbaixo estão as informações e dados sobre a empresa que você DEVE usar para basear as suas respostas:\n\n${contextText}\n\nResponda de forma breve e humanizada e somente ajude o cliente com base no contexto acima se ele pedir (deixe a resposta limpa, sem tags nem outros simbolos se quiser referenciar ou algo do tipo).`
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };

  } catch (error) {
    console.error("Erro na Netlify Function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno ao tentar processar a mensagem.' })
    };
  }
};
