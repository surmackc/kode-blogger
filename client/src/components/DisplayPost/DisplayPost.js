import React from "react";
import {ScrollSync, ScrollSyncPane}  from "react-scroll-sync";

import "./DisplayPost.css";


const DisplayPost = () => (
  <ScrollSync>
    <div style={{ display: 'flex', position: 'relative', height: 300 }}>
      <ScrollSyncPane>
        <div style={{overflow: 'auto'}}>
          <section style={{ height: 500, width: 500 }}>
            <h1>Article Text</h1>
            <p>Check out this code!</p>
          </section>
        </div>
      </ScrollSyncPane>
    ​
      <ScrollSyncPane>
        <div style={{overflow: 'auto'}}>
          <section style={{ height: 500, width: 500 }}>
            <h1>Code</h1>
            <p>HTML, CSS, Javascript and more!</p>
          </section>
        </div>
      </ScrollSyncPane>
    </div>
    </ScrollSync>
    );


export default DisplayPost;