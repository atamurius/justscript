// @flow
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

type Func = (...args:any) => any

interface Component {
  stores: Array<string>;
  actions: {
    [name: string]: Func
  };
}

export const connected = (component: Component) => {
  const stores = component.stores || [ ];
  const actions = component.actions || { };
  const mapStores = store => stores
    .reduce((obj,s) => ({...obj, [s]: store[s]}), { });
  return connect(mapStores, actions)(component);
}

export const extendStore = (key: string, data: any) => (store: { }) => ({
  ...store,
  [key]: store[key] ? store[key].merge(fromJS(data)) : fromJS(data),
})

const empty = () => ({});

type Action = {
  (...args: any): { type: string };
  type: string;
}

export function action(type: string, f: Func = empty): Action {
  const result = function() {
    return { type, ...f.apply(this, arguments) };
  }
  result.type = type;
  return result;
}

type Reducer = (state: { }, action: { }) => { }

type Reducers = {
  [name: string]: Reducer;
}

export const reducerMap = (reducers: Reducers = { }) =>
  (state: { } = { }, action: { type: string }) => {
    for (let key in reducers) {
      if (key === action.type) {
        state = reducers[key](state, action);
      }
    }
    return state;
  }
