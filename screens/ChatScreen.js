import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; 
import {  ActivityIndicator, View, Text, Platform, KeyboardAvoidingView } from 'react-native';


import Fire from '../Fire';


class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state ={
      username : '',
      recommender :  '',    
      sessionid : '',
      placeid : '',
      messages: [],
      isLoading: true,
    }
    
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
  }

  static navigationOptions = () => ({
    title: 'Chat!',
  });

  get user() {
    return {
      name: 'randomname',
     _id: Firebasedata.uid,
      avatar: 'https://placeimg.com/140/140/any'
    };
  }
  
  updateChat(message) { this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, message),
  }))}
  
  async componentDidMount() {
    const { navigation } = this.props;
    const _username = await navigation.getParam('username', 'test person');
    const _recommender = await navigation.getParam('recommender', 'chat buddy');      
    const _sessionid = await navigation.getParam('sessionid', '123SQ1234');
    const _placeid = await navigation.getParam('placeid', 'ChIJPTacEpBQwokRKwIlDXelxkA');       

    this.state ={
      username : _username,
      recommender :  _recommender,    
      sessionid : _sessionid,
      placeid : _placeid,
      roomId: _sessionid+'-'+_placeid+'-'+_username+'-'+_recommender,
    }

    Promise.all([ _sessionid, _placeid,_username,_recommender]).then(() =>{
      Firebasedata.createRoom(this.state.roomId);
      Firebasedata.subscribe( (message => this.updateChat(message)), this.state.roomId);
      console.log('room name:  '+this.state.roomId)
      this.setState({
        isLoading: false,
        roomId: _sessionid+'-'+_placeid+'-'+_username+'-'+_recommender
        })
    } )
    }
  componentWillUnmount() {
    Firebasedata.off(this.state.roomId);
  }
    
  render() {
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }
    return (
      <View style={{ flex: 1 }}>
           
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => Firebasedata.sendMessages(messages, this.state.roomId)}
          user={this.user}
          />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}/> : {}}
      
      </View>
         );
        }
      }
      
      export default ChatScreen;
      
 