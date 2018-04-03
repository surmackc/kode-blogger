import React from "react";
import "./Nav.css";
import LoginNav from '../LoginNav/LoginNav';


const Nav = (props) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      Kode Blogger
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto mt-2 mt-md-0">
        <li className="nav-item active">
          <a className="btn btn-outline-light" href="/input">
          + New Post
          </a>
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



