from fastapi import FastAPI, UploadFile, File
from PIL import ImageFile

class VerificationInput:
  def __init__(self, user_signature: UploadFile, target_signature: UploadFile):
    self.user_signature = user_signature
    self.target_signature = target_signature

class VerificationData:
  def __init__(self, user_image: ImageFile, target_image: ImageFile) -> None:
    self.user_signature_image = user_image
    self.target_signature_image = target_image
