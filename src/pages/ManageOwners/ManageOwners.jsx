import { useContext } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import Form from "../../components/forms/Form/Form";
import OwnersList from "../../components/content/mainContent/OwnersList/OwnersList";

export default function ManageOwners() {
  const { owners, addressLimit } = useContext(RootContext);

  return (
    <>
      <div className="row justify-content-center my-5">
        <OwnersList col="8" />
      </div>
      <div className="row justify-content-center my-5">
        {owners.length >= addressLimit ? null : (
          <Form title="Add a new owner" type="add" col="8" />
        )}
      </div>
    </>
  );
}
