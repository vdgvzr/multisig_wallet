import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";
import Icon from "../../Icon/Icon";
import BannerItem from "./BannerItem/BannerItem";

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
            <BannerItem
              type="address"
              element={<Address address={address} />}
            />
            <BannerItem type="owner" element={<Address address={owner} />} />
            <BannerItem
              type="balance"
              element={
                <div>
                  <span className="contract-banner__balance">{balance}</span>{" "}
                  <Icon icon="eth" />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
