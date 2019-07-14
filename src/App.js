import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, Button } from 'react-native';
import { createStackNavigator, createAppContainer,StackActions, NavigationActions } from "react-navigation";


class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://flocals.herokuapp.com/home') 
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20, justifyContent:"center", backgroundColor:"#fff", alignItems:"center"}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View style={{height:150,backgroundColor:"red",padding:60,margin:20,fontSize:32, alignItems:"center"}  } >
            <Text style={styles.One} onPress={() => this.props.navigation.navigate('Details')}>{item.name}</Text>
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
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://flocals.herokuapp.com/home/Food') 
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20, justifyContent:"center", backgroundColor:"#fff", alignItems:"center"}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View style={{height:150,backgroundColor:"red",padding:60,margin:20,fontSize:32, alignItems:"center"}  } >
            <Text style={styles.One} onPress={ ()=> Linking.openURL('https://google.com/search?q='+item.name) }>{item.name},{item.loc_short}, </Text>
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
  One: {
    // Define font size here in Pixels
    fontSize : 24    
  },
  Two: {
    // Define font size here in Pixels
    fontSize : 25
  },
  Three:{
    // Define font size here in Pixels
    fontSize : 30
  }
})

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);