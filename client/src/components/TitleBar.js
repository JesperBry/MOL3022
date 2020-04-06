import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import SkyLight from "react-skylight";

import "../styles/TitleBar.css";

class TitleBar extends React.Component {
  // Renders Navbar from reactstrap including SearchField
  // Sets up and render the information for the info button
  render() {
    return (
      <div>
        <Navbar color="dark" dark>
          <NavbarBrand className="title" href="/">
            {/* PSS */}
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => this.dialog.show()}>info</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <SkyLight
          hideOnOverlayClicked
          ref={(ref) => (this.dialog = ref)}
          title="Information"
        >
          <div align="left" className="information">
            <h4>About this site</h4>
            <p>TODO: write information</p>

            <h4>How the site works</h4>
            <p>TODO: write information</p>
          </div>
        </SkyLight>
      </div>
    );
  }
}

export default TitleBar;
