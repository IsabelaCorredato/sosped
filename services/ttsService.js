const axios = require('axios');
const logger = require('../utils/logger');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function gerarAudioBase64(texto) {
    try {
        const payload = {
            input: { text: texto },
            voice: { languageCode: "pt-BR", ssmlGender: "FEMALE" },
            audioConfig: { audioEncoding: "MP3" }
        };

        const res = await axios.post(
            `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${GEMINI_API_KEY}`,
            payload
        );

        return res.data.audioContent;
    } catch (err) {
        logger.error(`[TTS Service] Erro ao gerar áudio: ${err.message}`);
        return null;
    }
}

module.exports = { gerarAudioBase64 };
