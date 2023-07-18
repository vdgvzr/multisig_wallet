import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";

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
        <Form.Group className="mb-3" controlId="depositToContractValue">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="value"
            step="0.000000000000000001"
            ref={depositToContractRef}
          />
          <Form.Text>
            Enter amount you would like to deposit to contract
          </Form.Text>
        </Form.Group>
        <CustomButton text="Deposit" type="submit" icon="chevron-right" />
      </Form>
    </>
  );
}
