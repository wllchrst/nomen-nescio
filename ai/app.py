# from service.api_service import ApiService
# from fastapi import FastAPI

# app = FastAPI()

# api_service = ApiService()
# app.include_router(api_service.router)

import tensorflow as tf
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import cv2
import base64

# Define ManhattanDistance layer (necessary for deserialization)
class ManhattanDistance(tf.keras.layers.Layer):
    def call(self, inputs):
        return tf.abs(inputs[0] - inputs[1])

# Load the model
model = tf.keras.models.load_model("./model/model.keras", custom_objects={"ManhattanDistance": ManhattanDistance})

# Initialize FastAPI
app = FastAPI()

# Define the request schema
class ImagePair(BaseModel):
    image1: str  # Base64-encoded image
    image2: str  # Base64-encoded image

# Preprocessing function
def preprocess_image(base64_str):
    img_data = base64.b64decode(base64_str)
    np_img = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (128, 128)) / 255.0
    return np.expand_dims(img, axis=-1)

@app.post("/predict")
def predict(images: ImagePair):
    try:
        # Preprocess images
        img1 = preprocess_image(images.image1)
        img2 = preprocess_image(images.image2)

        # Add batch dimension
        img1 = np.expand_dims(img1, axis=0)
        img2 = np.expand_dims(img2, axis=0)

        # Make a prediction
        prediction = model.predict({"image1": img1, "image2": img2})[0][0]
        return {"prediction": float(prediction)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
