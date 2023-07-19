import PropTypes from "prop-types";
import Form from "../../components/forms/Form/Form";
import IconHero from "../../components/content/mainContent/IconHero/IconHero";
import { useContext } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import OwnersList from "../../components/content/mainContent/OwnersList/OwnersList";

export default function Home() {
  const { balance, getEth } = useContext(RootContext);
  const value = parseInt(balance) * getEth.quotes.USD.price;

  return (
    <>
      <IconHero
        title={`${balance} ETH`}
        icon="eth"
        text={`$${value.toLocaleString()}`}
      />
      <div className="row my-5 py-5">
        <Form title="Deposit to Contract" type="deposit" col="6" />
        <OwnersList col="6" />
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
