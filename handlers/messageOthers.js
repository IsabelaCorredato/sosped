const logger = require('../utils/logger');

/**
 * Handler genérico para tipos de mensagens ainda não implementados.
 * Tipos que caem aqui:
 * - sticker
 * - poll
 * - contact
 * - file
 * - visual media (imagem, vídeo, gif)
 * - outros não reconhecidos
 */
module.exports = async function handleOthers(message) {
    const { type, from } = message;

    logger.warn(`[handleOthers] Tipo de mensagem não suportado: ${type} | Remetente: ${from}`);
    await message.reply(`📎 Este tipo de mensagem (${type}) ainda não é suportado no sistema.`);
};