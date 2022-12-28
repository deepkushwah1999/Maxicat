import {LOGIN, SIGNOUT, THEME} from '../actionTypes';

const initialState = {};

const chatReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'CHAT':
      return {...state, ...payload};
    
    case 'LIVE_USERS':
      console.log('live users', payload)
      return {...state, ...payload};
    
    case 'SOCKET_CONNECT':
      return {...state, ...payload};
    
    default: {
      return state;
    }
  }
};

export default chatReducer;
