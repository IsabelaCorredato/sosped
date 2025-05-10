from flask import Flask, request, jsonify
import whisper
import torch

# === CONFIG ===
idioma = "pt"
usar_fp16 = True

app = Flask(__name__)

# === Carrega o modelo uma única vez ===
print("🧠 Carregando modelo large-v2 localmente...")
modelo = whisper.load_model("large-v2").to("cuda")
print("✅ Modelo carregado e pronto para uso em tempo real.\n")

@app.route('/transcribe', methods=['POST'])
def transcrever_audio():
    data = request.json
    audio_path = data.get('audio_path')

    if not audio_path:
        return jsonify({"error": "Caminho do áudio não fornecido."}), 400

    print(f"🎧 Novo áudio recebido para transcrição: {audio_path}")

    try:
        resultado = modelo.transcribe(
            audio_path,
            language=idioma,
            fp16=usar_fp16,
            temperature=0.0,
            best_of=1,
            beam_size=5,
            verbose=False,
            condition_on_previous_text=True,
            without_timestamps=True
        )
        texto = resultado["text"]
        print(f"✅ Transcrição finalizada: {texto}")
        return jsonify({"transcription": texto})

    except Exception as e:
        print(f"❌ Erro ao transcrever {audio_path}: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
