import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, ImageBackground,Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faComment } from '@fortawesome/free-solid-svg-icons'


import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import BottomSignupBar from './BottomSignupBar.js';
import { TouchableOpacity } from 'react-native-gesture-handler';



class RecoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nextHeader', 'Default'),
    };
  };
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      username: helper._retrieveData('username'),
      sessionid: helper._retrieveData('sessionid'),
      userlang: '',
  }
}

  async componentDidMount(){
    const { navigation } = this.props;
    const _currentType = await navigation.getParam('nextScreen', 'ChIJPTacEpBQwokRKwIlDXelxkA');
    const _logged = await helper._retrieveData('isLogged')
    const _userlang = await helper._retrieveData('userlang')
    const _placename = await navigation.getParam('nextHeader', 'Default');
    this.setState({currentPlace : _currentType, 
                    isLogged: _logged, 
                    userlang: _userlang,
                  placename: _placename },
    helper.getData(this,'home/recommendations/'+_userlang+'/'+_currentType) )
  }

  toggleStatus(){
    if(this.state.isLogged === 'loggedin'){ 
      this.setState({isLogged:'notloggedin'})
    } else {
      this.setState({isLogged:'loggedin'})
    }
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
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
          <TouchableOpacity style={styles.recElement} >
            <Text style={styles.textRecElement} onPress={() =>
            { this.state.isLogged === 'loggedin' ? (
              
              this.props.navigation.navigate('Chat', {
                recommender: item.recommender,
                      target_lang: item.lang,
                      username: this.state.username,
                      userlang: this.state.userlang,
                      sessionid: this.state.sessionid,
                      placeid: this.state.currentPlace,
                      placename: this.state.placename
                      })) : (
                        Alert.alert("You must be signed in to chat")
                      )
                    }}>  {item.recommender}</Text>
            <FontAwesomeIcon style= {styles.icons} icon={ faComment }/>
            </TouchableOpacity>
          </View>
            }
          keyExtractor={(item, index) => index.toString()}
        />
        <BottomSignupBar toggleStatus = {this.toggleStatus.bind(this)} />

      </View>
    );
  }
}

export default RecoScreen;
