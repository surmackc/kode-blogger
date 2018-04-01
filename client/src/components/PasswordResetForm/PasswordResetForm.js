import React, {Component} from 'react';
import axios from 'axios';

class PasswordResetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      password2: "",
      passwordInvalid: false,
      resetSubmitted: false
    }
    
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(event) {
    const {name, value} = event.target;
    this.setState({[name]: value}, () => this.validateField(name, value));
  }

  validateField(fieldName, value) {
    let passwordInvalid = this.state.passwordInvalid;

    switch(fieldName) {
      case 'password':
      case 'password2':
        if (value === this.state.password && value === this.state.password2) {
          this.setState({passwordInvalid: false});
        } else {
          this.setState({passwordInvalid: true});
        }
      break;
      default:
      break;
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.passwordInvalid) {
      axios.post(`/reset/${this.props.match.params.username}/${this.props.match.params.token}`, {
        username: this.state.username,
        password: this.state.password
      }).then((res) => this.setState({
        password: "",
        password2: "",
        resetSubmitted: true,
        message: res.data.message ? res.data.message : ''
      }));
    }
  }

  render() {
    return (
      <div>
        <h2>Reset Password</h2>
      <form className="signupContainer">
        <div>
          {this.state.message ? <p>{this.state.message}</p> : ''}
        </div>
        <label htmlFor="password">Password</label>
        <input className={this.state.passwordInvalid ? 'invalid' : ''} type="password" name="password" onChange={this.handleFormInput} value={this.state.password} />
        <label htmlFor="password2">Confirm Password</label>
        <input className={this.state.passwordInvalid ? 'invalid' : ''} type="password" name="password2" onChange={this.handleFormInput} value={this.state.password2} />
        <button type="submit" onClick={this.onFormSubmit}>Sign Up</button>
      </form>
      </div>
    )
  }
}

export default PasswordResetForm;