const axios = require('axios');
const FormData = require('form-data');
const logger = require('../utils/logger');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function transcreverAudioBase64(base64Audio, nomeArquivo = 'audio.m4a') {
    try {
        const audioBuffer = Buffer.from(base64Audio, 'base64');
        const form = new FormData();

        form.append('file', audioBuffer, {
            filename: nomeArquivo,
            contentType: 'audio/m4a',
        });
        form.append('model', 'whisper-large-v3-turbo');
        form.append('temperature', '0');
        form.append('response_format', 'verbose_json');
        form.append('timestamp_granularities[]', 'word');
        form.append('language', 'pt');

        const res = await axios.post(
            'https://api.groq.com/openai/v1/audio/transcriptions',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                },
            }
        );

        return res.data.text || "Transcrição não encontrada.";
    } catch (err) {
        logger.error(`[STT Service] Erro ao transcrever áudio: ${err.message}`);
        return null;
    }
}

module.exports = { transcreverAudioBase64 };
