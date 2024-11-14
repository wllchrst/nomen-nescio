from service.api_service import ApiService
from fastapi import FastAPI

app = FastAPI()

api_service = ApiService()
app.include_router(api_service.router)

