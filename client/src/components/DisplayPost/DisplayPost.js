import React from "react";
import {ScrollSync, ScrollSyncPane}  from "react-scroll-sync";
import { Link } from 'react-router-dom'
import Drawer from '../Drawer/Drawer.js';

import "./DisplayPost.css";


const DisplayPost = () => 
  (
  <span>
  <ScrollSync>
    <div style={{ display: 'flex', position: 'relative', height: 300 }}>
      <ScrollSyncPane>
        <div className="scrollPanel" style={{overflow: 'auto'}}>
          <section style={{ height: 500, width: 500 }}>
            <h1>Article Text</h1>
            <p>Check out this code!</p>
            <Link to="/addnote"><button className="btn btn-default" >Add Note</button></Link>
            <p>Check out these comments!</p>
          </section>
        </div>
      </ScrollSyncPane>
    
    
    
      <ScrollSyncPane>
        <div className="scrollPanel" style={{overflow: 'auto'}}>
          <section style={{ height: 500, width: 500 }}>
            <h1>Article Text</h1>
            <p>Check out this code!</p>
            <Link to="/addnote"><button className="btn btn-default" >Add Note</button></Link>
            <p>Check out these comments!</p>
          </section>
          </div>
      </ScrollSyncPane>
    </div>
  
  </ScrollSync>
     
  <Drawer>
       <ScrollSyncPane>
        <div style={{overflow: 'auto'}}>
          <section style={{ height: 500, width: 500 }}>
            <h1>Article Text</h1>
            <p>Check out this code!</p>
            <Link to="/addnote"><button className="btn btn-default" >Add Note</button></Link>
            <p>Check out these comments!</p>
          </section>
          </div>
      </ScrollSyncPane>
  </Drawer>
</span>
  );


export default DisplayPost;