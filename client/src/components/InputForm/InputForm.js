import React, {Component} from 'react';
import {EditorState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createCodeEditorPlugin from 'draft-js-code-editor-plugin';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import createPrismPlugin from 'draft-js-prism-plugin';
import Prism from 'prismjs';
import './../../../node_modules/draft-js/dist/Draft.css';
import './../../../node_modules/draft-js-prism/demo/editor.css';
import  './../../../node_modules/draft-js-static-toolbar-plugin/lib/plugin.css';
import './prism-okaidia.css';
import "./InputForm.css";

var editorPlugin = createCodeEditorPlugin();
var prismPlugin = createPrismPlugin({ prism: Prism });
var toolbarPlugin = createToolbarPlugin({
  structure: [
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  ]
});

var { Toolbar } = toolbarPlugin;

var plugins = [
  editorPlugin,
  toolbarPlugin,
  prismPlugin
];

var editorState = EditorState.createEmpty();

var text = 'In this editor you can type text and code …';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState    
    };
    this.onChange = (editorState) => {
      this.setState({
        editorState,          
      });
    };
  }
  
  focus = () => {
    this.editor.focus();
  };

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
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            blockStyleFn={this.getBlockStyle}
            handleKeyCommand={this.handleKeyCommand}
            ref={(element) => { this.editor = element; }}
          />
        </div>
        <Toolbar />
      </div>
    );
  }
}

export default InputForm;