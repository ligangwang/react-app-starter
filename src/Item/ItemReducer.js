import {FETCH_ITEMS} from './ListItemAction'
import {POST_ITEM} from './PostItemAction'

const initialState = {
  items: [],
  item: {},
}

const ItemReducer = function(state=initialState, action){
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

export default ItemReducer;
