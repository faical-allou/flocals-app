
import { createStore, combineReducers } from 'redux';

function status(state, action) {
    if (typeof state === 'undefined') {
      return 0;
    }
    switch (action.type) {
      case 'LOGIN':
        return Object.assign({}, state, { isLogged: 'loggedin'})
      case 'LOGOUT':
        return Object.assign({}, state, { isLogged: 'notloggedin'})
      case 'TOGGLESTATUS':
        return Object.assign({}, state, { isLogged: action.status})
      case 'LANGUAGE':
        return Object.assign({}, state, { userlang: action.userlang})     
      case 'SETNAME':
        return Object.assign({}, state, { username: action.username})
            
      default:
        return state;
    }
  }
  
  let store = createStore(combineReducers({status: status}));

  export default store;
