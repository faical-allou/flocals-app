import React from 'react';
import { ActivityIndicator, Text, View, Button, Image} from 'react-native';

import { Google } from 'expo';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';


class BottomSigninBar extends React.Component {
    constructor(props){
      super(props);
      this.state ={ 
        username: 'Default_User', 
        photoUrl: variables.default_pic,
        isLogged: '',
        isLoading: true
      };   
    }
    
    async componentDidMount(){
      const _logged = await helper._retrieveData('isLogged')
      const _username = await helper._retrieveData('username')
       this.setState({
          isLoading: false,
          isLogged: _logged, 
          username: _username
      })
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
            helper._storeData('isLogged','loggedin');
            helper._storeData('username',this.state.username);
            this.setState({ isLogged: 'loggedin'} ); 
        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }
  
    render(){
      if(this.state.isLoading){
        return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
      } 
      return(
          <View >
          { this.state.isLogged == 'loggedin' ? (
            <View>
                <LoggedinBar username={this.state.username} photoUrl={this.state.photoUrl} />
                <Button
                title="Add Stuff"
                onPress={() => this.props.navigation.navigate('Form',{
                username: this.state.username})}/>
            </View>
          ) : (
            <LoginBar signIn={this.signIn} />
          )}      
        </View>
      );
    }
  }
  
  const LoginBar = props => {
    return (
      <View>
        <Button title="Sign in with Google to add stuff " onPress={() => props.signIn()} />
      </View>
    )
  }
  
  const LoggedinBar = props => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome: {props.username}</Text>
        <Image style={styles.image} source={{ uri: props.photoUrl }} />
      </View>
    )
  }

export default BottomSigninBar;
