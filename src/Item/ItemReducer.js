import {SHOW_UI_LOADING, FETCH_ITEMS, FETCH_ITEMS_ERROR} from './ListItemAction'
import {POST_ITEM} from './PostItemAction'

const initialState = {
  items: [],
  searchValue: null,
  startAt: 0,
  item: {},
}

const ItemReducer = function(state=initialState, action){
  switch (action.type) {
    case FETCH_ITEMS:
      const {items, searchValue, startAt} = action.change
      return {
          ...state,
          items: startAt === 0 ? items: [...state.items, ...items],
          searchValue: searchValue,
          startAt: startAt,
          isLoading: false,
          isError: false
      }
    case FETCH_ITEMS_ERROR:
      return {
        ...state,
        isError: true
      }
    case POST_ITEM:
      return {
          ...state,
          item: action.change
      }
    case SHOW_UI_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
};

export default ItemReducer;
