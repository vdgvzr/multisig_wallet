import PropTypes from "prop-types";
import DepositToContractForm from "../depositToContractForm/DepositToContractForm";
import AddOwnerForm from "../AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "../TransferRequestForm/TransferRequestForm";
import FilterTableRowsForm from "../FilterTableRowsForm/FilterTableRowsForm";
import { Col } from "react-bootstrap";
import ChangeOwnerForm from "../ChangeOwnerForm/ChangeOwnerForm";

export default function Form({ title, type, col, disabled, customFunction }) {
  return (
    <>
      <Col xs={12} lg={col} className="form py-4 px-5">
        {title ? <h2 className="mb-3">{title}</h2> : null}{" "}
        {type === "add" ? <AddOwnerForm disabled={disabled} /> : null}
        {type === "change" ? <ChangeOwnerForm disabled={disabled} /> : null}
        {type === "deposit" ? <DepositToContractForm /> : null}
        {type === "transfer" ? <TransferRequestForm /> : null}
        {type === "filterRows" ? (
          <FilterTableRowsForm setRowsPerPage={customFunction} />
        ) : null}
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
