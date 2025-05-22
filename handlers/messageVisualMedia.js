module.exports = async function handleVisualMedia(message) {
    const mediaType = message.type;
    console.log(`🖼️ Mídia visual recebida (${mediaType})`);
    // Se quiser baixar a mídia:
    // const media = await message.downloadMedia();
};
