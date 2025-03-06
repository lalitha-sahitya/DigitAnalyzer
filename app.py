from flask import Flask, request, render_template, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

# Clear any existing session and load the model
tf.keras.backend.clear_session()
model = load_model("digit_recognition_model (1).h5")

def preprocess_image(image):
    image = image.convert("L")  # Convert to grayscale
    image = image.resize((28, 28))  # Resize to 28x28
    image = np.array(image) / 255.0  # Normalize
    image = image.reshape(1, 28, 28, 1)  # Reshape for model input
    return image

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"})
        
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No selected file"})
        
        try:
            image = Image.open(io.BytesIO(file.read()))
            processed_image = preprocess_image(image)
            prediction = model.predict(processed_image)
            digit = int(np.argmax(prediction))

            return jsonify({"prediction": digit})
        except Exception as e:
            return jsonify({"error": str(e)})

    return render_template("index.html")  # Corrected template path

if __name__ == "__main__":
    app.run(debug=True)
