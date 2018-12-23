import React, { Component } from 'react';
import { API_ROOT_URL } from '../consts';
import axios from 'axios';
import Messages from './Messages'
import MessageInput from './MessageInput'

class RoomsDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: this.props.username,
      roomId: this.props.selectedRoomId,
      roomName: '',
      users: [],
      messages: [],
      error: null,
    }
  }

  componentDidMount() {
    this.onUpdateChatroom();
    this.timer = setInterval(() => this.getMessages(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selectedRoomId !== this.props.selectedRoomId) {
      this.setState({
        roomId: this.props.selectedRoomId
      }, () => {this.onUpdateChatroom()})
    }
  }

  getRoomDetails = () => {
    axios.get(`${API_ROOT_URL}/${this.state.roomId}`)
    .then((response) => {
      this.setState({
        roomName: response.data.name,
        users: response.data.users
      });
    },
    (error) => {
      this.setState({
        error
      });
    })
  }

  getMessages = () => {
    axios.get(`${API_ROOT_URL}/${this.state.roomId}/messages`)
      .then((response) => {
        this.setState({
          messages: response.data
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )}

  intersperse = (arr, sep) => {
    if(arr.length === 0) return [];
    return arr.slice(1).reduce((xs, x, i) => {
      return xs.concat([sep, x]);
    }, [arr[0]])
  }

  onUpdateChatroom = () => {
    this.getRoomDetails();
    this.getMessages();
  }

  renderUsers = () => {
    let { users, username } = this.state
    var listUsers = users.map((user, i) => {
      let currentUser = username === user ? "curr-user" : "user"
      return (
        <li className={currentUser} key={i}>{user}</li>
      )
    })
    listUsers = this.intersperse(listUsers, ", ");
    return(
        <ul>{listUsers}</ul>
    )
  }

  render() {
    let { error, roomName } = this.state;
    if (error) {
      return <div className="error"> Error: {error.message} </div>
    }else {
      return (
        <React.Fragment>
          <div className="room-details-ctn">
            <div className="room-name">
              {roomName}
            </div>
            <div className="room-users">
              {this.renderUsers()}
            </div>
          </div>
          <Messages getMessages={this.getMessages} {...this.state}/>
          <MessageInput updateMessages={this.onUpdateChatroom} {...this.state}/>
        </React.Fragment>
      )
    }
  }
}

export default RoomsDetail
