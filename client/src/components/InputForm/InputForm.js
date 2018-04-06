import React, {Component} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey'
import Prism from 'prismjs';
import SlatePrism from 'slate-prism';
import defaultValue from './value.json';
import Html from 'slate-html-serializer';
import serializeRules from './serialize-rules';
import axios from 'axios';
import "./InputForm.css";
import './prism-okaidia.css';

/* Get editor content */
const initialValue = '<p>Something</p>'

/* Create serializer */
const html = new Html({ rules: serializeRules });

/**
 * Define defaults.
 *
 * @type {String}
 */

var DEFAULT_CODE_LANGUAGE = 'js'
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
const isShiftTabHotkey = isKeyHotkey('shift+tab');
const isTabHotkey = isKeyHotkey('tab');

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
        <span>Code-Language: </span> 
        <select value={this.state.value} onChange={this.onChange}>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
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
        <span>Tab Indent: </span> 
        <select value={this.state.value} onChange={this.onChange}>
          <option value="  ">TwoSpaces</option>
          <option value="    ">FourSpaces</option>
        </select>
      </label>
    )
  }
}

function CodeBlock(props) {
  const { editor, node } = props
  const language = node.data.get('language')

  function onChange(event) {
    editor.change(c =>
      c.setNodeByKey(node.key, { data: { language: event.target.value } })
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <pre>
        <code {...props.attributes}>{props.children}</code>
      </pre>
      <div
        contentEditable={false}
        style={{ position: 'absolute', top: '5px', right: '5px' }}
      >
        <select value={language || DEFAULT_CODE_LANGUAGE} onChange={onChange}>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="html">HTML</option>
        </select>
      </div>
    </div>
  )
}

function CodeBlockLine(props) {
  return <div {...props.attributes}>{props.children}</div>
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
    value: html.deserialize(initialValue)
    // value: Value.fromJSON(initialValue),
  }

  /* Handle DB Save */
  onSaveClick = event => {
    const data = html.serialize(this.state.value);
    axios.post('/notes/create', ({textBody: data}));
  }

  componentDidMount() {
    //Just for testing load something from DB
    axios.get('/notes').then(data => {
      console.log(data);
      if (data.data.length > 0) {
        this.setState({value: html.deserialize(data.data[0].body)})
      }
    })
  }

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
    if (value.document != this.state.value.document) {
      const string = html.serialize(value)
      localStorage.setItem('content', string)
    }

    this.setState({ value })
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  indentLines = (change) => {
    const { value } = change;
    const { document, selection } = value;
    const lines = document
    .getBlocksAtRange(selection)
    .filter(node => node.type === "code-line");

    return lines.reduce((c, line) => {
        // Insert an indent at start of line
        const text = line.nodes.first();
        return c.insertTextByKey(text.key, 0, DEFAULT_INDENTATION);
    }, change);
  }

  dedentLines = (change) => {
    const { value } = change;
    const { document, selection } = value;
    const lines = document
    .getBlocksAtRange(selection)
    .filter(node => node.type === "code-line");

    return lines.reduce((c, line) => {
        // Insert an indent at start of line
        const text = line.nodes.first();
        const lengthToRemove = text.characters
            .takeWhile((char, index) => DEFAULT_INDENTATION.charAt(index) === char.text)
            .count();
        return c.removeTextByKey(text.key, 0, lengthToRemove);
    }, change);
  }

  onShiftTab = (event, change) => {
    event.preventDefault();
    event.stopPropagation();

    // We indent all selected lines
    this.dedentLines(change);
  }

  onTab = (event, change) => {
    event.preventDefault();
    event.stopPropagation();

    const { value } = change
    const { isCollapsed } = value;

    if (isCollapsed) {
        return change.insertText(DEFAULT_INDENTATION);
    }

    // We indent all selected lines
    this.indentLines(change);
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
    } else {
      const { value } = change
      const { startBlock } = value

      if (isShiftTabHotkey(event) && startBlock.type=== 'code-line')  {       
        this.onShiftTab(event, change);
      } else if (isTabHotkey(event) && startBlock.type=== 'code-line')  {       
        this.onTab(event, change);
      }
      
      if (event.key != 'Enter') return
      if (startBlock.type != 'block-code') return
      if (value.isExpanded) change.delete()
      change.insertText('\n')
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
          .unwrapBlock('code-block')
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    } else if (type==='block-code') {
      // Handle the extra wrapping required for block-code.
      const hasLines = this.hasBlock('code-line')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type===type)
      })

      if (hasLines && isType) {
        change
          .setBlocks('DEFAULT_NODE')
          .unwrapBlock('block-code')
      } else if (hasLines) {
        change
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
          .wrapBlock(type)
      } else {
        change
          .setBlocks('code-line')
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
          .wrapBlock(type)
      }


    } else {
      // Handle everything but list buttons and block-code
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
      <div className="inputForm">
        {this.renderToolbar()}
        {this.renderEditor()}
        <button onClick={this.onSaveClick} className="btn btn-success">Save It</button>
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
            {this.renderBlockButton('block-code', 'code')}
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
          decorateNode={this.decorateNode}
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
      case 'block-code':
        return <CodeBlock {...props} />
      case 'code-line':
        return <CodeBlockLine {...props} />
      case 'paragraph':
        return <p {...attributes}>{children}</p>
      default:
        return <p {...attributes}>{children}</p>
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
          return <span>{children}</span>
    }
  }

  tokenToContent = token => {
    if (typeof token==='string') {
      return token
    } else if (typeof token.content==='string') {
      return token.content
    } else {
      return token.content.map(this.tokenToContent).join('')
    }
  }

   /**
   * Decorate code blocks with Prism.js highlighting.
   *
   * @param {Node} node
   * @return {Array}
   */

  decorateNode = node => {
    if (node.type!== 'block-code') return

    // default language for new blocks is css
    const language = node.data.get('language') || DEFAULT_CODE_LANGUAGE
    const texts = node.getTexts().toArray()
    const string = texts.map(t => t.text).join('\n')
    const grammar = Prism.languages[language]
    const tokens = Prism.tokenize(string, grammar)
    const decorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const content = this.tokenToContent(token)
      const newlines = content.split('\n').length - 1
      const length = content.length - newlines
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining && texts.length > 0) {
        endText = texts.shift()
        remaining = length - available
        available = endText.text.length
        endOffset = remaining
      }

      if (typeof token!== 'string') {
        const range = {
          anchorKey: startText.key,
          anchorOffset: startOffset,
          focusKey: endText.key,
          focusOffset: endOffset,
          marks: [{ type: token.type }],
        }

        decorations.push(range)
      }

      start = end
    }

    return decorations
  }
}

/**
 * Export.
 */

export default InputForm