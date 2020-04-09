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
            <h4>About This Tool</h4>
            <p>This page is created as part of the NTNU course MOL3022 – Bioinformatics – Method Oriented Project.
              Its purpose is to be helping in predicting the secondary structure of proteins, by providing a easy-to-use tool to search and view predictions from several sources.
            </p>

            <h4>How the Site Works</h4>
            <p>You can search for proteins or keywords related to a protein in the search field. Pressing ENTER initializes the search.
              After the search you are presented with a list of protein IDs related to the search. Clicking one of these IDs opens an info-panel
              containing information regarding the protein. From the info-panel you can continue to a page containing secondary structure prediction
              protein from DSSP, P-Sea and MMTF. 
            </p>
          </div>
        </SkyLight>
      </div>
    );
  }
}

export default TitleBar;
