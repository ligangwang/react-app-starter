import {FETCH_ITEMS, POST_ITEM} from './Items'

const initialState = {
  items: [],
  item: {}
}

export default function(state=initialState, action){
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
}
