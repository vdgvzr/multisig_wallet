import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RootContext } from "../../../layouts/RootLayout";
import { PAGES } from "../../../router";
import CustomButton from "../../content/CustomButton/CustomButton";

export default function MainNav() {
  const { siteName, account, isOwner, loadWeb3, accountLoading } =
    useContext(RootContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">{siteName ?? "Site Name"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-between"
        >
          <Nav className="me-auto">
            {PAGES.map((page, index) => {
              if (page.name !== "Home") {
                if (page.name !== "Manage Owners" || isOwner) {
                  return (
                    <Nav.Link key={index} href={page.url}>
                      {page.name}
                    </Nav.Link>
                  );
                }
              }
            })}
          </Nav>
          {/* Add another action to change account if account */}
          {account ? (
            <Nav.Link disabled={true}>
              {accountLoading ? "Loading" : account}
            </Nav.Link>
          ) : (
            <CustomButton
              text={accountLoading ? "Loading" : "Connect Wallet"}
              classes="ms-auto"
              action={() => {
                loadWeb3();
              }}
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
