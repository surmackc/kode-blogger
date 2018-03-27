import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Wrapper from './components/Wrapper';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default App;
