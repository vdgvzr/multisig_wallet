import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useContext } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import { utils } from "../../../assets/js/utils";

export default function Input({
  type,
  placeholder,
  step = null,
  innerRef,
  label,
  text,
  controlId,
  setInput,
  transfer,
  defaultValue,
  options,
  disabled = false,
}) {
  const { account, balance, connectedBalance } = useContext(RootContext);
  const formatConnectedBalance = window.web3.utils.fromWei(
    connectedBalance.toString(),
    "ether"
  );

  const valueElement = (
    <>
      <div className="form-input__balance-element d-flex justify-content-between">
        <div>{text}</div>
        <div
          className="form-input__balance-element-balance"
          onClick={() => {
            type === "number"
              ? (innerRef.current.value = transfer
                  ? balance
                  : formatConnectedBalance)
              : null;
            type === "text"
              ? transfer
                ? (innerRef.current.value = account)
                : null
              : null;
            setInput(true);
          }}
        >
          {type === "number" ? (
            transfer ? (
              <span>Max: {balance} ETH</span>
            ) : (
              <span>Max: {formatConnectedBalance} ETH</span>
            )
          ) : null}
          {type === "text"
            ? transfer
              ? utils.formatAddress(account)
              : null
            : null}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Form.Group className="mb-3 form-input" controlId={controlId}>
        <Form.Label>{type && label}</Form.Label>
        {type === "select" ? (
          <Form.Select defaultValue={defaultValue} onChange={setInput}>
            {options}
          </Form.Select>
        ) : (
          <Form.Control
            type={type && type}
            placeholder={placeholder}
            step={
              type && type === "number" ? (step != null ? step : null) : null
            }
            ref={innerRef && innerRef}
            onChange={() => setInput(true)}
            disabled={disabled}
          />
        )}

        <Form.Text>{valueElement}</Form.Text>
      </Form.Group>
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  step: PropTypes.string,
  innerRef: PropTypes.any,
  label: PropTypes.string,
  text: PropTypes.string,
  controlId: PropTypes.string,
  setInput: PropTypes.func,
  transfer: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  options: PropTypes.any,
};
