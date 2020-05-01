import {Navbar, NavDropdown, Nav} from 'react-bootstrap';
import React from 'react';
const HomeNav = () => {
  return (


    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Research Helper</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/login">Log In</Nav.Link>
          <NavDropdown title="Explore" id="basic-nav-dropdown">
            <NavDropdown.Item href="/random-data-finder">Random Data Finder</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/sl">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>

      </Navbar.Collapse>
    </Navbar>

  )
}

export default HomeNav;
