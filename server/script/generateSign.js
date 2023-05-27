const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const publicKey = "insert you public key";
const privateKey =
  "bf263dc5a091ac15656463eeddfc1ecd57765fe932f9fb03e781e8bfc63369bf";

const message = "First signed transaction";
const messageHash = keccak256(utf8ToBytes(message));

const signature = secp256k1.sign(messageHash, privateKey);

const signatureString = {
  r: signature.r.toString(10),
  s: signature.s.toString(10),
  recovery: signature.recovery,
};

console.log(JSON.stringify(signatureString));
