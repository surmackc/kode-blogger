import React, {Component} from 'react';
import "./Note.css";


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    NoteBody: ""
  };

    
  

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    
    return (

        
      
        <form action='/notes/create/' method="POST">
            <textarea>
            </textarea>
            <button type='submit' class="btn btn-default">Submit</button>
        </form>
      
    );
  }

}


export default App;