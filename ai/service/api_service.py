from fastapi import APIRouter
class ApiService:
  router = APIRouter()
  
  @router.get('/test')
  def test_function(self):
    return "testing"
