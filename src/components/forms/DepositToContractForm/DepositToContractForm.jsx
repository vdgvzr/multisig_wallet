import { Form } from "react-bootstrap";
import CustomButton from "../../content/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function DepositToContractForm({ account, depositToContract }) {
  const depositToContractRef = useRef();

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
        <CustomButton text="Submit" type="submit" />
      </Form>
    </>
  );
}

DepositToContractForm.propTypes = {
  account: PropTypes.string,
  depositToContract: PropTypes.any,
};
