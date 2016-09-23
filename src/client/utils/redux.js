import { connect } from 'react-redux';

export const connected = component => {
  const stores = component.stores || [ ];
  const actions = component.actions || { };
  const mapStores = store => stores
    .reduce((obj,s) => ({...obj, [s]: store[s]}), { });
  return connect(mapStores, actions)(component);
}


const empty = () => ({});

export const action = (type, f = empty) => {
  const result = function() {
    return { type, ...f.apply(this, arguments) };
  }
  result.type = type;
  return result;
}

export const reducer = (reducers = { }) => (state = { }, action) => {
  for (let key in reducers) {
    if (key === action.type) {
      state = reducers[key](state, action);
    }
  }
  return state;
}
