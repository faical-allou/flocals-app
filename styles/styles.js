import {StyleSheet,Dimensions} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const styles = StyleSheet.create({
    itemElement: {
      backgroundColor: "rgba(252, 177, 48,1)",
      margin:5,
      alignItems:"center",
      borderRadius: 20,
      borderColor: 'grey',
      borderWidth: 1,
      padding: 20,
      width: 200,
    },
    itemInitial: {
      backgroundColor: "rgba(29, 72, 134,1)",
      margin:5,
      alignItems:"center",
      borderRadius: 50,
      borderColor: 'grey',
      borderWidth: 1,
      padding: 20,
      width: 80,
    },

    itemElementdetail: {
      flex: 1,
      backgroundColor: "rgba(252, 177, 48,0.95)",
      padding:30,
      marginTop:20,
      alignItems:"center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: 'grey',
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      marginHorizontal: 20,
    },
    recElement: {
      flex: 1,
      backgroundColor: "rgba(29, 72, 134,1)",
      paddingVertical:10,
      paddingHorizontal:15,
      justifyContent:'space-between',
      borderBottomWidth:1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      fontSize : 10,
      opacity: 1,
      fontWeight: 'bold',
      borderColor: 'grey',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      marginHorizontal: 20,
    },
    translatedElement: {
      flex: 1,
      backgroundColor: 'grey',
      paddingVertical:10,
      paddingHorizontal:15,
      justifyContent:'space-between',
      borderBottomWidth:1,
      fontSize : 10,
      opacity: 1,
      fontWeight: 'bold',
      borderColor: 'grey',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      marginHorizontal: 20,
    },
    textElement: {
      fontSize : 20,
      opacity: 1,
      fontWeight: 'bold',
      color: 'white'
    },
    textRecElement: {
      fontSize : 16,
      opacity: 1,
      alignSelf: 'flex-end',
      fontWeight: 'bold',
      textAlign: 'right',
      color: 'white'
    },
    listElements: {
      marginTop: 30,
      flex: 1,
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
    },
    textSuggest: {
      height: 50,
      fontSize: 18,
      margin: 5,
    },
    suggestElement: {
      borderColor: '#CCCCCC',
      alignItems:"center",
      textAlign:"center",
      borderRadius: 5,
      borderColor: 'grey',
      borderWidth: 1,
      height: 50,
      fontSize: 18,
      margin: 5
    },
    suggestElementDesc: {
      borderColor: '#CCCCCC',
      alignItems:"center",
      textAlign:"center",
      borderRadius: 5,
      borderColor: 'grey',
      borderWidth: 1,
      height: 150,
      fontSize: 18,
      margin: 5
    },
    homeElement: {
      flex: 1,
      paddingTop:10,
    },
    itemWelcome: {
      alignItems: 'center',
      padding:10,
    },
    itemElementHometop: {
      backgroundColor: "rgba(29, 72, 134,0)",
      padding:5,
    },
    itemElementHomeButton: {
      borderRadius: 20,
      backgroundColor: "rgba(252, 177, 48,1)",
      padding:5,
      marginBottom: 36,
      marginHorizontal:20,
      alignItems: 'center',
      justifyContent:'space-between',
    },
    textElementHomeButton: {
      fontSize: 28,
      color: 'white',
      fontWeight: 'bold',
    },
    textElementHome: {
      fontSize : 20,
      opacity: 1,
      fontWeight: 'bold',
    },
    textWelcome: {
      alignItems: 'center',
      fontSize : 20,
      opacity: 1,
      fontWeight: 'bold',
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
