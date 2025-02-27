import Link from "next/link";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="/#home">
            <span id="plus">@</span>Media<span id="plus">+</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link legacyBehavior href="/#home"><a className="text-black mmy-3 mx-3">Home</a></Link>
              <Link legacyBehavior href="/blog"><a className="text-black mmy-3 mx-3">Blog</a></Link>
              <Link legacyBehavior href="/#About"><a className="text-black mmy-3 mx-3">About</a></Link>
              <Link legacyBehavior href="/#services"><a className="text-black mmy-3 mx-3">Services</a></Link>
              <Link legacyBehavior href="/#contact"><a className="text-black mmy-3 mx-3">Contact Us</a></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
