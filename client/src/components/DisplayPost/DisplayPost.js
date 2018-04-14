import React, {Component} from "react";
import { Link } from 'react-router-dom'
import { Value } from 'slate';
import Drawer from '../Drawer/Drawer.js';
import postApi from '../../utils/postAPI';
import {SlateOutputHTML, SlateOutputCode} from '../SlateOutputHTML/SlateOutputHTML.js'
import defaultValue from './value.json';
import "./DisplayPost.css";

class DisplayPost extends Component { 
  initialValue = {
    value: defaultValue,
    title: 'Untitled Note',
    noteId: "new",
    index: 0,
    code: [],
    text: []
  }

  state = { ...this.initialValue }

  componentDidMount() {
    if (this.props.match.params.id) {
      //Load note
      postApi.getById(this.props.match.params.id).then(res => {
        const val = JSON.parse(res.data.body);
        this.setState({value: val, title: res.data.title, noteId: res.data.id});
        this.parseValue()
      });
    } else {
      this.parseValue()
    }
  }

  parseValue = () => {
    var code = []
    var text = []
    var index = 0

    this.state.value.document.nodes.map((node) => {
      console.log(index)
      if (node.type === 'code_block') {
        if (!code[index]) {
          code[index] = []
        }
        code[index].push(node)

        if (!text[index]) {
          text[index] = [{
            "object": "text",
            "leaves": [
              { "object": "leaf", "text": "No text to display for this code block", "marks": [] },
            ]
          }]
        }

        index++

      } else {
        if (!text[index]) {
          text[index] = []
        }
        text[index].push(node)
      }
    })
    
    this.setState({
      code,
      text
    })
  }

  handleClick(type) {
    let index = this.state.index
    if (type === 'next') {
      this.setState({index: index + 1})
    } else {
      this.setState({index: index - 1})
    }
  }

  render() {
    return(
      <div>
        <section>
        <h2><span id="recent-post-title">title</span><span id="recent-post-curly">&#123;</span><span className="ml-3">{this.state.title}</span></h2>
          <SlateOutputHTML text={this.state.text} index={this.state.index} />
          <button className="btn btn-outline-dark mr-2" onClick={()=>this.handleClick('previous')} disabled={this.state.index === 0}>Previous</button>
          <button className="btn btn-outline-dark mr-2" onClick={()=>this.handleClick('next')} disabled={this.state.index === this.state.text.length - 1}>Next</button>
          <Link to="/addnote"><button className="btn btn-outline-info">Add Comment</button></Link>
        </section>

        <section>
          <p>Check out these comments!</p>  
        </section>
        <h2><span id="recent-post-curly-end">&#125;</span></h2>

        <Drawer>
            <section style={{width: 500 }}>
              <SlateOutputCode code={this.state.code} index={this.state.index} />
            </section>
        </Drawer>
      </div>
    );
  }
}

export default DisplayPost;