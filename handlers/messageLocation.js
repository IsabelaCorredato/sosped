const axios = require('axios');

module.exports = async function handleLocation(message) {
    console.log(`📍 [LOG] Localização recebida de ${message.from}`);

    const latitude = message.location.latitude;
    const longitude = message.location.longitude;
    console.log(`🌐 Latitude: ${latitude} | Longitude: ${longitude}`);

    const hospitais = await buscarHospitaisProximos(latitude, longitude);

    console.log(hospitais.logDetalhado);  // ✅ Loga tudo no console

    // 👉 Enviar para IA
    const payload = {
        userLocation: {
            latitude,
            longitude
        },
        hospitais: hospitais.listaDetalhada,
        horaMensagem: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    try {
        const res = await axios.post('http://localhost:5000/chat', {
            message: gerarPrompt(payload)
        });

        const respostaIA = res.data.response;
        console.log(`🤖 Resposta da IA: ${respostaIA}`);

        // ✅ Envia resposta para o contato
        await message.reply(respostaIA);
    } catch (err) {
        console.error('❌ Erro ao enviar para a IA:', err.message);
        await message.reply("Ocorreu um erro ao consultar os hospitais.");
    }
};

// 🔥 Busca os hospitais e retorna tanto texto quanto dados detalhados
async function buscarHospitaisProximos(latitude, longitude) {
    const radius = 5000; // 5 km
    const apiKey = 'ddebb4a501d94ce3b537cd64482ce0fe';
    const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},${radius}&limit=10&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const hospitais = response.data.features;

        if (hospitais.length === 0) {
            console.log('Nenhum hospital encontrado na região.');
            return {
                logDetalhado: 'Nenhum hospital encontrado na sua região.',
                listaDetalhada: []
            };
        }

        let logText = '🏥 Hospitais próximos:\n\n';
        const listaDetalhada = [];

        hospitais.slice(0, 3).forEach((item, index) => {
            const nome = item.properties.name || 'Nome não disponível';
            const endereco = item.properties.formatted || 'Endereço não disponível';
            const lat = item.geometry.coordinates[1];
            const lon = item.geometry.coordinates[0];

            logText += `${index + 1}. ${nome}\n📍 ${endereco}\n\n`;

            listaDetalhada.push({
                nome,
                endereco,
                latitude: lat,
                longitude: lon
            });
        });

        return {
            logDetalhado: logText,
            listaDetalhada
        };
    } catch (error) {
        console.error('Erro ao buscar hospitais:', error.message);
        return {
            logDetalhado: 'Ocorreu um erro ao buscar hospitais.',
            listaDetalhada: []
        };
    }
}

// 🧠 Prompt para a IA: inclui localização do usuário, hospitais e hora
function gerarPrompt(payload) {
    const { userLocation, hospitais, horaMensagem } = payload;

    let prompt = `O usuário enviou a localização:\nLatitude: ${userLocation.latitude}\nLongitude: ${userLocation.longitude}\n\n`;

    prompt += `Agora são ${horaMensagem}.\n\n`;
    prompt += `Aqui estão 3 hospitais próximos com seus detalhes:\n\n`;

    hospitais.forEach((hospital, index) => {
        prompt += `${index + 1}. Nome: ${hospital.nome}\n`;
        prompt += `   Endereço: ${hospital.endereco}\n`;
        prompt += `   Latitude: ${hospital.latitude}\n`;
        prompt += `   Longitude: ${hospital.longitude}\n\n`;
    });

    prompt += `Analise e diga apenas os hospitais que estão abertos neste horário (agora são ${horaMensagem}). 
Para cada um, também calcule a distância aproximada até o usuário com base nas coordenadas e me retorne a lista de hospitais mais próximos que estão abertos AGORA, no seguinte formato:\n\n
Nome do Hospital: XXXX
Distância: X km
Endereço: XXXX\n\n`;

    prompt += `⚠️ Importante: Ignore hospitais fechados e liste apenas os abertos.\n`;

    return prompt;
}
