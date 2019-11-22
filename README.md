![screenshot](https://github.com/faical-allou/flocals-app/blob/master/screenshot.png)

# flocals-app

This app requires an endpoint whose repo is [here](https://github.com/faical-allou/flocals) if you want to run your own instance.
Otherwise, you can also use the current herokuapp running here: 'https://flocals.herokuapp.com' with the caveat that it is not maintained, goes to sleep after 30min of inactivity, is load restricted and could be terminated anytime.

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

It is a pretty standard set up with Expo tutorial is here: https://expo.io/learn.
Once expo is running you only need to run `<expo start>`, you'll need expo app on your phone or an emulator to see it running.

That's quite a long set up, and many things can happen in between. If you have any issue, you can ping me here or in linkedin

Have fun
