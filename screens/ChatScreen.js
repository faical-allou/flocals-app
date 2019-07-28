// @flow
import React from 'react';
import { View, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

import variables from '../config/config.js';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = variables.CTPE;
const CHATKIT_INSTANCE_LOCATOR = variables.CIL;
const CHATKIT_ROOM_ID = '19455412';
const CHATKIT_USER_NAME = 'Dave';

class ChatScreen extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider,
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onReceive = data => {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  onSend = (messages) => {  
    const toSend = this.getFormat(messages[0].text,'en' )
    fetch('https://translation.googleapis.com/language/translate/v2?key='+variables.G_Places_API, toSend)
      .then((response) => response.json())
      .then((responseJson) => { 
        console.log(responseJson)
        this.currentUser
        .sendMessage({
          text: messages[0].text+ "  /-/  "+responseJson.data.translations[0].translatedText,
          roomId: CHATKIT_ROOM_ID,
        })
      })
      .catch((error) =>{
        console.error(error);
      })
  };
  
  getFormat = (inputText, outputlanguage) => {
    return format = {                        
      method: 'POST',
      key: variables.G_Places_API, 
      body: JSON.stringify({  
        q: [inputText],
        target: outputlanguage 
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  }}
  

  render() {
    return  (     
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: CHATKIT_USER_NAME
        }}
      />
    );
  }
}

export default ChatScreen;
