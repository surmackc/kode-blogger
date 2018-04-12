import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavSearch extends Component {
  state = {searchString: ""}

  onSearchInput = (event) => {
    this.setState({searchString: event.target.value});
  }

  render() {
    return (
      <form className="form-inline my-2 mr-2 my-md-0">
          <input onChange={this.onSearchInput} value={this.searchString} className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
        <Link to={`/search/${this.state.searchString}`}>
          <button className="btn btn-outline-light" type="submit">Search</button>
        </Link>
      </form>);
  }
}

export default NavSearch;