const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
<<<<<<< HEAD
const handleAudio = require('./handlers/messageAudio');
const handleVisualMedia = require('./handlers/messageVisualMedia');
const handleFile = require('./handlers/messageFile');
const handleSticker = require('./handlers/messageSticker');
const handlePoll = require('./handlers/messagePoll');
const handleContact = require('./handlers/messageContact');
const handleOthers = require('./handlers/messageOthers');
const handleLocation = require('./handlers/messageLocation');

const log = require('./utils/logger');
const { executablePath } = require('puppeteer');

const filaMensagens = [];
let processando = false;

function adicionarNaFila(message, tipo) {
    filaMensagens.push({ message, tipo });
    console.log(`🟡 Adicionado na fila (${tipo}). Total na fila: ${filaMensagens.length}`);
    processarFila();
}

async function processarFila() {
    if (processando || filaMensagens.length === 0) {
        return;
    }

    processando = true;
    const { message, tipo } = filaMensagens.shift();
    console.log(`🟢 Processando ${tipo} de ${message.from}`);

    if (tipo === 'text') {
        await processarMensagemDeTexto(message);
    } else if (tipo === 'audio-transcribe') {
        await processarMensagemDeAudio(message);
    }

    processando = false;
    processarFila();
}

async function processarMensagemDeTexto(message) {
    try {
        const prompt = message.body;
        console.log(`💬 Enviando para IA: ${prompt}`);

        const res = await axios.post('http://localhost:5000/chat', {
            message: prompt
        });

        const respostaIA = res.data.response;
        console.log(`🤖 Resposta da IA: ${respostaIA}`);

        await message.reply(respostaIA);
    } catch (err) {
        console.error('❌ Erro ao consultar IA:', err.message);
        await message.reply("Ocorreu um erro ao consultar a IA.");
    }
}

async function processarMensagemDeAudio(message) {
    try {
        // 1️⃣ Baixa o áudio normalmente
        const audioPath = await handleAudio(message); // já salva o arquivo na pasta correta

        if (!audioPath) {
            console.error('❌ Não foi possível obter o caminho do áudio.');
            return;
        }

        console.log(`🎧 Áudio salvo em: ${audioPath}`);

        // 2️⃣ Envia o áudio para o Whisper API para transcrição
        console.log('🌀 Enviando áudio para transcrição...');

        const resWhisper = await axios.post('http://localhost:5001/transcribe', {
            audio_path: audioPath
        });

        const transcricao = resWhisper.data.transcription;
        console.log(`📝 Transcrição:\n${transcricao}`);

        // 3️⃣ Envia a transcrição para a IA
        const resIA = await axios.post('http://localhost:5000/chat', {
            message: transcricao
        });

        const respostaIA = resIA.data.response;
        console.log(`🤖 Resposta da IA: ${respostaIA}`);

        await message.reply(respostaIA);
    } catch (err) {
        console.error('❌ Erro ao processar áudio:', err.message);
        await message.reply("Ocorreu um erro ao transcrever ou consultar a IA.");
    }
}

console.log('🚀 Iniciando bot...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: executablePath()
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    log.info('📱 Escaneie o QR Code para conectar');
});

client.on('ready', () => {
    log.success('🤖 Bot conectado com sucesso!');
});

client.on('message', async (message) => {
    const { from, type, timestamp, body } = message;

    if (from === 'status@broadcast') return; // Ignorar status ✅

    const contact = await message.getContact();
    const numeroDesejado = '5514996812051'; // 👈 Substitua pelo número que quer monitorar

    if (contact.number !== numeroDesejado) {
        return; // Ignora mensagens de outros contatos
    }

    const dataHora = new Date(timestamp * 1000).toLocaleString('pt-BR');
    const nome = contact.pushname || contact.name || contact.number || 'Desconhecido';
    const contatoFormatado = `${nome} (${from})`;
    const isGroup = from.endsWith('@g.us');
    const source = isGroup ? '📢 Grupo' : '👤 Privado';
    const texto = body?.trim() || '(sem texto)';

    log.info(`${source} | ${contatoFormatado} | ${dataHora}`);
    log.info(`📦 Tipo: ${type}`);

    if (type === 'chat') {
        adicionarNaFila(message, 'text');
    } else if (type === 'ptt' || type === 'audio') {
        adicionarNaFila(message, 'audio-transcribe');
    } else if (type === 'image' || type === 'video') {
        await handleVisualMedia(message);
    } else if (type === 'document') {
        await handleFile(message);
    } else if (type === 'sticker') {
        await handleSticker(message);
    } else if (type === 'poll') {
        await handlePoll(message);
    } else if (type === 'vcard' || type === 'multi_vcard') {
        await handleContact(message);
    } else if (type === 'location') {  // ✅ Novo handler adicionado aqui!
        await handleLocation(message);
    } else {
        await handleOthers(message);
    }
});

=======

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
>>>>>>> 96ea602a628d4b98c134d5a7709c6cf30454953d
client.initialize();
