import React from 'react';
import { ActivityIndicator, Text, View, Button, FlatList, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js';

import BottomSignupBar from '../screens/BottomSignupBar.js'
import Fire from '../Fire';

import SideMenu from 'react-native-side-menu'

class Test extends React.Component {
  constructor(props){
    Firebasedata.observeAuth();
    super(props);
    this.state ={
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
    };
  }
  componentDidMount(){   
      Firebasedata.getOpenChats('190813SQ1789','fake_user3', (output) => {
        console.log(output)
        let testabc = [1,2,3,4]
        this.setState({list: output, isLoading: false})
      })}
      
    
  
  
    render() {
      if(this.state.isLoading){
        return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
      }
      return (
        <View style={styles.listElements}>
          <Text>
        {this.state.list}
        </Text>
        </View>
      )
    }
  }

export default Test;