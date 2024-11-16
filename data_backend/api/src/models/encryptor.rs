use std::fs::{File, remove_file};
use std::io::{Read, Write};

use orion::hazardous::{
    aead::xchacha20poly1305::{seal, open, Nonce, SecretKey},
    mac::poly1305::POLY1305_OUTSIZE,
    stream::xchacha20::XCHACHA_NONCESIZE,
};

use orion::hazardous::stream::chacha20::CHACHA_KEYSIZE;
use orion::kdf::{derive_key, Password, Salt};
use rand_core::{OsRng, RngCore};

fn get_random(dest: &mut [u8]) {
    RngCore::fill_bytes(&mut OsRng, dest);
}

fn generate_nonce() -> Vec<u8> {
    let mut randoms: [u8; 24] = [0; 24];
    get_random(&mut randoms);
    return randoms.to_vec();
}

fn auth_tag() -> Vec<u8> {
    let mut randoms: [u8; 32] = [0; 32];
    get_random(&mut randoms);
    return randoms.to_vec();
}

fn simple_split_encrypted(cipher_text: &[u8]) -> (Vec<u8>, Vec<u8>) {
    return (
        cipher_text[..CHACHA_KEYSIZE].to_vec(),
        cipher_text[CHACHA_KEYSIZE..].to_vec(),
        )
}

fn create_key(password: String, nonce: Vec<u8>) -> SecretKey {
    let password = Password::from_slice(password.as_bytes()).unwrap();
    let salt = Salt::from_slice(nonce.as_slice()).unwrap();
    let kdf_key = derive_key(&password, &salt, 15, 1024, CHACHA_KEYSIZE as u32).unwrap();
    let key = SecretKey::from_slice(kdf_key.unprotected_as_bytes()).unwrap();
    return key;
}

fn encrypt_core(
    dist: &mut File,
    contents: Vec<u8>,
    key: &SecretKey,
    nonce: Nonce,
) {
    let ad = auth_tag();
    let output_len = match contents.len().checked_add(POLY1305_OUTSIZE + ad.len()) {
        Some(min_output_len) => min_output_len,
        None => panic!("Plaintext is too long"),
    };

    let mut output = vec![0u8; output_len];
    output[..CHACHA_KEYSIZE].copy_from_slice(ad.as_ref());
    seal(&key, &nonce, contents.as_slice(), Some(ad.clone().as_slice()), &mut output[CHACHA_KEYSIZE..]).unwrap();
    dist.write(&output.as_slice()).unwrap();
}

fn decrypt_core(
    dist: &mut File,
    contents: Vec<u8>,
    key: &SecretKey,
    nonce: Nonce
) {
    let split = simple_split_encrypted(contents.as_slice());
    let mut output = vec![0u8; split.1.len() - POLY1305_OUTSIZE];

    open(&key, &nonce, split.1.as_slice(), Some(split.0.as_slice()), &mut output).unwrap();
    dist.write(&output.as_slice()).unwrap();
}

const CHUNK_SIZE: usize = 128;

pub struct Encryptor {
    password: String
}

impl Encryptor {
    pub fn new(password: &str) -> Self {
        Self {
            password: String::from(password)
        }
    }

    pub fn encrypt_file(
        &self,
        file_path: &str,
        output_path: &str,
    ) -> Result<(), orion::errors::UnknownCryptoError> {
        let mut source_file = File::open(file_path).expect("Failed to open input file");
        let mut dist = File::create(output_path).expect("Failed to create output file");
    
        let mut src = Vec::new();
        source_file.read_to_end(&mut src).expect("Failed to read input file");
    
        let nonce = generate_nonce();
    
        dist.write(nonce.as_slice()).unwrap();
        let key = create_key(self.password.clone(), nonce.clone());
        let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();
    
        for (n_chunk, src_chunk) in src.chunks(CHUNK_SIZE).enumerate() {
            encrypt_core(&mut dist, src_chunk.to_vec(), &key, nonce)
        }
    
        Ok(())
    }
    
    pub fn decrypt_file(
        &self,
        file_path: &str, 
        output_path: &str,
    ) -> Result<(), orion::errors::UnknownCryptoError> {
        let mut input_file = File::open(file_path).expect("Failed to open input file");
        let mut output_file = File::create(output_path).expect("Failed to create output file");

        let mut src: Vec<u8> = Vec::new();
        input_file.read_to_end(&mut src).expect("Failed to read input file");

        let nonce = src[..XCHACHA_NONCESIZE].to_vec();

        src = src[XCHACHA_NONCESIZE..].to_vec();

        let key = create_key(self.password.clone(), nonce.clone());
        let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();

        for (n_chunk, src_chunk) in src.chunks(CHUNK_SIZE + CHACHA_KEYSIZE + POLY1305_OUTSIZE).enumerate() {
            decrypt_core(&mut output_file, src_chunk.to_vec(), &key, nonce);
        }

        Ok(())
    }
}