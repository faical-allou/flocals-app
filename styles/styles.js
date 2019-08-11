import {StyleSheet} from 'react-native';

import visual from './visual.js'

const styles = StyleSheet.create({
  loadingIndicator:{
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
  },
    itemElement: {
      backgroundColor: visual.primaryColor,
      margin:5,
      alignItems:"center",
      justifyContent: 'center',
      borderRadius: visual.borderRadiusLarge,
      padding: 20,
      height: 80,
      width: 200,
    },
    itemImage: {
      margin:5,
      borderRadius: visual.borderRadiusSmall,
      width: 80,
      height: 80,
    },

    itemElementdetail: {
      flex: 1,
      flexDirection:'row',
      backgroundColor: visual.primaryColor,
      padding:30,
      marginTop:20,
      alignItems:"center",
      borderTopLeftRadius: visual.borderRadiusMedium,
      borderTopRightRadius: visual.borderRadiusMedium,
      borderColor: visual.tertiaryColor,
      borderWidth: 1,
      marginHorizontal: 20,
    },
    recElement: {
      textAlign: 'right',
      flexDirection:'row',
      paddingVertical:10,
      paddingHorizontal:15,
      justifyContent:'space-between',
      borderWidth:1,
      borderBottomLeftRadius: visual.borderRadiusMedium,
      borderBottomRightRadius: visual.borderRadiusMedium,
      fontSize : 10,
      opacity: 1,
      fontWeight: 'bold',
      borderColor: visual.tertiaryColor,
      marginHorizontal: 20,
    },
    translatedElement: {
      flex: 1,
      backgroundColor: visual.tertiaryColor,
      paddingVertical:10,
      paddingHorizontal:15,
      justifyContent:'space-between',
      borderBottomWidth:1,
      fontSize : 10,
      opacity: 1,
      fontWeight: 'bold',
      borderColor: visual.tertiaryColor,
      borderWidth: 1,
      marginHorizontal: 20,
    },
    textElement: {
      fontSize : 20,
      opacity: 1,
      fontWeight: 'bold',
      color: visual.textPrimaryColor
    },
    textRecElement: {
      fontSize : 16,
      opacity: 1,
      alignSelf: 'flex-end',
      fontWeight: 'bold',
      textAlign: 'right',
      color: visual.textSecondaryColor,
    },
    listElements: {
      marginTop: 30,
      flex: 1,
      justifyContent:"center",
      alignItems:"center"
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
      borderRadius: visual.borderRadiusSmall,
      borderColor: visual.tertiaryColor,
      borderWidth: 1,
      height: 50,
      fontSize: 18,
      margin: 5
    },
    suggestElementDesc: {
      borderColor: '#CCCCCC',
      alignItems:"center",
      textAlign:"center",
      borderRadius: visual.borderRadiusSmall,
      borderColor: visual.tertiaryColor,
      borderWidth: 1,
      height: 150,
      fontSize: 18,
      margin: 5
    },
    homeElement: {
      flex: 1,
      padding:10,
    },
    langPicker: {
      borderRadius: visual.borderRadiusLarge,
      backgroundColor: 'white',
      marginBottom: 36,
      marginHorizontal:20,
    },
    itemElementExploreButton: {
      borderRadius: visual.borderRadiusMedium,
      backgroundColor: visual.primaryColor,
      padding:5,
      marginBottom: 10,
      alignItems: 'center',
    },
    itemElementLangButton: {
      borderRadius: visual.borderRadiusLarge,
      backgroundColor: visual.secondaryColor,
      padding:5,
      alignItems: 'center',
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
    bkgImage: {
      width: '100%',
      height: '100%',
    },
    chatList:{
      borderColor: visual.tertiaryColor,
      borderWidth: 1,
      width: '100%',
      padding : 5,
    },
    textChatList:{
      fontSize: 16,
      color: visual.textSecondaryColor,
    },
    textChatBuddyList:{
      fontSize: 14,
      textAlign: 'right',
    },
    bottomBarContainer:{
      flexDirection:'row',
      borderTopWidth: 2,
      borderTopColor: visual.tertiaryColor,
    },
    bottomButton:{
      backgroundColor: 'white',
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: visual.borderRadiusSmall,
      padding: 2,
      paddingVertical: 10
    },
    bottomButtonText:{
      color: visual.textSecondaryColor,
      fontSize: 12,
      textAlign: 'center',
    },
    icons:{
      color: visual.textSecondaryColor,
      fontSize: 32,
      textAlign: 'center',
      marginBottom: 4
    },

  })
  
  export default styles
