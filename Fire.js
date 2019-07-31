import firebase from 'firebase'; // 4.8.1


import variables from './config/config.js'
import helper from './utils/helper.js';

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
    return (firebase.auth().currentUser || {}).uid;
  }

  findroom(roomid) {
    //firebase.database().ref('blabla').remove();
    return firebase.database().ref(roomid);
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

  subscribe(callback,roomId) {
    this.findroom(roomId)
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)))
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }


  sendMessages(messages, roomId) {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      helper.getTranslation(text,'fr', (response) => {
        text = text + "  /-/  " + response
        const message = {
          text,
          user,
          timestamp: this.timestamp,
        };
        this.findroom(roomId).push(message);
      })
    } 
  }

  createRoom(roomId) {
    var roomRef = firebase.database().ref(roomId);
    roomRef.transaction(function(currentData) {
      if (currentData === null) {
        return { autoWelcome: { text: 'Hello, this is flocals, you can now ask question directly to your fellow passenger', user:{_id: 1, name: 'flocals' } }};
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
      console.log("Text added ", snapshot.val());
    });
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

  // close the connection to the Backend
  off(roomId) {
    this.findroom(roomId).off();
  }
}

Firebasedata = new Fire();
export default Fire;
