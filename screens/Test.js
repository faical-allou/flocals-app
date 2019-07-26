import React from 'react';
import MapView from 'react-native-maps';

class Test extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      airport: '',
      sessionid: ''
    };
  }
  render() {
    return (
      <MapView style={{flex: 1}} />
    );
  }
}

export default Test;