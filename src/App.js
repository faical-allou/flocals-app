import React from 'react';
import { AsyncStorage,FlatList, ActivityIndicator, Text, View, Linking, Button, Image,TextInput, Keyboard, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { GiftedChat } from 'react-native-gifted-chat'

import helper from '../utils/helper.js';
import dict from '../utils/dict.js';
import styles from '../styles/styles.js';
import BottomSignupBar from '../screens/BottomSignupBar.js'


class HomeScreen extends React.Component {
  constructor(props){
    helper._storeData('isLogged', variables.initialState);
    super(props);
    this.state ={ 
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
    };
  }
  
  componentDidMount(){
    global.airport_code = variables.destination;
    global.sessionid = 0;
    helper.getAirportData(global.airport_code);
    this.setState({isLoading: false});
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }
 
    return(
      <View style={styles.listElements}>
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Types')}>Welcome to flocals</Text>
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Types')}>Your Flying to: {global.airport_code}</Text>
            </View>
      );
  }
}

class TypeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
    };
  }
  
  componentDidMount(){
    helper.getData(this,"home/"+global.airport_code)
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
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Details', {nextScreen: item.type_convert})}>{dict.int2ext[item.type_convert]}</Text>
            </View>
            }
          keyExtractor={(item, index) => index.toString()} 
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
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
  
  componentDidMount(){
    const { navigation } = this.props;
    this.setState({currentType : navigation.getParam('nextScreen', 'general')})
    return helper.getData(this,'home/'+global.airport_code+'/'+navigation.getParam('nextScreen', 'general'));
  }

  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }

    return (
      <View style={styles.listElements}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View style={styles.itemElement} >
              <Text style={styles.textElement} onPress={ 
                ()=> Linking.openURL('https://google.com/search?q='+item.rec_name) }>{item.rec_name}</Text>
              <Text style={styles.textElement} onPress={ 
                ()=> this.props.navigation.navigate('Recom', {nextScreen: item.place_id})}>check {item.nb_rec} recommendation(s)</Text>
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
}

class FormScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true, 
      name: '', 
      description:'' ,
      place_id:'default',  
      placeDetails: '',
      autoSuggest:'',
      username:'',
      act_type:'',
      isLogged: helper._retrieveData('isLogged'),
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserDescriptionChange = this.handleUserDescriptionChange.bind(this);
  }
    
  componentDidMount(){
    this.setState({isLoading:false});
    const { navigation } = this.props;
    this.setState({
      username: navigation.getParam('username', 'Username_default'),
      act_type: navigation.getParam('act_type', 'default_type')}, () => {
      }
    );
    global.airport_code = variables.destination;
    helper.getAirportData(global.airport_code);
    global.sessionid = 0;
  }
  handleNameChange(name) {
    this.setState({ name });
    name.length > 4 ? helper.getAutosuggest(this,name,global.airport_details) : '';
  }
  handleUserDescriptionChange(userDescription) {
    this.setState({ userDescription });
  }
  handleSelectSuggest(itemSelected) {
    this.setState({ name:itemSelected.description, place_id: itemSelected.place_id, autoSuggest:''  },
    () => {
      helper.getPlaceDetails(this, this.state.place_id);
      }
    );
  }
  handleSubmit() {       
      Alert.alert(
        'Thank you for your recommendation',
        'We added your recommendation to the category: '+ dict.int2ext[this.state.type_convert],
        [
          {text: 'OK', onPress: () => {
            fetch(variables.endpoint+'/api/v1/home/newactivity/', this.state.datatransfer)
            this.props.navigation.goBack()
          }
        },
          {text: 'Cancel', onPress: () => ''},
        ],
        {cancelable: false},
      )   
  }
    
  render(){
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }
    
    return(
      <View >
        <TextInput
          style={styles.textInput}
          placeholder="Activity"
          maxLength={20}
          onBlur={Keyboard.dismiss}
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <FlatList 
          data={this.state.autoSuggest.predictions}
          renderItem={({item}) => <View style={styles.suggestElement} >
              <Text style={styles.textSuggest} onPress={() => this.handleSelectSuggest(item) }>{item.description}</Text>
              </View>           
            }
          keyExtractor={({id}, index) => id.toString()}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          maxLength={180}
          onBlur={Keyboard.dismiss}
          value={this.state.userDescription}
          onChangeText={this.handleUserDescriptionChange}
        />
        <Button
          title="Submit"
          onPress={() => this.handleSubmit()}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class RecoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
  }
}
  
  componentDidMount(){
    const { navigation } = this.props;
    this.setState({currentPlace : navigation.getParam('nextScreen', '123')});
    return helper.getData(this,'home/recommendations/'+navigation.getParam('nextScreen', '123'))   
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
            <Text style={styles.textElement} >{item.userdescription}</Text>
            <Text style={styles.textElement} onPress={() => this.props.navigation.navigate('Chat', {recommender: item.recommender})}>{item.recommender}</Text>
            </View>
            }
          keyExtractor={(item, index) => index.toString()} 
        />
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
            avatar: variables.default_pic,
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



const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Types: {screen: TypeScreen},
  Details: {screen: DetailsScreen},
  Form: {screen: FormScreen},
  Chat: {screen: Chatscreen},
  Recom: {screen: RecoScreen},

}, 
{ initialRouteName: variables.landingScreen}
);

export default createAppContainer(AppNavigator);