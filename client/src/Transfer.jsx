import server from "./server";
import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import { getSignature } from "../generateSign";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showSign, setShowSign] = useState(false);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  function transferHandler() {
    if (!recipient || !sendAmount || !address) {
      alert("Please enter valid addresses");
      return;
    }
    setShowSign(true);
  }

  async function transfer(evt) {
    evt.preventDefault();

    setShowSign(true);
    const message = "First signed transaction";
    const messageHash = toHex(keccak256(utf8ToBytes(message)));

    const signature = getSignature(messageHash);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        message: messageHash,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
    setShowSign(false);
  }

  return (
    <>
      <form className="container transfer" onSubmit={transfer}>
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>

        {!showSign && (
          <button type="button" className="button" onClick={transferHandler}>
            Transfer
          </button>
        )}
        {showSign && <input type="submit" className="button" value={"Sign"} />}
      </form>
    </>
  );
}

export default Transfer;
