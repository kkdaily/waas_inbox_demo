import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
//import LogoImage from 'images/logo.svg';
//import myImg from '../assets/images/logo.svg';

function Navigation() {
  const auth = useAuth();

  async function logout() {
    await logoutUser();
    auth.updateUser(null);
  }

  return (
    <Navbar className="Navigation m-auto" fixed="top">
      <Navbar.Brand>
        <img
          src="https://www.workatastartup.com/assets/waas/ycombinator-logo-b603b0a270e12b1d42b7cca9d4527a9b206adf8293a77f9f3e8b6cb542fcbfa7.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
        <Nav>
          <NavDropdown title={auth.user.first_name} id="basic-nav-dropdown" menuAlign="right">
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;