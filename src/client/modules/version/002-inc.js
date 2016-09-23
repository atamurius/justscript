import { fromJS } from 'immutable';

export const version = '0.0.2';
export const description = "Increment";
export const apply = store => ({
  ...store,
  inc: fromJS({
    value: 42
  })
});
