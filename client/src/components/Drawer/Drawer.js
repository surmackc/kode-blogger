import React, {Component} from 'react';
import ReactDrawer from 'react-drawer';

/* if you using webpack, should not apply identity to this css */
import './Drawer.css';
 
class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      position: 'right',
      noOverlay: true
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
  }
  setPosition(e) {
    this.setState({position: e.target.value});
  }
  setNoOverlay(e) {
    this.setState({noOverlay: e.target.checked});
  }
  toggleDrawer() {
    this.setState({open: !this.state.open});
  }
  closeDrawer() {
    this.setState({open: false});
  }
  onDrawerClose() {
    this.setState({open: false});
  }
  render() {
    return (
      <div>
        <div>
        <button
            className="btn btn-outline-dark"
            style={{margin: 20}}
            onClick={this.toggleDrawer}
            disabled={this.state.open && !this.state.noOverlay}
            >
            {!this.state.open ? <span>Show Code</span>: <span>Hide Code</span>}
          </button>
        </div>
       
        <ReactDrawer
          open={this.state.open}
          position={"right"}
          onClose={this.onDrawerClose}
          noOverlay={true}>
          <p onClick={this.closeDrawer}>X</p>
          {this.props.children}
        </ReactDrawer>
      </div>
    );
  }
}

export default Drawer;