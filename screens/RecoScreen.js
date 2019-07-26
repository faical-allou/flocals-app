import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button } from 'react-native';


import helper from '../utils/helper.js';
import styles from '../styles/styles.js';



class RecoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      isLogged: helper._retrieveData('isLogged'),
  }
}
  
  async componentDidMount(){
    const { navigation } = this.props;
    const _currentType = await navigation.getParam('nextScreen', '123');
    this.setState({currentPlace : _currentType});
    return helper.getData(this,'home/recommendations/'+_currentType)   
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

export default RecoScreen;