import React, {Component} from 'react';
import { Value } from 'slate';
import Html from 'slate-html-serializer';
import serializeRules from './serialize-rules';
import axios from 'axios';
import NoteSelector from '../NoteSelector/NoteSelector';
import defaultValue from './value.json';
import "./SlateOutputHTML.css";

/* State.Value to HTML serializer */
const html = new Html({ rules: serializeRules });

class SlateOutputHTML extends Component {
  initialValue = { 
    // value: html.deserialize(initialValue)
    value: Value.fromJSON(defaultValue),
    title: 'Untitled Note',
    noteId: "new",
    index: 0,
    code: [],
    text: []
  }

  state = { ...this.initialValue }

  componentDidMount = () => {
    this.parseValue()
  }

  /* Handle DB Retrieval */
  onNoteSelected = event => {
    if (event.target.value === this.initialValue.noteId) {
      this.setState({...this.initialValue})
    }
    
    axios.get(`/notes/${event.target.value}`).then(res => {
      console.log("gotNote", res.data)
      if (res.data) {
        this.setState(
          {
            value: JSON.parse(res.data.body), 
            noteId: res.data.id,
            title: res.data.title
          }
        )

        this.parseValue()
      }
    })
  }

  parseValue = () => {
    var code = []
    var text = []
    var index = 0
    
    this.state.value.document.nodes.map((node) => {
      if (node.type === 'block-code') {
        if (!code[index]) {
          code[index] = []
        }
        code[index].push(node)
        index++

      } else {
        if (!text[index]) {
          text[index] = []
        }
        text[index].push(node)
      }
    })

    this.setState({
      code: code,
      text: text
    })
  }

  getHTML = (index, type) => {
    var data = {
      "object": "value",
      "document": {
        "object": "document",
        "data": {},
        "nodes": this.state[type][index]
      }
    }

    data = Value.fromJSON(data)

    return (
      <div className={`{type}-output col-md-6`}
        dangerouslySetInnerHTML={{__html: html.serialize(data, {sanitize: true})}}
      >
      </div>
    )
  }

  handleClick(type) {
    let index = this.state.index
    if (type === 'next') {
      this.setState({index: index++})
    } else {
      this.setState({index: index--})
    }
  }

  render() {
    return (
      <div className="output">
        <div className="row">
          <NoteSelector ref={(noteSelector) => { this.noteSelector = noteSelector}} newId={this.initialValue.noteId} onNoteSelected={this.onNoteSelected} />
        </div>
        <div className="row">
          {this.getHTML(this.state.index, 'text')}
          {this.getHTML(this.state.index, 'code')}
        </div>
        <div className="row">
          <button type="button" className=' float-left btn btn-info' onClick={()=>this.handleClick('previous')} disabled={this.state.index === 0}>
            Previous
          </button>
          <button type="button" className='float-right btn btn-info' onClick={()=>this.handleClick('next')} disabled={this.state.index + 1 === this.state.text.length}>
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default SlateOutputHTML