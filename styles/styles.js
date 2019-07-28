import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    itemElement: {
      flex: 1,
      backgroundColor:"lightblue",
      padding:30,
      margin:20,
      alignItems:"center",
      borderRadius: 10
    },
    textElement: {
      fontSize : 20
    },
    listElements: {
      flex: 1,
      paddingTop:20,
      justifyContent:"center",
      backgroundColor:"#fff",
      alignItems:"center"
    },
    textInput: {
      borderColor: '#CCCCCC',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 50,
      fontSize: 18,
      paddingLeft: 20,
      paddingRight: 20,
      margin: 5
    },
    textSuggest: {
      height: 50,
      fontSize: 18,
      margin: 5
    },
    suggestElement: {
      borderColor: '#CCCCCC',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      backgroundColor:"white",
      height: 50,
      fontSize: 18,
      margin: 5
    },
    homeElement: {
      flex: 1,
    },

  })

  export default styles
