import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

function Navigation() {
  const auth = useAuth();

  async function logoutUser() {
    try {
      await logout();
      auth.update({ isLoggedIn: false, user: {} });
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <Navbar className="Navigation m-auto">
      <Navbar.Brand>
        <img
          src="https://waas-inbox-demo.s3.amazonaws.com/logo.svg"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" >
        <Nav>
          <NavDropdown title={auth.user.first_name}>
            <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;