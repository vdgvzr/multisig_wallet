import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input";

export default function DepositToContractForm() {
  const { account, depositToContract } = useContext(RootContext);
  const depositToContractRef = useRef();

  useEffect(() => {
    depositToContractRef.current.value = null;
  });

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
        }}
      >
        <Input
          type="number"
          placeholder="value"
          step="0.000000000000000001"
          label="Amount"
          text="Enter amount you would like to deposit to contract"
          controlId="depositToContractValue"
          innerRef={depositToContractRef}
        />
        <CustomButton text="Deposit" type="submit" icon="chevron-right" />
      </Form>
    </>
  );
}
