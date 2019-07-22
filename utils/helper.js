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

    getRandomName : (compo) => {fetch('https://randomuser.me/api') 
    .then((response) => response.json())
    .then((responseJson) => {compo.setState({username: responseJson.results[0].login.username})})
    .catch((error) =>{
      console.error(error);
    });
  },

    getAutosuggest : (compo,input_text, destination_airport) => {
      url_location = '&location='+destination_airport.latitude+','+destination_airport.longitude;
      url_radius = '&radius=100000';
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
      fetch(url) 
    .then((response) => response.json())
    .then((responseJson) => {
        compo.setState({
          type_convert: helper.getInternalType(responseJson.result.types),
          datatransfer : {
                method: 'POST',
                body: JSON.stringify({
                  sessionid: global.sessionid,
                  airport : global.airport_code,
                  name: compo.state.name,
                  type_user: compo.state.act_type,
                  googletype: responseJson.result.types,
                  type_convert: helper.getInternalType(responseJson.result.types),
                  userDescription: compo.state.userDescription ? compo.state.userDescription : '',
                  place_id: compo.state.place_id,
                  recommender: compo.state.username,
                  address: responseJson.result.formatted_address,
                  details : responseJson 
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              }}, () => {console.log(responseJson.result.types)}
            )
          })  
    .catch((error) =>{
      console.error(error);
    })
  },

  getAirportData : (airportcode) => {fetch(variables.endpoint+'/api/v1/airport/'+airportcode) 
  .then((response) => response.json())
  .then((responseJson) => {
    global.airport_details = responseJson
  })
  .catch((error) =>{
    console.error(error);
  });
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
  }
export default helper;

