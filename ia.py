from flask import Flask, request, jsonify
from llama_cpp import Llama

# Inicializa a IA (modelo já carregado)
llm = Llama(
    model_path="utils/modelo Llama-3.2.gguf",
    verbose=False
)

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Novo system prompt para manter o foco médico 🚑
    system_prompt = (
        "Você é um assistente especializado em emergências médicas, primeiros socorros e orientação rápida em situações de saúde. "
        "Seu objetivo é ajudar usuários com problemas médicos, encontrar hospitais próximos, dar conselhos sobre primeiros socorros e auxiliar em casos de urgência. "
        "Sempre mantenha o foco em saúde e segurança. Caso receba uma pergunta fora desse contexto, educadamente informe que sua especialidade é saúde e emergências."
    )

    output = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=256
    )

    answer = output['choices'][0]['message']['content']
    return jsonify({"response": answer})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
