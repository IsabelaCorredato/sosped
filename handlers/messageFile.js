
module.exports = async function handleFile(message) {
    console.log(`📂 Arquivo recebido (${message.body || 'Arquivo sem nome'})`);
    // const media = await message.downloadMedia();
};
