import React, {Component} from 'react';
import Wrapper from "../Wrapper/Wrapper";


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    NoteBody: ""
  };

    
  

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    
    return (
      <Wrapper>
        <form action='/notes/create/{{this.id}}' method="POST">
            <textarea>
            </textarea>
            <button type='submit' class="btn btn-default">Submit</button>
        </form>
      </Wrapper>
    );
  }

}


export default App;