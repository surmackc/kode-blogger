import React, {Component} from 'react';
import noteApi from '../../utils/noteAPI';

class ManageProps extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    this.updateNotes();
  }

  updateNotes() {
    noteApi.getActiveUserNotes().then(res => {
      this.setState({notes: res.data.map(note => {return {id: note.id, title: note.title, published: note.published, created: note.createdAt, updated: note.updatedAt}})})
    }) 
  }

  publishClicked = (id) => {
    noteApi.publishNote(id).then(this.updateNotes());
  }

  unpublishClicked = (id) => {
    noteApi.unpublishNote(id).then(this.updateNotes());
  }

  deleteClicked = (id) => {
    noteApi.deleteNote(id).then(this.updateNotes());
  }
  
  render() {
    return (
    <div>
      <h2>My Notes</h2>
      <ul className="list-group">
      {this.state.notes.map(note => {
        return (
          <li className="list-group-item" key={note.id}>
            <h3>{note.title}</h3>
            <div className="d-flex justify-content-end align-items-center">
            <div className="mr-auto">
              <p>Created at {new Date(note.created).toString()}</p>
              <p>Modified at {new Date(note.updated).toString()}</p>
            </div>
            <button className="btn btn-danger mr-3" onClick={() => this.deleteClicked(note.id)}>Delete</button>
            {note.published ?
              <button className="btn btn-warning" onClick={() => this.unpublishClicked(note.id)}>Unpublish</button>
              : 
              <button className="btn btn-success" onClick={() => this.publishClicked(note.id)}>Publish</button>
            }
            </div>
          </li>
        )
      })}
      </ul>
    </div>
    );
  }

}

export default ManageProps;