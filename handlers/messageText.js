const axios = require('axios');

async function handleTextMessage(client, msg) {
    if (msg.body) {
        try {
            const res = await axios.post('http://localhost:5000/chat', {
                message: msg.body
            });

            // await msg.reply(res.data.response);
        } catch (err) {
            console.error('Erro ao consultar IA:', err);
            // await msg.reply("Ocorreu um erro ao consultar a IA.");
        }
    }
}

module.exports = handleTextMessage;
