import React, {Component} from "react";
import "./Home.css";
import Carousel from '../Carousel/Carousel.js';
import { Link, Redirect } from 'react-router-dom';
import postApi from '../../utils/postAPI';


class Home extends Component {
  state = { notes: [],
    redirect: ''
  }

  componentDidMount() {
    postApi.getLastPosts(10).then(res => {
      if (res.data) {
        this.setState({notes: res.data.map(note => 
          {
            return {
              id: note.id, 
              author: note.author,
              title: note.title, 
            }
          })
        });
      }
    });
  }

  viewPost = (id) => {
    this.setState({redirect: <Redirect to={`/posts/${id}`} /> })
  }

  getAllPosts = () => {
    this.setState({redirect: <Redirect to={`posts/all`} />})
  }


  render() {
    return (
      <div className="home">
      {this.state.redirect ? this.state.redirect : ''}
        {/* Home content here...
        <Carousel /> */}
        <div className="recent-post">
          <h2><span id="recent-post-title">recent</span><span id="recent-post-title-second">Posts</span><span id="recent-post-curly">&#123;</span></h2>
        <div>
        {this.state.notes.map(note => {
          return (
          <div className="recent-post-container" key={note.id}>
          <div id="home-recent-post-block">
          <div className="home-recent-post-title-container">
          <span id="home-recent-post-title">{note.title}</span>
          </div>
          <div className="text-center"><button className="btn btn-outline-dark" type="button" onClick={() => this.viewPost(note.id)}>View Post</button></div>
          </div>
          </div>);
        })}
        
      </div>
      </div>
      <h2><span id="recent-post-curly-end">&#125;</span></h2>
      <div className="text-center"><button className="btn btn-outline-dark" type="button" onClick={() => this.getAllPosts()}>All Posts</button></div>
      </div>
    )
  }
}

export default Home;
