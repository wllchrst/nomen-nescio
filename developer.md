Documentation

KALAU ADA GANTI BACKEND KAYAK NAMBAHIN SESUATU TERUS KALAU MAU KE KONEK SAMA FRONTEND NYA JALANIN INI AJA

- dfx build
- candid-extractor target/wasm32-unknown-unknown/release/nomennescio_backend.wasm > src/nomennescio_backend/nomennescio_backend.did

MAIN BACKEND

reference: https://github.com/SeaQL/sea-orm/tree/master/examples/rocket_example
orm = https://www.sea-ql.org/SeaORM/
framework = rocket

MAIN FRONTEND

npm i
npm start

HOW TO RUN

1 Frontend

- npm i
- cd path/to/nomennescio_frontend
- npm start

2 Backend Canister

- wsl
- cd path/to/nomen-nescio
- dfx start --clean --background
- cargo build --target wasm32-unknown-unknown --release -p nomennescio_backend
- dfx build nomennescio_backend
- dfx deploy nomennescio_backend
- dfx generate nomennescio_backend

3 Data Backend

- cd path/to/data_backend
- cargo run
