import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {ItemReducer} from '../Item'
import {UserReducer} from '../User'

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers({
  itemState: ItemReducer,
  userState: UserReducer
});

const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
