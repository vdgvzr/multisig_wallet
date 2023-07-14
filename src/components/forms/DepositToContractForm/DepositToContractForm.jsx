import { Form } from "react-bootstrap";
import CustomButton from "../../content/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { useRef } from "react";
import { contractMethods } from "../../../assets/js/contractMethods";

export default function DepositToContractForm({ account, contract }) {
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
          contractMethods.depositToContract(contract, account, value);
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
        <CustomButton text="Deposit" type="submit" />
      </Form>
    </>
  );
}

DepositToContractForm.propTypes = {
  account: PropTypes.string,
  contract: PropTypes.any,
};
