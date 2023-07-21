import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";
import Icon from "../../Icon/Icon";
import BannerItem from "./BannerItem/BannerItem";
import { Container, Nav, Navbar } from "react-bootstrap";

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
      <Navbar
        expand="lg"
        className="contract-banner text-center"
        variant="light"
      >
        <Container>
          <h6 className="m-0 d-lg-none" href="/">
            Contract Info
          </h6>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-lg-flex justify-content-between"
          >
            <Nav className="main-nav__nav me-auto d-lg-flex flex-md-row flex-column align-items-center">
              <BannerItem
                col={
                  isOwner && window.location.pathname === "/manage-owners"
                    ? "3"
                    : "4"
                }
                title="Contract address"
                element={
                  <Address
                    address={address}
                    format={window.location.pathname === "/manage-owners"}
                  />
                }
              />
              <BannerItem
                col={
                  isOwner && window.location.pathname === "/manage-owners"
                    ? "3"
                    : "4"
                }
                title="Contract deployer"
                element={
                  <Address
                    address={owner}
                    format={window.location.pathname === "/manage-owners"}
                  />
                }
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
                    <span className="contract-banner__balance">
                      {balance} ETH
                    </span>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
