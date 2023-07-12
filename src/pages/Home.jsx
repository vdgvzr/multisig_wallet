import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../layouts/RootLayout";
import { Button } from "react-bootstrap";

export default function Home({ name }) {
  const { contract } = useContext(RootContext);

  const [address, setAddress] = useState("Contract not lodaded");

  useEffect(() => {
    setAddress(contract._address);
  }, [contract._address, contract._methods]);

  console.log(contract);

  return (
    <>
      <h1>{name}</h1>
      <div>
        <p>Contract address: {address}</p>
        <p>Contract balance: </p>
        <Button>Deposit to Contract</Button>
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
