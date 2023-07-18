import PropTypes from "prop-types";
import { useContext } from "react";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import DepositToContractForm from "../../components/forms/depositToContractForm/DepositToContractForm";
import Address from "../../components/content/components/Address/Address";

export default function Home() {
  const { account, owners, depositToContract } = useContext(RootContext);

  return (
    <>
      <div>
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
