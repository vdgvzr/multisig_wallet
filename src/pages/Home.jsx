import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../layouts/RootLayout";
import DepositToContractForm from "../components/forms/depositToContractForm/DepositToContractForm";

export default function Home({ name }) {
  const { account, contract, depositToContract } = useContext(RootContext);

  const [address, setAddress] = useState("Contract not lodaded");

  useEffect(() => {
    setAddress(contract._address);
  }, [contract._address, contract._methods]);

  return (
    <>
      <h1>{name}</h1>
      <div>
        <p>Contract address: {address}</p>
        <p>Contract balance: </p>
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
