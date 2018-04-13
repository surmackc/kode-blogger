import React from 'react';
import "./PostListItem.css";


const PostListItem = ({title, id, created, updated, children}) => (
  <div className="post-list-container">
  <div id="post-list-block" key={id}>
          <div className="post-list-title-container">
            <div className="post-list-title">{title}</div>
          </div>
            <div className="d-flex justify-content-end align-items-center">
            <div className="mr-auto">
              {created ? <p>Created at {new Date(created).toString()}</p> : ''}
              {updated ? <p>Modified at {new Date(updated).toString()}</p> : ''}
            </div>
            {children}
            </div>
          
  </div>
  </div>
)

export default PostListItem;