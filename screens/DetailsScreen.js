import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking,TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

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
        currentType : _currentType,
        isLogged: helper._retrieveData('isLogged'),
      }
          )
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
        return (
              <View style={styles.listElements}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => <View>
                <TouchableOpacity style={styles.itemElementdetail} onPress={
                      ()=> Linking.openURL('https://google.com/search?q='+item.rec_name) }>
                    <Text style={styles.textElement} >{item.rec_name}</Text>
                      <FontAwesomeIcon style= {styles.icons} icon={ faExternalLinkAlt }/>
                      </TouchableOpacity>
                    <TouchableOpacity style={styles.recElement} onPress={
                      ()=> this.props.navigation.navigate('Recom', {nextScreen: item.place_id, nextHeader: item.rec_name})} >                   
                    <Text style={styles.textRecElement} > {item.nb_rec} recommendation(s)</Text>
                    </TouchableOpacity>
                  </View>
                  }
                  keyExtractor={(item, index) => index.toString()}
              />
              <BottomSignupBar toggleStatus = {this.toggleStatus.bind(this)} />

            </View>
    
        )
      }
    }
  

export default DetailsScreen;
