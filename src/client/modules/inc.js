import { action, reducerMap, extendStore } from 'client/utils/redux';

export const increment = action('INCREMENT');

export const migrations = [{
  description: "Increment",
  apply: extendStore('inc', { value: 42 })
}];

export const value = store => store.inc.get('value');

export const reducer = reducerMap({
  [increment.type]: state => state.update('value', x => x + 1)
});
