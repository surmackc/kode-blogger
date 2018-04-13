import React, {Component} from "react";
import postAPI from '../../utils/postAPI';
import {Redirect} from 'react-router-dom';
import PostListItem from '../PostListItem/PostListItem';
import "./AllPosts.css";


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
        <h2>{"< All Posts >"}</h2>
      {this.state.redirect ? this.state.redirect : ''}
      <ul className="list-group">
      {this.state.posts.length ?
      this.state.posts.map(note => {
        return (
          <PostListItem {...note}>
            <button className="btn btn-outline-light" type="button" id="viewPost" onClick={() => this.viewPost(note.id)}>View Post</button>
          </PostListItem>
        )
      })
      :<p> No posts yet, check back soon!</p>}
    </ul>
  </div>
    );
}
}
export default AllPosts;
