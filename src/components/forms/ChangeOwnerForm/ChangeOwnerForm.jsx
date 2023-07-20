import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef, useState } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input/Input";
import PropTypes from "prop-types";

export default function ChangeOwnerForm({ disabled }) {
  const { account, changeContractOwner } = useContext(RootContext);
  const changeOwnerRef = useRef();
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, []);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const address = changeOwnerRef.current.value;
          if (window.web3.utils.isAddress(address)) {
            changeContractOwner(
              account,
              window.web3.utils.toChecksumAddress(address)
            );
          }
          changeOwnerRef.current.value = null;
        }}
      >
        <Input
          type="text"
          placeholder="address"
          label="Change Owner"
          text="Change contract owner"
          controlId="changeOwnerValue"
          innerRef={changeOwnerRef}
          setInput={setInput}
          transfer={false}
          disabled={disabled}
        />
        <CustomButton
          text="Change owner"
          type="submit"
          icon="change"
          disabled={!input}
        />
      </Form>
    </>
  );
}

ChangeOwnerForm.propTypes = {
  disabled: PropTypes.bool,
};
