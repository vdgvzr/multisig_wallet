import Form from "../../components/forms/Form/Form";
import OwnersList from "../../components/content/mainContent/OwnersList/OwnersList";
import { Row } from "react-bootstrap";
import { useMetaMask } from "../../hooks/useMetamask";

export default function ManageOwners() {
  const { owners, addressLimit } = useMetaMask();
  const disabled = owners.length >= addressLimit;

  return (
    <>
      <Row className="justify-content-center my-5">
        <OwnersList col="8" />
      </Row>
      <Row className="justify-content-center my-5">
        <Form
          title={disabled ? "Owner limit reached" : "Add a new owner"}
          type="add"
          col="8"
          disabled={disabled}
        />
      </Row>
    </>
  );
}
