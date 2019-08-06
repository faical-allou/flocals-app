import { AsyncStorage} from 'react-native';

import variables from '../config/config.js';
import dict from '../utils/dict.js';

const helper = {

    getData : (compo,path_toCall) => {fetch(variables.endpoint+'/api/v1/'+path_toCall) 
      .then((response) => response.json())
      .then((responseJson) => {
        compo.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    },

    getPlaceName : (path_toCall, callback) => {fetch(variables.endpoint+'/api/v1/'+path_toCall) 
    .then((response) => response.json())
    .then((responseJson) => { callback(responseJson)  })
    .catch((error) =>{
      console.error(error);
    });
  },

      

    getRandomName : (compo) => {fetch('https://randomuser.me/api') 
    .then((response) => response.json())
    .then((responseJson) => {compo.setState({username: responseJson.results[0].login.username})})
    .catch((error) =>{
      console.error(error);
    });
  },

    getAutosuggest : (compo,input_text, lat, long) => {
      url_location = '&location='+lat+','+long;
      url_radius = '&radius=100000&strictbounds';
      url_input = '&input='+input_text ;
      url_type = '&types=establishment'
      url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key='+variables.G_Places_API+url_location+url_radius+url_type+url_input;
      fetch(url) 
    .then((response) => response.json())
    .then((responseJson) => {
      compo.setState({
        isLoading: false,
        autoSuggest: responseJson,
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
    });
    },

    getPlaceDetails : (compo,place_id_check) => {     
      url = 'https://maps.googleapis.com/maps/api/place/details/json?key='+variables.G_Places_API+'&placeid='+place_id_check ;
      console.log(url)
      fetch(url) 
        .then((response) => response.json())
        .then( (responseJson) => {
          _type_convert = helper.getInternalType(responseJson.result.types);
          compo.setState({detailjson: responseJson, type_convert : _type_convert})
          }) 
        .catch((error) =>{
          console.error(error);
        })
      },

  createPostRec : async (compo, data) => {
      const _sessionid = await helper._retrieveData("sessionid");
      const _airport = await helper._retrieveData("airport");
              compo.setState({
                  datatransfer : {
                        method: 'POST',
                        body: JSON.stringify({
                          sessionid: _sessionid,
                          airport : _airport,
                          name: compo.state.name,
                          type_user: compo.state.act_type,
                          googletype: data.result.types,
                          type_convert: compo.state.type_convert,
                          userDescription: compo.state.userDescription ? compo.state.userDescription : '',
                          place_id: compo.state.place_id,
                          recommender: compo.state.username,
                          address: data.result.formatted_address,
                          details : data 
                        }),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        }
                      }
            })
  },

  getAirportData : (compo, airportcode) => {fetch(variables.endpoint+'/api/v1/airport/'+airportcode) 
  .then((response) => response.json())
  .then( (responseJson) => {
    helper._storeData('airportname', responseJson.name);
    helper._storeData('airportlat', String(responseJson.latitude));
    helper._storeData('airportlong', String(responseJson.longitude));
    compo.setState({
      airportname: responseJson.name,
      isLoading: false
    })
  }) 
  .catch((error) =>{
      console.error(error);
    });
  },

  getTranslation: (inputtext, outputlanguage, callback) => {
    const format = {                        
      method: 'POST',
      key: variables.G_Places_API, 
      body: JSON.stringify({  
        q: [inputtext],
        target: outputlanguage,
        format:  'text'
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      }
  };
    fetch('https://translation.googleapis.com/language/translate/v2?key='+variables.G_Places_API, format)
      .then((response) => response.json())
      .then((responseJson) =>  callback(responseJson.data.translations[0].translatedText) )
      .catch((error) =>{ console.error(error); })
  },

  getInternalType : (googletype) => {
    let ourType = [];
    for (let i = 0; i < googletype.length; i++) {
      ourType[i] = dict.g2us[googletype[i]];
    };
    let countDict = {};
    for (let i = 0; i < ourType.length; i++) {
      // had to initialize otherwise can't increment
      countDict[ourType[i]] =0
    };
    for (let i = 0; i < ourType.length; i++) {
      if (ourType[i] !== 'general' &&  ourType[i] !== undefined) { countDict[ourType[i]]++ }
    };
    let max = 0;
    let max_id = 'general';
    for (const [key, value] of Object.entries(countDict)) {
        value > max ? max_id = key : ''
    };
    if (max_id === 'general' ||  max_id === undefined) { max_id = 'general' }
    return max_id
    },

    _storeData :  (key, value) => {
      try {
        AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log(error);
        return
      }
    },

    _retrieveData :   (key) => {
      try {
        const value =  AsyncStorage.getItem(key);
        if (value !== null) {
          return value
        }
      } catch (error) {
        console.log(error);
      }
    },
    
  };
export default helper;

