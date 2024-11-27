use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct ImagePair {
    pub image1: String,
    pub image2: String,
}

#[derive(Deserialize)]
pub struct PredictionResponse {
    pub prediction: bool,
}
