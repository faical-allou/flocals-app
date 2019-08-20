import React from 'react';
import { ActivityIndicator, Text, View, FlatList,Image} from 'react-native';
import {connect } from 'react-redux';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import visual from '../styles/visual.js';
import dict from '../utils/dict.js';

import BottomSignupBar from '../screens/BottomSignupBar.js'


class TypeScreen extends React.Component {
      static navigationOptions = {
        title: 'What to do',
        headerTintColor: visual.textSecondaryColor,
        headerTitleStyle: styles.textStandard,
      };

    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        userlang: '',
        isLogged: this.props.isLogged,
      };
    }

    async componentDidMount(){
      const _userlang = this.props.userlang;
      const _airport = await helper._retrieveData("airport")
      helper.getData(this,"home/alltypes/"+_userlang+"/"+_airport)
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
            <View style={{flexDirection:"row"}} >
                <Image
                  style={styles.itemImage}
                  source={dict.images[item.type_convert]}
                />
                <View style={styles.itemElement} >
                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.textElement} onPress={() => this.props.navigation.navigate('Places', {nextScreen: item.type_convert})}>{item.type_translated}</Text>
                </View>
            </View>
              }
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

export default connect(mapStateToProps)(TypeScreen);
