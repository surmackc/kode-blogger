import React, {Component} from 'react';
import axios from 'axios';

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {message: '', username: ''}
  }

  handleUsernameInput = (event) => {
      this.setState({username: event.target.value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username) return;

    axios.post('/account/resetRequest', {username: this.state.username}).then(res => {
      console.log(res);
      if (res.data.message) {
        this.setState({message: res.data.message});
      }
    }).catch(err => {
      this.setState({message: 'An error occured. Please try again later.'});
    })
  }

  render() {
    return (
      <div>
        <h2>Reset Password</h2>
        {this.state.message ? <p>{this.state.message}</p> : ''}
      <form>
        <label htmlFor="username">Username</label>
        <input type="test" name="username" onChange={this.handleUsernameInput} />
        <button type="submit" onClick={this.handleFormSubmit}>Request Reset</button>
      </form>
      </div>
    )
  }
}

export default PasswordReset;