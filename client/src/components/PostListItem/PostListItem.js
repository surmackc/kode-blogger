import React from 'react';

const PostListItem = ({title, id, created, updated, children}) => (
  <li className="list-group-item mb-3" key={id}>
            <h3>{title}</h3>
            <div className="d-flex justify-content-end align-items-center">
            <div className="mr-auto">
              {created ? <p>Created at {new Date(created).toString()}</p> : ''}
              {updated ? <p>Modified at {new Date(updated).toString()}</p> : ''}
            </div>
            {children}
            </div>
  </li>
)

export default PostListItem;