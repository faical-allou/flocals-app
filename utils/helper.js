const helper = {
    getFormattedDatetime: (datetime) => {
      return moment.utc(datetime).local().format('MMM Do, YYYY, h:mm a');
    },

    getData : (compo,path_toCall) => {fetch('https://flocals.herokuapp.com/'+path_toCall) 
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
            job: messageBody.loc_short
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

  }

export default helper;