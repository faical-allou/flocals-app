import firebase from 'firebase'; // 4.8.1


import variables from '../config/config.js'
import helper from './helper.js';

console.ignoredYellowBox = [
  'Setting a timer'
  ];

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    firebase.initializeApp({
      apiKey: variables.G_firebase_key,
      authDomain: variables.fire_authDomain,
      databaseURL: variables.fire_databaseURL,
      projectId: variables.fire_projectId,
      storageBucket: '',
      messagingSenderId: variables.messagingSenderId,
    });
  }
  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
          alert(message);
        }
    }
  };

  get uid() {
    return '123'
    //return (firebase.auth().currentUser || {}).uid;
  }

  findroom(Id) {
    return firebase.database().ref(Id);
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  subscribe(callback,sessionId, roomId) {
    this.findroom(sessionId+"/"+roomId+"/messages")
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)))
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }


  sendMessages(sessionId,  roomId, messages, lang) {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      helper.getTranslation(text,lang, (response) => {
        text = text + "  /-/  " + response
        const message = {
          text,
          user,
          timestamp: this.timestamp,
        };
        this.findroom(sessionId+"/"+roomId+"/messages").push(message);
      })
    } 
  }

  createRoom(sessionId, roomId) {
    var roomRefMessage = firebase.database().ref(sessionId+"/"+roomId+"/messages");
    roomRefMessage.transaction(function(currentData) {
      if (currentData === null) {
        return { autoWelcome: { text: 'Hello!', user:{_id: 1, name: 'flocals' } }};
      } else {
        console.log('Room already exists.');
        return; // Abort the transaction.
      }
    }, function(error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because room already exists).');
      } else {
        console.log('Room added!');
      }
    });
  }

  logUserChatlists(sessionId, roomId, user1, _lang,_placename,_partner,_placeid) {
    var userRoomRef = firebase.database().ref(sessionId+"/"+user1+"/"+roomId);
    userRoomRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });

    userRoomRef.set({
      placename: _placename,
      targetlang: _lang,
      partner: _partner,
      placeid:_placeid
      },function(error) {
        if (error) {
          console.log(error)
        }}
      )
  }

  getFormat = (inputText, outputlanguage) => {
    return format = {                        
      method: 'POST',
      key: variables.G_Places_API, 
      body: JSON.stringify({  
        q: [inputText],
        target: outputlanguage 
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  }}

  getOpenChats(sessionId, userId, callback){
    this.findroom(sessionId+"/"+userId).on("value", function(snapshot) {
      if (snapshot.val() == null) {callback([])} 
      else { 
      callback( Object.values(snapshot.val()))
    }
  })}
  
  getTargetLang(compo, sessionId,username,roomId) {
  firebase.database().ref(sessionId+"/"+username+"/"+roomId).once('value')
  .then(function(snapshot) {
    compo.setState({
      target_lang: snapshot.val().targetlang
      })
    })
  }

  // close the connection to the Backend
  off(sessionId, roomId) {
    this.findroom(sessionId+"/"+roomId).off();
  }
}

Firebasedata = new Fire();
export default Fire;
