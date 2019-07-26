import React from 'react';
import {  ActivityIndicator, Text, View} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
      airport: '',
      sessionid: ''
    };
  }
  
  async componentDidMount(){
    const _airport = await helper._retrieveData("airport");
    helper.getAirportData(_airport);
    const _sessionid = await helper._retrieveData("sessionid");
    const _airportname = await helper._retrieveData("airportname");

    this.setState({
      airport: _airport,
      sessionid: _sessionid,
      airportname: _airportname,
      isLoading: false,
    });
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }
 
    return(
      <View style={styles.listElements}>
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Types')}>Welcome to flocals</Text>
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Types')}>Your Flying to: {this.state.airport}</Text>
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Types')}>{this.state.airportname}</Text>           
            </View>
      );
  }
}

export default HomeScreen;
