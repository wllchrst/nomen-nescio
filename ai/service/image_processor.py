from service.interfaces import VerificationData
from PIL import ImageFile
import numpy as np
import tensorflow as tf
import cv2

class ImageProcessor:
  def __init__(self, verification_data: VerificationData) -> None:
    self.verification_data = verification_data
    pass

  def preprocess_image(self, image: ImageFile):
    # Convert the image to grayscale
    image_grayscale = image.convert("L")
    
    # Convert the grayscale image to a TensorFlow tensor
    image_tensor = tf.convert_to_tensor(np.array(image_grayscale), dtype=tf.uint8)
    
    # Add a channel dimension if it's a 2D tensor (height, width)
    if len(image_tensor.shape) == 2:
        image_tensor = tf.expand_dims(image_tensor, axis=-1)  # (height, width, 1)

    # Add a batch dimension if it's a single image (batch, height, width, channels)
    if len(image_tensor.shape) == 3:
        image_tensor = tf.expand_dims(image_tensor, axis=0)  # (1, height, width, channels)

    # Resize the image to (128, 128)
    image_tensor = tf.image.resize(image_tensor, (128, 128))
    
    # Convert to NumPy array for OpenCV processing (remove batch dimension)
    image_np = image_tensor[0].numpy().squeeze().astype(np.uint8)  # (height, width)
    
    # Apply Canny edge detection
    image_cv2 = cv2.Canny(image_np, 20, 220)  # Output is 2D (height, width)
    
    # Normalize the result and convert it back to a TensorFlow tensor
    image_cv2 = tf.convert_to_tensor(image_cv2, dtype=tf.float32) / 255.0
    
    return image_cv2
