import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { useMetaMask } from "../../../hooks/useMetamask";

export default function TransferRequestForm() {
  const { wallet, contract, loadWeb3 } = useMetaMask();
  const transferRequestAddressRef = useRef();
  const transferRequestValueRef = useRef();
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    setInput("");
    setInput2("");
  }, []);

  function requestTransfer(from, to, value) {
    contract.methods
      .requestTransfer(to, value)
      .send({ from })
      .once("receipt", () => {
        loadWeb3();
      })
      .catch((e) => {
        console.log(e.message);
        // toastMessage(new Message("error", `${e}`));
      });

    /* contract.events.transferRequestComplete().on("data", function (e) {
      toastMessage(
        new Message(
          "success",
          `Request transfer of ${utils.formatBigNumber(
            e.returnValues.amount
          )} ETH to ${utils.formatAddress(e.returnValues.to)}!`
        )
      );
    }); */
  }

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const to = transferRequestAddressRef.current.value;
          const value = window.web3.utils.toWei(
            transferRequestValueRef.current.value.toString(),
            "ether"
          );
          if (window.web3.utils.isAddress(to)) {
            requestTransfer(
              wallet.accounts[0],
              window.web3.utils.toChecksumAddress(to),
              value
            );
          }
          transferRequestAddressRef.current.value = null;
          transferRequestValueRef.current.value = null;
        }}
      >
        <Input
          type="text"
          placeholder="address"
          label="Transfer to"
          text="Enter address to transfer to"
          controlId="addOwnerValue"
          innerRef={transferRequestAddressRef}
          setInput={setInput}
        />
        <Input
          type="number"
          placeholder="amount"
          step="0.000000000000000001"
          label="Amount"
          text="Enter amount to transfer"
          controlId="requestTransferValue"
          innerRef={transferRequestValueRef}
          setInput={setInput2}
          transfer={true}
        />
        <CustomButton
          text="Request Transfer"
          type="submit"
          icon="chevron-right"
          disabled={!input || !input2}
        />
      </Form>
    </>
  );
}
