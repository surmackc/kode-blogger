import React from "react";
import "./Nav.css";
import LoginNav from '../LoginNav/LoginNav';
import NavSearch from '../NavSearch/NavSearch';
import { Link } from 'react-router-dom'



const Nav = (props) => (
  <nav className="navbar navbar-expand-md navbar-custom">
    <Link to="/" className="navbar-brand"> 
      kode<span id="navbar-brand-second">Blogger</span></Link>
    <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto mt-2 mt-md-0">
        <li className="nav-item active">
          <Link to="/manageNotes"><button className="btn btn-outline-light" type="button">My Posts</button></Link>
          <Link to="/input"><button className="btn btn-outline-light" type="button">+ Post</button></Link>
        </li>
      </ul>
    <NavSearch />
    <LoginNav {...props}/>
    </div>
  </nav>
);


export default Nav;



