import React from 'react';
import {  ActivityIndicator, Text, View, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
      airport: '',
      airportname: '',
      sessionid: ''
    };
  }

  async componentDidMount(){
    const _airport = await helper._retrieveData("airport");
    helper.getAirportData(this, _airport);
    const _sessionid = await helper._retrieveData("sessionid");

    this.setState({
      airport: _airport,
      sessionid: _sessionid,
    });
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }

    return(
      <ImageBackground source={require('../assets/homepage.jpg')} style={styles.bkgImage}>
      <View style={styles.homeElement}>
          <View style={styles.itemElementHometop}>
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>Welcome to flocals</Text>
          </View>
            <View style={styles.itemElementHomebottom}>
             <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>You are flying to:</Text>
              <View style={styles.itemElementHomesubBottom}>
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>{this.state.airportname}
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}> ({this.state.airport})</Text>
              </Text>
              </View>
              </View>
        </View>
      </ImageBackground>
      );
  }
}

export default HomeScreen;
