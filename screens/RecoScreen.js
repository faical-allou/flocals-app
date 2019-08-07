import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, ImageBackground,Alert } from 'react-native';


import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import BottomSignupBar from './BottomSignupBar.js';



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
      userlang: helper._retrieveData('userlang'),
      sessionid: helper._retrieveData('sessionid'),
  }
}

  async componentDidMount(){
    const { navigation } = this.props;
    const _currentType = await navigation.getParam('nextScreen', 'ChIJPTacEpBQwokRKwIlDXelxkA');
    const _logged = await helper._retrieveData('isLogged')
    this.setState({currentPlace : _currentType, isLogged: _logged},
    helper.getData(this,'home/recommendations/it/'+_currentType) )
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
          <View style={styles.recElement} >
          <View >
            <Text style={styles.textRecElement} onPress={() =>
            { this.state.isLogged === 'loggedin' ? (
              
              this.props.navigation.navigate('Chat', {
                      recommender: item.recommender,
                      username: this.state.username,
                      sessionid: this.state.sessionid,
                      placeid: this.state.currentPlace,
                      })) : (
              Alert.alert("You must be signed in to chat")
                      )
                    }}>  {"Chat : "+item.recommender}</Text>
              </View>
            </View>
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
