import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    itemElement: {
      flex: 1,
      backgroundColor: "rgba(169,169,169,0.95)",
      padding:30,
      marginTop:20,
      alignItems:"center",
      borderRadius: 10,
    },
    recElement: {
      flex: 1,
      backgroundColor: "rgba(211,211,211,0.95)",
      paddingVertical:25,
      paddingHorizontal:15,
      flexDirection:'row',
      alignItems:"center",
      justifyContent:'space-between',
      borderBottomWidth:1,
      borderBottomColor:'lightblue',
      borderRadius: 0,
      fontSize : 14,
      opacity: 1,
      fontWeight: 'bold'
    },
    textElement: {
      fontSize : 20,
      opacity: 1,
      fontWeight: 'bold'
    },
    listElements: {
      flex: 1,
      paddingTop:20,
      justifyContent:"center",
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
