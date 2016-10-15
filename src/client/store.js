// @flow
import { combineReducers, createStore } from 'redux';
import * as modules from './modules';
import migrate, { order, collect } from './utils/migrations';
import { shouldApply, applied } from './modules/versions';

// TODO save and load initialState
const initialState = migrate(
  modules,
  { },
  shouldApply,
  applied
);
const reducer = combineReducers(extractDefaults(modules));
const store = createStore(reducer, initialState,
  window && window.devToolsExtension && window.devToolsExtension());

export default store;



function extractDefaults(modules) {
  return Object.keys(modules).reduce((obj,key) => {
    obj[key] = modules[key].default;
    return obj;
  }, { });
}
