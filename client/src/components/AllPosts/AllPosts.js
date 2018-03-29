import React from "react";
import API from "../../utils/API";

class AllPosts extends Component {
  state = {
    posts: {}
  };

  componentDidMount = () => {
    API.getAll()
    .then(results => {
      this.setState({ posts: results.data });
    });
  };

  render() {
    return <div>
        {JSON.stringify(this.state.posts)}
    </div>;
  }
}
export default AllPosts;
