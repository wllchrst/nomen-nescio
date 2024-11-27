use serde::Deserialize;

#[derive(FromForm, Deserialize)]
pub struct PredictImageData {
    pub first_image_path: String,
    pub second_image_path: String,
}
