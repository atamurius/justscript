import { fromJS } from 'immutable';
import { action, reducer } from 'client/utils/redux';

import { versions } from './version';
export { versions };

export const increment = action('INCREMENT');

export const inc = reducer({
  [increment.type]: state => state.update('value', x => x + 1)
});
