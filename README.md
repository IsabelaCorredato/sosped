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

# 🆘 S.O.S. Ped — Projeto de Assistente Inteligente via WhatsApp

Este projeto é um sistema completo que integra um chatbot no WhatsApp com uma IA local (Llama) e transcrição de áudio (Whisper), além de funcionalidades de geolocalização para emergências e suporte rápido.

---

## 🚀 Funcionalidades
- 🤖 Chatbot no WhatsApp com IA local (Llama 3.2 gguf)
- 🎧 Transcrição automática de áudios (Whisper)
- 📍 Geolocalização: localiza hospitais e pontos de atendimento próximos
- 💬 Atendimento inteligente para suporte médico emergencial e primeiros socorros

---

## 🧠 Tecnologias Usadas
- Python 3.13 ➝ API da IA (Llama)
- Python 3.11 ➝ Transcrição de áudio (Whisper)
- Node.js ➝ Bot WhatsApp
- Flask ➝ API REST
- whatsapp-web.js ➝ Integração com WhatsApp Web
- Geoapify API ➝ Localização de hospitais

---

## ⚙️ Dependências

### Python 3.13 (IA)
```
pip install flask llama-cpp-python
```

### Python 3.11 (Whisper)
1. Crie o ambiente virtual:
```
python -m venv venv-whisper
./venv-whisper/Scripts/activate
```

2. Instale os pacotes:
```
pip install openai-whisper torch flask
```

### Node.js (Bot WhatsApp)
```
npm install
```

---

## 🔥 Ordem de Execução

### 1️⃣ Inicie o Whisper
```
cd Projeto ia
./venv-whisper/Scripts/activate
python whisper_runner.py
```

### 2️⃣ Inicie a IA (Llama)
```
python ia.py
```

### 3️⃣ Inicie o Bot WhatsApp
```
npx nodemon index.js
```
ou
```
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
│   └── whisper_runner.py       # Captura e síntese de voz
├── ia.py          # chama e conecta a IA
├── llama           # Modelo de ia utilizado
├── Handler         # Faz a organização entre os arquivos gerados
├── index.js            # Conexão com whatsapp
└── package.json
```

## 📡 Possíveis Expansões

- Integração com APIs de localização
- Conexão com serviços de emergência reais (SAMU, Corpo de Bombeiros)
- Reconhecimento de múltiplos idiomas
- Interface mobile PWA

## LINKS IMPORTANTES!!

- Checklist com cenários dos testes: https://docs.google.com/spreadsheets/d/1WwzZr31JjmKgVZNMJAkDpJzn7nut6vkb/edit?usp=sharing&ouid=103300693782475333321&rtpof=true&sd=true
- Diagrama de Gantt: https://docs.google.com/spreadsheets/d/1gUH-LvxS78DxGOKtMzlDrbCFi8s395-fL3yIq-cyLKw/edit?usp=sharing

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

---

### 💬 Dúvidas ou Sugestões?

Fique à vontade para abrir uma **issue** ou enviar um **pull request**.  
Desenvolvido com ❤️ pensando na saúde e segurança de todos.
