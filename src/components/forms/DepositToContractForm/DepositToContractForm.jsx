import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { useMetaMask } from "../../../hooks/useMetamask";

export default function DepositToContractForm() {
  const { wallet, contract, loadWeb3 } = useMetaMask();
  const depositToContractRef = useRef();
  const [input, setInput] = useState("");

  function depositToContract(from, value) {
    contract.methods
      .depositToContract()
      .send({ from, value })
      .once("receipt", () => {
        loadWeb3();
      })
      .catch((e) => {
        console.log(e.message);
        // toastMessage(new Message("error", `${e}`));
      });

    /* contract.events.depositComplete().on("data", function (e) {
      toastMessage(
        new Message(
          "success",
          `Deposited ${utils.formatBigNumber(
            e.returnValues.amount
          )} ETH to contract!`
        )
      );
    }); */
  }

  useEffect(() => {
    setInput("");
  }, []);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const value = window.web3.utils.toWei(
            depositToContractRef.current.value.toString(),
            "ether"
          );
          depositToContract(wallet.accounts[0], value);
          depositToContractRef.current.value = null;
        }}
      >
        <Input
          type="number"
          placeholder="amount"
          step="0.000000000000000001"
          label="Amount"
          text="Enter amount you would like to deposit to contract"
          controlId="depositToContractValue"
          innerRef={depositToContractRef}
          setInput={setInput}
        />
        <CustomButton
          text="Deposit"
          type="submit"
          icon="chevron-right"
          disabled={!input}
        />
      </Form>
    </>
  );
}
