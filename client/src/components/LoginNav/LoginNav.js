import React from 'react';
import { Link } from 'react-router-dom'

const LoginNav = (props) => 
        props.loggedIn ? 
          <div>
            <span className="mr-2 ml-2 text-light">{props.username}</span>
            <button className="btn btn-outline-light" onClick={props.logOut} type="button">Logout</button> 
          </div>
          :
          (<div>
            <Link to="/signup"><button className="btn btn-outline-light mr-1" type="button">Signup</button></Link>
            <Link to="/login"><button className="btn btn-outline-light" type="button">Login</button></Link>
          </div>);

export default LoginNav;