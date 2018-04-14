import React from 'react';
import { Link } from 'react-router-dom'

const LoginNav = (props) => 
        props.loggedIn ? 
          <div className="nav-item ml-auto">
            <span className="text-light ml-2">{props.username}</span>
            <button className="btn btn-outline-light ml-2" onClick={props.logOut} type="button">Logout</button> 
          </div>
          :
          (<div className="nav-item ml-auto">
              <Link to="/signup"><button className="btn btn-outline-light" type="button">Signup</button></Link>
              <Link to="/login"><button className="btn btn-outline-light" type="button">Login</button></Link>
          </div>);

export default LoginNav;