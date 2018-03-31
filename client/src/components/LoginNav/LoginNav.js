import React from 'react';
import { Link } from 'react-router-dom'

const LoginNav = (props) => 
        props.loggedIn ? 
          <button onClick={props.logOut} type="button">Logout</button> 
          :
          (<div>
            <Link to="/signup"><button type="button">Signup</button></Link>
            <Link to="/login"><button type="button">Login</button></Link>
          </div>);

export default LoginNav;