import { Form } from "react-bootstrap";
import CustomButton from "../../content/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function AddOwnerForm({ account, addOwner }) {
  const addOwnerRef = useRef();

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const value = addOwnerRef.current.value;
          if (window.web3.utils.isAddress(value)) {
            addOwner(account, window.web3.utils.toChecksumAddress(value));
          }
        }}
      >
        <Form.Group className="mb-3" controlId="addOwnerValue">
          <Form.Label>New Signatory</Form.Label>
          <Form.Control type="text" placeholder="address" ref={addOwnerRef} />
          <Form.Text>Enter new signatory</Form.Text>
        </Form.Group>
        <CustomButton text="Submit" type="submit" />
      </Form>
    </>
  );
}

AddOwnerForm.propTypes = {
  account: PropTypes.string,
  addOwner: PropTypes.any,
};
