import { secp256k1 } from "ethereum-cryptography/secp256k1";

export function getSignature(message) {
  const privateKey =
    "bf263dc5a091ac15656463eeddfc1ecd57765fe932f9fb03e781e8bfc63369bf";

  const signature = secp256k1.sign(message, privateKey);

  const signatureString = {
    r: signature.r.toString(10),
    s: signature.s.toString(10),
    recovery: signature.recovery,
  };

  return JSON.stringify(signatureString);
}
