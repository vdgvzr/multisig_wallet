import { Form } from "react-bootstrap";
import CustomButton from "../../content/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { useRef } from "react";
import { contractMethods } from "../../../assets/js/contractMethods";

export default function AddOwnerForm({ account, contract }) {
  const addOwnerRef = useRef();

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const address = addOwnerRef.current.value;
          if (window.web3.utils.isAddress(address)) {
            contractMethods.addOwner(
              contract,
              account,
              window.web3.utils.toChecksumAddress(address)
            );
          }
        }}
      >
        <Form.Group className="mb-3" controlId="addOwnerValue">
          <Form.Label>New Signatory</Form.Label>
          <Form.Control type="text" placeholder="address" ref={addOwnerRef} />
          <Form.Text>Enter new signatory</Form.Text>
        </Form.Group>
        <CustomButton text="Add Signatory" type="submit" />
      </Form>
    </>
  );
}

AddOwnerForm.propTypes = {
  account: PropTypes.string,
  contract: PropTypes.any,
};
