import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, Button, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { GiftedChat } from 'react-native-gifted-chat'
import { Google } from 'expo';

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
    this.state ={ isLoading: true,username:'', photoUrl:'', signedIn:false };    
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        expoClientId: '746916049107-0un5svk32nv9o90c6vccek36tcfsiud0.apps.googleusercontent.com',
        iosClientId: '746916049107-6p47litmq08pgf8bbbmfh00vjt79qct1.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          username: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
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
              <Text style={styles.textElement} onPress={ ()=> this.props.navigation.navigate('Chat', {destination: 'home/'+item.city})}>{item.city}</Text>
              <Text style={styles.textElement}> {item.loc_short}</Text>
              </View>
            
            }
          keyExtractor={({activity_id}, index) => activity_id.toString()}
        />

        <View style={styles.container}>
        {this.state.signedIn ? (
          <View>
          <LoggedinBar username={this.state.username} photoUrl={this.state.photoUrl} />
          <Button
          title="Add Stuff"
          onPress={() => helper.postForm(this, variables.endpoint+'/api/v1/home/newactivity',this.dataSource[0])}
          /></View>
        ) : (
          <LoginBar signIn={this.signIn} />
        )}
      </View>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class Chatscreen extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}


const LoginBar = props => {
  return (
    <View>
      <Button title="Sign in with Google to add stuff " onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedinBar = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome: {props.username}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
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
  Chat: {screen: Chatscreen}
}, 
{ initialRouteName: 'Home'}
);

export default createAppContainer(AppNavigator);