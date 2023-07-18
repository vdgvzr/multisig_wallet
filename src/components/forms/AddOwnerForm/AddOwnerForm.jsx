import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";

export default function AddOwnerForm() {
  const { account, addOwner } = useContext(RootContext);
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
          <Form.Label>New Owner</Form.Label>
          <Form.Control type="text" placeholder="address" ref={addOwnerRef} />
          <Form.Text>Enter new owner</Form.Text>
        </Form.Group>
        <CustomButton text="Add owner" type="submit" />
      </Form>
    </>
  );
}
