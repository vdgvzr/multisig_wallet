import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import { PAGES } from "../../../router";
import CustomButton from "../../content/components/CustomButton/CustomButton";
import Address from "../../content/components/Address/Address";

export default function MainNav() {
  const { siteName, account, isOwner, loadWeb3, accountLoading, isSignatory } =
    useContext(RootContext);

  return (
    <div className="main-nav">
      <Navbar expand="lg" className="main-nav__navbar" variant="dark">
        <Container>
          <Navbar.Brand href="/">{siteName ?? "Site Name"}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-between"
          >
            <Nav className="me-auto d-flex w-100 align-items-center">
              {isSignatory &&
                PAGES.map((page, index) => {
                  if (page.name !== "Home") {
                    if (page.name !== "Manage Owners" || isOwner) {
                      const path = window.location.pathname;
                      return (
                        <Nav.Link
                          className={path === page.url ? "active me-2" : "me-2"}
                          key={index}
                          href={page.url}
                        >
                          {page.name}
                        </Nav.Link>
                      );
                    }
                  }
                })}
              {account ? (
                <Nav.Link className="ms-auto main-nav__account" disabled={true}>
                  {accountLoading ? (
                    "Loading"
                  ) : (
                    <Address address={account} format={true} />
                  )}
                </Nav.Link>
              ) : (
                <CustomButton
                  text={accountLoading ? "Loading" : "Connect Wallet"}
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
