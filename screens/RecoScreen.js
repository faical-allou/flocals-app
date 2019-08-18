import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity,Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faComments } from '@fortawesome/free-solid-svg-icons'
import {connect } from 'react-redux';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import visual from '../styles/visual.js';
import dict from '../utils/dict.js';

import BottomSignupBar from '../screens/BottomSignupBar.js'

class RecoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nextHeader', 'Default'),
      headerTintColor: visual.textSecondaryColor,
      headerTitleStyle: styles.textStandard,
    };
  };
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      username: '',
      sessionid: helper._retrieveData('sessionid'),
      userlang: '',
  }
}

  async componentDidMount(){
    const { navigation } = this.props;
    const _currentType = await navigation.getParam('nextScreen', 'Food');
    const _placename = await navigation.getParam('nextHeader', 'ChIJPTacEpBQwokRKwIlDXelxkA');
    helper.getData(this,'home/recommendations/'+this.props.userlang+'/'+_currentType)

    this.setState({isLogged: this.props.isLogged, 
                  username: this.props.username,
                  userlang: this.props.userlang,
                  currentPlace : _currentType, 
                  placename: _placename 
                })
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
  

  render(){
    if(this.state.isLoading){
      return(<View style={styles.loadingIndicator}><ActivityIndicator/></View>)
    }

    return(
      <View style={styles.listElements}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View>
          <View style={styles.itemElementdetail} >
              <Text style={styles.textElement} >{item.userdescription}</Text>
          </View>
          <View style={styles.translatedElement} >
            <Text style={styles.textElement} >{item.userdescription_translated}</Text>
          </View>             
          <TouchableOpacity style={styles.recElement} onPress={() =>
             { console.log(this.state)
             this.state.isLogged === 'loggedin' ? (
              this.props.navigation.navigate('Chat', {
                recommender: item.recommender,
                      target_lang: item.lang,
                      username: this.state.username,
                      userlang: this.state.userlang,
                      sessionid: this.state.sessionid,
                      placeid: this.state.currentPlace,
                      placename: this.state.placename,
                      userdescription: item.userdescription
                      })) : (
                        Alert.alert("You must be signed in to chat")
                      )
                    }}>
            <Text style={styles.textRecElement} >  {item.recommender}</Text>
            <FontAwesomeIcon style= {styles.icons} icon={ faComments }/>
            </TouchableOpacity>
          </View>
            }
          keyExtractor={(item, index) => index.toString()}
        />
        <BottomSignupBar />

      </View>
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

export default connect(mapStateToProps)(RecoScreen);
