import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

const layout = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Invoice App</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">
        Products
      </NavItem>
      <NavItem eventKey={2} href="/customers">
        Customers
      </NavItem>
      <NavItem eventKey={3} href="#">
        Invoices
      </NavItem>
    </Nav>
  </Navbar>
);

export default layout;
