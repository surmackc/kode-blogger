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
        {/* Home content here...
        <Carousel /> */}
        <Link to="/displaypost"><button className="btn btn-outline-dark mr-2">View Post</button></Link>
        <Link to="/posts/all"><button className="btn btn-outline-dark">All Posts</button></Link>
        <div className="recent-post">
          <h2><span id="recent-post-title">recent</span><span id="recent-post-title-second">Posts</span><span id="recent-post-curly">&#123;</span></h2>
        
        <div className="recent-post-container1">
        {this.state.notes.map(note => {
          return (
          <div className="recent-post-container" key={note.id}>
          <div id="home-recent-post-block">
          <div className="home-recent-post-title-container">
          <span id="home-recent-post-title">{note.title}</span>
          </div>
          <div className="html-output" dangerouslySetInnerHTML={{__html: html.serialize(note.body, {sanitize: true})}} >
          </div>
          <Link to="/displaypost"><button className="btn btn-outline-dark">View Post</button></Link>
          </div>
          </div>);
        })}
        
      </div>
      </div>

      <h2><span id="recent-post-curly-end">&#125;</span></h2>
      </div>
    )
  }
}

export default Home;
