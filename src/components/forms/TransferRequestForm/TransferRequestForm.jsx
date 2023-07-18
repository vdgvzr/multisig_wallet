import { Form } from "react-bootstrap";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function TransferRequestForm({ account, requestTransfer }) {
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
        <Form.Group className="mb-3" controlId="addOwnerValue">
          <Form.Label>Transfer to</Form.Label>
          <Form.Control
            type="text"
            placeholder="address"
            ref={transferRequestAddressRef}
          />
          <Form.Text>Enter address to transfer to</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="requestTransferValue">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            placeholder="value"
            step="0.000000000000000001"
            ref={transferRequestValueRef}
          />
          <Form.Text>Enter amount to transfer</Form.Text>
        </Form.Group>
        <CustomButton text="Request Transfer" type="submit" />
      </Form>
    </>
  );
}

TransferRequestForm.propTypes = {
  account: PropTypes.string,
  requestTransfer: PropTypes.any,
};
