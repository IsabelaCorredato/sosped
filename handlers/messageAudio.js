const fs = require('fs');
const path = require('path');

module.exports = async function handleAudio(message) {
    console.log(`🎵 [LOG] Áudio recebido de ${message.from}`);

    // Baixar o áudio
    const media = await message.downloadMedia();

    if (!media) {
        console.log('⚠️ Falha ao baixar o áudio.');
        return null;
    }

    // Criar pasta de destino (se não existir)
    const pastaDestino = path.join(__dirname, '../audios/audios para transcrever');
    if (!fs.existsSync(pastaDestino)) {
        fs.mkdirSync(pastaDestino, { recursive: true });
    }

    // Gerar nome do arquivo: contato_timestamp.extension
    const contato = message.from.replace(/[@.]/g, '_'); // substitui @ e . por _
    const timestamp = Date.now();
    const extensao = media.mimetype.split('/')[1].split(';')[0].trim();

    const nomeArquivo = `${contato}_${timestamp}.${extensao}`;
    const caminhoCompleto = path.join(pastaDestino, nomeArquivo);

    // Salvar o arquivo (promisify para garantir que está pronto antes de retornar)
    await fs.promises.writeFile(caminhoCompleto, media.data, 'base64');
    console.log(`✅ Áudio salvo em: ${caminhoCompleto}`);

    // Retorna o caminho completo para ser usado no index.js
    return caminhoCompleto;
};
