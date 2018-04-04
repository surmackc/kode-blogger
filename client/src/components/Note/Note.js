import React, {Component} from 'react';
import "./Note.css";


class App extends Component {
  
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/note/create', {
      method: 'POST',
      body: data,
      
    });
  }
    
  

  
  render() {
    
    return (

        
      
        <form onSubmit={this.handleSubmit}>
            <textarea>
            </textarea>
            <button type='submit' class="btn btn-default" name="textbody">Submit</button>
        </form>
      
    );
  }

}


export default App;