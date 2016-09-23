import { combineReducers, createStore } from 'redux';
import * as reducers from './modules';
import { migrate } from './modules/version';

// TODO save and load initialState
const initialState = migrate({ });
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState,
  window && window.devToolsExtension && window.devToolsExtension());

export default store;
