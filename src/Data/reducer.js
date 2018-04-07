import {FETCH_ITEMS, POST_ITEM} from '../Item'
import {combineReducers} from 'redux';


const initialState = {
  items: [],
  item: {}
}

const itemReducer = function(state=initialState, action){
  switch (action.type) {
    case FETCH_ITEMS:
      return {
          ...state,
          items: action.change
      }
    case POST_ITEM:
      return {
          ...state,
          item: action.change
      }
    default:
      return state;
  }
};


export default combineReducers({
  items: itemReducer
});
