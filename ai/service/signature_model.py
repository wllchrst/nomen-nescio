import tensorflow as tf
from service.interfaces import VerificationData
from service.image_processor import ImageProcessor
from matplotlib import pyplot as plt

class SignatureModel :
  def __init__(self) -> None:
    # self.model = tf.keras.models.load_model('./model/best_model.keras')
    pass

  def preprocess_image(self):
    result = self.image_processor.preprocess_image(self.verification_data.target_signature_image)
    plt.imshow(result)
    plt.show()
    pass
  
  def predict(self, verification_data: VerificationData) -> bool:
    self.verification_data = verification_data
    self.image_processor = ImageProcessor(self.verification_data)
    self.preprocess_image()
    pass
