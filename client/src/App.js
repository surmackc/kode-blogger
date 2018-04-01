import React, { Component } from "react";
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import Wrapper from "./components/Wrapper/Wrapper";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from './components/SignupForm/SignupForm';
import InputForm from "./components/InputForm/InputForm";
import AllPosts from "./components/AllPosts/AllPosts";
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import PasswordResetRequest from './components/PasswordResetRequest/PasswordResetRequest';
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm';
import Post from "./components/Post/Post";
import NoMatch from "./components/NoMatch/NoMatch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: ''
    }
  }

  componentDidMount() {
    axios.get('/users/loggedIn')
    .then( res => {
      console.log(res);
      this.setState({loggedIn: true, username: res.data.username})
    })
    .catch(err => this.setState({loggedIn: false})); 
  }

  userLoggedIn = (username) => {
    this.setState({loggedIn: true, username});
  }

  logOut = () => {
    axios.get('/users/logout')
    .then( res => {
      this.setState({loggedIn: false})
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <Nav loggedIn={this.state.loggedIn} username={this.state.username} logOut={this.logOut}/>
          <Switch>
            <Route exact path="/" component={Home}  />
            <Route exact path="/login"
              render={() => this.state.loggedIn ? 
              <Redirect to="/input" /> 
              : <LoginForm userLoggedIn={this.userLoggedIn}/>}/>
            <Route exact path="/signup" component={SignupForm} />
            <Route path="/verify/:username/:token" component={VerifyEmail} />
            <Route exact path="/resetPassword" component={PasswordResetRequest} />
            <Route path="/reset/:username/:token" component={PasswordResetForm} />
            <Route exact path="/input" component={InputForm} />
            <Route exact path="/posts" component={AllPosts} />
            <Route exact path="/post/:id" component={Post} />
            
            <Route component={NoMatch} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default App;
