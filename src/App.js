import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import helper from '../utils/helper.js';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  
  componentDidMount(){
    return helper.getData(this,"home");
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }

    return(
      <View style={styles.listElements}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View style={styles.itemElement} >
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Details', {destination: 'home/'+item.name})}>{item.name}</Text>
            </View>}
          keyExtractor={({id}, index) => id.toString()}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true};    
  }
  componentDidMount(){
    const { navigation } = this.props;
    const current_location = navigation.getParam('destination', '');
    return helper.getData(this,current_location);
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }

    return(
      <View style={styles.listElements}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View style={styles.itemElement} >
            <Text style={styles.textElement} onPress={ ()=> Linking.openURL('https://google.com/search?q='+item.name) }>{item.name}</Text>
            <Text style={styles.textElement}> {item.loc_short}</Text>
            </View>}
          keyExtractor={({activity_id}, index) => activity_id.toString()}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemElement: {
    // Define font size here in Pixels
    fontSize : 28,
    height:150,
    width: 280,
    backgroundColor:"red",
    padding:30,
    margin:20,
    alignItems:"center",
    borderRadius: 10   
  },
  textElement: {
    // Define font size here in Pixels
    fontSize : 28
  },
  listElements: {
    flex: 1, 
    paddingTop:20, 
    justifyContent:"center", 
    backgroundColor:"#fff", 
    alignItems:"center"
  }
})

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Details: {screen: DetailsScreen},
}, 
{ initialRouteName: 'Home'}
);

export default createAppContainer(AppNavigator);