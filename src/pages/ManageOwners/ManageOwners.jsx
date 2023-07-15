import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../layouts/RootLayout";
import CustomButton from "../../components/content/CustomButton/CustomButton";
import AddOwnerForm from "../../components/forms/AddOwnerForm/AddOwnerForm";

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
        <p>Contract address: {address}</p>
        <p>Contract Owner: {owner}</p>
        <p>Contract balance: {balance} ETH</p>
        <p>Address Limit: {addressLimit}</p>
        <p>Signatures Required: {signaturesRequired}</p>
        <div>
          <p>Owners:</p>
          <ul>
            {owners.map((owner, index) => {
              return (
                <li
                  className={account === owner ? "text-success my-2" : " my-2"}
                  key={index}
                >
                  <span>{owner}</span>
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
        <AddOwnerForm account={account} addOwner={addOwner} />
      </div>
    </>
  );
}

ManageOwners.propTypes = {
  name: PropTypes.string,
};