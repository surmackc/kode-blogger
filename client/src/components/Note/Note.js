import React, {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';
import "./Note.css";


class App extends Component {
  content = " ";
  
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEditorChange = (e) => {
    this.content = e.target.getContent();
  }

  handleSubmit(event) {
    event.preventDefault();
    // let data = tinymce.get('textbody').getContent()
    
    fetch('/notes/create', {
      method: 'POST',
      body: {
        content: this.content
      },
      dataType: 'JSON'
    });
  }
    
  

  
  render() {
    
    return (

        
      
        <form onSubmit={this.handleSubmit.bind(this)}>
            <Editor
        id="textbody"
        initialValue="<p>Add a note</p>"
        init={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onChange={this.handleEditorChange.bind(this)}
            />
            <button type='submit' class="btn btn-default">Submit</button>
        </form>
      
    );
  }

}


export default App;