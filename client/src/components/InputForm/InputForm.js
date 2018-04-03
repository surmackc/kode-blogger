import React, {Component} from 'react';
import {EditorState, RichUtils} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs';
// import 'draft-js/dist/Draft.css';
// import './../../../node_modules/draft-js-prism/demo/editor.css';
import './prism-okaidia.css';
import "./InputForm.css";

var decorator = new PrismDecorator({
  // Provide your own instance of PrismJS
  prism: Prism,
});

var editorState = EditorState.createEmpty(decorator);

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState,
    };
    this.onChange = (editorState) => {
      this.setState({
        editorState          
      });
    };
  }

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'code-block': return 'language-javascript';
      default: return null;
    }
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
   
  render() {
    return (
      <div className="inputForm">
        <h1>Draft.js</h1>
        <div className="editor" >
          <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default InputForm;