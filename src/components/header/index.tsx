import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <span id="plus">@</span>Media<span id="plus">+</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="#About">About</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#contact">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
