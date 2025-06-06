// === Ponto central do sistema ===
// Conecta ao WhatsApp, recebe mensagens, identifica o tipo e roteia para os handlers apropriados.

require('dotenv').config(); // Carrega chaves do .env

// === Pacotes externos ===
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


// === Internos: Handlers, services, Utils ===
const logger = require('./utils/logger');
const handleAudio = require('./handlers/messageAudio');
const handleLocation = require('./handlers/messageLocation');
const handleText = require('./handlers/messageText');
const { gerarRespostaIA } = require('./services/aiService');
const { gerarAudioBase64 } = require('./services/ttsService');


// === Log em tempo real ===
process.stdout.write = (function(write) {
  return function(string, encoding, fd) {
    write.apply(process.stdout, arguments);
    process.stdout.emit('flush');
  };
})(process.stdout.write);




// === Configuração ===
const numeroAlvo = '1122333333333'; // Filtro de numnero para testes. formato:{DDI}{DDD}{Numero}

// === Inicialização do cliente WhatsApp ===
const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    logger.info('📱 Escaneie o QR Code para conectar.');
});

client.on('ready', () => {
    logger.info('🤖 Bot conectado com sucesso!');
});

client.on('message', async (message) => {
    const { from, type } = message;
    if (message.fromMe || !from.includes(numeroAlvo)) return;

    logger.info(`📩 Nova mensagem recebida de ${from} | Tipo: ${type}`);

    try {
        if (type === 'location') {
            logger.info('📍 Roteando para handler de localização');
            return await handleLocation(message, client);

        }

        let textoFinal = '';

        if (type === 'chat') {
            const respostaTexto = await handleText(message);
            await message.reply(respostaTexto);
            return;
        } else if (type === 'ptt' || type === 'audio') {
            const transcricao = await handleAudio(message);
            if (!transcricao) return await message.reply("Não consegui transcrever o áudio.");
            textoFinal = transcricao;
        } else {
            logger.warn(`⚠️ Tipo de mensagem não suportado: ${type}`);
            return await message.reply("📎 Tipo de mensagem não suportado no momento. Envie somente texto, áudio ou localização.");
        }

        const resposta = await gerarRespostaIA(textoFinal);
        await message.reply(resposta);
        logger.info(`🤖 Resposta enviada: "${resposta}"`);

        const audioBase64 = await gerarAudioBase64(resposta);
        if (audioBase64) {
            const mediaAudio = new MessageMedia('audio/mp3', audioBase64, 'resposta.mp3');
            await client.sendMessage(from, mediaAudio, { sendAudioAsVoice: true });
            logger.info(`🔊 Resposta em áudio enviada com sucesso.`);
        }

    } catch (err) {
        logger.error(`❌ Erro ao processar mensagem: ${err.message}`);
        await message.reply("Erro ao processar sua mensagem.");
    }
});

client.initialize();
