import React, { Component } from 'react';
import RoomsList from './RoomsList'
import RoomsDetail from './RoomsDetail'
import '../style/style.css'

class Chatroom extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: this.props.username,
      selectedRoomId: 0,
    }
  }

  onSelectRoom = (id) => {
    this.setState({
      selectedRoomId: id,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="left-nav">
          <RoomsList onSelectRoom={this.onSelectRoom} {...this.state}/>
        </div>
        <div className="main">
          <RoomsDetail {...this.state}/>
        </div>
      </React.Fragment>
    )
  }
}

export default Chatroom;
