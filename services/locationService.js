const axios = require('axios');
const logger = require('../utils/logger');

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

// Busca hospitais próximos usando Geoapify
async function buscarHospitaisProximos(latitude, longitude) {
    const radius = 5000;
    const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},${radius}&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

    try {
        const response = await axios.get(url);
        const hospitais = response.data.features;

        // Log completo para debug
        logger.info(`[locationService] Hospitais retornados pela API: ${hospitais.length}`);
        console.log(JSON.stringify(hospitais, null, 2)); // Pode ser removido em produção

        if (!hospitais.length) {
            return { listaDetalhada: [] };
        }

        const listaDetalhada = hospitais.slice(0, 3).map((item) => ({
            nome: item.properties.name || 'Nome não disponível',
            endereco: item.properties.formatted || 'Endereço não disponível',
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0]
        }));

        return { listaDetalhada };
    } catch (error) {
        logger.error(`[locationService] Erro ao buscar hospitais: ${error.message}`);
        return { listaDetalhada: [] };
    }
}

// Gera o prompt para enviar à IA com base nos dados de localização
function gerarPromptLocalizacao({ latitude, longitude, hospitais, horaMensagem }) {
    let prompt = `O usuário está em:\nLatitude: ${latitude}\nLongitude: ${longitude}\n\n`;
    prompt += `Horário atual: ${horaMensagem}\n\nHospitais próximos:\n`;

    hospitais.forEach((hospital, i) => {
        prompt += `${i + 1}. Nome: ${hospital.nome}\n`;
        prompt += `   Endereço: ${hospital.endereco}\n`;
        prompt += `   Coordenadas: ${hospital.latitude}, ${hospital.longitude}\n\n`;
    });

    prompt += `🔎 Informe apenas os hospitais abertos AGORA. Calcule a distância e retorne no formato:\n`;
    prompt += `Nome: XXX\nDistância: X km\nEndereço: XXX\n\n`;

    return prompt;
}

module.exports = {
    buscarHospitaisProximos,
    gerarPromptLocalizacao
};
