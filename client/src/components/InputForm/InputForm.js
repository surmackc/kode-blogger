import React, {Component} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey'
import PluginPrism from 'slate-prism';
import PluginEditCode from 'slate-edit-code'
import defaultValue from './value.json';
import Html from 'slate-html-serializer';
import serializeRules from './serialize-rules';
import axios from 'axios';
import NoteSelector from '../NoteSelector/NoteSelector';
import "./InputForm.css";

/* State.Value to HTML serializer */
const html = new Html({ rules: serializeRules });

/* Plugins */
const plugin = PluginEditCode({
  onlyIn: node => node.type === 'code_block'
})
const plugins = [
  PluginPrism({
      onlyIn: node => node.type === 'code_block',
      getSyntax: node => node.data.get('syntax')
  }),
  plugin
];

/* Editor Defaults */
let DEFAULT_CODE_LANGUAGE = 'javascript'
const DEFAULT_NODE = 'paragraph'

/* Hotkeys */
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

/**
 * Syntax Selector Component
 */

class GlobalCodeSyntaxSelector extends Component {
  state = {
    value: DEFAULT_CODE_LANGUAGE,
  }

  onChange = (event) => {
    this.setState({value: event.target.value})
    DEFAULT_CODE_LANGUAGE = event.target.value
  }

  render() {
    return (
        <select value={this.state.value} onChange={this.onChange}>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
        </select>
    )
  }
}

/**
 * Code Block Component
 */

class CodeBlock extends Component {
  state = {
    syntax: DEFAULT_CODE_LANGUAGE
  }

  setSyntax = (event) => {
    if (event) {
      this.setState({syntax: event.target.value || DEFAULT_CODE_LANGUAGE})
      this.props.editor.change(c =>
        c.setNodeByKey(this.props.node.key, { data: { syntax: event.target.value || DEFAULT_CODE_LANGUAGE } })
      )
    } else {
      this.props.editor.change(c =>
        c.setNodeByKey(this.props.node.key, { data: { syntax: this.state.syntax } })
      )
    }
  }

  componentDidMount = (event) => {
    this.setSyntax()
  }

  render() {
    let syntax = this.state.syntax

    return (
      <div style={{ position: 'relative' }}>
        <pre className={"language-" + syntax + " code_block"}>
          <code className={"language-" + syntax} {...this.props.attributes}>{this.props.children}</code>
        </pre>
        <div
          contentEditable={false}
          style={{ position: 'absolute', top: '-5px', right: '5px' }}
        >
          <select value={syntax || DEFAULT_CODE_LANGUAGE} onChange={this.setSyntax}>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </div>
    )
  }
}

/**
 * Code Line Component
 */

class CodeLine extends Component {
  render() {
    return(
      <div {...this.props.attributes}>{this.props.children}</div>
    )
  }
}

/**
 * Input Form Component
 */

class InputForm extends Component {
  state = {
    // value: html.deserialize(initialValue)
    value: Value.fromJSON(defaultValue),
    title: ''
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      mark = null;
    } 
    
    if (mark) {
      event.preventDefault()
      change.toggleMark(mark)
    }
  }

  /* Handle DB Save */
  onSaveClick = event => {
    if (this.state.noteId) {
      axios.put(`/notes/update/${this.state.noteId}`, ({jsonBody: JSON.stringify(this.state.value.toJSON())}));
    } else {
      axios.post('/notes/create', ({title: this.state.title, jsonBody: JSON.stringify(this.state.value.toJSON())}));
    }
  }

  /* Handle DB Retrieval */
  onNoteSelected = event => {
    if (event.target.value === 'new') {
      this.setState({value: Value.fromJSON(defaultValue)});
    }
    console.log(event.target.value);
    axios.get(`/notes/${event.target.value}`).then(res => {
      if (res.data) {
        this.setState(
          {
            value: Value.fromJSON(JSON.parse(res.data.body)), 
            noteId: res.data.id
          }
        );
      };
    });
  }

 /*----- Toolbar Functions -----*/

  onToggleCode = (event) => {
    event.preventDefault()
    const value = this.state.value;

    this.onChange(
      plugin.changes.toggleCodeBlock(value.change(), DEFAULT_NODE).focus()
    );
  };

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type===type)
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type===type)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    if (type==='bulleted-list' || type==='numbered-list') {
      var win = window.open();
      var txt = JSON.stringify(this.state.value.toJSON())
      win.document.write(txt);
      return
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type===type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    } else {
      // Handle everything but list buttons
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    }
    
    this.onChange(change)
  }

  /*----- Render Functions -----*/

  render() {
    return (
      <div className="row">
        <div className="input-form col-md-6">
          <NoteSelector onNoteSelected={this.onNoteSelected} />
          <input className="title-input" onChange={this.onTitleChange} type="text" placeholder="enter a note title" />
          {this.renderToolbar()}
          {this.renderEditor()}
          <button onClick={this.onSaveClick} className="btn btn-success">Save It</button>
        </div>
        <div className="col-md-6">
          <h5 className="alert-light">Preview:</h5>
          <h3 className="alert-light">{this.state.title || "Untitled"}</h3>
          <div className="html-output"
            dangerouslySetInnerHTML={{__html: html.serialize(this.state.value, {sanitize: true})}}
          >
          </div>
        </div>
      </div>
    )
  }

  renderOutput() {

  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          placeholder="Enter some rich text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          plugins={plugins}
          spellCheck
          autoFocus
        />
      </div>
    )
  }

  renderToolbar = () => {
    return (
      <div className="menu">
        <button className="btn-light btn-sm mr-2" onMouseDown={this.onToggleCode}>
          Code Block
        </button>
        <GlobalCodeSyntaxSelector />
        <div className="toolbar">
            {this.renderMarkButton('bold', 'format_bold')}
            {this.renderMarkButton('italic', 'format_italic')}
            {this.renderMarkButton('underlined', 'format_underlined')}
            {this.renderMarkButton('code', 'code')}
            {this.renderBlockButton('heading-one', 'looks_one')}
            {this.renderBlockButton('heading-two', 'looks_two')}
            {this.renderBlockButton('block-quote', 'format_quote')}
            {this.renderBlockButton('numbered-list', 'format_list_numbered')}
            {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
        </div>
      </div>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = event => this.onClickBlock(event, type)

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderNode = props => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'code_block':
        return <CodeBlock {...props} />
      case 'code_line':
        return <CodeLine {...props} />;
      case 'paragraph':
        return <p {...attributes}>{children}</p>
      default:
        return null
    }
  }

  renderMark = props => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>
      case 'code':
        return <code>{children}</code>
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
      case 'comment':
        return <span style={{ opacity: '0.33' }}>{children}</span>
      case 'keyword':
        return <span style={{ fontWeight: 'bold' }}>{children}</span>
      case 'tag':
        return <span style={{ fontWeight: 'bold' }}>{children}</span>
      case 'punctuation':
        return <span style={{ opacity: '0.75' }}>{children}</span>
        default:
          return null
    }
  }
}

/**
 * Export.
 */

export default InputForm