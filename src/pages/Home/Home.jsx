import PropTypes from "prop-types";
import Form from "../../components/forms/Form/Form";
import IconHero from "../../components/content/mainContent/IconHero/IconHero";
import { useContext } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";

export default function Home() {
  const { balance } = useContext(RootContext);
  return (
    <>
      <IconHero text={balance} icon="eth" />
      <Form title="Deposit to Contract" type="deposit" col="6" />
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
