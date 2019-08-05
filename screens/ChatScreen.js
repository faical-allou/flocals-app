import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; 
import {  ActivityIndicator, View, Text, Platform, KeyboardAvoidingView, Button } from 'react-native';


import Fire from '../Fire';

console.ignoredYellowBox = [
  'Setting a timer'
  ];

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
      name: this.state.username,
     _id: this.state.sessionid+"-"+this.state.username,
      avatar: 'https://placeimg.com/140/140/any'
    };
  }
  
  updateChat(message) { this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, message),
  }))}
  
  async componentDidMount() {
    const { navigation } = this.props;
    const _username =  await navigation.getParam('username', 'test person');
    const _recommender =  await navigation.getParam('recommender', 'chat buddy');      
    const _sessionid =  await navigation.getParam('sessionid', '123SQ1234');
    const _placeid =  await navigation.getParam('placeid', 'ChIJPTacEpBQwokRKwIlDXelxkA');       
    console.log(_sessionid, _placeid,_username,_recommender)
    Promise.all([ _sessionid, _placeid,_username,_recommender]).then(() =>{
      if (_username >_recommender) {
      _roomId = _placeid+'-'+_recommender+'-'+_username
      }
      else {
      _roomId = _placeid+'-'+_username+'-'+_recommender
      }
      Firebasedata.logUserChatlists(_sessionid, _roomId, _username);
      Firebasedata.logUserChatlists(_sessionid, _roomId, _recommender);
      Firebasedata.createRoom(_sessionid,_roomId);
      
      Firebasedata.subscribe( (message => this.updateChat(message)), _sessionid, _roomId);

      
      
      this.setState({
        isLoading: false,
        username : _username,
        userid: _sessionid+"-"+_username,
        recommender :  _recommender,    
        sessionid : _sessionid,
        placeid : _placeid,
        roomId: _roomId,
        })
    } )
    }
  componentWillUnmount() {
    Firebasedata.off(this.state.sessionid, this.state.roomId);
  }
    
  render() {
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => {
            Firebasedata.sendMessages(this.state.sessionid, this.state.roomId, messages )
          }}
          user={this.user}
          />
        <Button style={{ margin: 20 }}
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}/> : <Text></Text>}
      
      </View>
         );
        }
      }
      
export default ChatScreen;
      
 