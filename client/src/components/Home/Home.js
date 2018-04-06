import React from "react";
import "./Home.css";
import Carousel from '../Carousel/Carousel.js';
import { Link } from 'react-router-dom'


const Home = props => ( 
    <div className="home">
        Home content here...
        
       <Carousel />
       
       <Link to="/displaypost"><button className="btn btn-outline-dark">View Post</button></Link>
        
       
    </div>
    );

export default Home;
