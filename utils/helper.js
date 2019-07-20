import variables from '../config/config.js';

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

    getAutosuggest : (compo,input_text) => {
      url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key='+variables.G_Places_API+'&input='+input_text ;
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

  getAirportData : (compo,airportcode) => {fetch(variables.endpoint+'/api/v1/airport/'+airportcode) 
  .then((response) => response.json())
  .then((responseJson) => {
    compo.setState({
      isLoading: false,
      airportData: responseJson,
    }, function(){
    });
  })
  .catch((error) =>{
    console.error(error);
  });
},

}
export default helper;