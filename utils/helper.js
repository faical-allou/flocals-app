import variables from '../config/config.js';
import dict from '../utils/dict.js';

const helper = {
    getFormattedDatetime: (datetime) => {
      return moment.utc(datetime).local().format('MMM Do, YYYY, h:mm a');
    },

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

    getAutosuggest : (compo,input_text, destination_airport) => {
      url_location = '&location='+destination_airport.latitude+','+destination_airport.longitude;
      url_radius = '&radius=100000';
      url_input = '&input='+input_text ;
      url_type = '&types=establishment'
      console.log(url_location,url_radius);
      url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key='+variables.G_Places_API+url_location+url_radius+url_type+url_input;
    console.log(url);
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

    getPlaceDetails_Send : (compo,place_id_check,path_toSendto) => {
      url = 'https://maps.googleapis.com/maps/api/place/details/json?key='+variables.G_Places_API+'&placeid='+place_id_check ;
    console.log(url);
      fetch(url) 
    .then((response) => response.json())
    .then((responseJson) => {

      compo.setState({
        isLoading: false,
        placeDetails: responseJson,
      }, function(){
      });
      let data = {
        method: 'POST',
        body: JSON.stringify({
            name: compo.state.name,
            type: compo.state.act_type,
            userDescription: compo.state.userDescription,
            place_id: compo.state.place_id,
            recommender: compo.state.username,
            details : compo.state.placeDetails 
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      }     
      fetch(path_toSendto, data) 
      .then(console.log(data))
      .catch((error) =>{
        console.error(error);
      });
    })
    .catch((error) =>{
      console.error(error);
    });
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

}
export default helper;