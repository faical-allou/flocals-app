import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, Button, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import BottomSignupBar from './BottomSignupBar.js'
import dict from '../utils/dict.js'

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: dict.int2ext[navigation.getParam('nextScreen', 'Default')],
        };
      };
    constructor(props){
      super(props);
      this.state ={
        isLoading: false,
        username: 'Default_User',
        photoUrl: variables.default_pic,
        isLogged: helper._retrieveData('isLogged'),
        currentType: ''
      };
    }

    async componentDidMount(){
      const { navigation } = this.props;
      const _airport = await helper._retrieveData("airport");
      const _currentType = await navigation.getParam('nextScreen', 'general');
      helper.getData(this,'home/'+_airport+'/'+_currentType);
      this.setState({
        currentType : _currentType,}
          )

    }

    renderBody(){
      return (
        <View style={styles.listElements}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => <View>
                <View style={styles.itemElementdetail} >
                    <Text style={styles.textElement} onPress={
                      ()=> Linking.openURL('https://google.com/search?q='+item.rec_name) }>{item.rec_name}</Text>
                      </View>
                    <View style={styles.recElement} >
                    <Text style={styles.textRecElement} onPress={
                      ()=> this.props.navigation.navigate('Recom', {nextScreen: item.place_id})}>check {item.nb_rec} recommendation(s)</Text>
                    </View>
                  </View>
                  }
                  keyExtractor={(item, index) => index.toString()}
              />
              <BottomSignupBar />
              <Button
                title="Go back"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
      )
    }

    render(){
      if(this.state.isLoading){
        return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
      }

      switch (this.state.currentType) {
        case 'general':
        return (
          <ImageBackground source={require('../assets/skyline.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
        case 'food':
        return (
          <ImageBackground source={require('../assets/pizza.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
        case 'shopping':
        return (
          <ImageBackground source={require('../assets/shopping.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
        case 'nature':
        return (
          <ImageBackground source={require('../assets/nature.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
        case 'nightlife':
        return (
          <ImageBackground source={require('../assets/nightlife.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
        case 'park':
          return (
          <ImageBackground source={require('../assets/centralpark.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
          )
        case 'artnhistory':
        return (
          <ImageBackground source={require('../assets/scream.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
        default:
        return (
          <ImageBackground source={require('../assets/activities.jpg')} style={styles.bkgImage}>
            {this.renderBody()}
          </ImageBackground>
        )
      }
    }
  }

export default DetailsScreen;
