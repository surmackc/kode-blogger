import React from 'react';
import "./PostListItem.css";


const PostListItem = ({title, id, created, updated, children}) => (
    <div className="post-list-container">
      <div key={id}>
        <div id="home-post-list-block">
          <div className="home-post-list-title-container">
            <span id="home-post-list-title">{title}</span>
          </div>
          <div className="d-flex justify-content-end">
            <div className="mr-auto">
              {created ? <p>Created at {new Date(created).toString()}</p> : ''}
              {updated ? <p>Modified at {new Date(updated).toString()}</p> : ''}
            </div>
          {children}
          </div> 
        </div>       
      </div>
    </div>
)

export default PostListItem;