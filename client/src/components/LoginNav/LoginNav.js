import React from 'react';
import { Link } from 'react-router-dom'

const LoginNav = (props) => 
        props.loggedIn ? 
          <div className="nav-item ml-auto">
            <span className="text-light mr-1 ml-1">{props.username}</span>
            <button className="btn btn-outline-light" onClick={props.logOut} type="button">Logout</button> 
          </div>
          :
          (<div className="nav-item ml-auto">
            <li>
            <Link to="/signup"><button className="btn btn-outline-light" type="button">Signup</button></Link>
            </li>
            <li>
            <Link to="/login"><button className="btn btn-outline-light" type="button">Login</button></Link>
            </li>
          </div>);

export default LoginNav;