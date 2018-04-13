import React, {Component} from "react";
import "./Home.css";
import Carousel from '../Carousel/Carousel.js';
import { Link } from 'react-router-dom';
import Html from 'slate-html-serializer';
import {Value} from 'slate';
import serializeRules from '../InputForm/serialize-rules';
import postApi from '../../utils/postAPI';

const html = new Html({ rules: serializeRules });

class Home extends Component {
  state = { notes: [] }

  componentDidMount() {
    postApi.getLastPosts(10).then(res => {
      if (res.data) {
        this.setState({notes: res.data.map(note => 
          {
            return {
              id: note.id, 
              author: note.author,
              title: note.title, 
              body: Value.fromJSON(JSON.parse(note.body))
            }
          })
        });
      }
    });
  }
  render() {
    return (
      <div className="home">
        Home content here...
        <Carousel />
        <Link to="/displaypost"><button className="btn btn-outline-dark mr-2">View Post</button></Link>
        <Link to="/posts/all"><button className="btn btn-outline-dark">All Posts</button></Link>
        {this.state.notes.map(note => {
          return (
          <div key={note.id}>
          <span>{note.title}</span>
          <div className="html-output" dangerouslySetInnerHTML={{__html: html.serialize(note.body, {sanitize: true})}} >
          </div>
          </div>);
        })}
      </div>
    )
  }
}

export default Home;
