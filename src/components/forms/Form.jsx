import PropTypes from "prop-types";
import DepositToContractForm from "./depositToContractForm/DepositToContractForm";
import AddOwnerForm from "./AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "./TransferRequestForm/TransferRequestForm";

export default function Form({ title, type, col }) {
  return (
    <>
      <div className="row justify-content-center my-5">
        <div className={`col-${col}`}>
          {title ? <h1 className="mb-3">{title}</h1> : null}{" "}
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
