import React from 'react';
import { ActivityIndicator, Text, View, Button, FlatList, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js';

import BottomSignupBar from '../screens/BottomSignupBar.js'
import Fire from '../Fire';


class TypeScreen extends React.Component {
      static navigationOptions = {
        title: 'Activity list near your destination',
      };

    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        isLogged: helper._retrieveData('isLogged'),
      };
    }

    async componentDidMount(){
      const _airport = await helper._retrieveData("airport")
      helper.getData(this,"home/"+_airport)
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
              <View style={{flexDirection:"row"}} >
                <View style={styles.itemInitial} >
                  <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Details', {nextScreen: item.type_convert})}>{dict.int2ext[item.type_convert][0]}</Text>
                </View>
                <View style={styles.itemElement} >
                  <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Details', {nextScreen: item.type_convert})}>{dict.int2ext[item.type_convert]}</Text>
                </View>
              </View>
              }
          /><View style= {{ flexDirection:'row'}}>
        <BottomSignupBar toggleStatus = {this.toggleStatus.bind(this)} />
          <Button
            title="Go back"
            color={colors.secondary}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        </View>
      );
    }
  }

export default TypeScreen;
