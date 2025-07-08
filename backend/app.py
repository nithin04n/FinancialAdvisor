# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from chatbot import get_bot_response  # Import the function

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        # CORS preflight
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()
    print(f"Received data: {data}")

    user_message = data.get('message', '')
    bot_response = get_bot_response(user_message)

    return jsonify({'response': bot_response})

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
