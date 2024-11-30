## *Nomen Nescio*

Introducing **Nomen Nescio**, the ultimate email platform designed to deliver secure and seamless communication. Whether you’re sending private messages or managing group conversations, our platform has you covered. Nomen Nescio is built with Rust and DFX for blockchain technology, utilizing ICP as the currency for added security. With a React-powered frontend, our sleek and intuitive design lets you send emails, create groups, and securely share files. Featuring advanced signature verification, we ensure only authorized users can access sensitive attachments. Experience secure, efficient, and reliable email communication like never before.

## Running Application Locally

**Canister**
For running the canister make sure that you installed all the requirements.
```
dfx deploy nomennescio_backend
```
**Frontend**
Please ensure that you have **node** and **npm** installed on your local device
```
npm install
npm run start
```
**Backend**
For running the data_backend make sure that you have rust, cargo, and postgres installed
```
cargo build
cargo run
```
## Running AI Locally
Make sure that you have all the requirements installed (FastAPI, matplotlib, tensorflow are the main ones)
```
uvicorn app:app --reload --port 8001
```

**NOTES**
- Please make sure that all the environment variables direct to the right path.
## Additional Information

**Documentation in PDF Format**
- https://drive.google.com/file/d/1M5NRNXC1CdHd_ZgtY-ZigiQ9h6ChbPCr/view?usp=sharing
**Demonstration Video**
- https://drive.google.com/file/d/1IgrvY7tZXWBHCXYMO9tyya8zKOfJsy1i/view?usp=sharing
