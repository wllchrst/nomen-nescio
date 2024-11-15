Documentation

- Kalau ada ganti backend kayak nambahin sesuatu terus kalau mau ke konek sama frontend nya jalanin ini aja

- dfx build
- candid-extractor target/wasm32-unknown-unknown/release/nomennescio_backend.wasm > src/nomennescio_backend/nomennescio_backend.did

MAIN BACKEND

reference: https://github.com/SeaQL/sea-orm/tree/master/examples/rocket_example

orm = https://www.sea-ql.org/SeaORM/
framework = rocket

MAIN FRONTEND

npm i
npm start
