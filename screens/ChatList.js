import React from 'react';
import { ActivityIndicator, Text, View, Button, FlatList, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js';

import Fire from '../Fire';


class ChatList extends React.Component {
  constructor(props){
    Firebasedata.observeAuth();
    super(props);
    this.state ={
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),

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
          isLoading: false})
      })})
    }
      
    render() {
      if(this.state.isLoading){
        return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
      }
      return (
        <View style={styles.listElements}>
        <FlatList
            data={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <View style={styles.itemElement} >
              <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Chat')}>{item}</Text>
              </View>
              }
          />
        </View>
      )
    }
  }

export default ChatList;