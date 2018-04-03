import React from 'react';
import { Link } from 'react-router-dom'

const LoginNav = (props) => 
        props.loggedIn ? 
          <div>
            <span>{props.username}</span>
            <button onClick={props.logOut} type="button">Logout</button> 
          </div>
          :
          (<div>
            <Link to="/signup"><button className="btn btn-outline-light mr-1" type="button">Signup</button></Link>
            <Link to="/login"><button className="btn btn-outline-light" type="button">Login</button></Link>
          </div>);

export default LoginNav;