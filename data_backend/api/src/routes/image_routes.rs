use base64::{engine::general_purpose, Engine};
use reqwest::Client;
use rocket::serde::json::Json;
use serde_json::{json, Value};
use std::{error::Error, fs};

use crate::models::{
    request::{
        image_predict::PredictImageData,
        signature_prediction_data::{ImagePair, PredictionResponse},
    },
    response::response::Response,
};

fn encode_image_to_base64(file_path: &str) -> Result<String, Box<dyn Error>> {
    let image_data = fs::read(file_path)?;
    let base64_encoded = general_purpose::STANDARD.encode(image_data);
    Ok(base64_encoded)
}

#[post("/predict", data = "<input>")]
pub async fn compare_image(input: Json<PredictImageData>) -> Json<Value> {
    let data = input.into_inner();

    match predict(data.first_image_path, data.second_image_path).await {
        Ok(prediction) => {
            // Return prediction result as JSON
            Json(json!(Response {
                success: true,
                data: prediction,
                message: "Prediction succesfully made".to_string(),
            }))
        }
        Err(err) => {
            // Return error information as JSON
            Json(json!(Response {
                success: false,
                data: false,
                message: format!("Something went wrong: {}", err.to_string())
            }))
        }
    }
}

pub async fn predict(
    first_image_path: String,
    second_image_path: String,
) -> Result<bool, Box<dyn Error>> {
    let client = Client::new();
    let base64_image1 = encode_image_to_base64(&first_image_path)?;
    let base64_image2 = encode_image_to_base64(&second_image_path)?;

    let payload = ImagePair {
        image1: base64_image1,
        image2: base64_image2,
    };

    let response = client
        .post("http://127.0.0.1:8001/predict")
        .json(&payload)
        .send()
        .await?;

    if response.status().is_success() {
        let prediction: PredictionResponse = response.json().await?;
        Ok(prediction.prediction)
    } else {
        let error_text = response.text().await?;
        Err(format!("API error: {}", error_text).into())
    }
}
