const axios = require('axios');
const { EMERGENCIA_MEDICA } = require('../prompts/prompts');
const logger = require('../utils/logger');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function gerarRespostaIA(texto) {
    try {
        const res = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: EMERGENCIA_MEDICA },
                    { role: 'user', content: texto }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                }
            }
        );

        return res.data.choices?.[0]?.message?.content || "Desculpe, não consegui gerar uma resposta.";
    } catch (err) {
        logger.error(`[AI Service] Erro ao consultar Groq: ${err.message}`);
        return "Desculpe, não consegui gerar uma resposta no momento.";
    }
}

module.exports = { gerarRespostaIA };
