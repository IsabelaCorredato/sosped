const { gerarRespostaIA } = require('../services/aiService');
const logger = require('../utils/logger');

module.exports = async function handleText(message) {
    const texto = message.body;

    if (!texto || typeof texto !== 'string') {
        logger.warn('[handleText] Mensagem de texto inválida.');
        return "Não entendi sua mensagem.";
    }

    logger.info(`[handleText] Texto recebido: "${texto}"`);

    try {
        const resposta = await gerarRespostaIA(texto);
        return resposta;
    } catch (err) {
        logger.error(`[handleText] Erro ao gerar resposta da IA: ${err.message}`);
        return "Ocorreu um erro ao consultar a IA.";
    }
};
