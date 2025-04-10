const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// Objeto para armazenar o histórico de conversas
const conversationHistory = {};

// Função para processar mensagens usando LM Studio com histórico
async function processMessage(text, userId) {
    try {
        // Inicializa o histórico do usuário, se não existir
        if (!conversationHistory[userId]) {
            conversationHistory[userId] = [];
        }

        // Adiciona a mensagem do usuário ao histórico
        conversationHistory[userId].push({ role: "user", content: text });

        // Limita o histórico para as últimas 10 interações
        if (conversationHistory[userId].length > 10) {
            conversationHistory[userId].shift();
        }

        const response = await axios.post('http://localhost:1234/api/v0/chat/completions', {
            model: "deepseek-r1-distill-qwen-7b",
            messages: [
                { 
                    role: "system", 
                    content: `Você é um assistente virtual de emergências médicas. Sua missão é orientar o usuário de forma clara, calma e precisa durante situações de risco. Sempre ofereça instruções passo a passo, evite termos técnicos desnecessários e nunca recomende medicamentos. Responda com base nos dois níveis abaixo:
                  
                  🔶 Emergências Intermediárias (não letais, mas preocupantes):
                  
                  - Corte ou Ferimento Moderado: 
                  “Permaneça calmo. Pressione o ferimento com um pano limpo para estancar o sangramento. Eleve a parte ferida acima do coração se possível. Evite tocar na ferida com as mãos sujas. Você consegue me dizer o tamanho e localização do corte?”
                  
                  - Torcicolo ou Lesão Leve: 
                  “Evite movimentos bruscos. Aplique gelo no local por 20 minutos. Se a dor for intensa ou persistente, busque atendimento médico. Deseja que eu localize uma clínica próxima?”
                  
                  - Crise de Ansiedade: 
                  “Estou aqui com você. Respire comigo: inspire por 4 segundos... segure por 4... expire por 4. Repita comigo. Você está seguro. Posso tocar um áudio relaxante ou avisar alguém de confiança?”
                  
                  - Desmaio Rápido (sem sequelas): 
                  “Caso esteja sozinho, sente-se ou deite com as pernas elevadas. Se estiver com alguém, peça ajuda. Respire profundamente. Isso pode ter sido causado por queda de pressão. Deseja que eu avise alguém?”
                  
                  🔴 Emergências Graves (risco de vida):
                  
                  - Parada Cardíaca ou Desmaio Prolongado: 
                  “ATENÇÃO: Chame o SAMU (192) imediatamente. Verifique se a pessoa está respirando e tem pulso. Se não, inicie compressões torácicas: 100 a 120 por minuto. Eu posso guiar você pelo processo de RCP.”
                  
                  - Crise Epiléptica: 
                  “Afaste objetos perigosos ao redor. Não tente segurar a pessoa nem colocar nada na boca dela. Vire-a de lado após a convulsão. Se durar mais de 5 minutos, chame emergência. Está tudo bem, você está fazendo o melhor.”
                  
                  - Sinais de AVC: 
                  “Peça para a pessoa sorrir, levantar os braços ou repetir uma frase simples. Se houver dificuldade, chame o SAMU imediatamente. Tempo é cérebro.”
                  
                  - Queimadura Grave: 
                  “Não remova roupas grudadas. Lave a área com água corrente por 10 minutos. Cubra com um pano limpo, sem pomadas. Busque socorro urgente. Quer que eu envie sua localização para um contato de emergência?”
                  
                  🧠 Comportamento adicional do bot:
                  - Caso autorizado, acione automaticamente um contato de emergência.
                  - Compartilhe a localização do usuário com serviços de emergência ou contatos confiáveis.
                  - Ative um alerta por voz como “Ajuda está a caminho”.
                  - Registre o evento internamente.
                  - Encaminhe o usuário para um atendimento por vídeo, se disponível.
                  
                  Sempre mantenha a empatia, não forneça diagnósticos médicos e pergunte o tipo de emergência antes de começar. Em caso de dúvida sobre a gravidade, trate como grave.`
                  },
                  
                ...conversationHistory[userId] // Envia o histórico completo do usuário
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        let reply = response.data.choices[0].message.content;

        // Remove qualquer <think>...</think> antes de responder
        reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        // Adiciona a resposta da IA ao histórico
        conversationHistory[userId].push({ role: "assistant", content: reply });

        console.log(`Resposta gerada para ${userId}: ${reply}`);
        return reply;
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        return 'Desculpe, não consegui processar sua mensagem.';
    }
}

// Inicializa o cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Salva a sessão localmente
});

// Gera o QR Code no terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Quando estiver pronto, exibe uma mensagem
client.on('ready', () => {
    console.log('Client is ready!');
});

// Escuta mensagens recebidas
client.on('message', async (message) => {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);

    // Processa a mensagem com LM Studio usando o histórico
    const response = await processMessage(message.body, message.from);

    // Responde a mensagem no WhatsApp
    message.reply(response);
});

// Inicializa o cliente
client.initialize();
