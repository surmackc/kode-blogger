import React, {Component} from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';
import CodeUtils from 'draft-js-code';
import "./InputForm.css";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
 
  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }
 
  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    let newState;
 
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }
 
    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
 
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
 
  keyBindingFn = (evt) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return getDefaultKeyBinding(evt);
 
    const command = CodeUtils.getKeyBinding(evt);
 
    return command || getDefaultKeyBinding(evt);
  }
 
  handleReturn = (evt) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';
 
    this.onChange(CodeUtils.handleReturn(evt, editorState));
    return 'handled';
  }
 
  onTab = (evt) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';
 
    this.onChange(CodeUtils.onTab(evt, editorState));
    return 'handled';
  }
 
  render() {
    return (
      <div className="content">
        <h1>Draft.js</h1>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            keyBindingFn={this.keyBindingFn}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            onTab={this.onTab}
          />
        </div>
      </div>
    );
  }
}

export default InputForm;