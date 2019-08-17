import React from 'react';
import { ActivityIndicator, Text, View, Button, FlatList, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js';

import BottomSignupBar from '../screens/BottomSignupBar.js'



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
    1
  }
      
    
  
  
  render() {
    if(this.state.isLoading){
      return(<View style={styles.loadingIndicator}><ActivityIndicator/></View>)
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