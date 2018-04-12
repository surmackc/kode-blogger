import React, {Component} from 'react';
import postApi from '../../utils/postAPI';

class SearchResults extends Component {
  state = { results: [], searchString: "" }

  componentDidMount() {
    if (this.props.match.params.search) {
      this.setState({searchString: this.props.match.params.search});
      this.doSearch(this.props.match.params.search);
    }
  }

  doSearch(searchString) {
    postApi.searchByTitle(searchString).then(data =>{
      this.setState({results: data.data});
    })
  }

  onSearchChanged = (event) => {
    this.setState({searchString: event.target.value});
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    this.doSearch(this.state.searchString);
  }

  render() {
    return (
      <div>
        <h2>Search</h2>
        <form style={{width: "100%"}} className="form-inline d-flex justify-content-center mb-5">
          <input style={{width: "60%"}} className="form-control" type="text" 
            value={this.state.searchString} 
            onChange={this.onSearchChanged}/>
          <button className="btn btn-success" type="submit" onClick={this.onSearchSubmit}>Search</button>
        </form>
      <ul className="list-group">
      {this.state.results.length ? 
        this.state.results.map(result => <li key={result.id} className="list-group-item">{result.title}</li>) 
        : <div>No Results</div>}
      </ul>
      </div>
    ) 
  }
}

export default SearchResults;