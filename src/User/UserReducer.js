import {CHANGE_USER} from './UserAction'

const initialState = {user:null};

const UserReducer = function(state=initialState, action){
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        user: action.change
      }
    default:
      return state;
  }
};

export default UserReducer;
