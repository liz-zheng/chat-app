import React, { Component } from 'react';

class Messages extends Component {

  constructor(props){
    super(props)
    this.state = {
      roomId: this.props.roomId,
      messages: this.props.messages,
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.roomId !== this.props.roomId || JSON.stringify(prevProps.messages) !== JSON.stringify(this.props.messages) ) {
      this.setState({
        roomId: this.props.roomId,
        messages: this.props.messages
      })
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  renderMessages = () => {
    let { messages } = this.state
    const listMessages = messages.map((msg) => {
      let userMsgs = this.props.username === msg.name ? "user-msgs" : "other-msgs"
      return (
        <li className={userMsgs} key={msg.id}>
          <div className="msg">{msg.message}</div>
          <div className="user">{userMsgs === "user-msgs" ? "" : msg.name}</div>
        </li>
      )
    })
    return (
      <ul>{listMessages}</ul>
    )
  }

  render(){
    return(
      <div className="msg-ctn">
        <div className="messages">
          {this.renderMessages()}
        </div>
        <div ref={(el) => { this.messagesEnd = el }}>
        </div>
      </div>
    )
  }
}

export default Messages
