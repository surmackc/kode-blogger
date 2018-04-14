import React from "react";
import "./Nav.css";
import LoginNav from '../LoginNav/LoginNav';
import NavSearch from '../NavSearch/NavSearch';
import { Link } from 'react-router-dom'



const Nav = (props) => (
  <nav className="navbar navbar-expand-lg navbar-custom mb-3">
    <Link to="/" className="navbar-brand"> 
      kode<span id="navbar-brand-second">Blogger</span></Link>
    <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      {props.loggedIn ? 
      <ul className="navbar-nav ml-auto mt-2 mt-md-0">
        <li className="nav-item active ml-auto">
          <Link to="/manageNotes"><button className="btn btn-outline-light" type="button"><img src="./images/my-post.svg" height="24" width="24" hspace="5" />My Posts</button></Link>
        </li>
        <li className="nav-item ml-auto">
          <Link to="/input"><button className="btn btn-outline-light ml-auto" type="button"><img src="./images/new-post.svg" height="24" width="24" hspace="5" />+ Post</button></Link>
        </li>
        <NavSearch />
        <LoginNav {...props}/>
      </ul>
      : 
      <ul className="navbar-nav ml-auto mt-2 mt-md-0">
        <NavSearch />
        <LoginNav {...props}/>
      </ul>}

    </div>
  </nav>
);


export default Nav;



