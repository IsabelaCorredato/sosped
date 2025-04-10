# 🤖 Chatbot de Emergência com Voz

Este projeto é um **chatbot de emergência baseado em voz**, desenvolvido com **JavaScript e Node.js**, que simula uma **chamada telefônica entre o usuário e o bot**. Utiliza tecnologias nativas do navegador para capturar a voz do usuário, processar o conteúdo e responder com voz sintetizada, em tempo real.

## 📌 Objetivo

Oferecer um atendimento emergencial por voz, onde o chatbot classifica o tipo de emergência com base nas falas do usuário e fornece orientações adequadas. Pode ser utilizado como protótipo para aplicações em saúde, primeiros socorros e segurança.

## ⚙️ Tecnologias Utilizadas

- **JavaScript (ES6+)** — Para manipulação de voz e lógica de conversação.
- **Node.js** — Backend leve para processar mensagens e servir a aplicação.
- **Express.js** — Framework HTTP para criar a API de conversa.
- **Web Speech API (SpeechRecognition)** — Captura da voz do usuário.
- **SpeechSynthesis API** — Voz gerada pelo bot.
- **DeepSeek Lnstudio** — Ambiente de desenvolvimento e IA.

## 🧠 Como Funciona

1. O usuário clica em **"Iniciar Chamada"**.
2. O navegador escuta a fala do usuário e converte em texto.
3. O texto é enviado ao backend Node.js.
4. O chatbot classifica o nível da emergência e envia uma resposta.
5. A resposta é falada de volta ao usuário, e o ciclo continua.

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Navegador compatível com Web Speech API (Chrome recomendado)

### Passos

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/chatbot-voz-emergencia.git
cd chatbot-voz-emergencia

# Instale as dependências
npm install

# Inicie o servidor
node index.js
```

Acesse [http://localhost:3000](http://localhost:3000) para iniciar a chamada com o bot.

## 🧪 Exemplos de Frases para Testar

- “Tem uma pessoa desmaiada aqui.”
- “Estou com muita dor no peito.”
- “Só um corte leve no braço.”
- “Alguém está sangrando bastante!”

## 📁 Estrutura do Projeto

```
chatbot-voz-emergencia/
├── public/
│   ├── index.html      # Interface com botão de chamada
│   └── script.js       # Captura e síntese de voz
├── chatbot.js          # Lógica de classificação da emergência
├── index.js            # Servidor Node.js com API
└── package.json
```

## 📡 Possíveis Expansões

- Integração com APIs de localização
- Conexão com serviços de emergência reais (SAMU, Corpo de Bombeiros)
- Reconhecimento de múltiplos idiomas
- Interface mobile PWA

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

---

### 💬 Dúvidas ou Sugestões?

Fique à vontade para abrir uma **issue** ou enviar um **pull request**.  
Desenvolvido com ❤️ pensando na saúde e segurança de todos.
