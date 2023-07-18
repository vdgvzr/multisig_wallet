import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input";

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
        <Input
          type="text"
          placeholder="address"
          label="New Owner"
          text="Enter new owner"
          controlId="addOwnerValue"
          innerRef={addOwnerRef}
        />
        <CustomButton text="Add owner" type="submit" />
      </Form>
    </>
  );
}
