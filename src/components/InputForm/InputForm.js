import React, {Component} from 'react';
import Draft from 'draft-js';
import CodeUtils from 'draft-js-code';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: Draft.EditorState.createEmpty()
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
    if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

    const command = CodeUtils.getKeyBinding(evt);

    return command || Draft.getDefaultKeyBinding(evt);
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
      <Draft.Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        keyBindingFn={this.keyBindingFn}
        handleKeyCommand={this.handleKeyCommand}
        handleReturn={this.handleReturn}
        onTab={this.onTab}
      />
    );
  }
}

export default InputForm;