import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../layouts/RootLayout";
import DepositToContractForm from "../components/forms/depositToContractForm/DepositToContractForm";
import AddOwnerForm from "../components/forms/AddOwnerForm/AddOwnerForm";
import CustomButton from "../components/content/CustomButton/CustomButton";

export default function Home({ name }) {
  const {
    account,
    isOwner,
    balance,
    owner,
    owners,
    addressLimit,
    signaturesRequired,
    contract,
    depositToContract,
    addOwner,
    deleteOwner,
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
                  {isOwner ? (
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
        <DepositToContractForm
          account={account}
          depositToContract={depositToContract}
        />
        {isOwner && owners.length <= addressLimit ? (
          <AddOwnerForm account={account} addOwner={addOwner} />
        ) : null}
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
