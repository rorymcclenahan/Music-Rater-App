import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-dom';

function NavigationBar() {
    return (
        <div className="App">
            <Navbar className="navbar" >
                <Navbar.Brand href="/">R8 UR MUSIC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbartitle">
                        <Nav.Link href="/music">Songs</Nav.Link>
                        <Nav.Link href="/favorites">Favorites</Nav.Link>
                        <Nav.Link href="/newsignup">Sign Up</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/newlogin">Login</NavDropdown.Item>
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;