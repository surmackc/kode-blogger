import React, {Component} from 'react';
import axios from 'axios';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      passwordInvalid: false,
      emailInvalid: false,
      signupSubmitted: false
    }
    
    
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(event) {
    const {name, value} = event.target;
    this.setState({[name]: value}, () => this.validateField(name, value));
  }

  validateField(fieldName, value) {
    let passwordInvalid = this.state.passwordInvalid;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch(fieldName) {
      case 'password':
      case 'password2':
        if (value === this.state.password && value === this.state.password2) {
          this.setState({passwordInvalid: false});
        } else {
          this.setState({passwordInvalid: true});
        }
      break;
      case 'email':
        if (emailRegex.test(value)) {
          this.setState({emailInvalid: false});
        } else {
          this.setState({emailInvalid: true});
        }
      break;
      default:
      break;
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.emailInvalid && !this.state.passwordInvalid) {
      axios.post('/users/signup', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }).then((res) => this.setState({
        username: "",
        email: "",
        password: "",
        password2: "",
        signupSubmitted: true
      }));
    }
  }

  render() {
    return (
      <form className="signupContainer">
        <div>
          {this.state.signupSubmitted ? <p>Sign-up complete! Check your email to verify your account. </p> : ''}
          {this.state.passwordInvalid ? <p>Passwords do not match!</p> : ''}
          {this.state.emailInvalid ? <p>Email is not valid</p> : ''}
        </div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={this.handleFormInput} value={this.state.username} />
        <label htmlFor="email">Email</label>
        <input className={this.state.emailInvalid ? 'invalid' : ''} type="email" name="email" onChange={this.handleFormInput} value={this.state.email} />
        <label htmlFor="password">Password</label>
        <input className={this.state.passwordInvalid ? 'invalid' : ''} type="password" name="password" onChange={this.handleFormInput} value={this.state.password} />
        <label htmlFor="password2">Confirm Password</label>
        <input className={this.state.passwordInvalid ? 'invalid' : ''} type="password" name="password2" onChange={this.handleFormInput} value={this.state.password2} />
        <button type="submit" onClick={this.onFormSubmit}>Sign Up</button>
      </form>
    )
  }
}

export default SignupForm;