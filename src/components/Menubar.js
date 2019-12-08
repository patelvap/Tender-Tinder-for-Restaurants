import React from 'react';
//import ReactDOM from 'react-dom';
//import {Navbar, NavbarBrand, NavbarItem, Icon, NavbarBurger, NavbarMenu, NavbarStart, NavbarLink, NavbarDropdown, NavbarDivider, NavbarEnd, Field, Control, Button } from 'bloomer';
import './Menubar.css'

const MenuBar = () => {
    return (
        
<div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>
    );
}

export default MenuBar;