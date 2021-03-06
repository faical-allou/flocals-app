import React from 'react';
import { ActivityIndicator, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments, faUser, faBackward, faEdit, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Google } from 'expo';
import {connect } from 'react-redux';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import store from '../utils/store.js'

class BottomSigninBar extends React.Component {
    constructor(props){
      super(props);
      this.state ={ 
        username: 'Default_User', 
        isLogged: '',
        userlang: 'en',
        isLoading: true,
      };   
     }
    
    async componentDidMount(){
       this.setState({
          isLoading: false,
          isLogged: this.props.isLogged, 
          username: this.props.username,
          userlang: this.props.userlang,
      })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps !== this.props) {
        Firebasedata.getOpenChats(this.state.sessionId,this.props.username, (output) => {
        this.setState({
          isLogged: this.props.isLogged, 
          username: this.props.username,
          userlang: this.props.userlang,
          list: output
        })
      })
      }
    }


    signIn = async () => {
      helper.getRandomName(this);
      try {
        const result = await Google.logInAsync({
          expoClientId: '746916049107-0un5svk32nv9o90c6vccek36tcfsiud0.apps.googleusercontent.com',
          iosClientId: '746916049107-6p47litmq08pgf8bbbmfh00vjt79qct1.apps.googleusercontent.com',
          androidClientId: '746916049107-fh6t7pc004v5m5sovp5gluou85g7t85p.apps.googleusercontent.com',
          scopes: ["profile", "email"] 
        })
        if (result.type === "success") { 
            this.props.dispatch({ type: 'LOGIN'})
            helper._storeData('isLogged','loggedin');
            helper._storeData('username',this.state.username);
        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }
    
    toggleDrawer = () => {this.props.navigation.toggleDrawer()}

    render(){
      if(this.state.isLoading){
        return(<View ></View>)
      } 
      return(
          <View style= {styles.bottomBarContainer}>
          { this.state.isLogged == 'loggedin' ? (
            <View style= {{ flexDirection:'row'}}  >
                <LoggedinBar dispatch={this.props.dispatch} username={this.state.username} />               
                <TouchableOpacity  
                    style= {styles.bottomButton}               
                    onPress={() => this.props.navigation.navigate('Form',{
                    username: this.state.username})}>
                  <FontAwesomeIcon style= {styles.icons} icon={ faEdit }/>
                  <Text style={styles.bottomButtonText}>Add Stuff</Text>
                </TouchableOpacity>
                <ChatsDrawer toggleDrawer={this.toggleDrawer}/>
            </View>
          ) : (
            <LoginBar signIn={this.signIn} />
          )
        }
            <TouchableOpacity  
              style= {styles.bottomButton}   
              onPress={() => this.props.navigation.goBack()}
            >
            <FontAwesomeIcon style= {styles.icons} icon={ faBackward }/>
            <Text style={styles.bottomButtonText}>Go Back</Text>
            </TouchableOpacity>     
        </View>
      );
    }
  }
  
  const LoginBar = props => {
    return (     
        <TouchableOpacity  
              style= {styles.bottomButton}       
              onPress={() => props.signIn()} >
          <FontAwesomeIcon style= {styles.icons} icon={ faSignInAlt }/>
          <Text style={styles.bottomButtonText}>Sign in to Contribute</Text>
        </TouchableOpacity>
    )
  }
  
  const LoggedinBar = props => {
    return (
      <TouchableOpacity  
        style= {styles.bottomButton} 
        onPress={() => props.dispatch({type: 'LOGOUT'})}
        >
        <FontAwesomeIcon style= {styles.icons} icon={ faUser }/>
        <Text style={styles.bottomButtonText}>{props.username}</Text>
      </TouchableOpacity>
    )
  }
  const ChatsDrawer = props => {
    return (
      <TouchableOpacity  
        style= {styles.bottomButton}   
        onPress={()=> props.toggleDrawer() }>
        <FontAwesomeIcon style= {styles.icons} icon={ faComments }/>
        <Text style={styles.bottomButtonText}>Chats</Text>
      </TouchableOpacity>
      )
  }

  const mapStateToProps = function(state) {
    return {
      isLogged: state.status.isLogged,
      username: state.status.username,
      userlang: state.status.userlang
    }
  }


export default connect(mapStateToProps)(withNavigation(BottomSigninBar));
