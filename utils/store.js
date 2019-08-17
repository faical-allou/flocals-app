import React from 'react';

import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// A very simple reducer
function status(state, action) {
    if (typeof state === 'undefined') {
      return 0;
    }
    switch (action.type) {
      case 'LOGIN':
        return {...state, isLogged: 'loggedin'}
      case 'LOGOUT':
        return {...state, isLogged: 'notloggedin'}
      default:
        return state;
    }
  }
  
  // A very simple store
  let store = createStore(combineReducers({status: status}));

  export default store;