import React from 'react';
import { ActivityIndicator, Text, View, FlatList} from 'react-native';
import {connect } from 'react-redux';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js';

import Fire from '../utils/Fire';
import store from '../utils/store.js'

class ChatList extends React.Component {
  constructor(props){
    Firebasedata.observeAuth();
    super(props);
    this.state ={
      isLoading: true,
      isLogged: this.props.isLogged
    };
  }

  async componentDidMount(){  
    const _sessionId = await helper._retrieveData('sessionid')
    const _username = await helper._retrieveData('username')
    Promise.all([ _sessionId,_username]).then(() =>{ 
      Firebasedata.getOpenChats(_sessionId,_username, (output) => {
          this.setState({
            list: output,
            sessionId : _sessionId,
            username: _username,
            isLoading: false,
          })
        })
      })
    }
    
      
    render() {
      if(this.state.isLoading){
        return(<View style={styles.loadingIndicator}><ActivityIndicator/></View>)
      } 
      if(this.props.isLogged==='loggedin'){
      return (
        <View style={styles.listElements}>
          <Text>{this.props.isLogged}</Text>
        <FlatList
            data={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <View style={styles.chatList} >
              <View  >
              <Text style = {styles.textChatList} onPress={() =>
              this.props.navigation.navigate('Chat', {
                      recommender: item.partner,
                      username: this.state.username,
                      sessionid: this.state.sessionId,
                      placeid: item.placeid,
                      target_lang: item.targetlang,
                      placename: item.placename,
                      })}>{item.placename}</Text>
              </View>
                <View >
                <Text style = {styles.textChatBuddyList} >{item.partner}</Text>
                </View>
              </View>             
              }
          />
        </View>
      )
      } else {
        return <Text>Log in to see your Chats</Text>
      }
    }
  }

  const mapStateToProps = function(state) {
    return {
      isLogged: state.status.isLogged
    }
  }


export default connect(mapStateToProps)(ChatList);