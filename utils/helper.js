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

    postForm : (compo, path_toCall, messageBody) => {
      let data = {
        method: 'POST',
        body: JSON.stringify({
            name: messageBody.name,
            description: messageBody.description
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      }     
      fetch(path_toCall, data) 
      .then((response) => response.json())
      .then((responseJson) => {0})
      .catch((error) =>{
        console.error(error);
      });
    },

    getAutosuggest : (compo,input_text) => {fetch('https://maps.googleapis.com/maps/api/place/autocomplete/xml?key='+G_Places_API+'&input='+ input_text) 
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
}
export default helper;