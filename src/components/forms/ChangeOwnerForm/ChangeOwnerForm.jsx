import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { useMetaMask } from "../../../hooks/useMetamask";
import Message from "../../../assets/js/customClasses/messageClasses";
import { formatAddress } from "../../../utils";

export default function ChangeOwnerForm({ disabled }) {
  const { wallet, contract, loadWeb3, toastMessage } = useMetaMask();
  const changeOwnerRef = useRef();
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, []);

  function changeContractOwner(from, newOwner) {
    contract.methods
      .changeOwner(newOwner)
      .send({ from })
      .once("receipt", () => {
        loadWeb3();
      })
      .catch((e) => {
        toastMessage(new Message("error", `${e}`));
      });

    contract.events.OwnerSet().on("data", function (e) {
      toastMessage(
        new Message(
          "success",
          `Changed contract ownership from ${formatAddress(
            e.returnValues.oldOwner
          )} to ${formatAddress(e.returnValues.newOwner)}!`
        )
      );
    });
  }

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const address = changeOwnerRef.current.value;
          if (window.web3.utils.isAddress(address)) {
            changeContractOwner(
              wallet.accounts[0],
              window.web3.utils.toChecksumAddress(address)
            );
          }
          changeOwnerRef.current.value = null;
        }}
      >
        <Input
          type="text"
          placeholder="address"
          label="Change Owner"
          text="Change contract owner"
          controlId="changeOwnerValue"
          innerRef={changeOwnerRef}
          setInput={setInput}
          transfer={false}
          disabled={disabled}
        />
        <CustomButton
          text="Change owner"
          type="submit"
          icon="change"
          disabled={!input}
        />
      </Form>
    </>
  );
}
