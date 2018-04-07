import React, {Component} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey'
import Prism from 'prismjs';
import PluginPrism from 'slate-prism';
import PluginEditCode from 'slate-edit-code'
import defaultValue from './value.json';
import Html from 'slate-html-serializer';
import serializeRules from './serialize-rules';
import axios from 'axios';
import NoteSelector from '../NoteSelector/NoteSelector';
import "./InputForm.css";

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

/* Create serializer */
const html = new Html({ rules: serializeRules });

/**
 * Define defaults.
 *
 * @type {String}
 */

var DEFAULT_CODE_LANGUAGE = 'javascript'
var DEFAULT_INDENTATION = '  '
const DEFAULT_NODE = 'paragraph'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

class DefaultCodeLanguage extends Component {
  state = {
    value: DEFAULT_CODE_LANGUAGE,
  }

  onChange = (event) => {
    this.setState({value: event.target.value})
    DEFAULT_CODE_LANGUAGE = event.target.value
  }

  render() {
    return (      
      <label className="selector">
        <span>Syntax: </span> 
        <select value={this.state.value} onChange={this.onChange}>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
        </select>
      </label>
    )
  }
}

class DefaultIndentation extends Component {
  state = {
    value: DEFAULT_INDENTATION,
  }

  onChange = (event) => {
    this.setState({value: event.target.value})
    DEFAULT_INDENTATION = event.target.value
  }

  render() {
    return (
      <label className="selector">
        <span>Tab: </span> 
        <select value={this.state.value} onChange={this.onChange}>
          <option value="  ">TwoSpaces</option>
          <option value="    ">FourSpaces</option>
        </select>
      </label>
    )
  }
}

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
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        >
          <select value={syntax || DEFAULT_CODE_LANGUAGE} ref={this.toggle} onChange={this.setSyntax}>
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
 * The rich text example.
 *
 * @type {Component}
 */

class InputForm extends Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */
  
  state = {
    // value: html.deserialize(initialValue)
    value: Value.fromJSON(defaultValue),
    title: ''
  }

  /* Handle DB Save */
  onSaveClick = event => {
    if (this.state.noteId) {
      axios.put(`/notes/update/${this.state.noteId}`, ({jsonBody: JSON.stringify(this.state.value.toJSON())}));
    } else {
      axios.post('/notes/create', ({title: this.state.title, jsonBody: JSON.stringify(this.state.value.toJSON())}));
    }
  }

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

  // componentDidMount() {
  //   //Just for testing load something from DB
  //   axios.get('/notes').then(data => {
  //     console.log(data);
  //     console.log(this.state.value);
  //     if (data.data.length > 0) {
  //       console.log(JSON.parse(data.data[0].body));
  //       this.setState({value: Value.fromJSON(JSON.parse(data.data[0].body))});
  //     }
  //   })
  // }

  onToggleCode = (event) => {
    event.preventDefault()
    const value = this.state.value;

    this.onChange(
      plugin.changes.toggleCodeBlock(value.change(), 'paragraph').focus()
    );
  };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type===type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type===type)
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

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

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

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
    } else if (type==='code_block') {
      this.onToggleCode()
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

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div>
      <NoteSelector onNoteSelected={this.onNoteSelected} />
      <div className="inputForm">
        {this.renderToolbar()}
        {this.renderEditor()}
        <button onClick={this.onSaveClick} className="btn btn-success">Save It</button>
        <div dangerouslySetInnerHTML={{__html: html.serialize(this.state.value)}} />
      </div>
      </div>
    )
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */


  renderToolbar = () => {
    return (
      <div className="menu">
        <div className="toolbar">
        <input onChange={this.onTitleChange} type="text" />
        </div>
        <div className="toolbar">
          <span className="button" onMouseDown={this.onToggleCode}>
            <span className="material-icons">code</span>
          </span>
          <DefaultCodeLanguage />
          <DefaultIndentation />
        </div>
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

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

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

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

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

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

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

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

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
        return <div {...attributes}>{children}</div>;
      case 'paragraph':
        return <p {...attributes}>{children}</p>
      default:
        return null
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

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