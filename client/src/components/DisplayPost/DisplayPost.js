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
    text: [],
    windowHeight: 0,
    windowWidth: 0,
    textHeight: "90vh",
    textWidth: "90vw"
  }

  constructor(props) {
    super(props);
    this.state = { ...this.initialValue }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

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

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  parseValue = () => {
    var code = []
    var text = []
    var index = 0

    this.state.value.document.nodes.map((node) => {
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

  resizeHTML = (open) => {
    var width = "90vw"
    var height = "90vh"
    if (open) {
      if (window.innerWidth < 800) {
        height = "35vh"
      } else {
        width = "45vw"
      }
    }

    this.setState({
      textWidth: width,
      textHeight: height
    })
  }

  render() {
    return(
      <div>
        <Drawer position={(window.innerWidth < 800)? "bottom" : "right"} onToggleDrawer={this.resizeHTML}>
            <section style={{padding: 15}}>
              <SlateOutputCode code={this.state.code} index={this.state.index} />
            </section>
        </Drawer>
        <section style={{ width: this.state.textWidth, height: this.state.textHeight}}>
          <h2><span id="recent-post-title">title</span><span id="recent-post-curly">&#123;</span><span className="ml-3">{this.state.title}</span></h2>
          <SlateOutputHTML text={this.state.text} index={this.state.index} />
          <button className="btn btn-outline-dark mr-2" onClick={()=>this.handleClick('previous')} disabled={this.state.index === 0}>Previous</button>
          <button className="btn btn-outline-dark mr-2" onClick={()=>this.handleClick('next')} disabled={this.state.index === this.state.text.length - 1}>Next</button>
          <Link to="/addnote"><button className="btn btn-outline-info">Add Comment</button></Link>
          <p>Check out these comments!</p> 
          <h2><span id="recent-post-curly-end">&#125;</span></h2>
        </section>
      </div>
    );
  }
}

export default DisplayPost;