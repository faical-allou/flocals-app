import React from 'react';
import {  ActivityIndicator, Text, View, ImageBackground, Picker} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
      airport: '',
      airportname: '',
      sessionid: '',
      userlang: ''
    };
  }

  async componentDidMount(){
    const _userlang = await helper._retrieveData("userlang");
    const _airport = await helper._retrieveData("airport");
    helper.getAirportData(this, _airport);
    const _sessionid = await helper._retrieveData("sessionid");

    this.setState({
      airport: _airport,
      sessionid: _sessionid,
      userlang: _userlang
    });
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }

    return(
      <ImageBackground source={require('../assets/homepage.jpg')} style={styles.bkgImage}>
      <View style={styles.homeElement}>
          <View style={styles.itemWelcome}>
              <Text style={styles.textWelcome} onPress={() => this.props.navigation.navigate('Types')}>Welcome to flocals</Text>
          </View>
          <View style={styles.itemElementHometop}>    
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>You are flying to:</Text>
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>{this.state.airportname} ({this.state.airport})</Text>
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}> </Text>

          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}></View>
          <View style={styles.itemElementHomeButton}>
              <Text style={styles.textElementHomeButton} onPress={() => this.props.navigation.navigate('Types')}> Explore </Text>
          </View>
          <View style={styles.itemElementHomeButton}>
            <Picker
              selectedValue={this.state.userlang}
              style={styles.itemElementLangPicker}
              onValueChange={(itemValue) => {
                this.setState({userlang: itemValue})
                helper._storeData("userlang", itemValue)
              }
            }>
            {Object.keys(dict.languages).map((key) => {
              return (<Picker.Item label={dict.languages[key]} value={key} key={key}/>)
            })}
          </Picker>
          </View>
        </View>
      </ImageBackground>
      );
  }
}

export default HomeScreen;
