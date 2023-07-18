import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import CustomButton from "../../components/content/components/CustomButton/CustomButton";
import AddOwnerForm from "../../components/forms/AddOwnerForm/AddOwnerForm";
import Address from "../../components/content/components/Address/Address";
import Form from "../../components/forms/Form";

export default function ManageOwners({ name }) {
  const {
    account,
    isOwner,
    balance,
    owner,
    owners,
    addressLimit,
    signaturesRequired,
    contract,
    deleteOwner,
    addOwner,
  } = useContext(RootContext);

  const [address, setAddress] = useState("Contract not lodaded");

  useEffect(() => {
    setAddress(contract._address);
  }, [contract._address, contract._methods]);

  return (
    <>
      <h1>{name}</h1>
      <div>
        <p>
          Contract address: <Address address={address} />
        </p>
        <div>
          Contract Owner: <Address address={owner} />
        </div>
        <p>Contract balance: {balance} ETH</p>
        <p>Address Limit: {addressLimit}</p>
        <p>Signatures Required: {signaturesRequired}</p>
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
        <Form type="add" />
      </div>
    </>
  );
}

ManageOwners.propTypes = {
  name: PropTypes.string,
};
