const { transcreverAudioBase64 } = require('../services/sttService');
const logger = require('../utils/logger');

module.exports = async function handleAudio(message) {
    logger.info('[handleAudio] Iniciando processamento de áudio');

    const media = await message.downloadMedia();
    if (!media || !media.data) {
        logger.error('[handleAudio] Falha ao baixar o áudio');
        return null;
    }

    const buffer = Buffer.from(media.data, 'base64');
    const base64Audio = buffer.toString('base64');

    const transcricao = await transcreverAudioBase64(base64Audio);
    return transcricao;
};
