from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all CORS requests. You can configure it to allow specific domains.

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        # Respond to pre-flight request
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    if request.method == 'POST':
        # Handle the actual POST request
        data = request.get_json()  # Get the JSON data from the request
        print(f"Received data: {data}")
        
        # Process the data (this is just a simple example)
        response = {
            "message": "Data received successfully!",
            "received_data": data
        }
        return jsonify(response)

if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)

