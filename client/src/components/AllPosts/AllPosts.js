import React, {Component} from "react";
import postAPI from '../../utils/postAPI';
import {Redirect} from 'react-router-dom';
// import Html from 'slate-html-serializer';
// import serializeRules from '../InputForm/serialize-rules';
// import defaultValue from '../InputForm/value.json';
// import {Value} from 'slate';

// const html = new Html({ rules: serializeRules });

class AllPosts extends Component {
  state = {
    posts: []
  };

  componentDidMount = () => {
    postAPI.getAll()
    .then(res => {
      this.setState({ posts: res.data.map(note  => {return {id: note.id, title: note.title, published: note.published, created: note.createdAt, updated: note.updatedAt}})});
    })
    .catch(err => {
      console.log(err);
    });
  };

  viewPost = (id) => {
    this.setState({redirect: <Redirect to={`/posts/${id}`} /> })
  }

  render() {
    return (
    <div>
      <h2>All Posts</h2>
      {this.state.redirect ? this.state.redirect : ''}
      <ul className="list-group">
      {this.state.posts.length ?
      this.state.posts.map(note => {
        console.log(note, "line 28")
        return (
          <li className="list-group-item mb-3" key={note.id}>
            <h3>{note.title}</h3>
            <div className="d-flex justify-content-end align-items-center">
            <div className="mr-auto">
              <p>Created at {new Date(note.created).toString()}</p>
              <p>Modified at {new Date(note.updated).toString()}</p>
            </div>
            <button className="btn btn-success" onClick={() => this.viewPost(note.id)}>View Post</button>

          </div>
        </li>
        )
      })
      :<p> No posts yet, check back soon!</p>}
    </ul>
  </div>
    );
}
}
export default AllPosts;
