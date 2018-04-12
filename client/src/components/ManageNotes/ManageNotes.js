import React, {Component} from 'react';
import postApi from '../../utils/postAPI';
import {Redirect} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import PostListItem from '../PostListItem/PostListItem';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
    confirmAlert({
      title: 'Publish?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => postApi.publishNote(id).then(this.updatePosts()) 
        },
        {
          label: 'Cancel'
        }
      ]
    });
  }

  unpublishClicked = (id) => {
    confirmAlert({
      title: 'Unpublish?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => postApi.unpublishNote(id).then(this.updatePosts())
        },
        {
          label: 'Cancel'
        }
      ]
    });
  }

  editClicked = (id) => {
    this.setState({redirect: <Redirect to={`/input/${id}`} /> })
  }

  deleteClicked = (id) => {
    confirmAlert({
      title: 'Delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => postApi.deleteNote(id).then(this.updatePosts())
        },
        {
          label: 'Cancel'
        }
      ]
    });
    
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
          <PostListItem {...note}>
            <button className="btn btn-danger mr-3" onClick={() => this.deleteClicked(note.id)}>Delete</button>
            <button className="btn btn-info mr-3" onClick={() => this.editClicked(note.id)}>Edit</button>
            {note.published ?
              <button className="btn btn-warning" onClick={() => this.unpublishClicked(note.id)}>Unpublish</button>
              : 
              <button className="btn btn-success" onClick={() => this.publishClicked(note.id)}>Publish</button>
            }
          </PostListItem>

        )
      })
      : <p>No posts Created</p>}
      </ul>
    </div>
    );
  }

}

export default ManageProps;