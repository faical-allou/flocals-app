import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    itemElement: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,1)",
      padding:30,
      marginTop:20,
      alignItems:"center",
      borderRadius: 20,
      borderColor: 'grey',
      borderWidth: 1,
      marginHorizontal: 20
    },
    itemElementdetail: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,1)",
      padding:30,
      marginTop:20,
      alignItems:"center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: 'grey',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      marginHorizontal: 20,

    },
    recElement: {
      flex: 1,
      backgroundColor: "rgba(211,211,211,0.95)",
      paddingVertical:25,
      paddingHorizontal:15,
      justifyContent:'space-between',
      borderBottomWidth:1,
      borderBottomColor:'lightblue',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      fontSize : 10,
      opacity: 1,
      fontWeight: 'bold',
      borderColor: 'grey',
      borderTopColor:'white',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      marginHorizontal: 20,
    },
    textElement: {
      fontSize : 20,
      opacity: 1,
      fontWeight: 'bold'
    },
    textRecElement: {
      fontSize : 16,
      opacity: 1,
      alignSelf: 'flex-end',
      fontWeight: 'bold',
      textAlign: 'right',
    },
    listElements: {
      flex: 1,
      paddingTop:20,
      justifyContent:"center",
      alignItems:"center"
    },
    listRecomandationPage: {
      flex: 1,
      margin:50,
      justifyContent:"center",

    },
    textInput: {
      fontSize: 28,
      flex: 1,
      backgroundColor: "rgba(255,255,255,1)",
      alignItems:"center",
      textAlign:"center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderColor: 'grey',
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,

    },
    textSuggest: {
      height: 50,
      fontSize: 18,
      margin: 5
    },
    suggestElement: {
      borderColor: '#CCCCCC',
      alignItems:"center",
      textAlign:"center",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      borderColor: 'grey',
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      backgroundColor:"lightgrey",
      height: 50,
      fontSize: 18,
      margin: 5
    },
    homeElement: {
      flex: 1,
    },
    bkgImage: {
      width: '100%',
      height: '100%',
    },
    bottomView:{
      width: '100%',
      height: 50,
      backgroundColor: '#FF9800',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
  })

  export default styles
