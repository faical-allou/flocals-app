import React from 'react';
import { ActivityIndicator, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

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
      const { navigation } = this.props;

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
            this.props.toggleStatus()
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
    
    toggleDrawer = () => {this.props.navigation.toggleDrawer()}

    render(){
      if(this.state.isLoading){
        return(<View ><ActivityIndicator/></View>)
      } 
      return(
          <View style= {styles.bottomBarContainer}>
          { this.state.isLogged == 'loggedin' ? (
            <View style= {{ flexDirection:'row'}}  >
                <LoggedinBar username={this.state.username} />
                <TouchableOpacity  
                style= {styles.bottomButton}               
                onPress={() => this.props.navigation.navigate('Form',{
                username: this.state.username})}>
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
              color={colors.secondary}
              onPress={() => this.props.navigation.goBack()}
            >
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
          <Text style={styles.bottomButtonText}>Sign in to Contribute</Text>
          </TouchableOpacity>
    )
  }
  
  const LoggedinBar = props => {
    return (
      <TouchableOpacity  
      style= {styles.bottomButton}  >
        <Text style={styles.bottomButtonText}>{props.username}</Text>
      </TouchableOpacity>
    )
  }
  const ChatsDrawer = props => {
    return (
      <TouchableOpacity  
      style= {styles.bottomButton}   
      onPress={()=> props.toggleDrawer() }>
      <Text style={styles.bottomButtonText}>Chats</Text>
      </TouchableOpacity>
      )
  }

export default withNavigation(BottomSigninBar);
