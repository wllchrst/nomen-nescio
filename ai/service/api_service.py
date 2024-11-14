from fastapi import APIRouter
from service.signature_model import SignatureModel
from service.interfaces import VerificationInput, VerificationData
from fastapi import UploadFile, File, Depends
from matplotlib import pyplot as plt
from PIL import Image
import io

signature_model = SignatureModel()

async def upload_file_to_image(file: UploadFile):
  content = await file.read()
  image = Image.open(io.BytesIO(content))
  return image
  
class ApiService:
  router = APIRouter()

  def __init__(self) -> None:
    self.signature_model = SignatureModel()
    pass
  
  async def verification_input(
    user_signature: UploadFile = File(...), target_signature: UploadFile = File(...)) -> VerificationInput:
    return VerificationInput(user_signature, target_signature)
  

  @router.post('/verification')
  async def verif_signature(verification_input: VerificationInput = Depends(verification_input)):
    user_image = await upload_file_to_image(verification_input.user_signature)
    target_image = await upload_file_to_image(verification_input.target_signature)

    verification_data = VerificationData(user_image=user_image, target_image=target_image) 
    signature_model.predict(verification_data=verification_data)    

    return "testing"
