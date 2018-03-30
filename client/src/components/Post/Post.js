import React, {Component} from "react";
import API from "../../utils/noteAPI";

class Post extends Component {
  state = {
    post: {}
  };

  componentDidMount = () => {
    API.getById(this.props.match.params.id)
    .then(result => {
      this.setState({ post: result.data });
    });
  };

  render() {
    return <div>
        {JSON.stringify(this.state.post)}
    </div>;
  }
}
export default Post;
