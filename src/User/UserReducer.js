import {CHANGE_LOGIN_STATE} from './UserAction'

const initialState = {isSignedIn:null};

const UserReducer = function(state=initialState, action){
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      return {
        ...state,
        isSignedIn: action.change
      }
    default:
      return state;
  }
};

export default UserReducer;
