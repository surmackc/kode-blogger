import React, {Component} from "react";

class NoMatch extends Component {
  render() {
    return (  
      <div className="jumbotron">
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </div>
    )
  }
}
export default NoMatch;
