import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet  } from 'react-native';

export default class App extends React.Component {

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
            <Text style={styles.One} onPress={ ()=> Linking.openURL('https://google.com/search?q='+item.name) }>{item.name}</Text>
            </View>}
          keyExtractor={({id}, index) => id.toString()}
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
});