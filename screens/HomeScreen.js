import React from 'react';
import {  ActivityIndicator, Text, View, ImageBackground, Picker} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect } from 'react-redux';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import visual from '../styles/visual.js';
import dict from '../utils/dict.js';
import store from '../utils/store.js'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to flocals',
    headerTintColor: visual.textSecondaryColor,
    headerTitleStyle: styles.textStandard,
  };

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      isLogged: this.props.isLogged,
      airport: '',
      airportname: '',
      sessionid: '',
      userlang: '',
      showpicker: false
    };
  }

  async componentDidMount(){
    const _airport = await helper._retrieveData("airport");
    const _sessionid = await helper._retrieveData("sessionid");
    helper.getAirportData(this, _airport);

    this.setState({
      airport: _airport,
      sessionid: _sessionid,
      userlang: this.props.userlang
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({
        isLogged: this.props.isLogged, 
        username: this.props.username,
        userlang: this.props.userlang,
      })
    }
  }

  togglePickerDisplay(){
    if(this.state.showpicker){
    return(
    <View >
    <Picker
        mode='dropdown'
        selectedValue={this.state.userlang}
        style={styles.langPicker}
        onValueChange={(itemValue) => {
          this.setState({userlang: itemValue, showpicker: false})
          helper._storeData("userlang", itemValue)
          store.dispatch({type: 'LANGUAGE', userlang:itemValue})
        }}
      itemStyle={styles.langPickerItem}>
      {Object.keys(dict.languages).map((key) => {
        return (<Picker.Item label={dict.languages[key]} color= {visual.textSecondaryColor} value={key} key={key}/>)
      })}
    </Picker>
    </View>
    )}
  }

  togglePicker(){
    if(this.state.showpicker){
      this.setState({showpicker:false})
    }else{
      this.setState({showpicker:true})
    }
    
  }

  toggleText(){
    if(this.state.showpicker){
     return ('Select Language')
    }else{
      return (dict.languages[this.state.userlang])
    }
    
  }



  render(){
    if(this.state.isLoading){
      return(<View style={styles.loadingIndicator}><ActivityIndicator/></View>)
    }

    return(
      <ImageBackground source={require('../assets/homepage.jpg')} style={styles.bkgImage}>
      <View style={styles.homeElement}>
          <View >    
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>You are flying to:</Text>
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}>{this.state.airportname} ({this.state.airport})</Text>
              <Text style={styles.textElementHome} onPress={() => this.props.navigation.navigate('Types')}> </Text>

          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.itemElementLangButton} onPress={() => this.togglePicker()}>
              <Text style={styles.textElementHomeButton} >{this.toggleText()} </Text>
          </TouchableOpacity> 
          {this.togglePickerDisplay()}
          <TouchableOpacity style={styles.itemElementExploreButton} onPress={() => this.props.navigation.navigate('Types')}>
              <Text style={styles.textElementHomeButton} > Explore </Text>
          </TouchableOpacity>

        </View>

        </View>
      </ImageBackground>
      );
  }
}

const mapStateToProps = function(state) {
  return {
    isLogged: state.status.isLogged,
    username: state.status.username,
    userlang: state.status.userlang
  }
}

export default connect(mapStateToProps)(HomeScreen);
