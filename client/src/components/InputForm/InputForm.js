import React, {Component} from 'react';

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      content: ""
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
        <input type="text" name="author" onChange={this.handleFormInput} value={this.state.username} />
        <input type="text" name="content" onChange={this.handleFormInput} value={this.state.password} />
        <button type="submit">Post</button>
      </form>
    )
  }
}

export default InputForm;