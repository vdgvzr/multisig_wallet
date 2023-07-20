import PropTypes from "prop-types";
import DepositToContractForm from "../depositToContractForm/DepositToContractForm";
import AddOwnerForm from "../AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "../TransferRequestForm/TransferRequestForm";
import { Col } from "react-bootstrap";

export default function Form({ title, type, col, disabled }) {
  return (
    <>
      <Col xs={col} className="form py-4 px-5">
        {title ? <h2 className="mb-3">{title}</h2> : null}{" "}
        {type === "add" ? <AddOwnerForm disabled={disabled} /> : null}
        {type === "deposit" ? <DepositToContractForm /> : null}
        {type === "transfer" ? <TransferRequestForm /> : null}
      </Col>
    </>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  col: PropTypes.string,
  disabled: PropTypes.bool,
};
