import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
  } from 'reactstrap';



function Navigation({ logout }) {
const { currentUser } = useContext(UserContext);
const [isOpen, setIsOpen] = useState(false);
console.debug("Navigation", "currentUser=", currentUser);

const toggle = () => setIsOpen(!isOpen);

function loggedInNav() {
    return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/weather">Weather Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/" onClick={logout}>
              Log Out {currentUser.username}
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

function loggedOutNav(){
    return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/signup">Sign Up</NavLink>
          </NavItem>
        </Nav>
      );
    }
    return (
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">Weather</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {currentUser ? loggedInNav() : loggedOutNav()}
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      );


}
export default Navigation;