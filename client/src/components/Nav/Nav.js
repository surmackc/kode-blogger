import React from "react";
import "./Nav.css";
import LoginNav from '../LoginNav/LoginNav';
import { Link } from 'react-router-dom'



const Nav = (props) => (
  <nav className="navbar navbar-expand-md navbar-custom">
    <Link to="/" className="navbar-brand"> 
      kode<span id="navbar-brand-second">Blogger</span></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto mt-2 mt-md-0">
        <li className="nav-item active">
          <Link to="/manageNotes"><button className="btn btn-outline-light" type="button">My Posts</button></Link>
          <Link to="/input"><button className="btn btn-outline-light" type="button">+ Post</button></Link>
        </li>
      </ul>
    <form className="form-inline my-2 mr-2 my-md-0">
      <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-light" type="submit">Search</button>
    </form>
    <LoginNav {...props}/>
    </div>
  </nav>
);


export default Nav;



