import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RootContext } from "../../layouts/RootLayout";
import { PAGES } from "../../router";

export default function MainNav() {
  const { siteName } = useContext(RootContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">{siteName ?? "Site Name"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
