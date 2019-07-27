import React from 'react';
import { ActivityIndicator, View, Text} from 'react-native';


import helper from '../utils/helper.js';





class Test extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      airport: '',
      sessionid: '',
      translated: 'waiting...',
      gotdata: false,
    };
  }
  
  componentDidMount(){
    helper.getTranslation(this, 'How are you', 'de')
    this.setState({ isLoading: false})
  }


  render() {
    if(this.state.isLoading){
      return(<View style={{flex: 1, padding: 20}}><ActivityIndicator/></View>)
    }
    return (
      <Text>{this.state.translated}</Text>
    );
  }
}

export default Test;