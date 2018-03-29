import React from "react";
import API from "./utils/API";

var results = API.getAll();

const AllPosts = props => ( 
    <div className="home">
        results
    </div>);

export default AllPosts;
