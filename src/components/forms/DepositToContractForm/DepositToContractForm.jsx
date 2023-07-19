import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef, useState } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input/Input";

export default function DepositToContractForm() {
  const { account, depositToContract } = useContext(RootContext);
  const depositToContractRef = useRef();
  const [input, setInput] = useState("");

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
          depositToContract(account, value);
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
