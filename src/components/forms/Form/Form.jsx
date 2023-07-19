import PropTypes from "prop-types";
import DepositToContractForm from "../depositToContractForm/DepositToContractForm";
import AddOwnerForm from "../AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "../TransferRequestForm/TransferRequestForm";

export default function Form({ title, type, col, disabled }) {
  return (
    <>
      <div className={`col-${col} form py-4 px-5`}>
        {title ? <h2 className="mb-3">{title}</h2> : null}{" "}
        {type === "add" ? <AddOwnerForm disabled={disabled} /> : null}
        {type === "deposit" ? <DepositToContractForm /> : null}
        {type === "transfer" ? <TransferRequestForm /> : null}
      </div>
    </>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  col: PropTypes.string,
  disabled: PropTypes.bool,
};
