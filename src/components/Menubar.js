import React from "react";
//import ReactDOM from 'react-dom';
import {
  Navbar,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  HeroFooter,
  Hero,
  HeroBody,
  Container,
  Title
} from "bloomer";
//import './Menubar.css'

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    let accountSettings = null;
    let reviewsButton=null
    if (this.props.loggedIn != null) {
      reviewsButton = (
        <NavbarItem href="reviews">Reviews</NavbarItem>
      )
      accountSettings = (
        <NavbarItem onClick={this.props.handleSettings} href="#">
          {this.props.loggedIn}'s Account Settings
        </NavbarItem>
      );
    }


    let welcomeButton = (
      <NavbarItem href ="/">Welcome</NavbarItem>
    )

    let loginLogoutButton = 
    (<NavbarItem onClick={this.props.loginPopup} href="#">
      Login
    </NavbarItem>)
    if (this.props.loggedIn!=null) {
      loginLogoutButton = 
      (<NavbarItem onClick={this.props.handleLogout} href="#">
        Logout
      </NavbarItem>)
    }

    return (
      <Hero isColor="info" isSize="1/4">
        <HeroBody>
          <Container hasTextAlign="left">
            <Title>Tender: Tinder Restaurant Edition</Title>
          </Container>
        </HeroBody>
        <HeroFooter>
          <Navbar
            style={{
              marginLeft: "14%",
              marginRight: "14%"
            }}
          >
            <NavbarMenu isActive="true">
              <NavbarStart>
                {welcomeButton}
                <NavbarItem href="search">Search</NavbarItem>
              </NavbarStart>
              <NavbarEnd>
                {reviewsButton}
                {accountSettings}
                {loginLogoutButton}

              </NavbarEnd>
            </NavbarMenu>
          </Navbar>
        </HeroFooter>
      </Hero>
    );
  }
}