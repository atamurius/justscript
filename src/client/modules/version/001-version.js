import { fromJS } from 'immutable';

export const version = '0.0.1';
export const description = "Version tracking, migrations";
export const apply = store => ({
  ...store,
  versions: fromJS({
    current: '0.0.0',
    currentNumber: 0,
    list: []
  })
});
