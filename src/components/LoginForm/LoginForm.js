import React, {Component} from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form>
        <input type="text" name="username" onChange={this.handleFormInput} value={this.state.username} />
        <input type="password" name="password" onChange={this.handleFormInput} value={this.state.password} />
        <button type="submit">Login</button>
      </form>
    )
  }
}

export default LoginForm;