import React, {Component} from 'react';
import postApi from '../../utils/postAPI';
import {Redirect} from 'react-router-dom'

class ManageProps extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.updatePosts();
  }

  updatePosts() {
    postApi.getActiveUserPosts().then(res => {
      this.setState({posts: res.data.map(note => {return {id: note.id, title: note.title, published: note.published, created: note.createdAt, updated: note.updatedAt}})})
    }); 
  }

  publishClicked = (id) => {
    postApi.publishNote(id).then(this.updatePosts());
  }

  unpublishClicked = (id) => {
    postApi.unpublishNote(id).then(this.updatePosts());
  }

  editClicked = (id) => {
    this.setState({redirect: <Redirect to={`/input/${id}`} /> })
  }

  deleteClicked = (id) => {
    postApi.deleteNote(id).then(this.updatePosts());
  }
  
  render() {
    return (
    <div>
      {this.state.redirect ? this.state.redirect : ''}
      <h2>My posts</h2>
      <ul className="list-group">
      {this.state.posts.length ?
      this.state.posts.map(note => {
        return (
          <li className="list-group-item" key={note.id}>
            <h3>{note.title}</h3>
            <div className="d-flex justify-content-end align-items-center">
            <div className="mr-auto">
              <p>Created at {new Date(note.created).toString()}</p>
              <p>Modified at {new Date(note.updated).toString()}</p>
            </div>
            <button className="btn btn-danger mr-3" onClick={() => this.deleteClicked(note.id)}>Delete</button>
            <button className="btn btn-info mr-3" onClick={() => this.editClicked(note.id)}>Edit</button>
            {note.published ?
              <button className="btn btn-warning" onClick={() => this.unpublishClicked(note.id)}>Unpublish</button>
              : 
              <button className="btn btn-success" onClick={() => this.publishClicked(note.id)}>Publish</button>
            }
            </div>
          </li>
        )
      })
      : <p>No posts Created</p>}
      </ul>
    </div>
    );
  }

}

export default ManageProps;