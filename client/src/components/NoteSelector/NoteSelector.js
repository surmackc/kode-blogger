import React, {Component} from 'react';
import axios from 'axios';

class NoteSelector extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      titles: []
    }
  }

  componentDidMount() {
    axios.get('/notes').then(res => {
      this.setState({
        titles: res.data.map(element => ({id: element.id, title: element.title, body: element.body})) 
      }) 
    });
  }

  render() {
    return (
      <select onChange={this.props.onNoteSelected}>
        <option value="new" key={0}>Create New</option>
        {this.state.titles.map((element, index) => {
          return (
            <option value={element.id} key={index}>{element.title}</option>
          )
        })}
      </select>
    )
  }
}

export default NoteSelector;