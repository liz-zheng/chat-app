import React, { Component } from 'react';

class UserInfo extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      username: this.props.username,
      time: 0
    }
  }

  componentDidMount(){
    this.timer = setInterval(() => this.setState({
     time: this.state.time + 1
   }), 60000)
  }

  render(){
    return(
      <div className="user-info-ctn">
        <div className="username">
          {this.state.username ? this.state.username: ''}
        </div>
        <div className="online-status">
          Online for {this.state.time} minutes
        </div>
      </div>
    )
  }
}

export default UserInfo
