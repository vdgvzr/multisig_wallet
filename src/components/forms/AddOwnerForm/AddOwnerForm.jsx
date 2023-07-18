import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useRef, useState } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input/Input";

export default function AddOwnerForm() {
  const { account, addOwner } = useContext(RootContext);
  const addOwnerRef = useRef();
  const [input, setInput] = useState("");

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const address = addOwnerRef.current.value;
          if (window.web3.utils.isAddress(address)) {
            addOwner(account, window.web3.utils.toChecksumAddress(address));
          }
          addOwnerRef.current.value = null;
        }}
      >
        <Input
          type="text"
          placeholder="address"
          label="New Owner"
          text="Enter new owner"
          controlId="addOwnerValue"
          innerRef={addOwnerRef}
          setInput={setInput}
        />
        <CustomButton
          text="Add owner"
          type="submit"
          icon="plus"
          disabled={!input}
        />
      </Form>
    </>
  );
}
