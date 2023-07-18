import PropTypes from "prop-types";
import DepositToContractForm from "./depositToContractForm/DepositToContractForm";
import AddOwnerForm from "./AddOwnerForm/AddOwnerForm";
import TransferRequestForm from "./TransferRequestForm/TransferRequestForm";

export default function Form({ type }) {
  switch (type) {
    case "deposit":
      return <DepositToContractForm />;
    case "add":
      return <AddOwnerForm />;
    case "transfer":
      return <TransferRequestForm />;
  }
}

Form.propTypes = {
  type: PropTypes.string,
};
