
import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button,ImageButton,TextInput, Keyboard, Alert, ImageBackground} from 'react-native';

import helper from '../utils/helper.js';
import styles from '../styles/styles.js';
import dict from '../utils/dict.js'

class FormScreen extends React.Component {
    static navigationOptions = {
      title: 'You recommend',
    };

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

    async componentDidMount(){
      const { navigation } = this.props;
      const _airport = await helper._retrieveData("airport");
      const _airportlat = await helper._retrieveData("airportlat");
      const _airportlong = await helper._retrieveData("airportlong");


      this.setState({
        username: navigation.getParam('username', 'Username_default'),
        act_type: navigation.getParam('act_type', 'default_type'),
        airport : _airport,
        airportlat : _airportlat,
        airportlong : _airportlong,
        isLoading: false,
      }
      );
    }
    handleNameChange(name) {
      this.setState({ name });
      name.length > 4 ? helper.getAutosuggest(this,name,this.state.airportlat,this.state.airportlong) : '';
    }
    handleUserDescriptionChange(desc) {
      this.setState({ userDescription: desc });
    }
    handleSelectSuggest(itemSelected) {
      this.setState({ name:itemSelected.description, place_id: itemSelected.place_id, autoSuggest:''  },
        () => helper.getPlaceDetails(this, this.state.place_id)
      )
    }
    handleSubmit() {
      helper.createPostRec(this, this.state.detailjson);
      Alert.alert(
        'Thank you for your recommendation',
        'We added your recommendation to the category: '+ dict.int2ext[this.state.type_convert],
        [
          {text: 'OK', onPress: () => {
            fetch(variables.endpoint+'/api/v1/home/newactivity/', this.state.datatransfer);
            this.props.navigation.navigate('Types') ;
          }
        },
          {text: 'Cancel', onPress: () => ''},
        ],
        {cancelable: false},
      )
    }

    render(){
      if(this.state.isLoading){
        return(<View style={styles.bottomView}><ActivityIndicator/></View>)
      }

      return(
        <View>
        <View style={styles.suggestElement}>
          <TextInput
            style={styles.textInput}
            placeholder="What?"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            value={this.state.name}
            onChangeText={this.handleNameChange}
          />
          </View>
          <FlatList
            data={this.state.autoSuggest.predictions}
            renderItem={({item}) => <View style={styles.suggestElement} >
                <Text style={styles.textSuggest} onPress={() => this.handleSelectSuggest(item) }>{item.description}</Text>
                </View>
              }
            keyExtractor={({id}, index) => id.toString()}
          />
          <View style={styles.suggestElementDesc}>
          <TextInput
            style={styles.textInput}
            placeholder="Why?"
            maxLength={180}
            onBlur={Keyboard.dismiss}
            value={this.state.userDescription}
            onChangeText={this.handleUserDescriptionChange}
          />
          </View>
          <View style={{alignContent: 'flex-end'}}>
          <Button
            title="Submit"
            onPress={() => this.handleSubmit()}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        </View>
       );
    }
  }

export default FormScreen;
