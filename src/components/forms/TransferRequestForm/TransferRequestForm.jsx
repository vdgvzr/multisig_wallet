import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import { useContext, useEffect, useRef } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input";

export default function TransferRequestForm() {
  const { account, requestTransfer } = useContext(RootContext);
  const transferRequestAddressRef = useRef();
  const transferRequestValueRef = useRef();

  useEffect(() => {
    transferRequestAddressRef.current.value = null;
    transferRequestValueRef.current.value = null;
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const to = transferRequestAddressRef.current.value;
          const value = window.web3.utils.toWei(
            transferRequestValueRef.current.value.toString(),
            "ether"
          );
          if (window.web3.utils.isAddress(to)) {
            requestTransfer(
              account,
              window.web3.utils.toChecksumAddress(to),
              value
            );
          }
        }}
      >
        <Input
          type="text"
          placeholder="address"
          label="Transfer to"
          text="Enter address to transfer to"
          controlId="addOwnerValue"
          innerRef={transferRequestAddressRef}
        />
        <Input
          type="number"
          placeholder="amount"
          step="0.000000000000000001"
          label="Amount"
          text="Enter amount to transfer"
          controlId="requestTransferValue"
          innerRef={transferRequestValueRef}
        />
        <CustomButton text="Request Transfer" type="submit" />
      </Form>
    </>
  );
}
