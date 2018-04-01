import React from "react";
import "./Nav.css";
import LoginNav from '../LoginNav/LoginNav';


const Nav = (props) => (
  <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      Kode Blogger
    </a>
    <LoginNav {...props}/>
  </nav>
);

export default Nav;
