import React, {Component} from 'react';
import axios from 'axios';
import { Verify } from 'crypto';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {verified: false}
  }

  componentDidMount() {
    // axios.get('/account')
    console.log(this.props);
    axios.get(`/account/${this.props.match.params.username}/${this.props.match.params.token}`)
      .then(res => {
        this.setState({verified: true});
      }).catch(err => {
        this.setState({verified: false});
      })
  }

  render() {
    return (<div>
      {this.state.verified ? <p>Account verified! Please login.</p> : <p>Unable to verify account. Contact support.</p>}
      </div>)
  }
}

export default VerifyEmail;