import { Form } from "react-bootstrap";
import { utils } from "../../../assets/js/utils";
import { useMetaMask } from "../../../hooks/useMetamask";

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
  const { wallet, balance } = useMetaMask();
  const valueElement = (
    <>
      <div className="form-input__balance-element d-flex justify-content-between">
        <div>{text}</div>
        <div
          className="form-input__balance-element-balance"
          onClick={() => {
            type === "number"
              ? (innerRef.current.value = transfer ? balance : wallet.balance)
              : null;
            type === "text"
              ? transfer
                ? (innerRef.current.value = wallet.accounts[0])
                : null
              : null;
            setInput(true);
          }}
        >
          {type === "number" ? (
            transfer ? (
              <span>Max: {balance} ETH</span>
            ) : (
              <span>Max: {wallet.balance} ETH</span>
            )
          ) : null}
          {type === "text"
            ? transfer
              ? utils.formatAddress(wallet.accounts[0])
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
