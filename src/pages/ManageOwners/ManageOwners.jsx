import PropTypes from "prop-types";
import { useContext } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import CustomButton from "../../components/content/components/CustomButton/CustomButton";
import Address from "../../components/content/components/Address/Address";
import Form from "../../components/forms/Form/Form";

export default function ManageOwners() {
  const {
    account,
    isOwner,
    owners,
    addressLimit,
    deleteOwner,
  } = useContext(RootContext);

  return (
    <>
      <div>
        <div>
          <p>Owners:</p>
          <ul>
            {owners.map((owner, index) => {
              return (
                <li className="my-2" key={index}>
                  <Address
                    address={owner}
                    variant={account === owner && "active"}
                  />
                  {isOwner && owner !== account ? (
                    <CustomButton
                      text="Remove Owner"
                      classes="ms-2"
                      icon="delete"
                      action={() => {
                        deleteOwner(account, index);
                      }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        {owners.length >= addressLimit ? null : (
          <Form title="Add a new owner" type="add" col="6" />
        )}
      </div>
    </>
  );
}
