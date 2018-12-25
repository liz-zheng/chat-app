import React, { Component } from 'react';
import './style/style.css';
import Login from './components/Login'
import Chatroom from './components/Chatroom'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      joinChat: false,
    }
  }

  onJoinChat = (state) => {
    this.setState({
      username: state.username.toLowerCase(),
      joinChat: true,
    });
  }

  render() {
    let { username, joinChat } = this.state
    if(username && joinChat) {
      return (
        <div>
          <Chatroom {...this.state}/>
        </div>
      )
    }
    return (
      <div>
        <Login onJoinChat={this.onJoinChat}/>
      </div>
    );
  }
}
export default App;
