mod facade;
mod repositories;

use dotenv::dotenv;

fn main() {
    dotenv().ok();
    api::main();
}
