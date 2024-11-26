import requests
import base64

# Encode the images to Base64
def encode_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

# Encode your test images
image1_base64 = encode_image("./test_image/first.jpg")
image2_base64 = encode_image("./test_image/first.jpg")

# Send a POST request to the API
url = "http://127.0.0.1:8000/predict"
payload = {"image1": image1_base64, "image2": image2_base64}
response = requests.post(url, json=payload)

# Print the response
print(response.json())
