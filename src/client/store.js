import { combineReducers, createStore } from 'redux';
import { modules, migrations } from './modules';
import migrate from './modules/version/migrate';

// TODO save and load initialState
const initialState = migrate({ }, migrations);
const reducer = combineReducers(modules);
const store = createStore(reducer, initialState,
  window && window.devToolsExtension && window.devToolsExtension());

export default store;
