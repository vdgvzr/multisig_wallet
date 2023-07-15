import { Form } from "react-bootstrap";
import CustomButton from "../../content/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function AddOwnerForm({ account, addOwner }) {
  const addOwnerRef = useRef();

  useEffect(() => {
    addOwnerRef.current.value = null;
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const address = addOwnerRef.current.value;
          if (window.web3.utils.isAddress(address)) {
            addOwner(account, window.web3.utils.toChecksumAddress(address));
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
  addOwner: PropTypes.any,
};
