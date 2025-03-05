# -------------------------------- utf-8 encoding* --------------------------------------
# this file contains all the api endpoint for communication of frontend with backend
import os
import json
import sys
from flask import Flask, request, jsonify

# defining entry point
app = Flask(__name__)


# defining all the routes
@app.route("/element_position", methods=["POST", "OPTIONS"])
def get_element_position():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight request successful"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if request.method == "POST":
        try:
            data = request.get_json()
            if not data or not all(key in data for key in ["element_name", "x", "y"]):
                return jsonify({"error": "Invalid request, required keys missing"}), 400

            element_name = data["element_name"]
            x = data["x"]
            y = data["y"]
            return (
                jsonify(
                    {
                        "status": "success",
                        "element": element_name,
                        "position": {"x": x, "y": y},
                    }
                ),
                200,
            )

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Send a POST request with an element's position."})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9092)
