import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; 

import Fire from '../Fire';


class ChatScreen extends React.Component {

  static navigationOptions = () => ({
    title: 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: 'randomname',
     _id: Fire.shared.uid,
      avatar: 'https://placeimg.com/140/140/any'
    };
  }
  
  
  componentDidMount() {
    console.log('Mounted')
    console.log('user is:')    
    console.log(this.user)
    
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
      );
    }
    componentWillUnmount() {
      Fire.shared.off();
    }
    
    render() {
      return (
        <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
        />
        );
      }
    }
      
export default ChatScreen;
