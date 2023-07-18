import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Input({
  type,
  placeholder,
  step = null,
  innerRef,
  label,
  text,
  controlId,
  setInput,
}) {
  return (
    <>
      <Form.Group className="mb-3 form-input" controlId={controlId}>
        <Form.Label>{type && label}</Form.Label>
        <Form.Control
          type={type && type}
          placeholder={placeholder}
          step={type && type === "number" ? (step != null ? step : null) : null}
          ref={innerRef && innerRef}
          onChange={(e) => setInput(e.target.value)}
        />
        <Form.Text>{text && text}</Form.Text>
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
};
