# Chatbot de Emergência com Google Cloud e Dialogflow

Este repositório descreve o desenvolvimento e a implantação de um chatbot de emergência, projetado para fornecer respostas rápidas e precisas em situações de emergência. O chatbot é integrado com as APIs do Google Cloud, incluindo Google Maps, Speech-to-Text, e Twilio, e é alimentado pelo Dialogflow, que facilita a criação de intenções e interações de voz.

## Sumário

1. [Objetivo do Projeto](#objetivo-do-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Fases do Projeto](#fases-do-projeto)
   - [Fase 1: Configuração do Ambiente e Definição de Intenções](#fase-1-configuração-do-ambiente-e-definição-de-intenções)
   - [Fase 2: Integração com Reconhecimento de Voz e Geolocalização](#fase-2-integração-com-reconhecimento-de-voz-e-geolocalização)
   - [Fase 3: Classificação de Emergências e Respostas Personalizadas](#fase-3-classificação-de-emergências-e-respostas-personalizadas)
   - [Fase 4: Integração com o SAMU, Testes, Implantação e Monitoramento](#fase-4-integração-com-o-samu-testes-implantação-e-monitoramento)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Como Usar](#como-usar)
6. [Monitoramento e Suporte](#monitoramento-e-suporte)
7. [Licença](#licença)

## Objetivo do Projeto

O objetivo deste projeto é desenvolver um chatbot inteligente, com reconhecimento de voz e geolocalização, que classifique emergências e forneça respostas personalizadas com base no nível de urgência. O sistema será integrado com o Twilio para realizar chamadas automáticas para o SAMU, facilitando o envio de informações críticas para os serviços de emergência.

## Tecnologias Utilizadas

- **Google Cloud**: Para APIs de Speech-to-Text, Google Maps e Google Cloud Monitoring.
- **Dialogflow**: Para criação de agentes conversacionais e definição de intenções.
- **Twilio**: Para realização de chamadas automáticas para serviços de emergência (SAMU).
- **APIs do Google Maps**: Para capturar geolocalização e fornecer informações de localização.
- **API Speech-to-Text**: Para reconhecimento de voz, convertendo áudio em texto.

## Fases do Projeto

### Fase 1: Configuração do Ambiente e Definição de Intenções

1. **Revisão dos requisitos do projeto**: Revisão dos requisitos do sistema, incluindo a definição das emergências leves, intermediárias e graves, além da criação de intenções para cada tipo de emergência.
   
2. **Criação da conta no Google Cloud**: Criação de uma conta no Google Cloud para acesso às APIs necessárias (Google Maps, Speech-to-Text, etc.).

3. **Criação do agente no Dialogflow**: Criação de um agente no Dialogflow para gerenciar as interações do chatbot.

4. **Definição das intenções**:
   - Intenção de saudação (para responder cumprimentos).
   - Intenção para emergência leve (detecção de emergências com baixo risco).
   - Intenção para emergência intermediária (detecção de emergências com risco moderado).
   - Intenção para emergência grave (detecção de emergências com risco elevado).

### Fase 2: Integração com Reconhecimento de Voz e Geolocalização

1. **Ativação da API Speech-to-Text**: Habilitação da API Speech-to-Text no Google Cloud para converter fala em texto.

2. **Integração do Speech-to-Text com Dialogflow**: Conexão da API de reconhecimento de voz com o Dialogflow para processar a fala do usuário.

3. **Ativação da API do Google Maps**: Habilitação da API do Google Maps para capturar e processar a localização do usuário.

4. **Integração do Google Maps com Dialogflow**: Conexão da API do Google Maps com o Dialogflow para enviar dados de localização durante interações de emergência.

5. **Criação da intenção para captura de localização**: Definição de uma intenção no Dialogflow para capturar a geolocalização do usuário em tempo real.

6. **Testes de reconhecimento de voz**: Teste do funcionamento da API Speech-to-Text para garantir a transcrição correta das falas.

7. **Testes de geolocalização**: Teste da funcionalidade de geolocalização para garantir que a localização do usuário seja corretamente capturada.

### Fase 3: Classificação de Emergências e Respostas Personalizadas

1. **Definição da lógica de classificação**: Desenvolvimento da lógica que irá classificar o nível da emergência com base nas informações fornecidas pelo usuário.

2. **Configuração de respostas para diferentes tipos de emergência**:
   - Respostas para emergência leve.
   - Respostas para emergência intermediária.
   - Respostas para emergência grave.

3. **Testes de classificação de emergências**: Validação da lógica de classificação para garantir que as emergências sejam corretamente classificadas.

4. **Ajustes nas respostas contextualizadas**: Refino das respostas com base nas interações de teste, para garantir que as mensagens sejam claras e adequadas.

5. **Validação final da lógica de emergências**: Teste final para garantir que o chatbot está funcionando como esperado.

### Fase 4: Integração com o SAMU, Testes, Implantação e Monitoramento

1. **Configuração da API do Twilio**: Habilitação da API do Twilio para realizar chamadas automáticas.

2. **Integração do Twilio com Dialogflow**: Conexão do Twilio com o Dialogflow para realizar chamadas de emergência.

3. **Configuração da intenção para ligação automática**: Criação de uma intenção para disparar a ligação automática ao SAMU em casos de emergências graves.

4. **Testes da funcionalidade de ligação automática**: Testes para garantir que a ligação para o SAMU seja realizada corretamente.

5. **Implantação do chatbot em produção**: Colocação do chatbot em ambiente de produção para uso real.

6. **Configuração do Google Cloud Monitoring**: Configuração de monitoramento no Google Cloud para garantir que o sistema esteja funcionando corretamente e sem falhas.

7. **Treinamento da equipe de suporte**: Treinamento da equipe para lidar com possíveis falhas no sistema e fornecer suporte caso necessário.

## Instalação e Configuração

### Pré-requisitos

1. Conta no [Google Cloud](https://cloud.google.com/).
2. Conta no [Dialogflow](https://dialogflow.cloud.google.com/).
3. Conta no [Twilio](https://www.twilio.com/).

### Passos de instalação

1. Clone o repositório para o seu ambiente local.
2. Siga as instruções para configurar as APIs do Google Cloud e o Twilio conforme descrito nas fases do projeto.
3. Configure as intenções e as respostas no Dialogflow.
4. Realize os testes de integração e ajuste as configurações conforme necessário.

## Como Usar

1. Interaja com o chatbot por meio de comandos de voz ou texto.
2. O chatbot irá identificar o nível da emergência com base na sua entrada.
3. Dependendo da gravidade da emergência, ele fornecerá uma resposta adequada ou, no caso de emergências graves, fará uma ligação automática ao SAMU.

## Monitoramento e Suporte

- O sistema está monitorado através do **Google Cloud Monitoring** para garantir a disponibilidade e a performance.
- Em caso de problemas, entre em contato com a equipe de suporte através do canal fornecido no portal.