import PropTypes from "prop-types";
import DepositToContractForm from "../DepositToContractForm/DepositToContractForm";
import AddOwnerForm from "../AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "../TransferRequestForm/TransferRequestForm";
import FilterTableRowsForm from "../FilterTableRowsForm/FilterTableRowsForm";
import { Col } from "react-bootstrap";
import ChangeOwnerForm from "../ChangeOwnerForm/ChangeOwnerForm";

export default function Form({ title, type, col, disabled, customFunction }) {
  let element;

  switch (type) {
    case "add":
      element = <AddOwnerForm disabled={disabled} />;
      break;
    case "change":
      element = <ChangeOwnerForm disabled={disabled} />;
      break;
    case "deposit":
      element = <DepositToContractForm />;
      break;
    case "transfer":
      element = <TransferRequestForm />;
      break;
    case "filterRows":
      element = <FilterTableRowsForm setRowsPerPage={customFunction} />;
      break;
  }

  return (
    <>
      <Col xs={12} lg={col} className="form py-4 px-5">
        {title ? <h2 className="mb-3">{title}</h2> : null} {element}
      </Col>
    </>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  col: PropTypes.string,
  disabled: PropTypes.any,
  customFunction: PropTypes.func,
};
