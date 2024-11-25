import fetch from 'isomorphic-fetch';
import { Actor, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { idlFactory } from "../../../declarations/nomennescio_backend";

const canisterId: string | undefined = process.env.CANISTER_ID;

if (!canisterId) {
  throw new Error("Environment variable CANISTER_ID is not defined");
}

const host = 'http://127.0.0.1:4943';
const identity = Ed25519KeyIdentity.generate();
const agent = new HttpAgent({ host, identity, fetch });
agent.fetchRootKey();
const canister = Actor.createActor(idlFactory, {
  agent,
  canisterId: canisterId,
});

export default canister;
