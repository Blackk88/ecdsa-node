const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const publicKey =
  "030b429fe5cad7e76a803361a57af90e891c69dd8d83b94355de79562993c09a35";
const privateKey =
  "bf263dc5a091ac15656463eeddfc1ecd57765fe932f9fb03e781e8bfc63369bf";

const message = "First signed transaction";
const messageHash = sha256(utf8ToBytes(message));

const signature = secp256k1.sign(messageHash, privateKey);
console.log("file: generateSign.js:15 ~ signature", signature);
