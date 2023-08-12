import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { useMetaMask } from "../../../hooks/useMetamask";

export default function AddOwnerForm({ disabled }) {
  const { wallet, contract, loadWeb3 } = useMetaMask();
  const addOwnerRef = useRef();
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, []);

  function addOwner(from, newOwner) {
    contract.methods
      .addOwner(newOwner)
      .send({ from })
      .once("receipt", () => {
        loadWeb3();
      })
      .catch((e) => {
        console.log(e.message);
        // toastMessage(new Message("error", `${e}`));
      });

    /* contract.events.addOwnerComplete().on("data", function (e) {
      toastMessage(
        new Message(
          "success",
          `Added ${utils.formatAddress(e.returnValues.owner)} to contract!`
        )
      );
    }); */
  }

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const address = addOwnerRef.current.value;
          if (window.web3.utils.isAddress(address)) {
            addOwner(wallet.accounts[0], window.web3.utils.toChecksumAddress(address));
          }
          addOwnerRef.current.value = null;
        }}
      >
        <Input
          type="text"
          placeholder="address"
          label="New Owner"
          text="Enter new owner"
          controlId="addOwnerValue"
          innerRef={addOwnerRef}
          setInput={setInput}
          transfer={false}
          disabled={disabled}
        />
        <CustomButton
          text="Add owner"
          type="submit"
          icon="plus"
          disabled={!input}
        />
      </Form>
    </>
  );
}
