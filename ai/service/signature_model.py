import tensorflow as tf
from service.interfaces import VerificationData
from service.image_processor import ImageProcessor
from matplotlib import pyplot as plt

class SignatureModel :
  def __init__(self) -> None:
    self.model = tf.keras.models.load_model('./model/best_model.keras', safe_mode=False)
    pass

  def preprocess_image(self):
    self.user_preprocessed= self.image_processor.preprocess_image(self.verification_data.user_signature_image)
    self.target_preprocessed= self.image_processor.preprocess_image(self.verification_data.target_signature_image)
  
  def predict(self, verification_data: VerificationData) -> bool:
    self.verification_data = verification_data
    self.image_processor = ImageProcessor(self.verification_data)
    self.preprocess_image()
    # Image processed, just predict.
    pass
