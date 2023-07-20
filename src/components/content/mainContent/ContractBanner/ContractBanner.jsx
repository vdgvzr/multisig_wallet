import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";
import Icon from "../../Icon/Icon";
import BannerItem from "./BannerItem/BannerItem";

export default function ContractBanner() {
  const {
    contract,
    owner,
    balance,
    addressLimit,
    signaturesRequired,
    isOwner,
  } = useContext(RootContext);
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
              col={
                isOwner && window.location.pathname === "/manage-owners"
                  ? "3"
                  : "4"
              }
              title="Contract address"
              element={<Address address={address} format={true} />}
            />
            <BannerItem
              col={
                isOwner && window.location.pathname === "/manage-owners"
                  ? "3"
                  : "4"
              }
              title="Contract deployer"
              element={<Address address={owner} format={true} />}
            />
            <BannerItem
              col={
                isOwner && window.location.pathname === "/manage-owners"
                  ? "2"
                  : "4"
              }
              title="Contract balance"
              element={
                <div>
                  <span className="contract-banner__balance">{balance}</span>{" "}
                  <Icon className="ms-1" icon="eth" />
                </div>
              }
            />
            {isOwner && window.location.pathname === "/manage-owners" ? (
              <>
                <BannerItem
                  col="2"
                  title="Owner limit"
                  element={<div>{addressLimit}</div>}
                />
                <BannerItem
                  col="2"
                  title="Signatures required"
                  element={<div>{signaturesRequired}</div>}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
