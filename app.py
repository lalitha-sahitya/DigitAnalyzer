from flask import Flask, request, render_template, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# Load the model
tf.keras.backend.clear_session()
model = load_model("digit_recognition_model.h5")  # Ensure the correct model path

def preprocess_image(image):
    """Preprocess the image for prediction"""
    image = image.convert("L")  # Convert to grayscale
    image = image.resize((28, 28))  # Resize to 28x28
    image = np.array(image) / 255.0  # Normalize pixel values
    image = image.reshape(1, 28, 28, 1)  # Reshape for model input
    return image

@app.route("/", methods=["GET"])
def index():
    """Serve the frontend"""
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    """Handle file upload and return digit prediction"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        processed_image = preprocess_image(image)
        prediction = model.predict(processed_image)
        digit = int(np.argmax(prediction))  # Extract predicted digit

        return jsonify({"prediction": digit}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
