pub mod config;
pub mod models;
pub mod routes;

#[macro_use]
extern crate rocket;
use config::start;

pub fn main() {
    let result = start();
    if let Some(err) = result.err() {
        println!("Error: {err}");
    }
}
