from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory list of events conforming to test requirements ("id" and "title")
events = [
    {"id": 1, "title": "Tech Conference 2026"},
    {"id": 2, "title": "JavaScript Workshop"}
]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Event Catalog API!"}), 200

@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200

@app.route("/events", methods=["POST"])
def add_event():
    data = request.get_json()
    
    # Validate that "title" is provided as required by test_post_event_missing_data_returns_error
    if not data or "title" not in data:
        return jsonify({"error": "Title is required"}), 400
    
    new_event = {
        "id": len(events) + 1,
        "title": data["title"]
    }
    
    events.append(new_event)
    return jsonify(new_event), 201

if __name__ == "__main__":
    app.run(debug=True)