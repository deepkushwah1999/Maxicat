import {LOGIN, SIGNOUT, THEME} from '../actionTypes';

const initialState = {};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case THEME:
      return {...state, ...payload};
    case LOGIN:
      return { ...state, ...payload };
    case 'UPDATE':
      return { ...state, user: payload };
    case SIGNOUT:
      return initialState;
    default: {
      return state;
    }
  }
};

export default authReducer;
