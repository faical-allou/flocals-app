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
        chats = [];
        for (let i= 0; i< output.length;i++ ){
          outputsplit = output[i].split(' ')
          
          if (outputsplit[1] === _username) {
            chats.push({'userwith': outputsplit[2], 'location' : outputsplit[0]})
            helper.getPlaceName( 'home/places/'+chats[i].location, (response) => {
              chats[i]['locationname']= response.rec_name;
              if( i == output.length-1) {this.setState({isLoading : false, list: chats})}                     
            })
          } else {
            chats.push({'userwith': outputsplit[1], 'location' : outputsplit[0]})
            helper.getPlaceName( 'home/places/'+chats[i].location, (response) => {
              chats[i]['locationname']= response.rec_name;
              if( i == output.length-1) {this.setState({isLoading : false,list: chats })}
            })
          } 
        }
        this.setState({
          sessionId : _sessionId,
          username: _username,
          })
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
            renderItem={({item}) => <View><View style={styles.itemElementdetail} >
              <Text style={styles.textElement} >{item.locationname}</Text>
              </View>
              <View style={styles.recElement}>
              <Text style={styles.textRecElement} onPress={() =>
              this.props.navigation.navigate('Chat', {
                      recommender: item.userwith,
                      username: this.state.username,
                      sessionid: this.state.sessionId,
                      placeid: item.location,
                      })}>{item.userwith}</Text>
              </View>
              </View>
              
              }
          />
        </View>
      )
    }
  }

export default ChatList;