import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import DepositToContractForm from "../../components/forms/depositToContractForm/DepositToContractForm";
import Address from "../../components/content/Address/Address";

export default function Home({ name }) {
  const {
    account,
    balance,
    owner,
    owners,
    addressLimit,
    signaturesRequired,
    contract,
    depositToContract,
  } = useContext(RootContext);

  const [address, setAddress] = useState("Contract not lodaded");

  useEffect(() => {
    setAddress(contract._address);
  }, [contract._address, contract._methods]);

  return (
    <>
      <h1>{name}</h1>
      <div>
        <div>
          Contract address: <Address address={address} />
        </div>
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
                  <Address address={owner} active={account === owner} />
                </li>
              );
            })}
          </ul>
        </div>
        <DepositToContractForm
          account={account}
          depositToContract={depositToContract}
        />
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
