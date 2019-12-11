import React from "react";
//import ReactDOM from 'react-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Icon,
  NavbarBurger,
  NavbarMenu,
  NavbarStart,
  NavbarLink,
  NavbarDropdown,
  NavbarDivider,
  NavbarEnd,
  Field,
  Control,
  Button
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
        <NavbarItem>
          <Button
            isColor="blue"
            user={this.props.loggedIn}
            onClick={this.props.handleSettings}
          >
            {this.props.loggedIn}'s Settings
          </Button>
        </NavbarItem>
      );
    }

    return (
      <Navbar style={{ border: "solid 1px #00D1B2", margin: "0" }}>
        <NavbarItem>
          <NavbarLink>
            <Button isColor="blue" onClick={this.props.loginPopup}>
              Login
            </Button>
          </NavbarLink>
        </NavbarItem>

        <NavbarItem>
          <NavbarLink>
            <a href="search">Search</a>
          </NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink>
            <a href="reviews">About</a>
          </NavbarLink>
        </NavbarItem>
        <NavbarEnd>{accountSettings}</NavbarEnd>
      </Navbar>
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
