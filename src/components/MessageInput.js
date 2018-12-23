import React, { Component } from 'react';
import * as consts from '../consts';
import axios from 'axios';

class MessageInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.roomId,
      message: {
        name: this.props.username,
        message: ''
      },
      error: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.roomId !== this.props.roomId) {
      this.setState({
        roomId: this.props.roomId
      })
    }
  }

  sendMessage = (evt) => {
    evt.preventDefault();
    axios.post(`${consts.API_ROOT_URL}/${this.state.roomId}/messages`, this.state.message)
    .then((response) => {
      this.props.updateMessages();
      this.setState({
        message: {
          name: this.props.username,
          message: ''
        }
      })
    },
    (error) => {
      this.setState({
        error
      });
    }
  )}

  onInputChange = (evt) => {
    this.setState({
      message: {
        name: this.props.username,
        message: evt.target.value
      }
    });
  }

  render() {
    return (
      <div className="msg-input-ctn">
        <div className="msg-input">
          <form className="form" onSubmit={this.sendMessage}>
            <input
            className="input"
            type="text"
            value={this.state.message.message}
            onChange={this.onInputChange}
            placeholder={`${consts.TYPE_MESSAGE}`}
            />
            <button className="send-btn" type="submit">{`${consts.SEND}`}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageInput;
