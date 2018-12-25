import React, { Component } from 'react';
import { API_ROOT_URL } from '../consts';
import axios from 'axios';
import Messages from './Messages';
import MessageInput from './MessageInput';
import socketIOClient from 'socket.io-client';
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
      endpoint: `http://127.0.0.1:4001`
    }
  }

  componentDidMount() {
    // this.updateAll();
    console.log("mount")

    this.onUpdateChatroom()
    this.updateSocket()
  }

  componentWillUnmount() {
    console.log("unmounted")
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selectedRoomId !== this.props.selectedRoomId) {

      console.log("update")

      let {endpoint} = this.state;
      console.log("socket room is: "+this.props.selectedRoomId)
      let socket = socketIOClient(endpoint, {query: `roomId=${prevProps.selectedRoomId}`});
      // socket.on("disconnect")
      // socket = socketIOClient(endpoint, {query: `roomId=${this.props.selectedRoomId}`});

      socket.on("FromAPI", data => {
        console.log(data)
      });


      this.setState({
        roomId: this.props.selectedRoomId,
      }, () => {this.getRoomDetails()})
    }
  }

  updateAll = () => {
    this.onUpdateChatroom();
    this.updateSocket();
  }

  updateSocket = () => {
    let { endpoint, roomId } = this.state;
    console.log("socket room is: "+roomId)
    let socket = socketIOClient(endpoint, {query: `roomId=${roomId}`});
    socket.on("FromAPI", data => this.setState({messages: data}));
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
    console.log("get messages room id: "+this.state.roomId)
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
    console.log("chatroom")
    this.getRoomDetails();
    this.getMessages();
  }

  renderUsers = () => {
    let { users, username } = this.state
    let listUsers = users.map((user, i) => {
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
