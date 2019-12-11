import React from "react";
//import ReactDOM from 'react-dom';
import {
  Navbar,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  Button,
  HeroFooter,
  Hero,
  HeroBody,
  Container,
  Title
} from "bloomer";
//import './Menubar.css'

export default class MenuBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    let accountSettings = null;
    if (this.props.loggedIn != null) {
      accountSettings = (
        <NavbarItem onClick={this.props.handleSettings} href="#">
          {this.props.loggedIn}'s Account Settings
        </NavbarItem>
      );
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
                <NavbarItem href="search">Search</NavbarItem>
              </NavbarStart>
              <NavbarEnd>
                <NavbarItem href="about">About</NavbarItem>
                {accountSettings}
                <NavbarItem onClick={this.props.loginPopup} href="#">
                  Login
                </NavbarItem>
                {accountSettings}
              </NavbarEnd>
            </NavbarMenu>
          </Navbar>
        </HeroFooter>
      </Hero>
    );
  }
}

// const MenuBar = () => {
//     return (

// /*<div class="topnav">
//   <a class="active" href="#home">Home</a>
//   <a href="#news">News</a>
//   <a href="#contact">Contact</a>
//   <a href="#about">About</a>
// </div> */
// <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
//   <NavbarItem>
//   <NavbarLink>
//   <Button isColor='blue' onClick={loginPopup}>Login</Button>
//       </NavbarLink>
//   </NavbarItem>
//   <NavbarItem>
//   <NavbarLink>
//   <a href="#news">News</a>

//       </NavbarLink>
//   </NavbarItem>
//   <NavbarItem>
//   <NavbarLink>
//   <a href="#contact">Contact</a>

//       </NavbarLink>
//   </NavbarItem>
//   <NavbarItem>
//   <NavbarLink>
//   <a href="#about">About</a>
//       </NavbarLink>
//   </NavbarItem>
// </Navbar>
//     );
// }

// export default MenuBar;
