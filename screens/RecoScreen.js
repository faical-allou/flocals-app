import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, ImageBackground } from 'react-native';


import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import BottomSignupBar from './BottomSignupBar.js'



class RecoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
      username: helper._retrieveData('username'),
      userlang: helper._retrieveData('userlang'),
      sessionid: helper._retrieveData('sessionid')

  }
}

  async componentDidMount(){
    const { navigation } = this.props;
    const _currentType = await navigation.getParam('nextScreen', 'ChIJPTacEpBQwokRKwIlDXelxkA');
    this.setState({currentPlace : _currentType});
    return helper.getData(this,'home/recommendations/fr/'+_currentType)
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
            <Text style={styles.textRecElement} onPress={() =>
              this.props.navigation.navigate('Chat', {
                      recommender: item.recommender,
                      username: this.state.username,
                      sessionid: this.state.sessionid,
                      placeid: this.state.currentPlace,
                      })}>
              {"Chat : "+item.recommender}
            </Text>
            </View>
         
            </View>
            }
          keyExtractor={(item, index) => index.toString()}
        /><View style= {{ flexDirection:'row'}}>
        <BottomSignupBar />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
      </View>
    );
  }
}

export default RecoScreen;
