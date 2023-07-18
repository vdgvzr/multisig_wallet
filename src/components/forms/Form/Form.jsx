import PropTypes from "prop-types";
import DepositToContractForm from "../depositToContractForm/DepositToContractForm";
import AddOwnerForm from "../AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "../TransferRequestForm/TransferRequestForm";

export default function Form({ title, type, col }) {
  return (
    <>
      <div className="row form justify-content-center my-5 py-5">
        <div className={`col-${col}`}>
          {title ? <h2 className="mb-3">{title}</h2> : null}{" "}
          {type === "add" ? <AddOwnerForm /> : null}
          {type === "deposit" ? <DepositToContractForm /> : null}
          {type === "transfer" ? <TransferRequestForm /> : null}
        </div>
      </div>
    </>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  col: PropTypes.string,
};
