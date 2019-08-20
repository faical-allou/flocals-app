import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; 
import {  ActivityIndicator, View, Text, Platform, KeyboardAvoidingView } from 'react-native';

import Fire from '../utils/fire.js';
import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js'
import visual from '../styles/visual.js';


console.ignoredYellowBox = [
  'Setting a timer'
];

class ChatScreen extends React.Component {
  
  static navigationOptions = () => ({
    title: 'Chat!',
    headerTintColor: visual.textSecondaryColor,
    headerTitleStyle: styles.textStandard,
  });
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
    const _userlang =  await navigation.getParam('userlang', 'en');
    
    const _recommender =  await navigation.getParam('recommender', 'chat buddy');      
    const _target_lang =  await navigation.getParam('target_lang', 'en');       
    const _sessionid =  await navigation.getParam('sessionid', '123SQ1234');
    const _placeid =  await navigation.getParam('placeid', 'ChIJPTacEpBQwokRKwIlDXelxkA');       
    const _placename =  await navigation.getParam('placename', 'Statue of Liberty'); 
    const _userdescription =  await navigation.getParam('userdescription', 'Cool Place'); 

    Promise.all([ _sessionid, _placeid,_username,_recommender,_placename,_userdescription ]).then(() =>{
      if (_username >_recommender) {
      _roomId = _placeid+' '+_recommender+' '+_username
      }
      else {
      _roomId = _placeid+' '+_username+' '+_recommender
      }
      Firebasedata.logUserChatlists(_sessionid, _roomId, _username,_target_lang,_placename,_recommender,_placeid );
      Firebasedata.logUserChatlists(_sessionid, _roomId, _recommender, _userlang,_placename,_username,_placeid);
      Firebasedata.createRoom(_sessionid,_roomId,_placename);
      
      Firebasedata.subscribe( (message => this.updateChat(message)), _sessionid, _roomId);

      Firebasedata.getTargetLang(this, _sessionid,_username,_roomId)
      
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
      return(<View style={styles.loadingIndicator}><ActivityIndicator/></View>)
    }
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => {
            console.log(this.state)
            Firebasedata.sendMessages(this.state.sessionid, this.state.roomId, messages, this.state.target_lang )
          }}
          user={this.user}
          />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}/> : <Text></Text>}
      
      </View>
         );
        }
      }
      
export default ChatScreen;
      
 