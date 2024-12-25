from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import os
import base64

app = Flask(__name__)
CORS(app) 

HF_API_KEY = "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"
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large"

HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')

    if not user_message:
        return jsonify({"reply": "Please provide a valid message."}), 400

    try:
        payload = {"inputs": user_message}
        response = requests.post(API_URL, headers=HEADERS, json=payload)

        if response.status_code == 200:
            image_path = "output.png"
            with open(image_path, 'wb') as f:
                f.write(response.content)

            with open(image_path, "rb") as img_file:
                img_data = img_file.read()
                img_base64 = base64.b64encode(img_data).decode('utf-8')

            return jsonify({"reply": "Here is the generated image:", "image_data": img_base64})

        else:
            return jsonify({"reply": f"Failed to generate image. API error: {response.text}"}), 500

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
