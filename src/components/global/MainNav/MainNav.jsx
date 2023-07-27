import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import { PAGES } from "../../../router";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import Address from "../../content/components/Address/Address";
import { Link } from "react-router-dom";

export default function MainNav() {
  const { siteName, account, isOwner, loadWeb3, accountLoading, isSignatory } =
    useContext(RootContext);

  return (
    <div className="main-nav">
      <Navbar expand="lg" className="main-nav__navbar" variant="dark">
        <Container>
          <Link className="navbar-brand me-5" to="/">
            {siteName ?? "Site Name"}
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-lg-flex justify-content-between"
          >
            <Nav className="main-nav__nav me-auto d-lg-flex align-items-center">
              {isSignatory &&
                PAGES.map((page, index) => {
                  if (page.name !== "Home") {
                    if (page.name !== "Manage Owners" || isOwner) {
                      const path = window.location.pathname;
                      return (
                        <Link
                          className={`nav-link me-lg-3 p-lg-0 pb-lg-1 mt-lg-1 ${
                            path === page.url ? "custom-active" : ""
                          }`}
                          key={index}
                          to={page.url}
                        >
                          {page.name}
                          <span></span>
                        </Link>
                      );
                    }
                  }
                })}
              {account ? (
                <Link className="nav-link main-nav__account" disabled={true}>
                  {accountLoading ? (
                    "Loading"
                  ) : (
                    <>
                      <Address address={account} format={true} />
                    </>
                  )}
                </Link>
              ) : (
                <CustomButton
                  text={accountLoading ? "Loading..." : "Connect Wallet"}
                  classes="ms-auto"
                  icon="eth"
                  action={() => {
                    loadWeb3();
                  }}
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
