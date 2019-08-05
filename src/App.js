import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, Button,TextInput, Keyboard, Alert } from 'react-native';
import { createStackNavigator, createAppContainer , createDrawerNavigator} from "react-navigation";

import HomeScreen from '../screens/HomeScreen.js'
import TypeScreen from '../screens/TypeScreen.js'
import DetailsScreen from '../screens/DetailsScreen.js'
import FormScreen from '../screens/FormScreen.js'
import RecoScreen from '../screens/RecoScreen.js'
import ChatScreen from '../screens/ChatScreen.js'
import ChatList from '../screens/ChatList.js'

import Test from '../screens/Test.js'

import helper from '../utils/helper.js'

helper._storeData('isLogged', variables.initialState);
helper._storeData("airport", variables.destination )
helper._storeData("airportname", '' )
helper._storeData("sessionid", variables.sessionid )
helper._storeData("username", variables.userid )
helper._storeData("userlang", variables.userlang )



const AppNavigator = createDrawerNavigator({
  Home: {screen: HomeScreen},
  Types: {screen: TypeScreen},
  Details: {screen: DetailsScreen},
  Form: {screen: FormScreen},
  Chat: {screen: ChatScreen},
  Recom: {screen: RecoScreen},
  Test: {screen: Test}
}, 
{ initialRouteName: variables.landingScreen, contentComponent: ChatList, drawerWidth: 300, drawerPosition : 'right'}
);

export default createAppContainer(AppNavigator);