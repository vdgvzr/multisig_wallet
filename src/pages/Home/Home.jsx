import Form from "../../components/forms/Form/Form";
import IconHero from "../../components/content/mainContent/IconHero/IconHero";
import OwnersList from "../../components/content/mainContent/OwnersList/OwnersList";
import { Row } from "react-bootstrap";
import { useMetaMask } from "../../hooks/useMetamask";
import { getApi } from "../../api/api";
import { useLoaderData } from "react-router-dom";

function Home() {
  const { balance } = useMetaMask();
  const { getEth } = useLoaderData();
  const value = parseInt(balance) * getEth.quotes.USD.price;

  return (
    <>
      <IconHero
        title={balance > 0 ? `${balance} ETH` : "Deposit ETH"}
        icon="eth"
        text={balance > 0 ? `$${value.toLocaleString()}` : null}
      />
      <Row className="my-5 py-5">
        <Form title="Deposit to Contract" type="deposit" col="6" />
        <OwnersList col="6" />
      </Row>
    </>
  );
}

async function loader({ request: { signal } }) {
  const getEth = getApi({
    url: "tickers/eth-ethereum/",
    options: { signal },
  });

  return { getEth: await getEth };
}

export const homeRoute = {
  loader,
  element: <Home />,
};
