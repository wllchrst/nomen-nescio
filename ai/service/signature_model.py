import tensorflow as tf
from service.interfaces import VerificationData
from service.image_processor import ImageProcessor
from matplotlib import pyplot as plt
import numpy as np

class SignatureModel :
  def __init__(self) -> None:
    self.model = tf.keras.models.load_model('./model/best_model.keras', safe_mode=False)
    pass

  def preprocess_image(self):
    self.user_preprocessed= self.image_processor.preprocess_image(self.verification_data.user_signature_image)
    self.target_preprocessed= self.image_processor.preprocess_image(self.verification_data.target_signature_image)

  def get_prediction(self):
    data = {"image1": self.user_preprocessed, "image2": self.target_preprocessed}
    prediction = self.model.predict(data)
    print(f"Prediction: {prediction}")
  
  def predict(self, verification_data: VerificationData) -> bool:
    self.verification_data = verification_data
    self.image_processor = ImageProcessor(self.verification_data)
    self.preprocess_image()
    # Image processed, just predict.
    self.get_prediction()
    pass
