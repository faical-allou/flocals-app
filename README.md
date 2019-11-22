![screenshot](https://github.com/faical-allou/flocals-app/blob/master/screenshot.png)

# flocals-app

This app requires an endpoint that you can find [here](https://github.com/faical-allou/flocals) if you want to run your own.
You can also use the current herokuapp running here: 'https://flocals.herokuapp.com' with the caveat that it is not maintained, goes to sleep after 30min of inactivity, is load restricted and could be terminated anytime.

To get started you also need a few external accounts (free and freemium):
+ Expo: https://expo.io/
+ React Native: https://facebook.github.io/react-native/
+ firebase: https://firebase.google.com/
+ GCP: https://cloud.google.com/
  where you need to enable: 
  * Places API
  * Translation API

and a bunch of dependencies that can be installed with *yarn* or *npm* 

To make the app work you'll need a folder config and a file config.js in it with the following format:
```
export default variables = {
    endpoint : 'https://flocals.herokuapp.com', 

    G_Places_API: 'abc',

    G_firebase_key: "efg",
    fire_authDomain: "xxx.firebaseapp.com",
    fire_databaseURL: "https://xxx.firebaseio.com",
    fire_projectId: "xxx",
    fire_storageBucket: "",
    fire_messagingSenderId: "123",
    fire_appID: "foo:bar",

    default_pic: 'https://placeimg.com/140/140/any',
    landingScreen: 'Home',
    destination: 'CDG', 
    sessionid: '190901SQ1000CDG',
    airlinename: 'ECAir',
    initialState: 'loggedin', //use 'loggedin' to start logged-in
    userid: 'Batman',
    userlang : 'default', //use 'default' to start the normal app
};
```
