import React, {Component} from 'react';
import postApi from '../../utils/postAPI';

class SearchResults extends Component {
  state = { results: [] }

  componentDidMount() {
    if (this.props.match.params.search) {
      postApi.searchByTitle(this.props.match.params.search).then(data =>{
        console.log(data);
        this.setState({results: data.data});
      })
    }
  }

  render() {
    return (
      <div>
      {this.state.results.length ? this.state.results.map(result => {
        return (
          <div key={result.id}>{result.title}</div>
        );
      }) : <div>No Results</div>}
      </div>
    ) 
  }
}

export default SearchResults;