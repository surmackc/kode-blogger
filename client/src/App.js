import React, { Component } from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Wrapper from "./components/Wrapper/Wrapper";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import LoginForm from "./components/LoginForm/LoginForm";
import InputForm from "./components/InputForm/InputForm";
import AllPosts from "./components/AllPosts/AllPosts";
import Posts from "./components/Posts/Posts";
import NoMatch from "./components/NoMatch/NoMatch";

class App extends Component {
  state = {
  };

  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginForm} />
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
