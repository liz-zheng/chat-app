import React, { Component } from 'react';
import * as consts from '../consts';
import '../style/style.css'

class UsernameInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    return (
      <div className="username-ctn">
        <div className="input">
          <input
          className="username"
          value={this.state.username}
          onChange={this.onInputChange}
          placeholder={`${consts.TYPE_USERNAME}`}
          />
        </div>
          <button className="join-btn" type="text" onClick={this.onClick}>{`${consts.JOIN_CHAT}`}</button>
      </div>
    );
  }

  onClick = () => {
    this.props.onJoinChat(this.state);
  }

  onInputChange = (evt) => {
    this.setState({username: evt.target.value});
  }
}

export default UsernameInput;
