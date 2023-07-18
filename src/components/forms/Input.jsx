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
}) {
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{type && label}</Form.Label>
        <Form.Control
          type={type && type}
          placeholder={placeholder}
          step={type && type === "number" ? (step != null ? step : null) : null}
          ref={innerRef && innerRef}
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
  innerRef: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  controlId: PropTypes.string,
};
