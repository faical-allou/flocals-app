import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking,TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExternalLinkAlt, faArrowRight, faCommentDots} from '@fortawesome/free-solid-svg-icons'
import {connect } from 'react-redux';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import visual from '../styles/visual.js';
import dict from '../utils/dict.js';

import BottomSignupBar from './BottomSignupBar.js'



class PlacesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: dict.int2ext[navigation.getParam('nextScreen', 'Default')],
          headerTintColor: visual.textSecondaryColor,
          headerTitleStyle: styles.textStandard,
        };
      };
    constructor(props){
      super(props);
      this.state ={
        isLoading: false,
        username: 'Default_User',
        isLogged: this.props.isLogged,
        currentType: ''
      };
    }

    async componentDidMount(){
      const { navigation } = this.props;
      const _airport = await helper._retrieveData("airport");
      const _currentType = await navigation.getParam('nextScreen', 'general');
      helper.getData(this,'home/details/'+_airport+'/'+_currentType);
      this.setState({
        currentType : _currentType,
        isLogged: this.props.isLogged,
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
                      <FontAwesomeIcon style= {styles.icons} icon={ faCommentDots }/>
                      <Text style={styles.textRecElement} > {item.nb_rec}</Text>
                      <FontAwesomeIcon style= {styles.icons} icon={ faArrowRight }/>
                    </TouchableOpacity>
                  </View>
                  }
                  keyExtractor={(item, index) => index.toString()}
              />
              <BottomSignupBar />

            </View>
    
        )
      }
    }

  const mapStateToProps = function(state) {
    return {
      isLogged: state.status.isLogged,
      username: state.status.username,
      userlang: state.status.userlang
    }
  }

export default connect(mapStateToProps)(PlacesScreen);
