import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";
import Icon from "../../Icon/Icon";

export default function ContractBanner() {
  const { contract, owner, balance } = useContext(RootContext);

  const [address, setAddress] = useState("Contract not lodaded");

  useEffect(() => {
    setAddress(contract._address);
  }, [contract._address, contract._methods]);

  return (
    <>
      <div className="contract-banner py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 text-md-start text-center my-md-0 my-3">
              Contract address: <Address address={address} />
            </div>
            <div className="col-md-4 col-12 text-md-start text-center my-md-0 my-3">
              Contract Owner: <Address address={owner} />
            </div>
            <div className="col-md-4 col-12 text-md-start text-center my-md-0 my-3">
              Contract balance:{" "}
              <div>
                <span className="contract-banner__balance">{balance}</span>{" "}
                <Icon icon="eth" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
