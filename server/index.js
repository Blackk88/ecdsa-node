const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "030b429fe5cad7e76a803361a57af90e891c69dd8d83b94355de79562993c09a35": 100,
  "0238d55c955f8b1be4a163b5e05c85571c975c3541943e029acbde590784e6d4db": 50,
  "032f3d1c66078e3dc6482c5e06e98b94e38395a0f573c9ce8c71bdb8f2042d2cd9": 75,
};

const message = "First signed transaction";
const messageHash = sha256(utf8ToBytes(message));

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const modifiedSignature = {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    recovery: signature.recovery,
  };

  const isValid = secp256k1.verify(modifiedSignature, messageHash, sender);
  console.log(isValid);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
