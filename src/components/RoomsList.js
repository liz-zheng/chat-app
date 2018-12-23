import React, { Component } from 'react';
import { API_ROOT_URL } from '../consts'
import UserInfo from './UserInfo'
import axios from 'axios';
import '../style/style.css'

class RoomsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      error: null,
      rooms: [],
      selectedRoomId: this.props.selectedRoomId,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selectedRoomId !== this.props.selectedRoomId) {
      this.setState({
        selectedRoomId: this.props.selectedRoomId
      })
    }
  }

  componentDidMount() {
    axios.get(API_ROOT_URL)
    .then((response) => {
      this.setState({
        rooms: response.data
      });
    },
    (error) => {
      this.setState({
        error
      });
    })
  }

  render() {
    let { rooms, selectedRoomId } = this.state
    const listRooms = rooms.map((room) => {
      let selected = selectedRoomId === room.id ? "selected" : "unselected"
      return (
        <li onClick={this.props.onSelectRoom.bind(this, room.id)} className={selected} key={room.id}>{room.name}</li>
      )
    })
    return(
      <div className="room-list-ctn">
        <UserInfo {...this.state}/>
        <ul>{listRooms}</ul>
      </div>
    )
  }
}

export default RoomsList;
