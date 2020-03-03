import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

// import SearchField from "./SearchField";

import "../styles/TitleBar.css";

class TitleBar extends React.Component {
  // Renders Navbar from reactstrap including SearchField
  // Sets up and render the information for the info button
  render() {
    return (
      <div>
        <Navbar color="dark" dark>
          <NavbarBrand className="title" href="/">
            PSS
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => this.simpleDialog.show()}>info</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TitleBar;
