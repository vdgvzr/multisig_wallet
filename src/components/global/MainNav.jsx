import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RootContext } from "../../layouts/RootLayout";
import { PAGES } from "../../router";
import { Button } from "react-bootstrap";

export default function MainNav() {
  const { siteName, account, loading } = useContext(RootContext);

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
                return (
                  <Nav.Link key={index} href={page.url}>
                    {page.name}
                  </Nav.Link>
                );
              }
            })}
          </Nav>
          <Button className="ms-auto">
            {loading ? "Loading" : account ? account : "Connect Wallet"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
